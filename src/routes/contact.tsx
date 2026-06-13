import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Voice of Kenya" },
      { name: "description", content: "Get in touch with the Voice of Kenya team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-16 max-w-2xl">
        <h1 className="font-display text-4xl font-bold">Contact</h1>
        <p className="mt-3 text-muted-foreground">
          For partnerships, press, or feedback, reach out through any of the channels below.
        </p>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <a href="mailto:hello@voiceofkenya.org" className="text-sm text-muted-foreground hover:text-primary">hello@voiceofkenya.org</a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Note: Voice of Kenya is not a government agency and cannot directly act on emergencies. For urgent
          safety or medical concerns, contact Kenyan emergency services (999/911/112).
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
