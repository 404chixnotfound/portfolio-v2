import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject } from "@/lib/content";
import { MissingWork, WorkView } from "@/components/work-view";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [
        { title: project ? `${project.title} — Chix.dev` : "Not found — Chix.dev" },
        {
          name: "description",
          content: project?.description ?? "That project isn’t on the shelf.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    if (!getProject(params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: MissingWork,
  component: WorkRoute,
});

function WorkRoute() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) return <MissingWork />;
  return <WorkView project={project} />;
}
