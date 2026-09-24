import type { Metadata } from "next";
import Link from "next/link";
import { aboutData } from "@/lib/aboutData";
import { AboutGallery, AboutHero, AboutSections, AboutStats } from "@/components/AboutBlocks";
import { CtaBanner } from "@/components/Sections";

const entry = aboutData.story;

export const metadata: Metadata = { title: entry.seo.title, description: entry.seo.description };

export default function AboutPage() {
  return (
    <>
      <AboutHero data={entry} crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <div className="container about-founder-note">
        <Link href="/about/founder" className="link-arrow">
          Meet our founder, Gourav Gupta →
        </Link>
      </div>
      <AboutSections sections={entry.sections} />
      <AboutStats stats={entry.stats} />
      <AboutGallery gallery={entry.gallery} />
      <CtaBanner />
    </>
  );
}
