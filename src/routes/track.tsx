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
      <main className="flex-1 container-vok py-12 max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Track Your Report</h1>
        <p className="mt-2 text-muted-foreground">Enter the tracking code you received when you submitted your report.</p>

        <form onSubmit={(e) => { e.preventDefault(); m.mutate(code); }} className="mt-6 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. VK8A-91DF-QW27"
            className="flex-1 h-12 rounded-lg border border-border bg-background px-4 font-mono tracking-widest"
          />
          <button type="submit" disabled={m.isPending || !code.trim()} className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            <Search className="h-4 w-4" /> Track
          </button>
        </form>

        {m.data === null && <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm">No issue found for that code. Double-check and try again.</div>}

        {m.data && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-xs">
              <StatusBadge status={m.data.issue.status} />
              <span className="font-mono text-muted-foreground">{m.data.issue.issue_number}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold">{m.data.issue.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{m.data.issue.counties?.name} · {m.data.issue.categories?.name}</p>
            <p className="mt-4 text-sm whitespace-pre-wrap">{m.data.issue.description}</p>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Timeline</div>
              <div className="mt-3 space-y-3">
                <div className="text-sm"><span className="font-semibold">Reported</span> · {new Date(m.data.issue.created_at).toLocaleString()}</div>
                {m.data.updates.map((u: any) => (
                  <div key={u.id} className="text-sm">
                    <span className="font-semibold capitalize">{u.new_status.replace("_", " ")}</span> · {new Date(u.created_at).toLocaleString()}
                    {u.note && <div className="text-xs italic text-muted-foreground">{u.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/issue/$id" params={{ id: m.data.issue.id }} className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
              View full report →
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
