import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ExternalLink, BookOpen, Scale, Users, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Civic Resources — Voice of Kenya" },
      { name: "description", content: "Essential resources for Kenyan citizens: constitutional rights guides, government contacts, civic organisations, and legal aid providers." },
    ],
  }),
  component: Resources,
});

const CATEGORIES = [
  {
    icon: Scale,
    heading: "Legal Aid & Rights",
    color: "#C8102E",
    items: [
      { name: "Kenya National Human Rights Commission", url: "https://www.knchr.org", desc: "File complaints about human rights violations, get free legal guidance." },
      { name: "Kituo Cha Sheria", url: "https://www.kituochasheria.or.ke", desc: "Free legal aid clinic for low-income Kenyans, covers land, labour, criminal and family law." },
      { name: "Federation of Women Lawyers Kenya (FIDA)", url: "https://www.fidakenya.org", desc: "Legal aid and advocacy for women and vulnerable groups." },
      { name: "Commission on Administrative Justice", url: "https://www.ombudsman.go.ke", desc: "Ombudsman for unfair administrative action by government agencies." },
    ],
  },
  {
    icon: Users,
    heading: "Civic & Community Organisations",
    color: "#1A5C38",
    items: [
      { name: "Kenya Human Rights Commission", url: "https://www.khrc.or.ke", desc: "Human rights documentation and advocacy across all 47 counties." },
      { name: "Mzalendo Trust", url: "https://www.mzalendo.com", desc: "Tracks performance of Members of Parliament and Senate." },
      { name: "Africa Centre for Open Governance (AfriCOG)", url: "https://africog.org", desc: "Anti-corruption and governance accountability research." },
      { name: "Transparency International Kenya", url: "https://www.tikenya.org", desc: "Corruption reporting and civic education programmes." },
    ],
  },
  {
    icon: BookOpen,
    heading: "Government & Official",
    color: "#0D5FA0",
    items: [
      { name: "Kenya Law (Official Legal Database)", url: "https://www.kenyalaw.org", desc: "Full text of all Kenyan laws, bills, case law and the Constitution." },
      { name: "Independent Electoral & Boundaries Commission", url: "https://www.iebc.or.ke", desc: "Voter registration, election information, and boundaries." },
      { name: "Ethics and Anti-Corruption Commission", url: "https://www.eacc.go.ke", desc: "Report corruption involving public officers." },
      { name: "National Environment Management Authority", url: "https://www.nema.go.ke", desc: "Report environmental violations and pollution." },
    ],
  },
  {
    icon: Phone,
    heading: "Emergency & Helplines",
    color: "#B8620A",
    items: [
      { name: "National Police Service — Emergency", url: "tel:999", desc: "999 or 112 from any phone. Available 24/7 nationwide." },
      { name: "Gender Violence Recovery Centre", url: "tel:0719638006", desc: "0719 638 006 — GBV support, free call, 24/7." },
      { name: "Child Helpline Kenya", url: "tel:116", desc: "116 — free helpline for children in distress or at risk." },
      { name: "Kenya Red Cross Disaster Response", url: "tel:1199", desc: "1199 — disaster response and humanitarian emergencies." },
    ],
  },
];

function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/40 py-14">
          <div className="container-vok max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Directory</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Civic Resources</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Essential contacts and organisations for Kenyan citizens — from legal aid to government accountability bodies.
            </p>
          </div>
        </div>

        <div className="container-vok max-w-4xl py-16 space-y-12">
          {CATEGORIES.map(({ icon: Icon, heading, color, items }) => (
            <div key={heading}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-8 grid place-items-center rounded-sm" style={{ backgroundColor: `${color}15`, color }}>
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{heading}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {items.map(({ name, url, desc }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col bg-card border border-border rounded-md p-5 hover:border-primary/40 transition-colors group">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{name}</span>
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground mt-0.5" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t border-border pt-10">
            <p className="text-muted-foreground mb-4">Found an issue in your community? Report it now.</p>
            <Link to="/report" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm font-medium">
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
