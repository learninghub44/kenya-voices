import { Link } from "@tanstack/react-router";
import { Megaphone, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="flag-bar" aria-hidden />
      <div className="container-vok flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-card">
            <Megaphone className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-base tracking-tight">Voice of Kenya</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sauti ya Wananchi</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/issues" className="hover:text-primary transition-colors">Issues</Link>
          <Link to="/track" className="hover:text-primary transition-colors">Track</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/report"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-90"
          >
            Report Issue
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-vok py-4 flex flex-col gap-3 text-sm">
            <Link to="/issues" onClick={() => setOpen(false)}>Issues</Link>
            <Link to="/track" onClick={() => setOpen(false)}>Track</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link
              to="/report"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground"
            >
              Report Issue
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-vok py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-xl font-bold">Voice of Kenya</div>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            One Nation. One Voice. Every Issue Matters.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            An independent civic reporting platform empowering citizens across all 47 counties to report,
            track, and resolve community issues.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/issues" className="hover:text-foreground">Browse Issues</Link></li>
            <li><Link to="/report" className="hover:text-foreground">Report Issue</Link></li>
            <li><Link to="/track" className="hover:text-foreground">Track Report</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-vok py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Voice of Kenya. Independent & community-supported.</div>
          <div>Not affiliated with any government agency.</div>
        </div>
      </div>
    </footer>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-warning/15 text-warning border-warning/30",
    verified: "bg-primary/10 text-primary border-primary/30",
    assigned: "bg-primary/10 text-primary border-primary/30",
    in_progress: "bg-accent text-accent-foreground border-border",
    resolved: "bg-success/15 text-success border-success/30",
    closed: "bg-muted text-muted-foreground border-border",
    rejected: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const label = status.replace("_", " ");
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${map[status] ?? map.pending}`}>
      {label}
    </span>
  );
}
