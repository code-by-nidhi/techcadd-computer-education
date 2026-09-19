import type { Metadata } from "next";
import { CtaBanner, FaqList, PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqPage() {
  return (
    <>
      <PageHero crumb="FAQs" title="Frequently Asked Questions" text="Everything you need to know before you enroll." />
      <section className="section">
        <div className="container narrow">
          <FaqList />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
