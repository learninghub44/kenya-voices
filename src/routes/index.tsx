import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, MapPin, ShieldCheck, Users, Megaphone, TrendingUp, ChevronRight } from "lucide-react";
import { SiteHeader, SiteFooter, StatusBadge } from "@/components/layout";
import { getStats, listIssues } from "@/lib/issues.functions";
import heroNight from "@/assets/nairobi-night.jpg";
import ctaDay from "@/assets/nairobi-day.jpg";


const statsQO = queryOptions({ queryKey: ["stats"], queryFn: () => getStats() });
const featuredQO = queryOptions({ queryKey: ["featured"], queryFn: () => listIssues({ data: { limit: 6 } }) });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voice of Kenya — Report community issues across all 47 counties" },
      { name: "description", content: "Voice of Kenya empowers citizens to report local problems, track resolution, and drive accountability. One Nation. One Voice. Every Issue Matters." },
      { property: "og:title", content: "Voice of Kenya — Sauti ya Wananchi" },
      { property: "og:description", content: "Citizen-powered platform for community reporting in Kenya." },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(statsQO),
      context.queryClient.ensureQueryData(featuredQO),
    ]),
  component: Home,
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold">We hit a snag loading the homepage</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <p className="mt-2 text-xs text-muted-foreground">Have you run the SQL setup in Supabase?</p>
      </div>
    </div>
  ),
});

