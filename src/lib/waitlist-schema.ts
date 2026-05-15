import { z } from "zod";

export const waitlistInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  plan: z.enum(["unsealed", "velvt-vault", "sovereign", "undecided"]),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  referral: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type WaitlistInput = z.infer<typeof waitlistInputSchema>;
