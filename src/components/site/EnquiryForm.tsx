import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";
import { business } from "@/config/business";
import { programs } from "@/data/programs";
import { buildEnquiryMessage, cooldownRemaining, enquirySchema, whatsappUrl, type EnquiryInput } from "@/lib/enquiry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

const LAST_SENT_KEY = "ausc-enquiry-last";
type Errors = Partial<Record<keyof EnquiryInput, string>>;
const empty: EnquiryInput = { name: "", phone: "", email: "", program: "", message: "", website: "" };

/**
 * Admission enquiry. Validates on the device, then opens WhatsApp with a
 * ready-to-send message addressed to the centre — no data is stored on this
 * website. The visitor confirms by tapping Send in WhatsApp.
 */
export function EnquiryForm({ defaultProgram = "", className }: { defaultProgram?: string; className?: string }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryInput>({ ...empty, program: defaultProgram });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ready" | "blocked">("idle");
  const [waLink, setWaLink] = useState("");
  const [wait, setWait] = useState(0);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const set = (k: keyof EnquiryInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Bots submit instantly; humans take more than a couple of seconds.
    if (Date.now() - mountedAt.current < 2500) {
      setErrors({ name: "Please take a moment to check your details, then send again." });
      return;
    }
    let last: number | null = null;
    try {
      last = Number(localStorage.getItem(LAST_SENT_KEY)) || null;
    } catch {
      /* ignore */
    }
    const remaining = cooldownRemaining(last, Date.now());
    if (remaining > 0) {
      setWait(Math.ceil(remaining / 1000));
      setStatus("blocked");
      return;
    }

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EnquiryInput;
        if (!next[key]) next[key] = issue.message;
      }
      if (next.website) return; // silently drop spam
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const program = programs.find((p) => p.slug === parsed.data.program);
    const link = whatsappUrl(business.whatsapp, buildEnquiryMessage(parsed.data, program?.title ?? "Not sure yet — need guidance"));
    setWaLink(link);
    try {
      localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    window.open(link, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("ready"), 400);
  };

  if (status === "ready") {
    return (
      <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10", className)} role="status" aria-live="polite">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h3 className="text-h3 mt-5">Your message is ready in WhatsApp</h3>
        <p className="mt-3 text-muted-foreground">
          We've opened WhatsApp with your enquiry filled in. <strong className="text-foreground">Tap Send</strong> in WhatsApp to deliver it to the centre. If it didn't open, use the button below or call directly.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="xl">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" /> Open WhatsApp again
            </a>
          </Button>
          <Button asChild variant="line" size="xl">
            <a href={`tel:${business.phone.tel}`}>
              <Phone /> Call {business.phone.display}
            </a>
          </Button>
        </div>
        <button type="button" className="mt-6 text-sm font-semibold text-maroon underline-offset-4 hover:underline" onClick={() => { setValues({ ...empty }); setStatus("idle"); }}>
          Start a new enquiry
        </button>
      </div>
    );
  }

  const field = "mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25 aria-[invalid=true]:border-destructive";
  const label = "text-sm font-semibold text-foreground";
  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof EnquiryInput) => ({ id: `${uid}-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className={cn("rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-9", className)} aria-label="Admission enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-name`} className={label}>Full name <span className="text-maroon">*</span></label>
          <input {...aria("name")} className={field} autoComplete="name" maxLength={80} value={values.name} onChange={set("name")} placeholder="Your name" />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>Mobile number <span className="text-maroon">*</span></label>
          <input {...aria("phone")} className={field} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} value={values.phone} onChange={set("phone")} placeholder="98765 43210" />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>Email <span className="font-normal text-muted-foreground">(optional)</span></label>
          <input {...aria("email")} className={field} type="email" inputMode="email" autoComplete="email" maxLength={120} value={values.email} onChange={set("email")} placeholder="you@example.com" />
          {err("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-program`} className={label}>Programme of interest <span className="text-maroon">*</span></label>
          <select {...aria("program")} className={cn(field, "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")} value={values.program} onChange={set("program")}>
            <option value="">Select a programme</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.code} — {p.title}
              </option>
            ))}
            <option value="not-sure">Not sure yet — I need guidance</option>
          </select>
          {err("program")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>Your question <span className="font-normal text-muted-foreground">(optional)</span></label>
          <textarea {...aria("message")} className={cn(field, "min-h-28 resize-y")} maxLength={500} value={values.message} onChange={set("message")} placeholder="E.g. eligibility, documents, the next admission date…" />
          <p className="mt-1 text-right text-xs text-muted-foreground">{values.message.length}/500</p>
        </div>
        {/* Honeypot: hidden from people and assistive tech */}
        <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden>
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>
      </div>

      {status === "blocked" && (
        <p className="mt-5 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground" role="alert">
          You just sent an enquiry. Please wait {wait} seconds before sending another, or call {business.phone.display}.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          Sends via WhatsApp to {business.phone.display}. Nothing is stored on this website.
        </p>
        <Button type="submit" variant="hero" size="xl" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
          {status === "sending" ? "Opening WhatsApp…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
