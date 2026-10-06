import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coursesIn, getCategory, getCourse } from "@/lib/courses";
import { after12th } from "@/lib/content";
import { site } from "@/lib/site";
import CourseDetailTemplate from "@/components/CourseDetailTemplate";
import CoursePage from "@/components/CoursePage";
import { getCourseDetail } from "@/lib/courseDetails";

type Props = { params: Promise<{ slug: string }> };

// Only the courses listed on the After 12th page (lib/content.ts's after12th) exist under this
// path; every other course stays at /courses/[slug] only.
const slugs = new Set(after12th.flatMap((g) => g.courses));

export function generateStaticParams() {
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = slugs.has(slug) ? getCourse(slug) : undefined;
  if (!course) return {};
  const detail = getCourseDetail(slug);
  const title = detail?.seo.title ?? `${course.title} Course in Punjab | ${site.name}`;
  const description = detail?.seo.description ?? course.summary;
  return {
    title,
    description,
    // Same page as /courses/[slug], so that stays the canonical URL to avoid duplicate content.
    alternates: { canonical: `/courses/${slug}` },
    openGraph: { title, description, url: `/after-12th-course/${slug}`, type: "website" },
  };
}

export default async function After12thCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = slugs.has(slug) ? getCourse(slug) : undefined;
  if (!course) notFound();
  const detail = getCourseDetail(slug);
  if (detail) return <CoursePage d={detail} />;
  const cat = getCategory(course.category);
  const related = coursesIn(course.category).filter((c) => c.slug !== course.slug).slice(0, 3);
  return <CourseDetailTemplate course={course} cat={cat} related={related} />;
}
