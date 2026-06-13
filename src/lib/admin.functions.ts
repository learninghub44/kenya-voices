import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/integrations/supabase/client.server";
import { getAdminSession } from "@/lib/session.server";

export const adminSetupExists = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getSupabaseAdmin();
  const { count } = await sb.from("admins").select("*", { count: "exact", head: true });
  return { exists: (count ?? 0) > 0 };
});

// Admin account creation is intentionally disabled at the API layer.
// Seed admins ONLY via a trusted SQL migration with a bcrypt password_hash.
export const adminSetup = createServerFn({ method: "POST" }).handler(async () => {
  throw new Error("Admin signup is disabled. Contact the system administrator.");
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((input: { username: string; password: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: admin } = await sb
      .from("admins")
      .select("id, username, password_hash")
      .eq("username", (data.username || "").trim().toLowerCase())
      .maybeSingle();
    if (!admin) throw new Error("Invalid credentials");
    const ok = await bcrypt.compare(data.password || "", admin.password_hash);
    if (!ok) throw new Error("Invalid credentials");
    const session = await getAdminSession();
    await session.update({ adminId: admin.id, username: admin.username });
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  return { username: session.data.username ?? null };
});

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.data.adminId) throw new Error("Unauthorized");
  return session.data;
}

export const adminListIssues = createServerFn({ method: "GET" })
  .inputValidator((input: { status?: string } = {}) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const sb = getSupabaseAdmin();
    let q = sb
      .from("issues")
      .select("id, issue_number, title, status, support_count, created_at, reporter_name, reporter_phone, reporter_email, reporter_public, counties(name), categories(name)")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data.status) q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminGetIssue = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const sb = getSupabaseAdmin();
    const { data: issue, error } = await sb
      .from("issues")
      .select("*, counties(name, slug), categories(name, slug)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return issue;
  });

export const adminUpdateStatus = createServerFn({ method: "POST" })
  .inputValidator((input: { issue_id: string; new_status: string; note?: string }) => input)
  .handler(async ({ data }) => {
    const me = await requireAdmin();
    const sb = getSupabaseAdmin();
    const { data: cur } = await sb.from("issues").select("status").eq("id", data.issue_id).single();
    await sb.from("issues").update({ status: data.new_status, updated_at: new Date().toISOString() }).eq("id", data.issue_id);
    await sb.from("status_updates").insert({
      issue_id: data.issue_id,
      old_status: cur?.status,
      new_status: data.new_status,
      note: data.note?.trim() || null,
      updated_by: me.username ?? "admin",
    });
    return { ok: true };
  });

export const adminDeleteIssue = createServerFn({ method: "POST" })
  .inputValidator((input: { issue_id: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("issues").delete().eq("id", data.issue_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminHideComment = createServerFn({ method: "POST" })
  .inputValidator((input: { comment_id: string; hidden: boolean }) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const sb = getSupabaseAdmin();
    await sb.from("comments").update({ is_hidden: data.hidden }).eq("id", data.comment_id);
    return { ok: true };
  });

export const adminStats = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  const [{ count: total }, { count: pending }, { count: resolved }, { count: inProgress }] = await Promise.all([
    sb.from("issues").select("*", { count: "exact", head: true }),
    sb.from("issues").select("*", { count: "exact", head: true }).eq("status", "pending"),
    sb.from("issues").select("*", { count: "exact", head: true }).eq("status", "resolved"),
    sb.from("issues").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
  ]);
  return { total: total ?? 0, pending: pending ?? 0, resolved: resolved ?? 0, inProgress: inProgress ?? 0 };
});
