import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="bg-ledger pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-site relative pb-14 pt-12 sm:pb-20 sm:pt-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-display mt-5 max-w-4xl">{title}</h1>
          {lead && <p className="text-lead mt-6 max-w-2xl">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
