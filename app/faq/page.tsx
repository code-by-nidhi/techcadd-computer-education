import type { Metadata } from "next";
import { CtaStrip, FaqList, LeadCta, PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqPage() {
  return (
    <>
      <PageHero pattern="hatch" art={{ src: "/illustrations/faq.svg", alt: "Illustration of question and answer cards" }} crumb="FAQs" title="Frequently Asked Questions" text="Everything you need to know before you enroll." />
      <section className="section">
        <div className="container narrow">
          <FaqList />
        </div>
      </section>
      <LeadCta dark />
      <CtaStrip />
    </>
  );
}
