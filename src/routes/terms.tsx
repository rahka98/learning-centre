import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: seo({ title: "Terms of Use | Alagappa University Study Centre, Melur", description: "Terms for using the Alagappa University Study Centre, Melur website and its programme information." }),
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" />
      <section className="container-site section-pad pt-6">
        <div className="max-w-3xl space-y-6 text-[1.02rem] leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-h3 [&_h2]:text-foreground">
          <h2>Information on this site</h2>
          <p>Programme information is provided as general guidance. Admissions, eligibility, fees, syllabi, examinations and degrees are governed by {business.university.name} and may change. Always confirm current details with the centre or the university before making decisions.</p>
          <h2>Images</h2>
          <p>Some photographs on this website are representative images and do not show the centre or its learners.</p>
          <h2>External links</h2>
          <p>Links to Google Maps, WhatsApp, Instagram and the university website open services we don't control.</p>
          <h2>Contact</h2>
          <p>{business.name}, {business.address.full}. Phone {business.phone.display}.</p>
        </div>
      </section>
    </>
  ),
});
