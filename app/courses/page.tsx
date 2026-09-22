import type { Metadata } from "next";
import { categories, coursesIn } from "@/lib/courses";
import { courseItem } from "@/lib/listing";
import { site } from "@/lib/site";
import { CtaStrip, ListingHero } from "@/components/Sections";
import CourseListing from "@/components/CourseListing";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Basic Computer & Accounting, Punjabi Typing, Civil / Mechanical CAD, Graphic Designing and Digital Marketing courses with certification and placement support.",
};

export default function CoursesPage() {
  const groups = categories.map((c) => ({ id: c.id, title: c.name, items: coursesIn(c.id).map(courseItem) }));

  return (
    <>
      <ListingHero
        badge="Courses"
        title="Computer, Accounting, CAD & Design"
        highlight={`Courses in ${site.city}`}
        text="From basic computer and Tally to AutoCAD, graphic design and digital marketing, every course is built around real office work: hands-on labs, live projects, certification and placement support."
      />
      <CourseListing groups={groups} examples={`"tally", "autocad", "marketing"`} />
      <CtaStrip />
    </>
  );
}
