import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { MapCard } from "@/components/site/MapCard";
import { Reveal } from "@/components/site/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo({
      title: "Contact & Directions - Alagappa University Study Centre, Melur Rau",
      description: "Call +9180988 91689 or visit Karthik Complex, Alagar Kovil Road, near Indian Bank, Melur, Tamil Nadu 625106. Get directions on Google Maps.",
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  const channels = [
    { icon: Phone, label: "Call", value: business.phone.display, href: `tel:${business.phone.tel}`, external: false },
    { icon: WhatsAppIcon, label: "WhatsApp", value: business.phone.display, href: `https://wa.me/${business.whatsapp}`, external: true },
    { icon: InstagramIcon, label: "Instagram", value: business.social.instagram.handle, href: business.social.instagram.url, external: true },
    ...(business.email ? [{ icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}`, external: false }] : []),
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Come by, call, <span className="italic-accent">or message.</span></>} lead="Every enquiry goes straight to the Melur centre team." />
      <section className="container-site section-pad pt-10 space-y-10">
        <ul className="grid gap-4 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 80}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group card-lift flex h-full items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-maroon transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{c.label}</span>
                  <span className="mt-1 block truncate font-semibold text-foreground">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <MapCard />
        </Reveal>
      </section>
    </>
  );
}
