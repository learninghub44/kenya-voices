const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomBlock(len: number) {
  let s = "";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < len; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return s;
}

export function generateTrackingCode(): string {
  return `${randomBlock(4)}-${randomBlock(4)}-${randomBlock(4)}`;
}

export function generateIssueNumber(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return `VOK-${year}-${n}`;
}

export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + "|vok-salt-v1");
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
