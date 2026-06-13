import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getSupabaseAdmin } from "@/integrations/supabase/client.server";
import { generateIssueNumber, generateTrackingCode, hashIp } from "@/lib/codes";

const STATUSES = ["pending", "verified", "assigned", "in_progress", "resolved", "closed", "rejected"] as const;
type Status = (typeof STATUSES)[number];

function getIp(): string {
  const fwd = getRequestHeader("x-forwarded-for") || getRequestHeader("cf-connecting-ip") || "0.0.0.0";
  return fwd.split(",")[0].trim();
}

export const getCounties = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("counties").select("id, name, slug").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("categories").select("id, name, slug, icon").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getSupabaseAdmin();
  const [{ count: total }, { count: resolved }, { count: counties }, { count: comments }] = await Promise.all([
    sb.from("issues").select("*", { count: "exact", head: true }),
    sb.from("issues").select("*", { count: "exact", head: true }).eq("status", "resolved"),
    sb.from("counties").select("*", { count: "exact", head: true }),
    sb.from("comments").select("*", { count: "exact", head: true }),
  ]);
  const { data: supportsAgg } = await sb.from("issues").select("support_count");
  const supports = (supportsAgg ?? []).reduce((s, r: any) => s + (r.support_count ?? 0), 0);
  return {
    totalIssues: total ?? 0,
    resolvedIssues: resolved ?? 0,
    activeCounties: counties ?? 0,
    totalSupports: supports,
    comments: comments ?? 0,
  };
});

export const listIssues = createServerFn({ method: "GET" })
  .inputValidator((input: { county?: string; category?: string; status?: string; q?: string; limit?: number; offset?: number } = {}) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let q = sb
      .from("issues")
      .select("id, issue_number, title, description, status, support_count, images, created_at, counties(name, slug), categories(name, slug)", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 24)
      .range(data.offset ?? 0, (data.offset ?? 0) + (data.limit ?? 24) - 1);
    if (data.status) q = q.eq("status", data.status);
    if (data.q) q = q.ilike("title", `%${data.q}%`);
    if (data.county) {
      const { data: c } = await sb.from("counties").select("id").eq("slug", data.county).maybeSingle();
      if (c) q = q.eq("county_id", c.id);
    }
    if (data.category) {
      const { data: c } = await sb.from("categories").select("id").eq("slug", data.category).maybeSingle();
      if (c) q = q.eq("category_id", c.id);
    }
    const { data: rows, error, count } = await q;
    if (error) throw new Error(error.message);
    return { issues: rows ?? [], total: count ?? 0 };
  });

export const getIssue = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: issue, error } = await sb
      .from("issues")
      .select("*, counties(name, slug), categories(name, slug)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!issue) return null;
    await sb.from("issues").update({ view_count: (issue.view_count ?? 0) + 1 }).eq("id", data.id);
    const [{ data: comments }, { data: updates }] = await Promise.all([
      sb.from("comments").select("id, author_name, content, created_at").eq("issue_id", data.id).eq("is_hidden", false).order("created_at", { ascending: true }),
      sb.from("status_updates").select("*").eq("issue_id", data.id).order("created_at", { ascending: true }),
    ]);
    // Strip reporter PII unless the reporter explicitly opted to make it public
    const safe: any = { ...issue };
    delete safe.reporter_ip_hash;
    if (!issue.reporter_public) {
      safe.reporter_name = null;
      safe.reporter_phone = null;
      safe.reporter_email = null;
    }
    return { issue: safe, comments: comments ?? [], updates: updates ?? [] };
  });

export const trackIssue = createServerFn({ method: "GET" })
  .inputValidator((input: { code: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: issue } = await sb
      .from("issues")
      .select("*, counties(name, slug), categories(name, slug)")
      .eq("tracking_code", data.code.trim().toUpperCase())
      .maybeSingle();
    if (!issue) return null;
    const { data: updates } = await sb.from("status_updates").select("*").eq("issue_id", issue.id).order("created_at", { ascending: true });
    return { issue, updates: updates ?? [] };
  });

