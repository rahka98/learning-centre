import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: seo({ title: "Privacy Policy | Alagappa University Study Centre, Melur", description: "How the Melur study centre website handles your information: enquiries are sent via WhatsApp and nothing is stored on this site." }),
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <section className="container-site section-pad pt-6">
        <div className="max-w-3xl space-y-6 text-[1.02rem] leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-h3 [&_h2]:text-foreground">
          <p>This website is operated for {business.name}, {business.address.full}.</p>
          <h2>What we collect</h2>
          <p>The website does not store any personal information. When you use the enquiry form, your details are checked on your device and placed into a WhatsApp message. Nothing is sent until you press Send inside WhatsApp, and that message is then handled under WhatsApp's own privacy policy.</p>
          <h2>Device storage</h2>
          <p>We keep two small preferences in your browser: your light/dark theme choice and the time of your last enquiry (to prevent accidental duplicate messages). You can clear these at any time from your browser settings.</p>
          <h2>Third-party services</h2>
          <p>The contact pages show an embedded Google Map and load fonts from Google Fonts. These services may receive standard technical information such as your IP address.</p>
          <h2>Contact</h2>
          <p>For questions about this policy, call {business.phone.display}.</p>
        </div>
      </section>
    </>
  ),
});
