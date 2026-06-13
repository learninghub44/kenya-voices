import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader, SiteFooter, StatusBadge } from "@/components/layout";
import { trackIssue } from "@/lib/issues.functions";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Report — Voice of Kenya" },
      { name: "description", content: "Enter your tracking code to monitor the status of your reported issue." },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const [code, setCode] = useState("");
  const m = useMutation({ mutationFn: (c: string) => trackIssue({ data: { code: c } }) });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative border-b border-border bg-secondary/40 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-glow" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-warning/10 blur-3xl animate-glow" />
          <div className="container-vok py-16 md:py-20 relative max-w-2xl">
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary/40" /> Tracking
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-[1.05]">
                Track <em className="not-italic text-primary">your report</em>
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">Enter the tracking code you received when you submitted your report.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); m.mutate(code); }} className="mt-8 flex gap-2 animate-rise-1">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. VK8A-91DF-QW27"
                className="flex-1 h-12 rounded-xl border border-border bg-background px-4 font-mono tracking-widest shadow-card focus:shadow-elev focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
              <button type="submit" disabled={m.isPending || !code.trim()} className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-elev hover:-translate-y-0.5 transition disabled:opacity-50 disabled:hover:translate-y-0">
                <Search className="h-4 w-4" /> Track
              </button>
            </form>
          </div>
        </section>

        <section className="container-vok py-12 max-w-2xl">
          {m.data === null && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm animate-rise">
              No issue found for that code. Double-check and try again.
            </div>
          )}

          {m.data && (
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elev animate-rise">
              <div className="flex items-center gap-2 text-xs">
                <StatusBadge status={m.data.issue.status} />
                <span className="font-mono text-muted-foreground">{m.data.issue.issue_number}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight">{m.data.issue.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.data.issue.counties?.name} · {m.data.issue.categories?.name}</p>
              <p className="mt-5 text-[15px] leading-relaxed whitespace-pre-wrap">{m.data.issue.description}</p>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-xs uppercase tracking-[0.18em] font-semibold text-muted-foreground">Timeline</div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div><span className="font-semibold">Reported</span> · {new Date(m.data.issue.created_at).toLocaleString()}</div>
                  </div>
                  {m.data.updates.map((u: any) => (
                    <div key={u.id} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warning" />
                      <div>
                        <span className="font-semibold capitalize">{u.new_status.replace("_", " ")}</span> · {new Date(u.created_at).toLocaleString()}
                        {u.note && <div className="text-xs italic text-muted-foreground mt-0.5">{u.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/issue/$id" params={{ id: m.data.issue.id }} className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-elev hover:-translate-y-0.5 transition">
                View full report →
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

