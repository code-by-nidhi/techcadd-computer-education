import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import ContactSupport from "@/components/ContactSupport";
import ContactSchedule from "@/components/ContactSchedule";
import ContactCtaForm from "@/components/ContactCtaForm";
import WhyTechcadd from "@/components/WhyTechcadd";
import ContactMap from "@/components/ContactMap";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact" title="Contact Us" text="Talk to a counsellor today — free career counselling, no registration fee." />

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