export const createIssue = createServerFn({ method: "POST" })
  .inputValidator((input: {
    title: string;
    description: string;
    category_id: number;
    county_id: number;
    sub_county?: string;
    ward?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
    additional_notes?: string;
    reporter_name?: string;
    reporter_phone?: string;
    reporter_email?: string;
    reporter_public?: boolean;
  }) => {
    if (!input.title || input.title.length < 5 || input.title.length > 200) throw new Error("Title must be 5-200 characters");
    if (!input.description || input.description.length < 20 || input.description.length > 5000) throw new Error("Description must be 20-5000 characters");
    if (!input.category_id || !input.county_id) throw new Error("Category and county required");
    if (input.reporter_name && input.reporter_name.length > 120) throw new Error("Name too long");
    if (input.reporter_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.reporter_email)) throw new Error("Invalid email");
    if (input.reporter_phone && !/^[+\d\s\-()]{7,20}$/.test(input.reporter_phone)) throw new Error("Invalid phone");
    return input;
  })
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const issue_number = generateIssueNumber();
    const tracking_code = generateTrackingCode();
    const ip_hash = await hashIp(getIp());
    const { data: row, error } = await sb
      .from("issues")
      .insert({
        issue_number,
        tracking_code,
        title: data.title.trim(),
        description: data.description.trim(),
        category_id: data.category_id,
        county_id: data.county_id,
        sub_county: data.sub_county?.trim() || null,
        ward: data.ward?.trim() || null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        images: data.images ?? [],
        additional_notes: data.additional_notes?.trim() || null,
        reporter_ip_hash: ip_hash,
        reporter_name: data.reporter_name?.trim() || null,
        reporter_phone: data.reporter_phone?.trim() || null,
        reporter_email: data.reporter_email?.trim().toLowerCase() || null,
        reporter_public: !!data.reporter_public,
      })
      .select("id, issue_number, tracking_code")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const supportIssue = createServerFn({ method: "POST" })
  .inputValidator((input: { issue_id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const ip_hash = await hashIp(getIp());
    const { error } = await sb.from("supports").insert({ issue_id: data.issue_id, ip_hash });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    if (!error) {
      const { data: cur } = await sb.from("issues").select("support_count").eq("id", data.issue_id).single();
      await sb.from("issues").update({ support_count: (cur?.support_count ?? 0) + 1 }).eq("id", data.issue_id);
    }
    const { data: updated } = await sb.from("issues").select("support_count").eq("id", data.issue_id).single();
    return { support_count: updated?.support_count ?? 0, alreadySupported: !!error };
  });

export const addComment = createServerFn({ method: "POST" })
  .inputValidator((input: { issue_id: string; author_name?: string; content: string }) => {
    if (!input.content || input.content.length < 2 || input.content.length > 1000) throw new Error("Comment must be 2-1000 characters");
    return input;
  })
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: row, error } = await sb
      .from("comments")
      .insert({
        issue_id: data.issue_id,
        author_name: (data.author_name?.trim() || "Anonymous").slice(0, 60),
        content: data.content.trim(),
      })
      .select("id, author_name, content, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const uploadIssuePhoto = createServerFn({ method: "POST" })
  .inputValidator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error("Expected FormData");
    return input;
  })
  .handler(async ({ data }) => {
    const file = data.get("file") as File | null;
    if (!file) throw new Error("No file provided");
    if (file.size > 8 * 1024 * 1024) throw new Error("File too large (max 8MB)");
    if (!file.type.startsWith("image/")) throw new Error("File must be an image");
    const sb = getSupabaseAdmin();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb.storage.from("issue-photos").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: pub } = sb.storage.from("issue-photos").getPublicUrl(path);
    return { url: pub.publicUrl };
  });
