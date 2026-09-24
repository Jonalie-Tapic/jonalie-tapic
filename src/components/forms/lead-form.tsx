"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, helpOptions, hoursOptions, type EnquiryInput } from "@/lib/validation/enquiry";

export interface LeadFormProps {
  email: string;
  response: string;
}

const field =
  "peer w-full rounded-(--radius-sm) border border-line-strong bg-night/40 px-4 py-3.5 text-pearl placeholder:text-muted/70 transition-colors duration-300 hover:border-mist focus:border-pearl focus:outline-none aria-[invalid=true]:border-bad";
const label = "mb-2 block text-sm font-medium text-pearl";
const errorText = "mt-2 text-sm text-bad";

export function LeadForm({ email, response }: LeadFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { help: [], business: "", message: "", company_url: "" },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/forms/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Your message couldn't be sent.");
      router.push("/thank-you");
    } catch (err) {
      // Entered data is preserved. Offer the direct route.
      setServerError(err instanceof Error ? err.message : "Your message couldn't be sent.");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-describedby="form-note">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input
            id="name"
            autoComplete="name"
            className={field}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className={errorText}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={field}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorText}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="business" className={label}>
          Business or website <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="business" autoComplete="organization" className={field} placeholder="So I can do a little homework before we talk" {...register("business")} />
      </div>

      <fieldset aria-describedby={errors.help ? "help-error" : undefined}>
        <legend className={label}>What would you like help with?</legend>
        <div className="flex flex-wrap gap-2">
          {helpOptions.map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input type="checkbox" value={opt} className="peer sr-only" {...register("help")} />
              <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm text-muted transition-all duration-300 peer-checked:border-pearl peer-checked:bg-pearl peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pearl hover:border-mist hover:text-pearl">
                {opt}
              </span>
            </label>
          ))}
        </div>
        {errors.help && (
          <p id="help-error" className={errorText}>
            {errors.help.message}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="hours" className={label}>
          Roughly how much help?
        </label>
        <div className="relative">
          <select
            id="hours"
            defaultValue=""
            className={`${field} appearance-none pr-12`}
            aria-invalid={errors.hours ? "true" : "false"}
            aria-describedby={errors.hours ? "hours-error" : undefined}
            {...register("hours")}
          >
            <option value="" disabled>
              Choose an estimate
            </option>
            {hoursOptions.map((h) => (
              <option key={h} value={h} className="bg-night">
                {h}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-pearl" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        {errors.hours && (
          <p id="hours-error" className={errorText}>
            {errors.hours.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${field} resize-y`}
          placeholder="What's piling up, what you've tried, when you'd like to start…"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className={errorText}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_url">Leave this empty</label>
        <input id="company_url" tabIndex={-1} autoComplete="off" {...register("company_url")} />
      </div>

      {serverError && (
        <div role="alert" className="rounded-(--radius-sm) border border-bad/50 bg-bad/10 p-4 text-sm text-pearl">
          {serverError} Your details are still here. Try again, or email me at{" "}
          <a className="underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-pearl px-8 whitespace-nowrap text-sm font-semibold text-night transition-colors duration-500 hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
        <p id="form-note" className="text-xs text-muted">
          I reply {response}. Your details are only used to respond to you.
        </p>
      </div>
    </form>
  );
}
