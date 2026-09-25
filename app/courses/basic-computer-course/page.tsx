import type { Metadata } from "next";
import { bcSeo } from "@/lib/basicComputerData";
import BasicComputerPage from "@/components/BasicComputerPage";

// Dedicated page for this course; every other course still renders through app/courses/[slug].
export const metadata: Metadata = {
  title: bcSeo.title,
  description: bcSeo.description,
};

export default function BasicComputerCoursePage() {
  return <BasicComputerPage />;
}
