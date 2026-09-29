import type { Metadata } from "next";
import { bcSeo } from "@/lib/basicComputerData";
import BasicComputerPage from "@/components/BasicComputerPage";

// Dedicated page for this course; every other course still renders through app/internship-training/[slug].
export const metadata: Metadata = {
  title: bcSeo.title,
  description: bcSeo.description,
  alternates: { canonical: "/internship-training/basic-computer-course-in-jalandhar" },
};

export default function BasicComputerCoursePage() {
  return <BasicComputerPage />;
}
