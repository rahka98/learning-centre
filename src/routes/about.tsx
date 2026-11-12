import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Gallery } from "@/components/site/Gallery";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seo({
      title: "About the Centre — Alagappa University Study Centre, Melur",
      description: "A learner growth centre in Melur, Madurai District, helping students join and complete Alagappa University distance education programmes.",
    }),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A local doorway to a <span className="italic-accent">university degree.</span></>}
        lead={`${business.name} in Melur helps learners in and around Madurai District join ${business.university.name}'s distance education programmes — with in-person guidance that makes the process simple.`}
      />
      <section className="container-site section-pad pt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SmartImage image={images.studyMaterials} ratio="4 / 3" sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-[2rem] shadow-elegant" />
        </Reveal>
        <div className="space-y-6 text-[1.05rem] leading-relaxed text-muted-foreground">
          <SectionHeading eyebrow="What we do" title="Guidance first. Paperwork second." />
          <Reveal>
            <p>
              Distance education opens a degree to anyone — working people, homemakers, those who paused their studies. But choosing a programme, checking eligibility and completing admission can feel confusing on your own.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The Melur centre exists to remove that confusion. Learners consistently describe the staff as student-friendly, easy to reach and clear in their guidance — and the centre as well organised for distance learning.
            </p>
          </Reveal>
          <Reveal>
            <a href={business.university.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-maroon hover:underline">
              Visit Alagappa University's official website <ExternalLink className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-site section-pad">
          <SectionHeading eyebrow="Gallery" title="Learning life" lead="A glimpse of what studying with the centre looks like." />
          <div className="mt-10">
            <Gallery />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
