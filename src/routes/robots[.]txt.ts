import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const content = `User-agent: *
Allow: /

Disallow: /admin/

Sitemap: https://kenya-voices.vercel.app/sitemap.xml`;
        return new Response(content, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
