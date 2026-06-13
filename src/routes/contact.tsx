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
        <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Get in touch</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Contact</h1>
        <p className="mt-3 text-muted-foreground">
          For partnerships, press, donations, or feedback, reach out through any of the channels below.
        </p>
        <div className="mt-8 grid gap-4">
          <a href="mailto:zetubusiness.web@gmail.com" className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elev transition flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</div>
              <div className="font-display text-lg font-bold truncate">zetubusiness.web@gmail.com</div>
            </div>
          </a>
          <a href="tel:+254701059192" className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elev transition flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-destructive text-destructive-foreground">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Call · WhatsApp · M-Pesa</div>
              <div className="font-display text-lg font-bold truncate">+254 701 059 192</div>
            </div>
          </a>
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
