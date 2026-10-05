import type { CategoryId } from "../courses";

// Shape of one course detail page (components/CoursePage.tsx, rendered by app/courses/[slug]).
// Every course fills in the same sections, so all course pages share one layout; only the copy,
// logos and numbers differ. Data files: lib/courseDetails/<category>.ts, collected in ./index.ts.

// Logo files that exist in /public/logos — tools without one use `mono` (a 1–4 letter monogram).
export type LogoFile =
  | "autocad.png"
  | "autodesk.svg"
  | "canva.svg"
  | "catia.svg"
  | "coreldraw.png"
  | "excel.png"
  | "google-ads.svg"
  | "google-analytics.svg"
  | "google-workspace.svg"
  | "illustrator.svg"
  | "indesign.svg"
  | "meta.svg"
  | "outlook.svg"
  | "photoshop.png"
  | "powerpoint.svg"
  | "punjabi.png"
  | "revit.svg"
  | "search-console.svg"
  | "semrush.svg"
  | "solidworks.png"
  | "tally.png"
  | "windows.svg"
  | "word.png"
  | "wordpress.svg";

// Course photos in /public/courses, used in the Overview section.
export type CourseImage =
  | "3ds-max.webp"
  | "autocad.webp"
  | "basic-computer.webp"
  | "digital-marketing.webp"
  | "graphic-design.webp"
  | "ms-office-excel.webp"
  | "punjabi-typing.webp"
  | "tally-gst.webp";

// Audience card icons (drawn in components/CoursePage.tsx).
export type AudienceIcon =
  | "student"
  | "grad"
  | "job"
  | "home"
  | "shop"
  | "senior"
  | "engineer"
  | "design"
  | "chart"
  | "office"
  | "freelance"
  | "govt";

// A hub node around the hero monitor: an app logo, or a single emoji/character icon.
export type HubNode = { logo: LogoFile } | { icon: string };

export type CourseDetail = {
  slug: string; // must match lib/courses.ts
  seo: { title: string; description: string };
  hero: {
    crumb: string; // short name for the breadcrumb, e.g. "Tally Prime"
    tag: string; // first badge, e.g. "Tally Prime"
    badge: string; // gold badge, e.g. "GST Ready"
    title: string; // e.g. "Best Tally Prime with GST Course in Jalandhar"
    text: string;
    points: string[]; // exactly 4 short chips
    facts: { label: string; value: string }[]; // exactly 4: Duration, Mode, Eligibility, Includes
    stats: { value: string; label: string; note: string }[]; // exactly 3
    hub: { center: LogoFile; nodes: HubNode[] }; // exactly 8 nodes; the last 2 should be icons
  };
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[]; // 3 paragraphs
    image: CourseImage;
    imageAlt: string;
    imageTag: string;
    getList: string[]; // 5 items
    miniStats: { value: string; label: string }[]; // exactly 4
  };
  audience: {
    eyebrow: string;
    title: string;
    text: string;
    items: { icon: AudienceIcon; title: string; text: string }[]; // exactly 6
  };
  case: {
    eyebrow: string;
    title: string;
    feature: { tag: string; title: string; text: string; slots: string[] };
    cards: { tag: string; title: string; text: string }[]; // exactly 4
  };
  whyNow: {
    eyebrow: string;
    title: string;
    points: string[]; // 3
    panel: { k: string; v: string }[]; // exactly 4 rows
  };
  syllabus: {
    eyebrow: string;
    title: string;
    text: string;
    phases: { id: string; name: string; weeks: string; summary: string; topics: string[]; outcome: string }[];
  };
  tools: {
    eyebrow: string;
    title: string;
    text: string;
    tools: ({ name: string; use: string } & ({ logo: LogoFile } | { mono: string }))[]; // 4–7
  };
  certificate: {
    eyebrow: string;
    title: string;
    text: string;
    courseName: string; // printed on the certificate mock-up
    items: { title: string; text: string }[]; // exactly 4
  };
  careers: {
    eyebrow: string;
    title: string;
    text: string;
    roles: { title: string; pay: string; text: string }[]; // exactly 4, pay like "₹12k – 20k" (per month)
    hiring: string[]; // 5–6
    qa: { q: string; a: string }[]; // exactly 4
  };
  projects: {
    eyebrow: string;
    title: string;
    text: string;
    items: { n: string; title: string; text: string; tags: string[] }[]; // exactly 4
  };
  loop: {
    eyebrow: string;
    title: string;
    text: string;
    steps: { title: string; text: string; example: string }[]; // exactly 3
  };
  why: {
    eyebrow: string;
    title: string;
    text: string;
    items: { title: string; text: string }[]; // exactly 6
  };
  compare: {
    eyebrow: string;
    title: string;
    text: string;
    rows: { feature: string; us: string; them: string }[]; // 7–8
    note: string;
  };
  // Placeholder reviews until real Google reviews are added (TODO before going live).
  reviews: { name: string; role: string; text: string }[]; // exactly 6
  faqs: { q: string; a: string }[]; // 6–8
  // Certificate program pages only (lib/programDetails): the category landing pages at
  // /courses/<category>-courses-in-jalandhar. Adds the "choose your track" cards under
  // the hero, learning modes, the "right fit?" banner and related courses (see CoursePage.tsx).
  program?: ProgramExtras;
};

export type ProgramExtras = {
  category: CategoryId;
  // Course slug whose fee tiers in lib/referenceContent.ts (real fees from techcadd's live site)
  // price the tracks; a track whose duration has no matching tier shows "ask a counsellor".
  feeSource: string;
  tracksTitle: string; // e.g. "Choose your Digital Marketing track"
  tracksText: string;
  tracks: { kind: string; duration: string; text: string }[]; // exactly 3: "3 Months", "6 Months", "9 Months"
  fit: { title: string; text: string }; // "Not sure if … is the right fit?" banner
};
