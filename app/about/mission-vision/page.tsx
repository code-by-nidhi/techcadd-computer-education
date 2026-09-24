import type { Metadata } from "next";
import { missionVisionSeo } from "@/lib/missionVisionData";
import MissionVisionPage from "@/components/MissionVisionPage";

export const metadata: Metadata = {
  title: missionVisionSeo.title,
  description: missionVisionSeo.description,
};

export default function AboutMissionVisionPage() {
  return <MissionVisionPage />;
}
