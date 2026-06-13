import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, Copy, Loader2, MapPin, Upload, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { getCounties, getCategories, createIssue, uploadIssuePhoto } from "@/lib/issues.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — Voice of Kenya" },
      { name: "description", content: "Report a community issue in under 2 minutes. No login required. Get a tracking code instantly." },
    ],
  }),
  component: ReportPage,
});

type Step = 1 | 2 | 3 | 4;

function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState<{ issue_number: string; tracking_code: string; id: string } | null>(null);

  const { data: counties = [] } = useQuery({ queryKey: ["counties"], queryFn: () => getCounties() });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: () => getCategories() });

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: 0,
    county_id: 0,
    sub_county: "",
    ward: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    images: [] as string[],
    additional_notes: "",
    reporter_name: "",
    reporter_phone: "",
    reporter_email: "",
    reporter_public: false,
  });
  const [uploading, setUploading] = useState(false);

  const submit = useMutation({
    mutationFn: () => createIssue({ data: form as any }),
    onSuccess: (res: any) => setSubmitted(res),
    onError: (e: any) => toast.error(e?.message ?? "Failed to submit"),
  });

  async function onPickFiles(files: FileList | null) {
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files).slice(0, 5 - form.images.length)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await uploadIssuePhoto({ data: fd });
        setForm((f) => ({ ...f, images: [...f.images, res.url] }));
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function useGeolocation() {
    if (!navigator.geolocation) return toast.error("Geolocation unavailable");
    navigator.geolocation.getCurrentPosition(
      (pos) => setForm((f) => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude })),
      () => toast.error("Couldn't get location")
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container-vok py-16 max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
            <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Report submitted</h1>
            <p className="mt-2 text-muted-foreground">Thank you for being a voice for your community.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary p-4 text-left">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Issue Number</div>
                <div className="mt-1 font-mono font-bold">{submitted.issue_number}</div>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 text-left">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Tracking Code</div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-primary">{submitted.tracking_code}</span>
                  <button onClick={() => { navigator.clipboard.writeText(submitted.tracking_code); toast.success("Copied"); }} className="p-1 hover:bg-primary/10 rounded">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Save your tracking code. Use it any time to monitor progress, add updates, or mark resolved.
            </p>
            <div className="mt-8 flex gap-2 justify-center">
              <Link to="/issue/$id" params={{ id: submitted.id }} className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground">
                View Report
              </Link>
              <button onClick={() => navigate({ to: "/" })} className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-semibold">
                Home
              </button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const canNext = () => {
    if (step === 1) return form.title.length >= 5 && form.description.length >= 20 && form.category_id > 0;
    if (step === 2) return form.county_id > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-10 max-w-3xl">
        <button onClick={() => navigate({ to: "/" })} className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold">Report an Issue</h1>
        <p className="mt-2 text-muted-foreground">Anonymous. Free. Takes ~2 minutes.</p>

        <div className="mt-8 flex items-center gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-1">
              <div className={`h-1.5 rounded-full ${n <= step ? "bg-primary" : "bg-muted"}`} />
              <div className={`mt-1.5 text-[10px] uppercase tracking-widest font-semibold ${n === step ? "text-primary" : "text-muted-foreground"}`}>
                {["Issue", "Location", "Evidence", "Review"][n - 1]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
          {step === 1 && (
            <div className="space-y-5">
              <Field label="Issue title" hint="Short, clear summary (5-200 chars)">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={200} className="vok-input" placeholder="e.g. Burst water pipe on Moi Avenue" />
              </Field>
              <Field label="Category">
                <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })} className="vok-input">
                  <option value={0}>Select category…</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Description" hint="Describe what, where, and impact (20-5000 chars)">
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} maxLength={5000} className="vok-input resize-none" />
                <div className="text-xs text-muted-foreground text-right mt-1">{form.description.length}/5000</div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="County">
                <select value={form.county_id} onChange={(e) => setForm({ ...form, county_id: Number(e.target.value) })} className="vok-input">
                  <option value={0}>Select county…</option>
                  {counties.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Sub-county (optional)">
                  <input value={form.sub_county} onChange={(e) => setForm({ ...form, sub_county: e.target.value })} className="vok-input" />
                </Field>
                <Field label="Ward (optional)">
                  <input value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} className="vok-input" />
                </Field>
              </div>
              <div className="rounded-xl border border-dashed border-border p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Pin GPS coordinates</div>
                  {form.latitude ? (
                    <div className="text-xs text-muted-foreground mt-1 font-mono">{form.latitude.toFixed(5)}, {form.longitude?.toFixed(5)}</div>
                  ) : (
                    <div className="text-xs text-muted-foreground mt-1">Optional but helpful</div>
                  )}
                </div>
                <button onClick={useGeolocation} className="text-sm rounded-lg border border-border px-3 py-2 hover:bg-secondary">Use my location</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label="Photos (up to 5)" hint="Evidence helps reports get verified faster">
                <label className="cursor-pointer block rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-primary hover:bg-secondary/40 transition">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onPickFiles(e.target.files)} disabled={uploading || form.images.length >= 5} />
                  {uploading ? <Loader2 className="h-7 w-7 mx-auto animate-spin text-primary" /> : <Upload className="h-7 w-7 mx-auto text-muted-foreground" />}
                  <div className="mt-2 text-sm font-semibold">{uploading ? "Uploading…" : "Click to upload photos"}</div>
                  <div className="text-xs text-muted-foreground">PNG/JPG, max 8MB each</div>
                </label>
              </Field>
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <button onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="absolute top-1 right-1 grid place-items-center h-6 w-6 rounded-full bg-black/70 text-white">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Field label="Additional notes (optional)">
                <textarea value={form.additional_notes} onChange={(e) => setForm({ ...form, additional_notes: e.target.value })} rows={3} className="vok-input resize-none" />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold">Review your report</h2>
              <Review label="Title" value={form.title} />
              <Review label="Category" value={categories.find((c: any) => c.id === form.category_id)?.name} />
              <Review label="Description" value={form.description} />
              <Review label="County" value={counties.find((c: any) => c.id === form.county_id)?.name} />
              <Review label="Sub-county / Ward" value={[form.sub_county, form.ward].filter(Boolean).join(" / ") || "—"} />
              <Review label="GPS" value={form.latitude ? `${form.latitude.toFixed(5)}, ${form.longitude?.toFixed(5)}` : "—"} />
              <Review label="Photos" value={`${form.images.length} attached`} />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setStep((s) => (Math.max(1, s - 1) as Step))} disabled={step === 1} className="text-sm font-semibold text-muted-foreground disabled:opacity-30">
              Back
            </button>
            {step < 4 ? (
              <button onClick={() => setStep((s) => (Math.min(4, s + 1) as Step))} disabled={!canNext()} className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                Continue
              </button>
            ) : (
              <button onClick={() => submit.mutate()} disabled={submit.isPending} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Report
              </button>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      <style>{`.vok-input{display:block;width:100%;height:44px;padding:0 14px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-background);font:inherit;color:inherit;transition:border-color .15s, box-shadow .15s}.vok-input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklch, var(--color-primary) 20%, transparent)}textarea.vok-input{height:auto;padding:12px 14px}`}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      {children}
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
function Review({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2 border-b border-border last:border-0">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="col-span-2 text-sm">{value || "—"}</div>
    </div>
  );
}
