import type { Metadata } from "next";
import { courses, durationMonths } from "@/lib/courses";
import { courseItem, ListItem } from "@/lib/listing";
import { programDurations } from "@/lib/content";
import { site } from "@/lib/site";
import { CtaStrip, ListingHero } from "@/components/Sections";
import CourseListing from "@/components/CourseListing";

export const metadata: Metadata = { title: "Certificate Programs" };

// Programs grouped by length, like the reference site's short / mid / long-term sections.
const terms = [
  { id: "short-term", title: "Short-term Certificates (up to 2 Months)", min: 0, max: 2 },
  { id: "mid-term", title: "Mid-term Certificates (3–4 Months)", min: 2.01, max: 4 },
  { id: "diploma", title: "Diploma Programs (6–12 Months)", min: 4.01, max: Infinity },
];

// Badge text for each training format card, e.g. "45 Days" → "45D", "12 Months" → "12M".
const formatBadge = (title: string) => title.replace(/^(\d+)\s*(\w).*$/, "$1$2").toUpperCase();

export default function CertificateProgramsPage() {
  const formats: ListItem[] = programDurations.map((d) => ({
    href: "/contact",
    title: `${d.title} Training`,
    meta: d.text,
    search: `${d.title} ${d.text} training`.toLowerCase(),
    icon: { text: formatBadge(d.title), color: "#0a32b8" },
  }));

  const groups = [
    ...terms.map((t) => ({
      id: t.id,
      title: t.title,
      items: courses.filter((c) => durationMonths(c) >= t.min && durationMonths(c) <= t.max).map(courseItem),
    })),
    { id: "durations", title: "Training Formats", items: formats }, // footer links target #durations
  ];

  return (
    <>
      <ListingHero
        badge="Certificate Programs"
        title="Certificate & Diploma"
        highlight={`Programs in ${site.city}`}
        text="Choose a short-term certificate, a 3–4 month course or a 6–12 month diploma, each with practical projects, a verifiable certificate and placement support."
      />
      <CourseListing groups={groups} examples={`"diploma", "tally", "6 months"`} />
      <CtaStrip />
    </>
  );
}
