import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader, SiteFooter, StatusBadge } from "@/components/layout";
import { getCounties, getCategories, listIssues } from "@/lib/issues.functions";

export const Route = createFileRoute("/issues")({
  head: () => ({
    meta: [
      { title: "Browse Issues — Voice of Kenya" },
      { name: "description", content: "Browse and search community-reported issues across all 47 counties of Kenya." },
    ],
  }),
  component: IssuesPage,
});

const STATUSES = ["pending", "verified", "in_progress", "resolved", "closed", "rejected"];

function IssuesPage() {
  const [q, setQ] = useState("");
  const [county, setCounty] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const { data: counties = [] } = useQuery({ queryKey: ["counties"], queryFn: () => getCounties() });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: () => getCategories() });
  const { data, isLoading } = useQuery({
    queryKey: ["issues", q, county, category, status],
    queryFn: () => listIssues({ data: { q: q || undefined, county: county || undefined, category: category || undefined, status: status || undefined } }),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative border-b border-border bg-secondary/40 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-glow" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-warning/10 blur-3xl animate-glow" />
          <div className="container-vok py-16 md:py-20 relative">
            <div className="animate-rise max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary/40" /> Live feed
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-[1.05]">
                All <em className="not-italic text-primary">community reports</em>
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">Search and filter citizen-reported issues across all 47 counties.</p>
            </div>

            <div className="mt-8 grid md:grid-cols-12 gap-3 animate-rise-1">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search issues…" className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 shadow-card focus:shadow-elev focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              <select value={county} onChange={(e) => setCounty(e.target.value)} className="md:col-span-3 h-12 rounded-xl border border-border bg-background px-3 shadow-card">
                <option value="">All counties</option>
                {counties.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="md:col-span-2 h-12 rounded-xl border border-border bg-background px-3 shadow-card">
                <option value="">All categories</option>
                {categories.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="md:col-span-2 h-12 rounded-xl border border-border bg-background px-3 shadow-card">
                <option value="">All statuses</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="container-vok py-16">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-24">Loading reports…</div>
          ) : (data?.issues.length ?? 0) === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center animate-rise max-w-xl mx-auto">
              <div className="font-display text-2xl font-bold">No issues found</div>
              <p className="mt-3 text-muted-foreground text-sm">Try adjusting your filters or <Link to="/report" className="text-primary underline font-semibold">report one</Link>.</p>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-6 font-medium">{data?.total} issues found</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.issues.map((it: any, i: number) => (
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
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
