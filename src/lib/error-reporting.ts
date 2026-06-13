// Error reporting — stub (no external dependency)
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[VOK Error]", error, context);
}
