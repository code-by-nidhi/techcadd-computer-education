import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categorySlug, certificateCategoryIds, coursesIn, getCategoryBySlug } from "@/lib/courses";
import { courseItem } from "@/lib/listing";
import { site } from "@/lib/site";
import { CtaStrip, ListingHero } from "@/components/Sections";
import CourseListing from "@/components/CourseListing";

type Props = { params: Promise<{ slug: string }> };

// One course listing page per Certificate Programs menu card (components/CertificateProgramsMenu.tsx):
// the category's courses as cards, each opening its own course page at /courses/[slug].
const getCertificateCategory = (slug: string) => {
  const cat = getCategoryBySlug(slug);
  return cat && certificateCategoryIds.includes(cat.id) ? cat : undefined;
};

export function generateStaticParams() {
  return certificateCategoryIds.map((id) => ({ slug: categorySlug(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCertificateCategory(slug);
  if (!cat) return {};
  const title = `${cat.name} Certificate Courses in ${site.city}`;
  return {
    title,
    description: cat.blurb,
    alternates: { canonical: `/certificate-programs/${slug}` },
    openGraph: { title, description: cat.blurb, url: `/certificate-programs/${slug}`, type: "website" },
  };
}

export default async function CertificateCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCertificateCategory(slug);
  if (!cat) notFound();
  const groups = [{ id: cat.id, title: `${cat.name} Courses`, items: coursesIn(cat.id).map((c) => courseItem(c)) }];

  return (
    <>
      <ListingHero
        pattern="diamond"
        badge="Certificate Programs"
        title={cat.name}
        highlight={`Courses in ${site.city}`}
        text={`${cat.blurb}. Pick a course below to see its syllabus, duration and fees.`}
      />
      <CourseListing groups={groups} examples={`"${coursesIn(cat.id)[0].title}"`} />
      <CtaStrip />
    </>
  );
}
