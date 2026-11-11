import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/data/content";
import { seo } from "@/lib/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: seo({
      title: "FAQ — Distance Education Admissions | AU Study Centre Melur",
      description: "Answers to common questions about Alagappa University distance education admissions at the Melur study centre: programmes, fees, documents and timings.",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title={<>Questions, <span className="italic-accent">answered.</span></>} lead="Can't find yours? Call or WhatsApp the centre." />
      <section className="container-site section-pad pt-6">
        <Reveal className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="divide-y divide-border rounded-3xl border border-border bg-card px-6 shadow-soft sm:px-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-0">
                <AccordionTrigger className="py-6 text-left font-display text-lg font-medium hover:no-underline sm:text-xl">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
