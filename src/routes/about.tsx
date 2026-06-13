import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import wildlife from "@/assets/kilimanjaro-elephants.jpg";

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
      <main className="flex-1">
        <div className="relative h-[60vh] min-h-[420px] md:h-[70vh] overflow-hidden">
          <img
            src={wildlife}
            alt="Elephants grazing in front of Mount Kilimanjaro"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.85) 100%)" }} />
          <div className="container-vok relative h-full flex flex-col justify-end pb-12 md:pb-16 text-white">
            <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/80">About · Sauti ya Wananchi</div>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
              A digital voice for <em className="not-italic text-[oklch(0.78_0.16_245)]">every Kenyan.</em>
            </h1>
            <p className="mt-4 max-w-xl text-white/85 text-base md:text-lg">
              From Mount Kilimanjaro to Lake Turkana — one platform, 47 counties, every story heard.
            </p>
          </div>
        </div>
        <div className="container-vok py-12 max-w-3xl">
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
          <Link to="/report" className="mt-10 inline-flex h-12 items-center rounded-xl bg-primary px-7 font-semibold text-primary-foreground">
            Report your first issue
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
