import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { business } from "@/config/business";
import { programs } from "@/data/programs";
import { Brand } from "./SiteHeader";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { mainNav } from "./nav";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-border bg-surface pb-24 lg:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Brand />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            A learner support centre in Melur for {business.university.directorate}, {business.university.name}. Admission guidance for UG, PG and professional programmes.
          </p>
          <div className="mt-6 flex gap-2">
            <a href={business.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${business.social.instagram.handle}`} className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold">
              <InstagramIcon className="size-5" />
            </a>
            <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold">
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {mainNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-foreground/85 transition-colors hover:text-maroon">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/faq" className="text-foreground/85 transition-colors hover:text-maroon">FAQ</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Programmes</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to="/programmes/$slug" params={{ slug: p.slug }} className="text-foreground/85 transition-colors hover:text-maroon">
                  {p.code === "UG" || p.code === "PG" ? p.title : `${p.code} — ${p.title.replace(/^(Master|Bachelor) of /, "")}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Visit</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={business.maps.place} target="_blank" rel="noopener noreferrer" className="text-foreground/85 hover:text-maroon">{business.address.full}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`tel:${business.phone.tel}`} className="text-foreground/85 hover:text-maroon">{business.phone.display}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span className="text-foreground/85">{business.hours.summary} · call to confirm</span>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}, {business.location}. Degrees are awarded by {business.university.name}.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
