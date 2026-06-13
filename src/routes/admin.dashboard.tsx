import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut, Shield, Trash2 } from "lucide-react";
import { adminMe, adminListIssues, adminStats, adminUpdateStatus, adminDeleteIssue, adminLogout } from "@/lib/admin.functions";
import { StatusBadge } from "@/components/layout";
import { toast } from "sonner";

const STATUSES = ["pending", "verified", "assigned", "in_progress", "resolved", "closed", "rejected"];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard · Voice of Kenya" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    const me = await adminMe();
    if (!me.username) throw redirect({ to: "/admin" });
  },
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");

  const { data: me } = useQuery({ queryKey: ["adminMe"], queryFn: () => adminMe() });
  const { data: stats } = useQuery({ queryKey: ["adminStats"], queryFn: () => adminStats() });
  const { data: issues = [], refetch } = useQuery({
    queryKey: ["adminIssues", filter],
    queryFn: () => adminListIssues({ data: { status: filter || undefined } }),
  });

  const updateM = useMutation({
    mutationFn: (v: { id: string; status: string; note?: string }) =>
      adminUpdateStatus({ data: { issue_id: v.id, new_status: v.status, note: v.note } }),
    onSuccess: () => { toast.success("Status updated"); refetch(); qc.invalidateQueries({ queryKey: ["adminStats"] }); },
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => adminDeleteIssue({ data: { issue_id: id } }),
    onSuccess: () => { toast.success("Deleted"); refetch(); qc.invalidateQueries({ queryKey: ["adminStats"] }); },
  });

  async function logout() {
    await adminLogout();
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="container-vok h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Shield className="h-5 w-5" /></div>
            <div>
              <div className="font-display font-bold">Admin Dashboard</div>
              <div className="text-xs text-muted-foreground">@{me?.username}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">View site</Link>
            <button onClick={logout} className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm hover:bg-secondary">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-vok py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { l: "Total", v: stats?.total ?? 0 },
            { l: "Pending", v: stats?.pending ?? 0 },
            { l: "In Progress", v: stats?.inProgress ?? 0 },
            { l: "Resolved", v: stats?.resolved ?? 0 },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              <div className="mt-1 font-display text-3xl font-bold">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-display font-bold">Reports</h2>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">All statuses</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
            </select>
          </div>
          <div className="divide-y divide-border">
            {issues.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">No reports.</div>}
            {issues.map((it: any) => (
              <div key={it.id} className="p-4 grid md:grid-cols-12 gap-3 items-start">
                <div className="md:col-span-5">
                  <Link to="/issue/$id" params={{ id: it.id }} className="font-semibold hover:underline">{it.title}</Link>
                  <div className="mt-0.5 text-xs text-muted-foreground font-mono">{it.issue_number}</div>
                  {(it.reporter_name || it.reporter_phone || it.reporter_email) ? (
                    <div className="mt-2 rounded-lg bg-secondary/60 px-2.5 py-1.5 text-xs">
                      <span className="font-semibold">{it.reporter_name || "Unnamed"}</span>
                      {it.reporter_phone && <> · <a href={`tel:${it.reporter_phone}`} className="text-primary hover:underline">{it.reporter_phone}</a></>}
                      {it.reporter_email && <> · <a href={`mailto:${it.reporter_email}`} className="text-primary hover:underline">{it.reporter_email}</a></>}
                      {!it.reporter_public && <span className="ml-1 text-[10px] uppercase tracking-wider text-muted-foreground">admin-only</span>}
                    </div>
                  ) : (
                    <div className="mt-1 text-[11px] italic text-muted-foreground">Anonymous report</div>
                  )}
                </div>
                <div className="md:col-span-3 text-xs text-muted-foreground">{it.counties?.name} · {it.categories?.name}</div>
                <div className="md:col-span-1"><StatusBadge status={it.status} /></div>
                <div className="md:col-span-3 flex items-center gap-2 justify-end">
                  <select
                    defaultValue={it.status}
                    onChange={(e) => updateM.mutate({ id: it.id, status: e.target.value })}
                    className="h-9 rounded-lg border border-border bg-background px-2 text-xs"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                  </select>
                  <button onClick={() => { if (confirm("Delete this report?")) deleteM.mutate(it.id); }} className="grid place-items-center h-9 w-9 rounded-lg border border-border text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
