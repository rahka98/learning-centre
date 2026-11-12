import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { business } from "@/config/business";
import { Button } from "@/components/ui/button";

/** Location card with a lazily-loaded Google Map (loads only when scrolled near). */
export function MapCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setLoad(true);
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-elegant lg:grid-cols-[1fr_1.35fr]">
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
        <div>
          <p className="eyebrow">Visit the centre</p>
          <h3 className="text-h3 mt-4">Karthik Complex, Alagar Kovil Road</h3>
          <ul className="mt-6 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-maroon" aria-hidden />
              <span>{business.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-maroon" aria-hidden />
              <a href={`tel:${business.phone.tel}`} className="font-semibold hover:text-maroon">{business.phone.display}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-maroon" aria-hidden />
              <span>
                {business.hours.summary}
                <span className="block text-sm text-muted-foreground">{business.hours.note}</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild variant="hero" size="xl">
            <a href={business.maps.directions} target="_blank" rel="noopener noreferrer">
              <Navigation /> Get directions
            </a>
          </Button>
          <Button asChild variant="line" size="xl">
            <a href={business.maps.place} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </Button>
        </div>
      </div>
      <div ref={ref} className="relative min-h-[320px] bg-surface-strong sm:min-h-[420px]">
        {load ? (
          <iframe
            title={`Map showing ${business.name}, ${business.location}`}
            src={business.maps.embed}
            className="absolute inset-0 size-full border-0 dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Loading map…</div>
        )}
      </div>
    </div>
  );
}
