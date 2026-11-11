import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { programs, programLevels } from "@/data/programs";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { ProgramCard } from "@/components/site/ProgramCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: seo({
      title: "Programmes — UG, PG, B.Ed, MBA, MCA, M.Sc, MSW | AU Study Centre Melur",
      description: "Compare Alagappa University distance education programmes available through the Melur study centre: levels, usual durations and who each suits.",
    }),
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  const [level, setLevel] = useState<(typeof programLevels)[number]>("All");
  const list = level === "All" ? programs : programs.filter((p) => p.level === level);

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={<>Choose the degree that <span className="italic-accent">fits your life.</span></>}
        lead="All programmes are offered by Alagappa University's Directorate of Distance Education. Specialisations, eligibility and fees are confirmed by the centre for each admission cycle."
      />

      <section className="container-site section-pad pt-10">
        <div role="tablist" aria-label="Filter by level" className="flex flex-wrap gap-2">
          {programLevels.map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={level === l}
              onClick={() => setLevel(l)}
              className={cn(
                "h-11 rounded-full border px-5 text-sm font-semibold transition-colors",
                level === l ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-gold",
              )}
            >
              {l}
              <span className="ml-2 opacity-60">{l === "All" ? programs.length : programs.filter((p) => p.level === l).length}</span>
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-site section-pad">
          <SectionHeading eyebrow="Side by side" title="Compare programmes" lead="Durations shown are the usual length of these degrees in India. The centre will confirm the exact structure for your batch." />
          <Reveal className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">Comparison of programmes</caption>
                <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-bold">Programme</th>
                    <th scope="col" className="px-6 py-4 font-bold">Level</th>
                    <th scope="col" className="px-6 py-4 font-bold">Duration</th>
                    <th scope="col" className="px-6 py-4 font-bold">Best suited for</th>
                    <th scope="col" className="px-6 py-4"><span className="sr-only">Details</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {programs.map((p) => (
                    <tr key={p.slug} className="transition-colors hover:bg-surface">
                      <th scope="row" className="px-6 py-5 font-semibold text-foreground">
                        <span className="font-display text-lg text-maroon">{p.code}</span>
                        <span className="block text-sm font-medium text-muted-foreground">{p.title}</span>
                      </th>
                      <td className="px-6 py-5">{p.level}</td>
                      <td className="px-6 py-5">{p.duration}</td>
                      <td className="px-6 py-5 text-muted-foreground">{p.idealFor[0]}</td>
                      <td className="px-6 py-5 text-right">
                        <Link to="/programmes/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 font-semibold text-maroon hover:underline" aria-label={`Details for ${p.title}`}>
                          Details <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Not sure which programme is right?" lead="Tell the centre about your qualification and goals — they'll suggest the options that fit." />
    </>
  );
}
