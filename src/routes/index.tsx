import { createFileRoute } from "@tanstack/react-router";
import { IntroScene } from "@/components/presentation/IntroScene";
import { JourneyScene } from "@/components/presentation/JourneyScene";
import { SkillsScene } from "@/components/presentation/SkillsScene";
import { TimelineScene } from "@/components/presentation/TimelineScene";
import { OrbitScene } from "@/components/presentation/OrbitScene";
import { QuizScene } from "@/components/presentation/QuizScene";
import { EndingScene } from "@/components/presentation/EndingScene";
import { ProgressRail } from "@/components/presentation/ProgressRail";

const title = "My Internship Experience — Irweena";
const description =
  "A scroll-driven interactive presentation of my software testing internship: from Sarawak to Selangor, month by month.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <ProgressRail />
      <IntroScene />
      <JourneyScene />
      <SkillsScene />
      <TimelineScene />
      <OrbitScene />
      <QuizScene />
      <EndingScene />
    </main>
  );
}
