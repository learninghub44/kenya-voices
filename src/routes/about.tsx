import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ArrowRight, Eye, Target, ShieldCheck, Users, Zap } from "lucide-react";
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

        {/* Hero */}
        <div className="relative h-[60vh] min-h-[420px] md:h-[68vh] overflow-hidden">
          <img
            src={wildlife}
            alt="Elephants grazing in front of Mount Kilimanjaro"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,15,20,0.2) 0%, rgba(13,15,20,0.4) 40%, rgba(13,15,20,0.92) 100%)" }} />
          {/* Left red stripe */}
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[#C8102E] opacity-60" />

          <div className="container-vok relative h-full flex flex-col justify-end pb-14 md:pb-18 text-[#F5F0E8]">
            <div className="eyebrow animate-fade" style={{ color: "#E87080" }}>
              About · Sauti ya Wananchi
            </div>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.04] max-w-3xl animate-rise">
              A digital voice for <span style={{ color: "#C8102E" }}>every Kenyan.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[#F5F0E8]/75 text-base md:text-lg leading-relaxed animate-rise-1">
              From Mount Kilimanjaro to Lake Turkana — one platform, 47 counties, every story heard.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="container-vok py-16 md:py-20 max-w-4xl">
          <p className="text-lg text-[#6B6459] leading-relaxed max-w-2xl">
            Voice of Kenya (Sauti ya Wananchi) is an independently owned, community-supported
            platform that empowers citizens to report local issues, track resolution, and contribute
            toward accountability across all 47 counties.
          </p>

          {/* Vision + Mission */}
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-[#D8D2C8]">
            {[
              {
                icon: Eye, label: "Our Vision", color: "#C8102E",
                body: "To become Kenya's largest citizen-powered platform for transparency, accountability, and civic participation.",
              },
              {
                icon: Target, label: "Our Mission", color: "#1A5C38",
                body: "To give every Kenyan a digital voice capable of highlighting local challenges and driving meaningful action.",
              },
            ].map(({ icon: Icon, label, color, body }) => (
              <div key={label} className="bg-card p-8 md:p-10">
                <div
                  className="inline-grid h-10 w-10 place-items-center rounded-sm"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-[#0D0F14]">{label}</h2>
                <p className="mt-3 text-[#6B6459] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div className="mt-14">
            <div className="eyebrow">Core Principles</div>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-[#0D0F14]">
              Built on trust, driven by community.
            </h2>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Zap,         color: "#C8102E", title: "No registration required", body: "Citizens can report community issues in under two minutes — no account needed." },
                { icon: ShieldCheck, color: "#1A5C38", title: "Fully independent",         body: "Not affiliated with any government agency. Built by an independent developer." },
                { icon: Eye,         color: "#B8620A", title: "Transparent by design",     body: "Every report receives a unique tracking code visible to the public." },
                { icon: Users,       color: "#0D5FA0", title: "Community-supported",        body: "Funded by citizens, donors, and partners who believe in civic accountability." },
              ].map(({ icon: Icon, color, title, body }) => (
                <div key={title} className="bg-card border border-[#D8D2C8] rounded-md p-6">
                  <div
                    className="inline-grid h-9 w-9 place-items-center rounded-sm"
                    style={{ backgroundColor: `${color}12`, color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#0D0F14]">{title}</h3>
                  <p className="mt-2 text-sm text-[#6B6459] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-[#D8D2C8] pt-10">
            <Link to="/report" className="btn-primary">
              Report your first issue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
