import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/google0141b0c34fc1499e.html")({
  server: {
    handlers: {
      GET: async () => {
        return new Response("google-site-verification: google0141b0c34fc1499e.html", {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});
