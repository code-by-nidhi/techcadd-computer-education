import type { CourseDetail } from "../courseDetails/types";
import { basicAccountingProgram } from "./basic-accounting";
import { civilMechanicalProgram } from "./civil-mechanical";
import { graphicDesignProgram } from "./graphic-design";
import { digitalMarketingProgram } from "./digital-marketing";

// Certificate program pages — the category landing pages at /courses/<categorySlug>
// for the four categories in the Certificate Programs menu (components/CertificateProgramsMenu.tsx).
// Same shape as a course detail plus `program` (tracks, fit banner); rendered by CoursePage.tsx.
const all: CourseDetail[] = [basicAccountingProgram, civilMechanicalProgram, graphicDesignProgram, digitalMarketingProgram];

export const programDetails = new Map(all.map((d) => [d.slug, d]));
export const getProgramDetail = (slug: string) => programDetails.get(slug);
