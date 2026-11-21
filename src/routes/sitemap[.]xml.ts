import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const origin = new URL(request.url).origin;
        const paths = ["/", ...PROJECTS.map((project) => `/work/${project.slug}`)];
        const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
