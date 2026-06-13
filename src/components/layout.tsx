import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Mail, Heart, ShieldCheck, MapPin } from "lucide-react";
import { useState } from "react";

function VOKLogo({ className = "h-10 w-10" }: { className?: string }) {
  // Kenya-flag inspired shield mark
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="vokShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.18 0.02 260)" />
          <stop offset="33%" stopColor="oklch(0.18 0.02 260)" />
          <stop offset="33%" stopColor="oklch(0.55 0.22 28)" />
          <stop offset="66%" stopColor="oklch(0.55 0.22 28)" />
          <stop offset="66%" stopColor="oklch(0.45 0.13 150)" />
          <stop offset="100%" stopColor="oklch(0.45 0.13 150)" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 L36 8 V20 C36 28 29 35 20 38 C11 35 4 28 4 20 V8 Z"
        fill="url(#vokShield)"
        stroke="oklch(1 0 0)"
        strokeWidth="1.5"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="13"
        fill="oklch(0.99 0 0)"
        letterSpacing="-0.5"
      >
        VOK
      </text>
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="flag-bar" aria-hidden />
      <div className="container-vok flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group min-w-0">
          <VOKLogo className="h-10 w-10 shrink-0 drop-shadow-sm" />
          <div className="leading-tight min-w-0">
            <div className="font-display font-bold text-base tracking-tight truncate">Voice of Kenya</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">Sauti ya Wananchi</div>
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
      {/* Support / Donate band */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 via-card to-destructive/5">
        <div className="container-vok py-10">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Heart className="h-3.5 w-3.5" /> Support the Mission
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                Help keep Voice of Kenya free & independent.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                This platform is built and maintained by an independent developer. Your support
                keeps it ad-free, anonymous, and accessible to every citizen.
              </p>
            </div>

            <a
              href="tel:+254701059192"
              className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elev transition"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    M-Pesa / Call / WhatsApp
                  </div>
                  <div className="font-display text-lg font-bold tracking-tight truncate group-hover:text-primary transition">
                    +254 701 059 192
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Send any amount via M-Pesa Send Money to support the developer.
              </p>
            </a>

            <a
              href="mailto:zetubusiness.web@gmail.com"
              className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elev transition"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-destructive text-destructive-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Email Support
                  </div>
                  <div className="font-display text-sm font-bold tracking-tight truncate group-hover:text-primary transition">
                    zetubusiness.web@gmail.com
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Partnerships, press, feedback or to donate online — reach out.
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-vok py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <VOKLogo className="h-9 w-9" />
            <div>
              <div className="font-display text-lg font-bold leading-tight">Voice of Kenya</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Sauti ya Wananchi
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            An independent civic reporting platform empowering citizens across all 47 counties to
            report, track, and resolve community issues. One Nation. One Voice. Every Issue Matters.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
              <MapPin className="h-3 w-3" /> Nairobi, Kenya
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
              <ShieldCheck className="h-3 w-3" /> 100% Anonymous
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="text-sm font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/issues" className="hover:text-foreground">Browse Issues</Link></li>
            <li><Link to="/report" className="hover:text-foreground">Report Issue</Link></li>
            <li><Link to="/track" className="hover:text-foreground">Track Report</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="text-sm font-semibold mb-3">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-sm font-semibold mb-3">Get in touch</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="tel:+254701059192" className="flex items-start gap-2 hover:text-foreground">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>+254 701 059 192<br /><span className="text-xs text-muted-foreground/80">Call · WhatsApp · M-Pesa</span></span>
              </a>
            </li>
            <li>
              <a href="mailto:zetubusiness.web@gmail.com" className="flex items-start gap-2 hover:text-foreground break-all">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>zetubusiness.web@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-vok py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Voice of Kenya. Independent & community-supported.</div>
          <div className="flex items-center gap-4">
            <span>Not affiliated with any government agency.</span>
            <Link to="/admin" className="hover:text-foreground opacity-70 hover:opacity-100">Admin</Link>
          </div>
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
