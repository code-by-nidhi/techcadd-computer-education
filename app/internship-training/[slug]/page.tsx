import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categorySlug, courses, coursesIn, getCategory, getCategoryBySlug, getCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import CourseDetailTemplate, { CategoryDetailTemplate } from "@/components/CourseDetailTemplate";
import CoursePage from "@/components/CoursePage";
import { getCourseDetail } from "@/lib/courseDetails";
import { getProgramDetail } from "@/lib/programDetails";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Category landing pages (see the branch below) get their own "-courses-in-jalandhar" slug
  // (lib/courses.ts's categorySlug) rather than the bare category id, so they can never collide
  // with a course's own slug.
  return [...courses.map((c) => ({ slug: c.slug })), ...categories.map((c) => ({ slug: categorySlug(c.id) }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (course) {
    // Courses with a full detail entry (lib/courseDetails) use its SEO copy.
    const detail = getCourseDetail(slug);
    const title = detail?.seo.title ?? `${course.title} Course in Punjab | ${site.name}`;
    const description = detail?.seo.description ?? course.summary;
    return {
      title,
      description,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title, description, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  const cat = getCategoryBySlug(slug);
  const program = getProgramDetail(slug);
  if (cat && program) {
    return {
      title: program.seo.title,
      description: program.seo.description,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title: program.seo.title, description: program.seo.description, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  if (cat) {
    return {
      title: `${cat.name} Courses`,
      description: cat.blurb,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title: `${cat.name} Courses`, description: cat.blurb, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  return {};
}

export default async function InternshipTrainingPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (course) {
    // The full course page (components/CoursePage.tsx) for every course with a detail entry;
    // CourseDetailTemplate stays as the fallback for any course added without one.
    const detail = getCourseDetail(slug);
    if (detail) return <CoursePage d={detail} />;
    const cat = getCategory(course.category);
    const related = coursesIn(course.category).filter((c) => c.slug !== course.slug).slice(0, 3);
    return <CourseDetailTemplate course={course} cat={cat} related={related} />;
  }
  const cat = getCategoryBySlug(slug);
  // Certificate program categories get the full program page; any other category (Punjabi Typing)
  // keeps the simple category landing.
  const program = getProgramDetail(slug);
  if (cat && program) return <CoursePage d={program} />;
  if (cat) return <CategoryDetailTemplate cat={cat} courses={coursesIn(cat.id)} />;
  notFound();
}
