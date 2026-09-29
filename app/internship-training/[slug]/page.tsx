import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categorySlug, courses, coursesIn, getCategory, getCategoryBySlug, getCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import CourseDetailTemplate, { CategoryDetailTemplate } from "@/components/CourseDetailTemplate";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // basic-computer-course-in-jalandhar has its own page
  // (app/internship-training/basic-computer-course-in-jalandhar). Category landing pages (see the
  // branch below) get their own "-courses-in-jalandhar" slug (lib/courses.ts's categorySlug) rather
  // than the bare category id, so they can never collide with a course's own slug.
  return [
    ...courses.filter((c) => c.slug !== "basic-computer-course-in-jalandhar").map((c) => ({ slug: c.slug })),
    ...categories.map((c) => ({ slug: categorySlug(c.id) })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (course) {
    const title = `${course.title} Course in Punjab | ${site.name}`;
    return {
      title,
      description: course.summary,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title, description: course.summary, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  const cat = getCategoryBySlug(slug);
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
    const cat = getCategory(course.category);
    const related = coursesIn(course.category).filter((c) => c.slug !== course.slug).slice(0, 3);
    return <CourseDetailTemplate course={course} cat={cat} related={related} />;
  }
  const cat = getCategoryBySlug(slug);
  if (cat) return <CategoryDetailTemplate cat={cat} courses={coursesIn(cat.id)} />;
  notFound();
}
