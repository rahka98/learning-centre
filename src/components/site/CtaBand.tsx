import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/config/business";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function CtaBand({ title = "Your degree can start with one conversation.", lead = "Call or WhatsApp the Melur centre — the team will explain programmes, eligibility and the next admission steps." }: { title?: string; lead?: string }) {
  return (
    <section className="container-site section-pad">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-band px-6 py-14 text-inverse-foreground shadow-elegant sm:px-12 sm:py-20 dark:text-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gold opacity-25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 left-10 size-72 rounded-full bg-maroon opacity-30 blur-3xl" aria-hidden />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow !text-gold">Admission enquiries</p>
            <h2 className="text-h2 mt-4 !text-inverse-foreground dark:!text-foreground">{title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-80 sm:text-lg">{lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild variant="gold" size="xl">
              <a href={`tel:${business.phone.tel}`}>
                <Phone /> {business.phone.display}
              </a>
            </Button>
            <Button asChild variant="glass" size="xl" className="!text-inverse-foreground dark:!text-foreground">
              <Link to="/admissions">
                Enquiry form <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
