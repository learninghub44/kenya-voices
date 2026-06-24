import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { Scale, FileText, Users, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/civic-rights")({
  head: () => ({
    meta: [
      { title: "Know Your Civic Rights — Voice of Kenya" },
      { name: "description", content: "Learn about your constitutional rights as a Kenyan citizen — from the right to petition government to access to information and public participation." },
    ],
  }),
  component: CivicRights,
});

const RIGHTS = [
  {
    icon: FileText,
    title: "Right to Access Information",
    article: "Article 35",
    body: "Every citizen has the right to access information held by the State or any person required to provide information for the exercise or protection of any right or fundamental freedom. The government must publish and publicise any important information affecting the nation.",
  },
  {
    icon: Users,
    title: "Right to Public Participation",
    article: "Article 10 & 118",
    body: "Public participation is a national value. All state organs and all public officers must apply it when making or implementing public policy decisions. Parliament and county assemblies must also facilitate public participation and county assemblies must ensure legislation and other matters are considered in an open and transparent manner.",
  },
  {
    icon: Scale,
    title: "Right to Petition Government",
    article: "Article 37",
    body: "Every person has the right, peaceably and unarmed, to assemble, to demonstrate, to picket, and to present petitions to public authorities. You can submit formal petitions to Parliament, county assemblies, and any government body on any matter of public interest.",
  },
  {
    icon: ShieldCheck,
    title: "Right to a Clean Environment",
    article: "Article 42",
    body: "Every person has the right to a clean and healthy environment, which includes the right to have the environment protected for the benefit of present and future generations through legislative and other measures. You can report environmental violations.",
  },
  {
    icon: FileText,
    title: "Right to Fair Administrative Action",
    article: "Article 47",
    body: "Every person has the right to administrative action that is expeditious, efficient, lawful, reasonable and procedurally fair. If a right or fundamental freedom of a person has been or is likely to be adversely affected by administrative action, the person has the right to be given written reasons.",
  },
];

const RESOURCES = [
  { title: "Constitution of Kenya 2010", url: "https://www.kenyalaw.org/kl/index.php?id=398", desc: "Full text of the constitution" },
  { title: "Kenya National Commission on Human Rights", url: "https://www.knchr.org", desc: "File complaints about rights violations" },
  { title: "Commission on Administrative Justice", url: "https://www.ombudsman.go.ke", desc: "Ombudsman — administrative injustice" },
  { title: "Kenya Law Reform Commission", url: "https://www.klrc.go.ke", desc: "Proposed laws and public participation" },
];

function CivicRights() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/40 py-14">
          <div className="container-vok max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Know Your Rights</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Civic Rights of Every Kenyan</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The Constitution of Kenya 2010 guarantees you powerful rights to hold the government accountable. Here are the most important ones for civic action.
            </p>
          </div>
        </div>

        <div className="container-vok max-w-3xl py-16 space-y-12">
          <div className="space-y-6">
            {RIGHTS.map(({ icon: Icon, title, article, body }) => (
              <div key={title} className="bg-card border border-border rounded-md p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 grid place-items-center rounded-sm bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
                      <span className="text-xs font-mono bg-secondary text-muted-foreground px-2 py-0.5 rounded">{article}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Useful Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {RESOURCES.map(({ title, url, desc }) => (
                <a key={title} href={url} target="_blank" rel="noopener noreferrer"
                  className="block bg-card border border-border rounded-md p-5 hover:border-primary/50 transition-colors">
                  <p className="font-semibold text-foreground mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-10">
            <p className="text-muted-foreground mb-4">Ready to exercise your rights? Report an issue affecting your community.</p>
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
