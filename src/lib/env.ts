import { z } from "zod";

/**
 * Server environment. Delivery integrations are optional in development;
 * in production, set RESEND_API_KEY + ENQUIRY_TO so enquiries also arrive by email.
 */
const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  ENQUIRY_TO: z.email().optional(),
  ENQUIRY_FROM: z.string().min(1).default("Website <onboarding@resend.dev>"),
  ENQUIRY_STORE_DIR: z.string().min(1).default("data"),
});

export const env = schema.parse(process.env);
