import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ClipboardList, Search, Bell, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Voice of Kenya" },
      { name: "description", content: "Learn how to report a civic issue, get a tracking code, and follow up on resolution through Voice of Kenya." },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Submit Your Report",
    body: "Fill in the report form with your county, the issue category, a clear description, and optionally a photo. No account or login required — takes under 2 minutes.",
  },
  {
    icon: Bell,
    step: "02",
    title: "Receive a Tracking Code",
    body: "Once submitted, you receive a unique tracking code. Save it — this is how you check the status of your report at any time.",
  },
  {
    icon: Search,
    step: "03",
    title: "Track Progress",
    body: "Use your code on the Track page to see if your report has been acknowledged, is under review, or has been resolved by the relevant authority.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Resolution & Accountability",
    body: "Reports are visible to the public and relevant county or government agencies. Community pressure and transparency drive action.",
  },
];

const FAQS = [
  { q: "Do I need to create an account?", a: "No. You can submit a report and track it using only your tracking code. We built it this way to lower the barrier for every Kenyan." },
  { q: "What kinds of issues can I report?", a: "Anything affecting your community — roads, water, electricity, garbage, public health, education, security, or government service failures." },
  { q: "Is my identity kept private?", a: "Yes. We do not display your name or contact details publicly. Only the issue details and location are shown." },
  { q: "What happens after I report?", a: "Your report is published publicly and tagged to the relevant county and sector. We notify partner agencies where applicable." },
  { q: "Can I report on behalf of someone else?", a: "Yes. Community leaders, journalists, and NGOs frequently submit reports on behalf of residents." },
];

function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/40 py-14">
          <div className="container-vok max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Reporting a civic issue takes less than 2 minutes. Here's exactly what happens from submission to resolution.
            </p>
          </div>
        </div>

        <div className="container-vok max-w-3xl py-16 space-y-16">
          <div className="space-y-4">
            {STEPS.map(({ icon: Icon, step, title, body }) => (
              <div key={step} className="flex gap-6 bg-card border border-border rounded-md p-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="inline-grid h-10 w-10 place-items-center rounded-sm bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-border">{step}</span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="divide-y divide-border border border-border rounded-md">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="p-6">
                  <h3 className="font-bold text-foreground mb-2">{q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-10 flex gap-4 flex-wrap">
            <Link to="/report" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm font-medium">
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/track" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm font-medium text-foreground hover:bg-secondary">
              Track a Report
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
