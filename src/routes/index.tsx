import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/home-view";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chix.dev — A software developer’s portfolio" },
      {
        name: "description",
        content:
          "Software developer in Abuja crafting games, web apps, and on-chain tools. Selected work: CreatorVerse NG, HangMan GO!, CampusPredict, Melon Jelly.",
      },
    ],
  }),
  component: HomeView,
});
