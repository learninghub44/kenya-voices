import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Voice of Kenya" },
      { name: "description", content: "Voice of Kenya is an independent civic reporting platform empowering Kenyans to report issues across all 47 counties." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-16 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold leading-tight">
          A digital voice for every Kenyan.
        </h1>
        <div className="mt-8 prose prose-neutral max-w-none text-foreground">
          <p className="text-lg text-muted-foreground">
            Voice of Kenya (Sauti ya Wananchi) is an independently owned, community-supported
            platform that empowers citizens to report local issues, track resolution, and contribute
            toward accountability across all 47 counties.
          </p>
          <h2 className="font-display text-2xl font-bold mt-10">Our Vision</h2>
          <p>To become Kenya's largest citizen-powered platform for transparency, accountability, and civic participation.</p>
          <h2 className="font-display text-2xl font-bold mt-8">Our Mission</h2>
          <p>To give every Kenyan a digital voice capable of highlighting local challenges and driving meaningful action.</p>
          <h2 className="font-display text-2xl font-bold mt-8">Core Principles</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>No registration required.</strong> Citizens can report in minutes.</li>
            <li><strong>Independent.</strong> Not affiliated with any government agency.</li>
            <li><strong>Transparent.</strong> Every report receives a unique tracking code.</li>
            <li><strong>Community-supported.</strong> Funded by citizens, donors, and partners.</li>
          </ul>
        </div>
        <Link to="/report" className="mt-10 inline-flex h-12 items-center rounded-xl bg-primary px-7 font-semibold text-primary-foreground">
          Report your first issue
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
