import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { env } from "@/lib/env";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function persist(record: EnquiryInput & { id: string; receivedAt: string }) {
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), env.ENQUIRY_STORE_DIR);
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify(record) + "\n", "utf8");
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function notify(record: EnquiryInput & { id: string }) {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO) return false;
  const rows: [string, string][] = [
    ["Name", record.name],
    ["Email", record.email],
    ["Business", record.business || "-"],
    ["Help with", record.help.join(", ")],
    ["Hours", record.hours],
    ["Message", record.message || "-"],
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: env.ENQUIRY_TO,
      reply_to: record.email,
      subject: `New enquiry: ${record.name}`,
      html: `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`).join("")}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many attempts. Please email me directly instead." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.company_url) return Response.json({ ok: true });

  const record = { ...parsed.data, id: randomUUID(), receivedAt: new Date().toISOString() };

  // Persist first, then dispatch. Each step can fail independently.
  let stored = false;
  try {
    await persist(record);
    stored = true;
  } catch (err) {
    console.error("[enquiry] persist failed", { id: record.id, err: String(err) });
  }

  let emailed = false;
  try {
    emailed = await notify(record);
  } catch (err) {
    console.error("[enquiry] email dispatch failed", { id: record.id, err: String(err) });
  }

  if (!stored && !emailed) {
    return Response.json({ ok: false, error: "Something went wrong on my side. Your message wasn't sent." }, { status: 500 });
  }
  return Response.json({ ok: true, id: record.id });
}
