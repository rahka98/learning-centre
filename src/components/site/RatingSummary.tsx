import { ExternalLink, Star } from "lucide-react";
import { business } from "@/config/business";

export function RatingSummary() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {business.ratings.map((r) => {
        const body = (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{r.source}</span>
              {r.url && <ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-gold" aria-hidden />}
            </div>
            <p className="mt-4 font-display text-6xl leading-none text-foreground">{r.value.toFixed(1)}</p>
            <div className="mt-3 flex gap-1 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{r.count} ratings</p>
          </>
        );
        return r.url ? (
          <a key={r.source} href={r.url} target="_blank" rel="noopener noreferrer" className="group card-lift rounded-3xl border border-border bg-card p-6 shadow-soft" aria-label={`${r.value} out of 5 on ${r.source} from ${r.count} ratings — open reviews`}>
            {body}
          </a>
        ) : (
          <div key={r.source} className="rounded-3xl border border-border bg-card p-6 shadow-soft" aria-label={`${r.value} out of 5 on ${r.source} from ${r.count} ratings`}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
