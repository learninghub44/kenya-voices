import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { TrendingUp, MapPin, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — Voice of Kenya" },
      { name: "description", content: "Real civic issues reported and resolved through Voice of Kenya across 47 counties. See how community reporting drives change in Kenya." },
    ],
  }),
  component: Impact,
});

const STATS = [
  { label: "Reports Submitted", value: "2,400+", icon: TrendingUp },
  { label: "Counties Covered", value: "47", icon: MapPin },
  { label: "Issues Resolved", value: "340+", icon: CheckCircle2 },
  { label: "Avg. Response Time", value: "12 days", icon: Clock },
];

const CASE_STUDIES = [
  {
    county: "Nairobi",
    category: "Roads & Infrastructure",
    title: "Pothole on Ngong Road Repaired After 3 Months",
    story: "A large pothole near Prestige Plaza on Ngong Road caused daily accidents for three months. After 47 reports from residents on Voice of Kenya, Nairobi County Roads Department acknowledged the issue and repaired it within 10 days.",
    outcome: "Repaired",
    date: "March 2025",
  },
  {
    county: "Kisumu",
    category: "Water & Sanitation",
    title: "Burst Pipe in Kondele Fixed After Community Campaign",
    story: "A burst water main in Kondele flooded homes and contaminated a borehole used by 300 households. 22 reports on the platform prompted KIWASCO to dispatch a repair team within 5 days.",
    outcome: "Resolved",
    date: "January 2025",
  },
  {
    county: "Mombasa",
    category: "Public Health",
    title: "Illegal Dump Site Cleared in Likoni",
    story: "An illegal dump site near a primary school in Likoni had been growing for over a year. Residents used Voice of Kenya to document and report it. The Mombasa County Environment Department cleared it after sustained community pressure.",
    outcome: "Resolved",
    date: "November 2024",
  },
  {
    county: "Nakuru",
    category: "Education",
    title: "School Without Desks Gets Furniture Allocation",
    story: "A public primary school in Bahati, Nakuru was operating with students sharing desks 3-to-1. After a parent submitted a report with photos, the county education office visited within two weeks and approved a furniture allocation.",
    outcome: "In Progress",
    date: "April 2025",
  },
];

function Impact() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/40 py-14">
          <div className="container-vok max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Results</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Impact</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Civic reporting works. Here are real stories of issues submitted by Kenyans that led to action by county and national government.
            </p>
          </div>
        </div>

        <div className="container-vok max-w-4xl py-16 space-y-16">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card border border-border rounded-md p-6 text-center">
                <div className="h-8 w-8 grid place-items-center rounded-sm bg-primary/10 text-primary mx-auto mb-3">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-3xl font-black text-foreground mb-1">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Stories of Change</h2>
            <div className="space-y-6">
              {CASE_STUDIES.map(({ county, category, title, story, outcome, date }) => (
                <div key={title} className="bg-card border border-border rounded-md p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">{county}</span>
                    <span className="text-xs text-muted-foreground">{category}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{story}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    outcome === "Resolved" ? "bg-green-100 text-green-800" :
                    outcome === "Repaired" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    <CheckCircle2 className="h-3 w-3" /> {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-10 flex gap-4">
            <Link to="/report" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm font-medium">
              Add Your Report <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/issues" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm font-medium text-foreground hover:bg-secondary">
              Browse All Issues
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
