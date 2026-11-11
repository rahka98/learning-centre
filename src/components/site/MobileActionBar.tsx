import { Navigation, Phone } from "lucide-react";
import { business } from "@/config/business";
import { WhatsAppIcon } from "./icons";

/** Thumb-reachable quick actions on phones and tablets. */
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold tracking-wide";
  return (
    <nav aria-label="Quick actions" className="glass fixed inset-x-3 bottom-3 z-40 flex overflow-hidden rounded-2xl shadow-elegant lg:hidden" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
      <a href={`tel:${business.phone.tel}`} className={`${item} text-foreground`}>
        <Phone className="size-5 text-maroon" aria-hidden /> Call
      </a>
      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-border text-foreground`}>
        <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp
      </a>
      <a href={business.maps.directions} target="_blank" rel="noopener noreferrer" className={`${item} text-foreground`}>
        <Navigation className="size-5 text-gold" aria-hidden /> Directions
      </a>
    </nav>
  );
}
