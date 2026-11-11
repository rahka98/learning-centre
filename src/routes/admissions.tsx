import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { business } from "@/config/business";
import { admissionSteps } from "@/data/content";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: seo({
      title: "Admission Enquiry — Alagappa University Study Centre, Melur",
      description: "Send an admission enquiry for Alagappa University distance education in Melur by WhatsApp or phone. Get guidance on eligibility, documents and next steps.",
    }),
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={<>Ask anything. <span className="italic-accent">We'll guide you.</span></>}
        lead="Fill in the short form and your enquiry opens in WhatsApp, ready to send to the centre. Prefer to talk? Call directly."
      />
      <section className="container-site section-pad pt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <EnquiryForm />
        </Reveal>
        <aside className="space-y-6">
          <Reveal className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-h3">Talk to the centre</h2>
            <div className="mt-6 grid gap-3">
              <Button asChild variant="hero" size="xl">
                <a href={`tel:${business.phone.tel}`}>
                  <Phone /> {business.phone.display}
                </a>
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="line" size="xl">
                <a href={business.maps.directions} target="_blank" rel="noopener noreferrer">
                  <MapPin /> Directions
                </a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{business.hours.summary}. {business.hours.note}</p>
          </Reveal>
          <Reveal className="rounded-3xl border border-border bg-surface p-7">
            <h2 className="text-h3">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {admissionSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm text-primary-foreground">{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-base font-semibold tracking-normal">{s.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
