import { z } from "zod";

export const helpOptions = ["Inbox", "Calendar", "Client paperwork", "Invoicing", "Travel & events", "Systems & SOPs", "Not sure yet"] as const;

export const hoursOptions = ["Under 10 hrs / month", "10–20 hrs / month", "20–40 hrs / month", "40+ hrs / month", "Not sure yet"] as const;

/** Shared by the client form and the route handler. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(120),
  email: z.email("Please enter a valid email so I can reply.").max(200),
  business: z.string().trim().max(200).optional().or(z.literal("")),
  help: z.array(z.enum(helpOptions)).min(1, "Pick at least one. \"Not sure yet\" is fine."),
  hours: z.enum(hoursOptions, { error: "Choose a rough estimate. It doesn't need to be exact." }),
  message: z.string().trim().max(2000, "Please keep it under 2,000 characters.").optional().or(z.literal("")),
  /** Honeypot. Real people never see or fill this. */
  company_url: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
