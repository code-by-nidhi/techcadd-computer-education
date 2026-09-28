import type { CourseDetail } from "./types";
import { basicAccounting } from "./basic-accounting";
import { office } from "./office";
import { accounting } from "./accounting";
import { typing } from "./typing";
import { civilMechanical } from "./civil-mechanical";
import { digitalMarketing } from "./digital-marketing";
import { graphicDesign } from "./graphic-design";

export type { CourseDetail } from "./types";

// Every course detail page, keyed by slug (see app/courses/[slug]/page.tsx). Each category file holds
// the full copy for its courses; a course missing here falls back to the simple layout.
const all: CourseDetail[] = [
  ...basicAccounting,
  ...office,
  ...accounting,
  ...typing,
  ...civilMechanical,
  ...digitalMarketing,
  ...graphicDesign,
];

export const courseDetails = new Map(all.map((d) => [d.slug, d]));
export const getCourseDetail = (slug: string) => courseDetails.get(slug);
