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

  // /about/our-team gets one extra dark section (TeamIntro) right after the hero — see
  // components/TeamIntro.tsx — which shifts every slot after it in the alternation by one.
  const hasTeamIntro = slug === "our-team";

  // Strict light/dark alternation continuing on from AboutSections (which always starts light,
  // right after the fixed-dark AboutHero, or slot 2 on our-team once TeamIntro takes slot 1): each
  // block below only advances the running index if it actually renders (stats/gallery can be
  // empty). The closing CTA (LeadCta/CtaStrip or CtaBanner) is deliberately excluded from this and
  // always stays light/white — same as the main /about page and the final state settled on for
  // /about/mission-vision, after briefly making it dark and then being asked to revert it.
  // AboutSections marks a section dark when (startIndex + its own index) is even — continue that
  // exact convention here (not its inverse) so the section immediately before stats/gallery is
  // never the same theme as the one after it.
  let i = (hasTeamIntro ? 1 : 0) + entry.sections.length;
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
      {hasTeamIntro && <TeamIntro />}
      <AboutSections sections={entry.sections} startIndex={hasTeamIntro ? 1 : 0} />
      <AboutStats stats={entry.stats} dark={statsDark} />
      <AboutGallery gallery={entry.gallery} dark={galleryDark} />
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
