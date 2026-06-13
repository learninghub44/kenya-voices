import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Calendar, Copy, Heart, MapPin, MessageCircle, Share2 } from "lucide-react";
import { SiteHeader, SiteFooter, StatusBadge } from "@/components/layout";
import { getIssue, supportIssue, addComment } from "@/lib/issues.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/issue/$id")({
  loader: async ({ params }) => {
    const res = await getIssue({ data: { id: params.id } });
    if (!res) throw notFound();
    return res;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.issue.title ?? "Issue"} — Voice of Kenya` },
      { name: "description", content: loaderData?.issue.description?.slice(0, 155) ?? "Community issue report" },
      ...(loaderData?.issue.images?.[0] ? [
        { property: "og:image", content: loaderData.issue.images[0] },
        { name: "twitter:image", content: loaderData.issue.images[0] },
      ] : []),
    ],
  }),
  component: IssueDetail,
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Issue not found</div>,
});

function IssueDetail() {
  const { id } = Route.useParams();
  const { issue, comments, updates } = Route.useLoaderData();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const { data: live } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssue({ data: { id } }),
    initialData: { issue, comments, updates },
  });

  const supportM = useMutation({
    mutationFn: () => supportIssue({ data: { issue_id: id } }),
    onSuccess: (r) => {
      if (r.alreadySupported) toast("You already supported this issue");
      else toast.success("Thank you for your support");
      qc.invalidateQueries({ queryKey: ["issue", id] });
    },
  });

  const commentM = useMutation({
    mutationFn: () => addComment({ data: { issue_id: id, author_name: name, content } }),
    onSuccess: () => {
      setContent("");
      qc.invalidateQueries({ queryKey: ["issue", id] });
      toast.success("Comment added");
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed"),
  });

  function share() {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: live!.issue.title, url }).catch(() => {});
    else { navigator.clipboard.writeText(url); toast.success("Link copied"); }
  }

  const it = live!.issue;
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-10 max-w-5xl">
        <Link to="/issues" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All issues
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <StatusBadge status={it.status} />
          <span className="text-muted-foreground">·</span>
          <span className="font-mono text-muted-foreground">{it.issue_number}</span>
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight">{it.title}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {it.counties?.name}{it.sub_county ? `, ${it.sub_county}` : ""}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(it.created_at).toLocaleDateString()}</span>
          <span>{it.categories?.name}</span>
          {it.reporter_name ? (
            <span className="inline-flex items-center gap-1">Reported by <span className="font-semibold text-foreground">{it.reporter_name}</span></span>
          ) : (
            <span className="italic">Reported anonymously</span>
          )}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {it.images?.length > 0 && (
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
                {it.images.map((u: string, i: number) => (
                  <img key={i} src={u} alt="" className={`w-full object-cover ${i === 0 && it.images.length === 1 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`} />
                ))}
              </div>
            )}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold">Description</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{it.description}</p>
              {it.additional_notes && (
                <>
                  <h3 className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Additional Notes</h3>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{it.additional_notes}</p>
                </>
              )}
            </div>

            {/* Comments */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Discussion ({live!.comments.length})</h2>
              <div className="mt-4 space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (or Anonymous)" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add to the conversation…" rows={3} className="w-full rounded-lg border border-border bg-background p-3 text-sm resize-none" />
                <button onClick={() => commentM.mutate()} disabled={!content.trim() || commentM.isPending} className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                  Post comment
                </button>
              </div>
              <div className="mt-6 space-y-4 divide-y divide-border">
                {live!.comments.map((c: any) => (
                  <div key={c.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{c.author_name}</span>
                      <span className="text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-sm whitespace-pre-wrap">{c.content}</p>
                  </div>
                ))}
                {live!.comments.length === 0 && <p className="text-sm text-muted-foreground">Be the first to comment.</p>}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card text-center">
              <div className="text-4xl font-display font-bold">{it.support_count}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Citizens supporting</div>
              <button onClick={() => supportM.mutate()} disabled={supportM.isPending} className="mt-4 w-full inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[oklch(0.55_0.22_28)] text-white font-semibold text-sm hover:opacity-90 transition">
                <Heart className="h-4 w-4" /> Support this issue
              </button>
              <button onClick={share} className="mt-2 w-full inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold hover:bg-secondary transition">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide">Timeline</h3>
              <div className="mt-3 space-y-3">
                <Timeline status="reported" label="Reported" date={it.created_at} active />
                {live!.updates.map((u: any) => (
                  <Timeline key={u.id} status={u.new_status} label={`Updated to ${u.new_status.replace("_", " ")}`} date={u.created_at} note={u.note} active />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm">
              <div className="font-semibold">Did you report this?</div>
              <p className="mt-1 text-muted-foreground">Use your tracking code to add updates or mark it resolved.</p>
              <Link to="/track" className="mt-3 inline-flex h-9 items-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground">Open tracker</Link>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Timeline({ label, date, note, active }: { status: string; label: string; date: string; note?: string; active?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1.5 h-2 w-2 rounded-full" style={{ background: active ? "var(--color-primary)" : "var(--color-border)" }} />
      <div className="flex-1">
        <div className="text-sm font-semibold capitalize">{label}</div>
        <div className="text-xs text-muted-foreground">{new Date(date).toLocaleString()}</div>
        {note && <div className="text-xs mt-1 italic">{note}</div>}
      </div>
    </div>
  );
}