function Home() {
  const { data: stats } = useSuspenseQuery(statsQO);
  const { data: featured } = useSuspenseQuery(featuredQO);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden min-h-[88vh] flex items-center section-dark">
          {/* Photo layer */}
          <img
            src={heroNight}
            alt="Nairobi skyline at night"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay — heavy left, light right */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(13,15,20,0.96) 0%, rgba(13,15,20,0.82) 50%, rgba(13,15,20,0.30) 100%)" }}
          />
          {/* Subtle noise texture */}
          <div className="absolute inset-0 hero-noise" />

          {/* Red accent bar on left edge */}
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[#C8102E] opacity-70" />

          <div className="container-vok py-24 md:py-32 relative w-full">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="eyebrow animate-fade" style={{ color: "#C8102E" }}>
                Sauti ya Wananchi
              </div>

              {/* Headline — masthead style */}
              <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-[#F5F0E8] animate-rise">
                One Nation.<br />
                One Voice.<br />
                <span
                  className="relative"
                  style={{
                    WebkitTextStroke: "1px #C8102E",
                    color: "transparent",
                    textShadow: "0 0 60px rgba(200,16,46,0.3)",
                  }}
                >
                  Every Issue Matters.
                </span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-[#F5F0E8]/70 max-w-lg leading-relaxed animate-rise-1">
                Report broken roads, water shortages, corruption, or any community problem — across
                all 47 counties. Track resolution. Hold leaders accountable.
              </p>

              <div className="mt-10 flex flex-wrap gap-3 animate-rise-2">
                <Link to="/report" className="btn-primary">
                  Report an Issue <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/issues" className="btn-outline">
                  Browse Reports
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] text-[#F5F0E8]/35 font-semibold animate-rise-3">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> 100% Anonymous</span>
                <span>·</span>
                <span>No registration</span>
                <span>·</span>
                <span>Free forever</span>
              </div>
            </div>
          </div>

          {/* Bottom fade to cream */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(to bottom, transparent, #F5F0E8)" }}
          />
        </section>

        {/* ═══ STATS — floating over hero transition ═══ */}
        <section className="container-vok -mt-6 relative z-10 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Issues Reported",   value: stats.totalIssues,    icon: Megaphone,   accent: "#C8102E" },
              { label: "Resolved",          value: stats.resolvedIssues, icon: ShieldCheck,  accent: "#1A5C38" },
              { label: "Active Counties",   value: stats.activeCounties, icon: MapPin,       accent: "#B8620A" },
              { label: "Community Support", value: stats.totalSupports,  icon: Users,        accent: "#0D5FA0" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`stat-chip animate-rise-${Math.min(i + 1, 3)}`}
                style={{ "--chip-accent": s.accent } as React.CSSProperties}
              >
                <div
                  className="inline-grid h-8 w-8 place-items-center rounded-sm mb-3"
                  style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <div
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-none"
                  style={{ color: "#0D0F14" }}
                >
                  {s.value.toLocaleString()}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#6B6459]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="container-vok py-24 md:py-28">
          <div className="max-w-xl animate-rise">
            <div className="eyebrow">How it works</div>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-[#0D0F14]">
              Your voice in three steps.
            </h2>
            <p className="mt-3 text-[#6B6459]">No registration. No paperwork. Just action.</p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-0 md:gap-px bg-[#D8D2C8]">
            {[
              {
                n: "01", t: "Report", cls: "step-card-1",
                d: "Submit your issue with photos, your location, and details — in under two minutes.",
                color: "#C8102E",
              },
              {
                n: "02", t: "Track", cls: "step-card-2",
                d: "Receive a unique tracking code. Monitor progress and add updates in real time.",
                color: "#B8620A",
              },
              {
                n: "03", t: "Resolve", cls: "step-card-3",
                d: "Community support drives visibility and accountability until your issue is fixed.",
                color: "#1A5C38",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`step-card bg-card p-8 md:p-10 flex flex-col gap-6 ${s.cls} animate-rise-${Math.min(i + 1, 3)}`}
              >
                <div>
                  <span
                    className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-none"
                    style={{ color: `${s.color}20` }}
                  >
                    {s.n}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display text-2xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[15px] text-[#6B6459] leading-relaxed">{s.d}</p>
                </div>
                <div className="mt-auto">
                  <div className="h-px w-8 opacity-30" style={{ backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FEATURED REPORTS ═══ */}
        <section className="border-y border-[#D8D2C8] bg-[#EDE8DF] py-20 md:py-24">
          <div className="container-vok">
            <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
              <div className="animate-rise">
                <div className="eyebrow"><TrendingUp className="h-3.5 w-3.5" /> Latest reports</div>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-[#0D0F14]">
                  From across the nation
                </h2>
              </div>
              <Link
                to="/issues"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A5C38] hover:text-[#C8102E] transition-colors"
              >
                View all reports <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {featured.issues.length === 0 ? (
              <div className="rounded-md border border-dashed border-[#D8D2C8] bg-card p-16 text-center animate-rise max-w-lg mx-auto">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-sm bg-[#C8102E]/10">
                  <Megaphone className="h-6 w-6 text-[#C8102E]" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">Be the first voice</h3>
                <p className="mt-2 text-[#6B6459] text-sm max-w-xs mx-auto">
                  No reports yet. Your community is waiting for someone to speak first.
                </p>
                <Link to="/report" className="btn-primary mt-6 mx-auto">
                  Report the first issue <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.issues.map((it: any, i: number) => (
                  <Link
                    key={it.id}
                    to="/issue/$id"
                    params={{ id: it.id }}
                    className={`issue-card animate-rise-${Math.min((i % 3) + 1, 3)}`}
                  >
                    {it.images?.[0] ? (
                      <div className="aspect-[16/10] overflow-hidden bg-[#EDE8DF]">
                        <img
                          src={it.images[0]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className="aspect-[16/10]"
                        style={{ background: "linear-gradient(135deg, #C8102E15 0%, #1A5C3815 100%)" }}
                      />
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs">
                        <StatusBadge status={it.status} />
                        <span className="text-[#D8D2C8]">·</span>
                        <span className="text-[#6B6459] text-[11px]">{it.counties?.name}</span>
                      </div>
                      <h3 className="mt-3 font-display font-bold text-lg leading-tight line-clamp-2 text-[#0D0F14] group-hover:text-[#C8102E] transition-colors">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#6B6459] line-clamp-2 leading-relaxed">
                        {it.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B6459] pt-4 border-t border-[#D8D2C8]">
                        <span className="uppercase tracking-wide font-semibold">{it.categories?.name}</span>
                        <span className="font-bold text-[#0D0F14]">{it.support_count} supports</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="container-vok py-20 md:py-24">
          <div className="relative overflow-hidden rounded-md text-white" style={{ background: "#0D0F14" }}>
            {/* Photo bg */}
            <img src={ctaDay} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(200,16,46,0.25), rgba(26,92,56,0.25))" }} />
            {/* Flag stripe at top */}
            <div className="flag-stripe relative" />

            <div className="relative px-10 md:px-20 py-16 md:py-20 text-center">
              <div className="eyebrow justify-center text-[#F5F0E8]/50">
                Sauti ya Wananchi
              </div>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-[#F5F0E8] max-w-2xl mx-auto leading-[1.05]">
                Every issue you report makes<br />
                <span style={{ color: "#C8102E" }}>Kenya stronger.</span>
              </h2>
              <p className="mt-5 text-[#F5F0E8]/60 max-w-md mx-auto text-base leading-relaxed">
                Be a voice for your community. Reporting takes less than two minutes and is completely anonymous.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/report" className="btn-primary px-8">
                  Start Your Report <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/issues" className="btn-outline">
                  See All Issues
                </Link>
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#F5F0E8]/25 font-semibold">
                100% Anonymous · No registration required
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
