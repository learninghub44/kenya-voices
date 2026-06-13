import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Lock } from "lucide-react";
import { adminLogin, adminMe } from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin · Voice of Kenya" }, { name: "robots", content: "noindex" }] }),
  component: AdminEntry,
});

function AdminEntry() {
  const navigate = useNavigate();
  const { data: me } = useQuery({ queryKey: ["adminMe"], queryFn: () => adminMe() });
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  if (me?.username) {
    navigate({ to: "/admin/dashboard" });
    return null;
  }

  const loginM = useMutation({
    mutationFn: () => adminLogin({ data: { username: u.trim(), password: p } }),
    onSuccess: () => navigate({ to: "/admin/dashboard" }),
    onError: (e: any) => toast.error(e?.message ?? "Invalid credentials"),
  });

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/40 p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elev">
        <Link to="/" className="text-xs text-muted-foreground">← Back to site</Link>
        <div className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Restricted access. Sign in with your administrator credentials.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); loginM.mutate(); }}
          className="mt-6 space-y-3"
        >
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="h-11 w-full rounded-lg border border-border bg-background px-3"
          />
          <input
            value={p}
            onChange={(e) => setP(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="h-11 w-full rounded-lg border border-border bg-background px-3"
          />
          <button
            type="submit"
            disabled={loginM.isPending || !u || !p}
            className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-50"
          >
            {loginM.isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-[11px] text-center text-muted-foreground">
          Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}
