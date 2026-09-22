import { Course, CategoryId, getCategory } from "@/lib/courses";

// Compact course cards used on the Courses, Certificate Programs and After 12th pages.
export type ListItem = {
  href: string;
  title: string;
  meta: string;
  search: string; // lower-case text the search box matches against
  icon: { logo?: string; text: string; color: string };
};

export type ListGroup = { id: string; title: string; items: ListItem[] };

// Accent colour per track, used for the initials badge (tinted background + coloured text).
const trackColors: Record<CategoryId, string> = {
  "basic-accounting": "#0a32b8", // --brand
  "punjabi-typing": "#ea580c",
  "civil-mechanical": "#dc2626",
  "graphic-design": "#db2777",
  "digital-marketing": "#16a34a",
};

// Courses that have a real software logo in public/logos.
const logos: Record<string, string> = {
  "basic-computer-course": "word",
  "ms-office-advanced-excel": "excel",
  "tally-prime-gst": "tally",
  autocad: "autocad",
  solidworks: "solidworks",
  "adobe-photoshop": "photoshop",
  coreldraw: "coreldraw",
};

const SKIP = new Set(["&", "and", "with", "in", "of", "the", "for"]);

// "Diploma in Computer Applications (DCA)" → "DCA"; "Tally Prime with GST" → "TP".
function initials(title: string) {
  const abbr = title.match(/\(([A-Z]{2,4})\)/);
  if (abbr) return abbr[1];
  return title
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => w && !SKIP.has(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function courseItem(course: Course): ListItem {
  const cat = getCategory(course.category);
  return {
    href: `/courses/${course.slug}`,
    title: course.title,
    meta: `${course.duration} · Live projects`,
    search: [course.title, cat.name, ...course.tools].join(" ").toLowerCase(),
    icon: {
      logo: logos[course.slug],
      text: course.category === "punjabi-typing" ? "ਪ" : initials(course.title),
      color: trackColors[course.category],
    },
  };
}
