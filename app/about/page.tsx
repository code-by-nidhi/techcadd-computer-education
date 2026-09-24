import type { Metadata } from "next";
import { aboutData } from "@/lib/aboutData";
import StoryPage from "@/components/StoryPage";

export const metadata: Metadata = {
  title: aboutData.story.seo.title,
  description: aboutData.story.seo.description,
};

export default function AboutPage() {
  return <StoryPage />;
}
