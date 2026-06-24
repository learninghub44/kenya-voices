import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://kenya-voices.vercel.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const entries = [
          { path: "/",                    changefreq: "daily",   priority: "1.0" },
          { path: "/issues",              changefreq: "hourly",  priority: "0.9" },
          { path: "/report",              changefreq: "monthly", priority: "0.8" },
          { path: "/track",               changefreq: "monthly", priority: "0.7" },
          { path: "/how-it-works",        changefreq: "monthly", priority: "0.7" },
          { path: "/civic-rights",        changefreq: "monthly", priority: "0.7" },
          { path: "/impact",              changefreq: "monthly", priority: "0.7" },
          { path: "/faq",                 changefreq: "monthly", priority: "0.7" },
          { path: "/resources",           changefreq: "monthly", priority: "0.7" },
          { path: "/county-governments",  changefreq: "monthly", priority: "0.6" },
          { path: "/government-agencies", changefreq: "monthly", priority: "0.6" },
          { path: "/government-sectors",  changefreq: "monthly", priority: "0.6" },
          { path: "/about",               changefreq: "monthly", priority: "0.5" },
          { path: "/contact",             changefreq: "monthly", priority: "0.4" },
          { path: "/privacy",             changefreq: "yearly",  priority: "0.3" },
          { path: "/terms",               changefreq: "yearly",  priority: "0.3" },
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
