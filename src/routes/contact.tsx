import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { Mail, Phone } from "lucide-react";

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
      <main className="flex-1">
        <section className="relative border-b border-border bg-secondary/40 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-glow" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-destructive/10 blur-3xl animate-glow" />
          <div className="container-vok py-16 md:py-20 relative max-w-2xl">
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary/40" /> Get in touch
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.02]">
                Talk to <em className="not-italic text-primary">Voice of Kenya</em>
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                For partnerships, press, donations, or feedback — reach out through any of the channels below.
              </p>
            </div>
          </div>
        </section>

        <section className="container-vok py-16 max-w-2xl">
          <div className="grid gap-5">
            <a href="mailto:zetubusiness.web@gmail.com" className="group rounded-2xl border border-border bg-card p-6 shadow-card card-rise animate-rise-1 flex items-center gap-5 relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elev">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Email</div>
                <div className="mt-1 font-display text-lg md:text-xl font-bold truncate group-hover:text-primary transition-colors">zetubusiness.web@gmail.com</div>
              </div>
            </a>
            <a href="tel:+254701059192" className="group rounded-2xl border border-border bg-card p-6 shadow-card card-rise animate-rise-2 flex items-center gap-5 relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1 bg-destructive scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-destructive text-destructive-foreground shadow-elev">
                <Phone className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Call · WhatsApp · M-Pesa</div>
                <div className="mt-1 font-display text-lg md:text-xl font-bold truncate group-hover:text-destructive transition-colors">+254 701 059 192</div>
              </div>
            </a>
          </div>
          <div className="mt-10 rounded-xl border border-warning/30 bg-warning/5 p-5 text-sm text-foreground/80 animate-rise-3">
            <strong className="font-semibold">Note:</strong> Voice of Kenya is not a government agency and cannot directly act on emergencies.
            For urgent safety or medical concerns, contact Kenyan emergency services (<span className="font-mono">999 / 911 / 112</span>).
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

