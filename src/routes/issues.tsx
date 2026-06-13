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
        <section className="border-b border-border bg-secondary/40">
          <div className="container-vok py-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold">All Reports</h1>
            <p className="mt-2 text-muted-foreground">Search and filter community issues across Kenya.</p>

            <div className="mt-6 grid md:grid-cols-12 gap-3">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search issues…" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3" />
              </div>
              <select value={county} onChange={(e) => setCounty(e.target.value)} className="md:col-span-3 h-11 rounded-lg border border-border bg-background px-3">
                <option value="">All counties</option>
                {counties.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="md:col-span-2 h-11 rounded-lg border border-border bg-background px-3">
                <option value="">All categories</option>
                {categories.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="md:col-span-2 h-11 rounded-lg border border-border bg-background px-3">
                <option value="">All statuses</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="container-vok py-10">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-20">Loading…</div>
          ) : (data?.issues.length ?? 0) === 0 ? (
            <div className="text-center py-20">
              <div className="font-display text-xl font-bold">No issues found</div>
              <p className="mt-2 text-muted-foreground text-sm">Try adjusting your filters or <Link to="/report" className="text-primary underline">report one</Link>.</p>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">{data?.total} issues</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.issues.map((it: any) => (
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
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
