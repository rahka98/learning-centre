import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Program } from "@/data/programs";
import { cn } from "@/lib/utils";

export function ProgramCard({ program, featured = false, className }: { program: Program; featured?: boolean; className?: string }) {
  return (
    <Link
      to="/programmes/$slug"
      params={{ slug: program.slug }}
      className={cn(
        "group card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7",
        featured && "bg-maroon-gradient border-transparent text-on-band",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("font-display text-4xl leading-none sm:text-5xl", featured ? "text-gold" : "text-maroon")}>{program.code}</span>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45", featured ? "border-on-band/30" : "border-border group-hover:border-gold group-hover:text-gold")}>
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
      <h3 className={cn("text-h3 mt-8", featured && "[color:var(--color-on-band)]")}>{program.title}</h3>
      <p className={cn("mt-3 flex-1 text-[0.95rem] leading-relaxed", featured ? "text-on-band/80" : "text-muted-foreground")}>{program.summary}</p>
      <div className={cn("mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]", featured ? "text-on-band/75" : "text-muted-foreground")}>
        <span>{program.level}</span>
        <span aria-hidden>·</span>
        <span>{program.duration}</span>
      </div>
    </Link>
  );
}
