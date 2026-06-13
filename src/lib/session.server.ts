import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { adminId?: string; username?: string };

export function getAdminSession() {
  const password = process.env.VOK_SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("VOK_SESSION_SECRET must be at least 32 characters");
  }
  return useSession<AdminSession>({
    password,
    name: "vok_admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  });
}
