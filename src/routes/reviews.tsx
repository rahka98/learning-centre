import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { RatingSummary } from "@/components/site/RatingSummary";
import { ReviewCards } from "@/components/site/ReviewCards";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: seo({
      title: "Reviews — 4.9★ from 221 Google Reviews | AU Study Centre Melur",
      description: "What learners say about the Alagappa University Study Centre in Melur: student-friendly staff, clear guidance and well-organised distance education support.",
    }),
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title={<>Trusted by learners <span className="italic-accent">across Melur.</span></>} lead="Ratings and excerpts from the centre's public listings. Read every review on Google." />
      <section className="container-site section-pad pt-10 space-y-14">
        <Reveal>
          <RatingSummary />
        </Reveal>
        <ReviewCards />
        <Reveal className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <a href={business.maps.reviews} target="_blank" rel="noopener noreferrer">
              Read all Google reviews <ExternalLink />
            </a>
          </Button>
          <Button asChild variant="line" size="xl">
            <a href={business.maps.place} target="_blank" rel="noopener noreferrer">Write a review on Google</a>
          </Button>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
