import { z } from "zod";

/** Strip control characters and collapse whitespace so user text is safe to place in a URL. */
export function cleanText(value: string, max: number): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

/** Accepts Indian mobile numbers: 10 digits starting 6–9, optional +91 / 0 prefix, spaces or dashes. */
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const match = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return match?.[1] ?? null;
}

export const enquirySchema = z.object({
  name: z
    .string()
    .transform((v) => cleanText(v, 80))
    .pipe(z.string().min(2, "Please enter your full name").regex(/^[\p{L} .'-]+$/u, "Use letters only")),
  phone: z
    .string()
    .transform((v) => normalizeIndianMobile(v) ?? "")
    .pipe(z.string().length(10, "Enter a valid 10-digit mobile number")),
  email: z
    .string()
    .transform((v) => v.trim().slice(0, 120))
    .pipe(z.union([z.literal(""), z.string().email("Enter a valid email address")])),
  program: z.string().min(1, "Choose a programme"),
  message: z.string().transform((v) => cleanText(v, 500)),
  /** Honeypot — real visitors never see or fill this field. */
  website: z.string().max(0, "Spam detected"),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export function buildEnquiryMessage(e: Enquiry, programTitle: string): string {
  const lines = [
    "Hello, I'd like to enquire about admission.",
    "",
    `Name: ${e.name}`,
    `Mobile: +91 ${e.phone}`,
    e.email ? `Email: ${e.email}` : null,
    `Programme: ${programTitle}`,
    e.message ? `Message: ${e.message}` : null,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export function whatsappUrl(number: string, text: string): string {
  const safeNumber = number.replace(/\D/g, "");
  return `https://wa.me/${safeNumber}?text=${encodeURIComponent(text)}`;
}

/** Minimum gap between two enquiries from the same browser (duplicate-submission guard). */
export const ENQUIRY_COOLDOWN_MS = 30_000;

export function cooldownRemaining(lastSentAt: number | null, now: number): number {
  if (!lastSentAt) return 0;
  return Math.max(0, ENQUIRY_COOLDOWN_MS - (now - lastSentAt));
}
