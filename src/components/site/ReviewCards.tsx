import { Quote } from "lucide-react";
import { reviews } from "@/data/content";
import { Reveal } from "./Reveal";

export function ReviewCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {reviews.map((r, i) => (
        <Reveal as="li" key={i} delay={i * 120} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
          <Quote className="size-8 text-gold" aria-hidden />
          <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-foreground">“{r.quote}”</blockquote>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{r.source}</p>
        </Reveal>
      ))}
    </ul>
  );
}
