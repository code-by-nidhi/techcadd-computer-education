import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { aboutData, getAboutEntry } from "@/lib/aboutData";
import { AboutGallery, AboutHero, AboutSections, AboutStats } from "@/components/AboutBlocks";
import { CtaBanner, CtaStrip, LeadCta } from "@/components/Sections";
import TeamIntro from "@/components/TeamIntro";

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

  // /about/our-team gets TeamIntro (always dark, its own design) right after the hero, then a mid-page
  // LeadCta + CtaStrip pair right after that — see components/TeamIntro.tsx. Together these take up
  // slots 1-3 in the alternation (TeamIntro=1/dark, the LeadCta+CtaStrip pair naturally renders light
  // and is treated as one exempt unit, same as everywhere else this pair is used — see the note
  // below), so everything after them shifts by 2 slots instead of TeamIntro's 1.
  const hasTeamIntro = slug === "our-team";
  const aboutSectionsOffset = hasTeamIntro ? 2 : 0;

  // Strict light/dark alternation continuing on from AboutSections (which always starts light,
  // right after the fixed-dark AboutHero, or 2 slots later on our-team): each block below only
  // advances the running index if it actually renders (stats/gallery can be empty). The closing CTA
  // (LeadCta/CtaStrip or CtaBanner) is deliberately excluded from this and always stays light/white
  // — same as the main /about page and the final state settled on for /about/mission-vision, after
  // briefly making it dark and then being asked to revert it.
  // AboutSections marks a section dark when (startIndex + its own index) is even — continue that
  // exact convention here (not its inverse) so the section immediately before stats/gallery is
  // never the same theme as the one after it.
  let i = aboutSectionsOffset + entry.sections.length;
  const statsDark = i % 2 === 0;
  if (entry.stats.length) i++;
  const galleryDark = i % 2 === 0;
  if (entry.gallery.length) i++;

  return (
    <>
      <AboutHero
        data={entry}
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: entry.title }]}
      />
      {hasTeamIntro && (
        <>
          <TeamIntro />
          <LeadCta />
          <CtaStrip />
        </>
      )}
      <AboutSections sections={entry.sections} startIndex={aboutSectionsOffset} />
      <AboutStats stats={entry.stats} dark={statsDark} />
      <AboutGallery gallery={entry.gallery} dark={galleryDark} />
      {/* our-team already got its closing LeadCta/CtaStrip pair right after TeamIntro above —
          skip the generic finalCta block entirely instead of rendering a second closing CTA. */}
      {!hasTeamIntro &&
        (entry.finalCta === "lead" ? (
          <>
            <LeadCta />
            <CtaStrip />
          </>
        ) : (
          <CtaBanner />
        ))}
    </>
  );
}
