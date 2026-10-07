import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { aboutData, getAboutEntry } from "@/lib/aboutData";
import { AboutGallery, AboutSections, AboutStats } from "@/components/AboutBlocks";
import { CtaStrip, LeadCta } from "@/components/Sections";
import TeamIntro from "@/components/TeamIntro";
import AccreditationHub from "@/components/AccreditationHub";
import FounderPage from "@/components/FounderPage";
import HeroPattern from "@/components/HeroPattern";
import ReviewsMarquee from "@/components/ReviewsMarquee";

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

// Sitewide scheme: a blue hero, then sections alternating white / blue, ending on a blue closing CTA
// (LeadCta) followed by the white CtaStrip. AboutSections marks a section dark when
// (startIndex + its index) is even, so startIndex 1 makes the first section after the hero white.
export default async function AboutSlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "story") redirect("/about");
  if (slug === "mission-vision") redirect("/about/mission-vision");

  const entry = getAboutEntry(slug);
  if (!entry) notFound();

  // The founder page has its own bespoke layout.
  if (slug === "founder") return <FounderPage />;

  const isTeam = slug === "our-team";
  const isAccreditations = slug === "accreditations-awards";

  const hero = (
    <section className="rf-hero rf-hero-short">
      <HeroPattern variant={isTeam ? "plus" : "hex"} />
      <div className="container rf-hero-inner rf-hero-split">
        <div>
          <span className="rf-pill">{entry.heroBadge}</span>
          <h1 className="rf-hero-title">
            <span>{entry.heroHeading ?? entry.subtitle}</span>
          </h1>
          <p className="rf-hero-text">{entry.heroHeading ? entry.subtitle : entry.heroDescription}</p>
        </div>
        <span
          className="hero-art"
          role="img"
          aria-label={isTeam ? "Illustration of a team standing together" : "Illustration of a certificate with a seal"}
          style={{ backgroundImage: `url(/illustrations/${isTeam ? "team" : "certificate"}.svg)` }}
        />
      </div>
    </section>
  );

  // Our Team: blue hero, white team rail, blue CTA.
  if (isTeam) {
    return (
      <>
        {hero}
        <TeamIntro />
        <LeadCta dark />
        <CtaStrip />
      </>
    );
  }

  // Accreditations: the certifications (white) come first, then the always-blue AccreditationHub,
  // then the reviews card (white) — so the page alternates without restyling the hub.
  if (isAccreditations) {
    const [certifications, ...rest] = entry.sections;
    return (
      <>
        {hero}
        <AboutSections sections={[certifications]} startIndex={1} />
        <AccreditationHub />
        <AboutSections sections={rest} startIndex={1} />
        <ReviewsMarquee />
        <LeadCta dark />
        <CtaStrip />
      </>
    );
  }

  // Everything else: sections start white; stats and gallery continue the count, and
  // the closing CTA takes whichever theme the last block didn't.
  let i = 1 + entry.sections.length;
  const statsDark = i % 2 === 0;
  if (entry.stats.length) i++;
  const galleryDark = i % 2 === 0;
  if (entry.gallery.length) i++;
  const ctaDark = i % 2 === 0;

  return (
    <>
      {hero}
      <AboutSections sections={entry.sections} startIndex={1} />
      <AboutStats stats={entry.stats} dark={statsDark} />
      <AboutGallery gallery={entry.gallery} dark={galleryDark} />
      <LeadCta dark={ctaDark} />
      <CtaStrip />
    </>
  );
}
