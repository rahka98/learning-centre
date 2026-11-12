import { describe, expect, it } from "vitest";
import { business } from "@/config/business";
import { buildEnquiryMessage, cooldownRemaining, enquirySchema, normalizeIndianMobile, whatsappUrl } from "./enquiry";

const valid = { name: "Priya R", phone: "98765 43210", email: "", program: "mba", message: "", website: "" };

describe("enquiry rules", () => {
  it("accepts Indian mobiles with +91 or 0 prefixes", () => {
    expect(normalizeIndianMobile("+91 98765 43210")).toBe("9876543210");
    expect(normalizeIndianMobile("09876543210")).toBe("9876543210");
  });

  it("rejects numbers that are not 10-digit Indian mobiles", () => {
    expect(normalizeIndianMobile("12345")).toBeNull();
    expect(normalizeIndianMobile("5876543210")).toBeNull();
  });

  it("blocks submissions where the hidden spam field is filled", () => {
    expect(enquirySchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false);
  });

  it("requires a programme choice", () => {
    expect(enquirySchema.safeParse({ ...valid, program: "" }).success).toBe(false);
  });

  it("sends the enquiry to the centre's WhatsApp number 918098891689", () => {
    const parsed = enquirySchema.parse(valid);
    const url = whatsappUrl(business.whatsapp, buildEnquiryMessage(parsed, "MBA"));
    expect(url.startsWith("https://wa.me/918098891689?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain("Mobile: +91 9876543210");
  });

  it("blocks a second enquiry within 30 seconds", () => {
    expect(cooldownRemaining(1_000, 11_000)).toBe(20_000);
    expect(cooldownRemaining(1_000, 31_000)).toBe(0);
  });
});
