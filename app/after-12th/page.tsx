import type { Metadata } from "next";
import { getCourse } from "@/lib/courses";
import { after12th } from "@/lib/content";
import { courseItem } from "@/lib/listing";
import { site } from "@/lib/site";
import { CtaStrip, ListingHero } from "@/components/Sections";
import CourseListing from "@/components/CourseListing";

export const metadata: Metadata = { title: "Courses After 12th" };

export default function After12thPage() {
  const groups = after12th.map((g) => ({
    id: g.stream.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: g.stream,
    items: g.courses.map((slug) => courseItem(getCourse(slug)!)),
  }));

  return (
    <>
      <ListingHero
        badge="After 12th"
        title="Job-Oriented Computer Courses"
        highlight={`After 12th in ${site.city}`}
        text="Commerce, science or arts: pick a practical course matched to your stream and start working in months, not years."
      />
      <CourseListing groups={groups} examples={`"tally", "autocad", "typing"`} />
      <CtaStrip />
    </>
  );
}
