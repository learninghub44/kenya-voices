import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Users, Megaphone, TrendingUp } from "lucide-react";
import { SiteHeader, SiteFooter, StatusBadge } from "@/components/layout";
import { getStats, listIssues } from "@/lib/issues.functions";
import heroNight from "@/assets/nairobi-night.jpg";
import ctaDay from "@/assets/nairobi-day.jpg";
import wildlife from "@/assets/kilimanjaro-elephants.jpg";

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
        <section className="relative overflow-hidden text-white hero-grid" style={{ background: "var(--gradient-hero)" }}>
          <img src={heroNight} alt="Nairobi skyline at dusk" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.75))" }} />
          <div className="container-vok py-20 md:py-28 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Independent · Community-powered · No login required
              </div>
              <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                One Nation. One Voice.<br />
                <span className="text-[oklch(0.85_0.16_70)]">Every Issue Matters.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
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
        <section className="container-vok -mt-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-border bg-card p-3 shadow-elev">
            {[
              { label: "Issues Reported", value: stats.totalIssues, icon: Megaphone },
              { label: "Resolved", value: stats.resolvedIssues, icon: ShieldCheck },
              { label: "Active Counties", value: stats.activeCounties, icon: MapPin },
              { label: "Community Support", value: stats.totalSupports, icon: Users },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary p-4">
                <s.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-2xl md:text-3xl font-bold font-display tracking-tight">{s.value.toLocaleString()}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="container-vok py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">How it works</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">Your voice in three steps</h2>
            <p className="mt-3 text-muted-foreground">No registration. No paperwork. Just action.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { n: "01", t: "Report", d: "Submit your issue with photos, location, and details in under 2 minutes." },
              { n: "02", t: "Track", d: "Receive a unique tracking code to monitor progress and add updates." },
              { n: "03", t: "Resolve", d: "Community support drives visibility and accountability until resolution." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elev transition">
                <div className="font-display text-5xl font-bold text-primary/20">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="bg-secondary/40 py-20 border-y border-border">
          <div className="container-vok">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" /> Latest reports
                </div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">From across the nation</h2>
              </div>
              <Link to="/issues" className="text-sm font-semibold text-primary hover:underline hidden md:inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {featured.issues.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
                <Megaphone className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="mt-4 font-display text-xl font-bold">Be the first voice</h3>
                <p className="mt-2 text-muted-foreground text-sm">No reports yet. Your community needs you.</p>
                <Link to="/report" className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground">
                  Report the first issue
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.issues.map((it: any) => (
                  <Link key={it.id} to="/issue/$id" params={{ id: it.id }} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elev transition">
                    {it.images?.[0] ? (
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img src={it.images[0]} alt="" className="h-full w-full object-cover group-hover:scale-105 transition" />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent" />
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs">
                        <StatusBadge status={it.status} />
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{it.counties?.name}</span>
                      </div>
                      <h3 className="mt-3 font-display font-bold text-lg leading-tight line-clamp-2">{it.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{it.description}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
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
        <section className="container-vok py-20">
          <div className="rounded-3xl p-10 md:p-16 text-white text-center" style={{ background: "var(--gradient-hero)" }}>
            <h2 className="font-display text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Every issue you report makes Kenya stronger.
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Be a voice for your community. Reporting takes less than two minutes — and it's completely anonymous.
            </p>
            <Link to="/report" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[oklch(0.55_0.22_28)] px-7 text-sm font-bold uppercase tracking-wide shadow-elev">
              Start Your Report <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
