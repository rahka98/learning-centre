import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, GraduationCap, Layers } from "lucide-react";
import { business } from "@/config/business";
import { getProgram, programs } from "@/data/programs";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ProgramCard } from "@/components/site/ProgramCard";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Programme not found | AU Study Centre Melur" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.program;
    return {
      meta: seo({
        title: `${p.code} — ${p.title} by Distance Education | AU Study Centre Melur`,
        description: `${p.summary} Admission guidance for Alagappa University's ${p.title} at the Melur study centre.`,
      }),
    };
  },
  component: ProgramPage,
});

function ProgramPage() {
  const { program: p } = Route.useLoaderData();
  const others = programs.filter((o) => o.slug !== p.slug).slice(0, 3);
  const wa = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello, I'd like details about the ${p.title} (${p.code}) programme.`)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="bg-ledger pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-site relative pb-16 pt-10 sm:pt-14">
          <Link to="/programmes" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden /> All programmes
          </Link>
          <Reveal className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">{p.level} programme</p>
              <h1 className="text-display mt-5">
                <span className="text-gold-gradient">{p.code}</span>
                <span className="mt-2 block text-h2">{p.title}</span>
              </h1>
              <p className="text-lead mt-6 max-w-2xl">{p.overview}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {[
                { icon: Layers, k: "Level", v: p.level },
                { icon: Clock, k: "Duration", v: p.duration },
                { icon: GraduationCap, k: "Awarded by", v: "Alagappa University" },
              ].map((f, i) => (
                <div key={f.k} className={`glass rounded-2xl p-4 ${i === 2 ? "col-span-2" : ""}`}>
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    <f.icon className="size-4 text-maroon" aria-hidden /> {f.k}
                  </dt>
                  <dd className="mt-2 font-semibold text-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container-site section-pad grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-12">
          <Reveal>
            <h2 className="text-h3">Who it's for</h2>
            <ul className="mt-5 space-y-3">
              {p.idealFor.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="text-h3">What it can lead to</h2>
            <ul className="mt-5 space-y-3">
              {p.outcomes.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden /> <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-border bg-surface p-7">
            <h2 className="text-h3">How the Melur centre helps</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>• Explains eligibility and the current admission cycle</li>
              <li>• Guides you step by step through the admission process</li>
              <li>• Answers your doubts in person or over the phone</li>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">Fees and specialisations are set by Alagappa University — ask the centre for the latest details.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="whatsapp" size="xl">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> Ask on WhatsApp
                </a>
              </Button>
              <Button asChild variant="line" size="xl">
                <a href={`tel:${business.phone.tel}`}>Call {business.phone.display}</a>
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <h2 className="text-h3 mb-5">Enquire about {p.code}</h2>
          <EnquiryForm key={p.slug} defaultProgram={p.slug} />
        </Reveal>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-site section-pad">
          <h2 className="text-h2">Other programmes</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ProgramCard key={o.slug} program={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
