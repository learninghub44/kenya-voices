import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, MapPin, ShieldCheck, Users, Megaphone, TrendingUp } from "lucide-react";
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
        {/* HERO */}
        <section className="relative overflow-hidden text-white min-h-[85vh] flex items-center">
          <img src={heroNight} alt="Nairobi skyline at dusk" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(5,15,25,0.92) 0%, rgba(5,15,25,0.7) 45%, rgba(5,15,25,0.25) 100%)" }} />
          <div className="absolute inset-0 hero-grid opacity-40" />
          <div className="container-vok py-20 md:py-28 relative w-full">
            <div className="max-w-3xl">
              <h1 className="font-display text-2xl md:text-4xl font-bold leading-[1.1] tracking-tight">
                One Nation. One Voice.<br />
                <em className="not-italic text-[oklch(0.78_0.16_245)]">Every Issue Matters.</em>
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/85 max-w-2xl">
                Report broken roads, water shortages, illegal dumping, corruption, or any community problem.
                Track resolution. Hold leaders accountable — across all 47 counties.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/report" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[oklch(0.55_0.22_28)] px-6 text-sm font-bold uppercase tracking-wide shadow-elev hover:translate-y-[-1px] transition">
                  Report an Issue <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/issues" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-semibold hover:bg-white/10 transition">
                  Browse Reports
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="container-vok -mt-14 md:-mt-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 rounded-2xl border border-border bg-card/95 backdrop-blur p-3 md:p-4 shadow-elev">
            {[
              { label: "Issues Reported", value: stats.totalIssues, icon: Megaphone, tint: "bg-primary/10 text-primary", bar: "bg-primary" },
              { label: "Resolved", value: stats.resolvedIssues, icon: ShieldCheck, tint: "bg-success/15 text-success", bar: "bg-success" },
              { label: "Active Counties", value: stats.activeCounties, icon: MapPin, tint: "bg-destructive/10 text-destructive", bar: "bg-destructive" },
              { label: "Community Support", value: stats.totalSupports, icon: Users, tint: "bg-warning/15 text-warning", bar: "bg-warning" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`group relative overflow-hidden rounded-xl bg-secondary p-4 md:p-5 flex flex-col gap-2.5 card-rise animate-rise-${Math.min(i + 1, 3)}`}
              >
                <span className={`absolute inset-x-0 top-0 h-[3px] ${s.bar} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${s.tint}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-display tracking-tight leading-none text-foreground">
                  {s.value.toLocaleString()}
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] font-semibold text-foreground/70 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="container-vok py-24">
          <div className="text-center max-w-2xl mx-auto animate-rise">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <span className="h-px w-6 bg-primary/40" /> How it works <span className="h-px w-6 bg-primary/40" />
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold leading-[1.1]">
              Your voice in <em className="not-italic text-primary">three simple steps</em>
            </h2>
            <p className="mt-4 text-muted-foreground">No registration. No paperwork. Just action.</p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-7">
            {[
              { n: "01", t: "Report", d: "Submit your issue with photos, location, and details in under 2 minutes.", accent: "text-primary", ring: "ring-primary/20" },
              { n: "02", t: "Track", d: "Receive a unique tracking code to monitor progress and add updates in real time.", accent: "text-warning", ring: "ring-warning/30" },
              { n: "03", t: "Resolve", d: "Community support drives visibility and accountability until your issue is fixed.", accent: "text-destructive", ring: "ring-destructive/20" },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`group relative rounded-2xl border border-border bg-card p-8 shadow-card card-rise animate-rise-${Math.min(i + 1, 3)} overflow-hidden`}
              >
                <div className={`pointer-events-none absolute -right-6 -top-8 font-display font-black text-[120px] leading-none opacity-[0.06] ${s.accent} select-none transition-opacity duration-500 group-hover:opacity-[0.12]`}>
                  {s.n}
                </div>
                <div className={`relative grid h-12 w-12 place-items-center rounded-full bg-card ring-2 ${s.ring} font-display font-bold ${s.accent}`}>
                  {i + 1}
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight">{s.t}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                <div className={`relative mt-6 h-px w-10 ${s.accent.replace("text-", "bg-")} opacity-30 transition-all duration-500 group-hover:w-20 group-hover:opacity-70`} />
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="bg-secondary/40 py-24 border-y border-border">
          <div className="container-vok">
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div className="animate-rise">
                <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" /> Latest reports
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold leading-[1.1]">From across the nation</h2>
              </div>
              <Link to="/issues" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {featured.issues.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center animate-rise">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Megaphone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">Be the first voice</h3>
                <p className="mt-2 text-muted-foreground text-sm max-w-sm mx-auto">No reports yet. Your community is waiting for someone to speak first.</p>
                <Link to="/report" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-elev hover:-translate-y-0.5 transition">
                  Report the first issue <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.issues.map((it: any, i: number) => (
                  <Link
                    key={it.id}
                    to="/issue/$id"
                    params={{ id: it.id }}
                    className={`group rounded-2xl border border-border bg-card overflow-hidden shadow-card card-rise animate-rise-${Math.min((i % 3) + 1, 3)}`}
                  >
                    {it.images?.[0] ? (
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img src={it.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary/25 via-accent to-warning/20" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs">
                        <StatusBadge status={it.status} />
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{it.counties?.name}</span>
                      </div>
                      <h3 className="mt-3 font-display font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">{it.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{it.description}</p>
                      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <span>{it.categories?.name}</span>
                        <span className="font-semibold text-foreground">{it.support_count} supports</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="container-vok py-24">
          <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-20 text-white text-center shadow-elev">
            <img src={ctaDay} alt="" className="absolute inset-0 h-full w-full object-cover scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.22 0.08 150 / 0.92), oklch(0.18 0.10 25 / 0.88))" }} />
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-warning/40 blur-3xl animate-glow" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-destructive/40 blur-3xl animate-glow" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 font-semibold">
                <span className="h-px w-6 bg-white/40" /> Sauti ya Wananchi <span className="h-px w-6 bg-white/40" />
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-[1.05]">
                Every issue you report makes <em className="not-italic text-[oklch(0.78_0.16_245)]">Kenya stronger.</em>
              </h2>
              <p className="mt-6 text-white/80 max-w-xl mx-auto text-base md:text-lg">
                Be a voice for your community. Reporting takes less than two minutes — and it's completely anonymous.
              </p>
              <Link to="/report" className="mt-10 inline-flex h-13 items-center gap-2 rounded-xl bg-[oklch(0.55_0.22_28)] px-8 py-4 text-sm font-bold uppercase tracking-wider shadow-elev hover:-translate-y-0.5 transition">
                Start Your Report <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                100% Anonymous · No registration
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
