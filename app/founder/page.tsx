import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBanner, PageHero, SectionHeading } from "@/components/Sections";

export const metadata: Metadata = { title: "Founder" };

export default function FounderPage() {
  return (
    <>
      <PageHero
        crumb="Founder"
        title="Gourav Gupta"
        text={`Founder of ${site.fullName} — entrepreneur, mentor and career coach.`}
      />

      <section className="section anchor" id="about">
        <div className="container">
          <SectionHeading eyebrow="About the founder" title="From an auto rickshaw to an academy" />
          <p>
            Every successful journey begins with a dream, but only a few are built through relentless hard work,
            courage and the determination to never give up.
          </p>
          <p>
            <strong>Gourav Gupta</strong> is an entrepreneur, mentor and career coach whose life journey is a powerful
            example of resilience, self-belief and the transformative power of education. From facing financial
            challenges and driving an auto to complete his engineering education, to building an organization from the
            ground up, his story reflects a simple yet powerful belief: your circumstances may shape your beginning,
            but your determination shapes your future.
          </p>
          <p>
            Today, he is recognized for his entrepreneurial vision, commitment to skill-based education and passion for
            helping students and aspiring professionals discover their potential.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
