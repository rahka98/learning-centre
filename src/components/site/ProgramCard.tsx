import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Program } from "@/data/programs";
import { cn } from "@/lib/utils";

export function ProgramCard({ program, featured = false, className }: { program: Program; featured?: boolean; className?: string }) {
  return (
    <Link
      to="/programmes/$slug"
      params={{ slug: program.slug }}
      className={cn(
        "group card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7",
        featured && "bg-maroon-gradient border-transparent [color:var(--color-on-band)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("font-display text-4xl leading-none sm:text-5xl", featured ? "text-gold" : "text-maroon")}>{program.code}</span>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45", featured ? "border-on-band/30" : "border-border group-hover:border-gold group-hover:text-gold")}>
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
      <p className={cn("mt-8 text-[0.7rem] font-bold uppercase leading-none tracking-[0.16em]", featured ? "[color:color-mix(in_oklab,var(--color-on-band)_75%,transparent)]" : "text-muted-foreground")}>{program.level}</p>
      <h3 className={cn("text-h3 mt-3", featured && "[color:var(--color-on-band)]")}>{program.title}</h3>
      <p className={cn("mt-3 text-[0.95rem] leading-relaxed", featured ? "[color:color-mix(in_oklab,var(--color-on-band)_80%,transparent)]" : "text-muted-foreground")}>{program.summary}</p>
      <div className="min-h-6 flex-1" aria-hidden />
      {/* Footer pinned to the bottom so every card in a row shares the same baseline */}
      <div className={cn("flex items-center justify-between gap-3 border-t pt-5", featured ? "border-on-band/20" : "border-border")}>
        <span
          title={program.duration}
          className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-semibold leading-none",
            featured ? "border-on-band/30 [color:var(--color-on-band)]" : "border-border bg-background/60 text-foreground",
          )}
        >
          <Clock className={cn("size-3.5 shrink-0", featured ? "text-gold" : "text-maroon")} aria-hidden />
          {program.duration.replace(/^Usually\s+/i, "")}
        </span>
        <span className={cn("inline-flex h-8 shrink-0 items-center text-sm font-semibold leading-none", featured ? "[color:var(--color-on-band)] underline decoration-gold underline-offset-4" : "text-maroon")}>Details</span>
      </div>
    </Link>
  );
}
