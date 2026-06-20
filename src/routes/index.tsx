import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, MapPin, ShieldCheck, Users, Megaphone, ChevronRight } from "lucide-react";
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

        {/* ═══ EDITORIAL MAGAZINE — MASTHEAD LAYOUT ═══ */}
        <section className="border-y border-[#D8D2C8] bg-[#EDE8DF] py-20 md:py-28">
          <div className="container-vok">
            {/* Masthead */}
            <div className="mb-16 animate-rise">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6B6459] mb-3">Latest Reports</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#0D0F14] leading-[1.08]">
                From the Field
              </h2>
              <div className="mt-4 h-[3px] w-20 bg-[#C8102E]" />
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
              <div className="grid gap-0 md:gap-px bg-[#D8D2C8]">
                {/* Top row: Featured story (2 cols) + secondary */}
                <div className="grid lg:grid-cols-3 gap-0 md:gap-px">
                  {/* Featured/hero story — left 2 cols */}
                  <Link
                    to="/issue/$id"
                    params={{ id: featured.issues[0].id }}
                    className="lg:col-span-2 group bg-card overflow-hidden hover:shadow-elev transition-all duration-300 animate-rise"
                  >
                    {featured.issues[0].images?.[0] ? (
                      <div className="aspect-[2/1] overflow-hidden bg-[#EDE8DF]">
                        <img
                          src={featured.issues[0].images[0]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[2/1] bg-gradient-to-br from-[#C8102E15] to-[#1A5C3815]" />
                    )}
                    <div className="p-8 md:p-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-8 bg-[#C8102E]" />
                        <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#C8102E]">
                          {featured.issues[0].categories?.name}
                        </span>
                      </div>
                      <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] text-[#0D0F14] group-hover:text-[#C8102E] transition-colors line-clamp-3">
                        {featured.issues[0].title}
                      </h3>
                      <p className="mt-4 text-base text-[#6B6459] leading-relaxed line-clamp-3">
                        {featured.issues[0].description}
                      </p>
                      <div className="mt-auto pt-6 border-t border-[#D8D2C8] flex items-center justify-between text-[11px] text-[#6B6459] font-semibold uppercase tracking-wide">
                        <span>{featured.issues[0].counties?.name}</span>
                        <span className="text-[#0D0F14] font-bold flex items-center gap-2">
                          <Users className="h-3 w-3" /> {featured.issues[0].support_count}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Secondary story — right col */}
                  {featured.issues.length > 1 && (
                    <Link
                      to="/issue/$id"
                      params={{ id: featured.issues[1].id }}
                      className="group bg-card overflow-hidden hover:shadow-elev transition-all duration-300 animate-rise-1"
                    >
                      {featured.issues[1].images?.[0] ? (
                        <div className="aspect-[4/3] overflow-hidden bg-[#EDE8DF]">
                          <img
                            src={featured.issues[1].images[0]}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-gradient-to-br from-[#B8620A15] to-[#1A5C3815]" />
                      )}
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-[2px] w-5 bg-[#B8620A]" />
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#6B6459]">
                            {featured.issues[1].categories?.name}
                          </span>
                        </div>
                        <h4 className="font-display text-lg font-bold leading-tight text-[#0D0F14] group-hover:text-[#C8102E] transition-colors line-clamp-2">
                          {featured.issues[1].title}
                        </h4>
                        <p className="mt-3 text-sm text-[#6B6459] line-clamp-2">
                          {featured.issues[1].description}
                        </p>
                        <div className="mt-auto pt-3 border-t border-[#D8D2C8] flex items-center justify-between text-[10px] text-[#6B6459]">
                          <span>{featured.issues[1].counties?.name}</span>
                          <span className="font-bold">{featured.issues[1].support_count}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Bottom grid: Remaining stories */}
                {featured.issues.length > 2 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-px">
                    {featured.issues.slice(2).map((it: any, i: number) => (
                      <Link
                        key={it.id}
                        to="/issue/$id"
                        params={{ id: it.id }}
                        className={`group bg-card overflow-hidden hover:shadow-elev transition-all duration-300 animate-rise-${Math.min((i % 3) + 1, 3)}`}
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
                          <div className="aspect-[16/10] bg-gradient-to-br from-[#1A5C3815] to-[#C8102E15]" />
                        )}
                        <div className="p-4 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-[2px] w-4 bg-[#1A5C38]" />
                            <span className="text-[9px] uppercase tracking-[0.12em] font-semibold text-[#6B6459]">
                              {it.categories?.name}
                            </span>
                          </div>
                          <h4 className="font-display text-base font-bold leading-snug text-[#0D0F14] group-hover:text-[#C8102E] transition-colors line-clamp-2">
                            {it.title}
                          </h4>
                          <p className="mt-2 text-xs text-[#6B6459] line-clamp-2">
                            {it.description}
                          </p>
                          <div className="mt-auto pt-3 border-t border-[#D8D2C8] flex items-center justify-between text-[9px] text-[#6B6459]">
                            <span>{it.counties?.name}</span>
                            <span className="font-bold">{it.support_count}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View all link */}
            <div className="mt-12 text-center">
              <Link
                to="/issues"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A5C38] hover:text-[#C8102E] transition-colors group"
              >
                View all reports
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
