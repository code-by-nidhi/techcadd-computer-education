import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { aboutData, getAboutEntry } from "@/lib/aboutData";
import { AboutGallery, AboutHero, AboutSections, AboutStats } from "@/components/AboutBlocks";
import { CtaBanner, CtaStrip, LeadCta } from "@/components/Sections";

type Props = { params: Promise<{ slug: string }> };

// "story" lives at the bare /about (see app/about/page.tsx) and "mission-vision" has its own dedicated
// route (see app/about/mission-vision/page.tsx) — every other entry gets this generic /about/[slug].
export function generateStaticParams() {
  return Object.values(aboutData)
    .filter((item) => item.slug !== "story" && item.slug !== "mission-vision")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getAboutEntry((await params).slug);
  if (!entry) return {};
  return { title: entry.seo.title, description: entry.seo.description };
}

export default async function AboutSlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "story") redirect("/about");
  if (slug === "mission-vision") redirect("/about/mission-vision");

  const entry = getAboutEntry(slug);
  if (!entry) notFound();

  return (
    <>
      <AboutHero
        data={entry}
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: entry.title }]}
      />
      <AboutSections sections={entry.sections} />
      <AboutStats stats={entry.stats} />
      <AboutGallery gallery={entry.gallery} />
      {entry.finalCta === "lead" ? (
        <>
          <LeadCta />
          <CtaStrip />
        </>
      ) : (
        <CtaBanner />
      )}
    </>
  );
}
