import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, MessagesSquare, Phone, Star } from "lucide-react";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { programs } from "@/data/programs";
import { admissionSteps, reviews } from "@/data/content";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Hero3D } from "@/components/site/Hero3D";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProgramCard } from "@/components/site/ProgramCard";
import { SmartImage } from "@/components/site/SmartImage";
import { MapCard } from "@/components/site/MapCard";
import { CtaBand } from "@/components/site/CtaBand";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "Alagappa University Study Centre, Melur — Distance Education Admissions",
      description:
        "Rated 4.9 by 221 learners on Google. Admission guidance in Melur for Alagappa University distance education: UG, PG, B.Ed, MBA, MCA, M.Sc and MSW.",
    }),
  }),
  component: Index,
});

const pillars = [
  { icon: HeartHandshake, title: "Student-friendly staff", body: "Learners describe the team as approachable and easy to reach whenever doubts come up." },
  { icon: Compass, title: "Clear, step-by-step guidance", body: "From choosing a programme to completing admission, every step is explained plainly." },
  { icon: MessagesSquare, title: "Well organised & responsive", body: "Queries get answered. The centre is known for being organised for distance learners." },
];

function Index() {
  const google = business.ratings[0];
  const [r0, r1, r2] = reviews as [(typeof reviews)[number], (typeof reviews)[number], (typeof reviews)[number]];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="bg-ledger pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-site relative grid items-center gap-14 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="animate-rise">
            <a
              href={google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-1.5 pr-4 text-sm shadow-soft transition-colors hover:border-gold"
            >
              <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                <Star className="size-3 fill-current" aria-hidden /> {google.value}
              </span>
              <span className="text-muted-foreground">
                <strong className="font-semibold text-foreground">{google.count}</strong> Google reviews
              </span>
            </a>
            <h1 className="text-display mt-7">
              Earn your degree <span className="italic-accent">without</span> pausing your life.
            </h1>
            <p className="text-lead mt-6 max-w-xl">
              The Melur study centre for Alagappa University's distance education — personal admission guidance for UG, PG and professional programmes, right on Alagar Kovil Road.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/admissions">
                  Start your admission <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello, I'd like to know about admissions.")}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> WhatsApp
                </a>
              </Button>
            </div>
            <a href={`tel:${business.phone.tel}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-maroon">
              <Phone className="size-4 text-maroon" aria-hidden /> or call {business.phone.display}
            </a>
          </div>
          <div className="px-4 sm:px-10 lg:px-0">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-label="Programmes offered" className="overflow-hidden border-y border-border bg-surface py-5">
        <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center gap-10" aria-hidden={dup === 1}>
              {programs.map((p) => (
                <li key={p.slug} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-foreground/80 sm:text-3xl">
                  {p.title}
                  <span className="size-2 rotate-45 bg-gold" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="container-site section-pad">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <SmartImage image={images.guidance} ratio="5 / 4" sizes="(min-width: 1024px) 45vw, 100vw" className="rounded-[2rem] shadow-elegant" />
            <figure className="glass absolute -bottom-8 right-4 max-w-[19rem] rounded-2xl p-5 shadow-elegant sm:right-8">
              <blockquote className="font-display text-lg leading-snug text-foreground">“{r1.quote}”</blockquote>
              <figcaption className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{r1.source}</figcaption>
            </figure>
          </Reveal>
          <div className="pt-6 lg:pt-0">
            <SectionHeading
              eyebrow="Why learners choose Melur"
              title={<>Distance learning, with someone <span className="italic-accent">beside you.</span></>}
              lead="Studying by distance shouldn't mean figuring everything out alone. These are the things learners mention most about this centre."
            />
            <ul className="mt-10 space-y-6">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 100} className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-maroon">
                    <p.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold tracking-normal">{p.title}</h3>
                    <p className="mt-1 text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="border-y border-border bg-surface">
        <div className="container-site section-pad">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Programmes" title="Seven paths. One university." lead="Admissions for undergraduate, postgraduate and professional degrees from Alagappa University's Directorate of Distance Education." />
            <Button asChild variant="line" size="xl" className="shrink-0">
              <Link to="/programmes">
                Compare all <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80} className={i === 0 ? "sm:col-span-2 lg:row-span-1" : ""}>
                <ProgramCard program={p} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="container-site section-pad">
        <SectionHeading align="center" eyebrow="How admission works" title="From first call to first class." />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block" aria-hidden />
          {admissionSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="relative">
              <span className="relative grid size-14 place-items-center rounded-full border border-border bg-background font-display text-xl text-maroon shadow-soft">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-sans text-lg font-semibold tracking-normal">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* REVIEWS */}
      <section className="relative overflow-hidden border-y border-border bg-surface">
        <div className="container-site section-pad grid gap-14 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">In learners' words</p>
            <p className="mt-6 font-display text-[clamp(5rem,12vw,9rem)] leading-[0.85] tracking-tight text-foreground">
              {google.value}
            </p>
            <div className="mt-4 flex gap-1 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-muted-foreground">Average from {google.count} Google reviews</p>
            <Button asChild variant="line" size="xl" className="mt-8">
              <Link to="/reviews">
                Read reviews <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-5">
            {[r0, r2].map((r, i) => (
              <Reveal key={i} delay={i * 120} className={i === 1 ? "lg:ml-16" : "lg:mr-16"}>
                <figure className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
                  <blockquote className="font-display text-xl leading-snug text-foreground sm:text-2xl">“{r.quote}”</blockquote>
                  <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{r.source}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="container-site section-pad pb-0">
        <SectionHeading eyebrow="Find us" title={<>In the heart of Melur, <span className="italic-accent">near Indian Bank.</span></>} />
        <Reveal className="mt-10">
          <MapCard />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
