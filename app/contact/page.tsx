import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { site } from "@/lib/site";
import ContactSupport from "@/components/ContactSupport";
import ContactSchedule from "@/components/ContactSchedule";
import ContactCtaForm from "@/components/ContactCtaForm";
import WhyTechcadd from "@/components/WhyTechcadd";
import ContactMap from "@/components/ContactMap";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title={`Talk to a counsellor in ${site.city}`}
        text="Tell us where you are: 12th pass, mid-degree, working, or running a business. We will tell you honestly which track fits and which does not."
        className="contact-hero"
        pattern="waves"
        art={{ src: "/illustrations/contact.svg", alt: "Illustration of a phone with chat messages and a map pin" }}
      />

      <ContactSupport />

      <div className="container schedule-standalone">
        <ContactSchedule />
      </div>

      <ContactCtaForm />

      <WhyTechcadd />

      <ContactMap />
    </>
  );
}
