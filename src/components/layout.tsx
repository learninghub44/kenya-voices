import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";

function VOKLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="shG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0D0F14" />
          <stop offset="33%"  stopColor="#0D0F14" />
          <stop offset="33%"  stopColor="#C8102E" />
          <stop offset="66%"  stopColor="#C8102E" />
          <stop offset="66%"  stopColor="#1A5C38" />
          <stop offset="100%" stopColor="#1A5C38" />
        </linearGradient>
        <clipPath id="shClip">
          <path d="M20 3 L36 9 V21 C36 29.5 29 36.5 20 39 C11 36.5 4 29.5 4 21 V9 Z" />
        </clipPath>
      </defs>
      <path d="M20 3 L36 9 V21 C36 29.5 29 36.5 20 39 C11 36.5 4 29.5 4 21 V9 Z"
        fill="url(#shG)" />
      <path d="M20 3 L36 9 V21 C36 29.5 29 36.5 20 39 C11 36.5 4 29.5 4 21 V9 Z"
        stroke="rgba(245,240,232,0.7)" strokeWidth="1" fill="none" />
      {/* Maasai spear — single horizontal line */}
      <line x1="8" y1="20" x2="32" y2="20" stroke="#F5F0E8" strokeWidth="1.5" clipPath="url(#shClip)" />
      <text x="20" y="27" textAnchor="middle"
        fontFamily="'Libre Baskerville', Georgia, serif"
        fontWeight="700" fontSize="10" fill="#F5F0E8" letterSpacing="-0.3">
        VOK
      </text>
    </svg>
  );
}

const NAV_LINKS = [
  { to: "/issues", label: "Issues" },
  { to: "/track",  label: "Track"  },
  { to: "/about",  label: "About"  },
  { to: "/contact",label: "Contact"},
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 masthead">
      {/* Kenya flag stripe — the signature */}
      <div className="flag-stripe" aria-hidden />

      <div className="container-vok flex h-16 items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group min-w-0 shrink-0">
          <VOKLogo className="h-9 w-9 shrink-0" />
          <div className="leading-tight min-w-0 hidden sm:block">
            <div className="font-display text-[15px] font-bold tracking-tight text-[#F5F0E8] truncate">
              Voice of Kenya
            </div>
            <div className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#F5F0E8]/50 truncate">
              Sauti ya Wananchi
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-[13px] font-medium text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors tracking-wide"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/report" className="btn-primary text-xs">
            Report Issue
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#F5F0E8] p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#F5F0E8]/10 bg-[#141720]">
          <div className="container-vok py-5 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm font-medium text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors border-b border-[#F5F0E8]/5 last:border-0"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/report"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-3"
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
    <footer className="mt-20 section-dark border-t border-[#F5F0E8]/10">
      {/* Support band */}
      <div className="border-b border-[#F5F0E8]/8">
        <div className="container-vok py-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#C8102E]/40 bg-[#C8102E]/10 text-[#E87080] rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                <Heart className="h-3 w-3" /> Support the Mission
              </div>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#F5F0E8]">
                Help keep Voice of Kenya free & independent.
              </h3>
              <p className="mt-2 text-sm text-[#F5F0E8]/55 max-w-sm leading-relaxed">
                Built by an independent developer for every Kenyan citizen. Your support keeps it
                ad-free, anonymous, and accessible.
              </p>
            </div>

            <a
              href="tel:+254701059192"
              className="group rounded-md border border-[#F5F0E8]/10 bg-[#F5F0E8]/5 p-5 hover:bg-[#F5F0E8]/8 hover:border-[#C8102E]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#C8102E] text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#F5F0E8]/40 font-semibold">M-Pesa · Call · WhatsApp</div>
                  <div className="font-display font-bold text-[#F5F0E8] group-hover:text-[#E87080] transition-colors">+254 701 059 192</div>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-[#F5F0E8]/40 leading-relaxed">
                Send any amount via M-Pesa Send Money to support the developer.
              </p>
            </a>

            <a
              href="mailto:zetubusiness.web@gmail.com"
              className="group rounded-md border border-[#F5F0E8]/10 bg-[#F5F0E8]/5 p-5 hover:bg-[#F5F0E8]/8 hover:border-[#1A5C38]/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#1A5C38] text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#F5F0E8]/40 font-semibold">Email Support</div>
                  <div className="font-display text-sm font-bold text-[#F5F0E8] group-hover:text-[#6EC894] transition-colors break-all">
                    zetubusiness.web@gmail.com
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-[#F5F0E8]/40 leading-relaxed">
                Partnerships, press, feedback, or online donations.
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="container-vok py-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <VOKLogo className="h-9 w-9" />
            <div>
              <div className="font-display font-bold text-[#F5F0E8] leading-tight">Voice of Kenya</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-[#F5F0E8]/40">Sauti ya Wananchi</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#F5F0E8]/50 max-w-xs leading-relaxed">
            Independent civic reporting across all 47 counties. One Nation. One Voice. Every Issue Matters.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#F5F0E8]/40 border border-[#F5F0E8]/10 rounded-sm px-2.5 py-1">
              <MapPin className="h-3 w-3" /> Nairobi, Kenya
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#F5F0E8]/40 border border-[#F5F0E8]/10 rounded-sm px-2.5 py-1">
              <ShieldCheck className="h-3 w-3" /> 100% Anonymous
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="font-sans text-[11px] uppercase tracking-[0.18em] font-bold text-[#F5F0E8]/40 mb-4">Platform</div>
          <ul className="space-y-2.5 text-sm text-[#F5F0E8]/60">
            {[
              { to: "/issues", label: "Browse Issues" },
              { to: "/report", label: "Report Issue" },
              { to: "/track",  label: "Track Report" },
              { to: "/about",  label: "About" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#F5F0E8] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-sans text-[11px] uppercase tracking-[0.18em] font-bold text-[#F5F0E8]/40 mb-4">Government</div>
          <ul className="space-y-2.5 text-sm text-[#F5F0E8]/60">
            {[
              { to: "/government-sectors", label: "Government Sectors" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#F5F0E8] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-sans text-[11px] uppercase tracking-[0.18em] font-bold text-[#F5F0E8]/40 mb-4">Legal</div>
          <ul className="space-y-2.5 text-sm text-[#F5F0E8]/60">
            {[
              { to: "/privacy", label: "Privacy" },
              { to: "/terms",   label: "Terms" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#F5F0E8] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-sans text-[11px] uppercase tracking-[0.18em] font-bold text-[#F5F0E8]/40 mb-4">Get in touch</div>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+254701059192" className="flex items-start gap-2.5 text-[#F5F0E8]/60 hover:text-[#F5F0E8] group">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#C8102E]" />
                <span>
                  <span className="block font-semibold text-[#F5F0E8] group-hover:text-[#E87080] transition-colors">+254 701 059 192</span>
                  <span className="text-[11px] text-[#F5F0E8]/35">Call · WhatsApp · M-Pesa</span>
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:zetubusiness.web@gmail.com" className="flex items-start gap-2.5 text-[#F5F0E8]/60 hover:text-[#F5F0E8] group break-all">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#1A5C38]" />
                <span className="font-semibold text-[#F5F0E8] group-hover:text-[#6EC894] transition-colors">
                  zetubusiness.web@gmail.com
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#F5F0E8]/8">
        <div className="container-vok py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F5F0E8]/30">
          <div>© {new Date().getFullYear()} Voice of Kenya. Independent & community-supported.</div>
          <div className="flex items-center gap-5">
            <span>Not affiliated with any government agency.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    pending:     { bg: "#B8620A/10", text: "#B8620A", border: "#B8620A/30" },
    verified:    { bg: "#1A5C38/10", text: "#1A5C38", border: "#1A5C38/30" },
    assigned:    { bg: "#1A5C38/10", text: "#1A5C38", border: "#1A5C38/30" },
    in_progress: { bg: "#0D5FA0/10", text: "#0D5FA0", border: "#0D5FA0/30" },
    resolved:    { bg: "#1A5C38/15", text: "#1A5C38", border: "#1A5C38/40" },
    closed:      { bg: "#6B6459/10", text: "#6B6459", border: "#6B6459/20" },
    rejected:    { bg: "#C8102E/10", text: "#C8102E", border: "#C8102E/30" },
  };

  const style = map[status] ?? map.pending;
  const label = status.replace("_", " ");

  const styleMap: Record<string, string> = {
    pending:     "bg-amber-50 text-amber-800 border border-amber-200",
    verified:    "bg-green-50 text-green-800 border border-green-200",
    assigned:    "bg-green-50 text-green-800 border border-green-200",
    in_progress: "bg-blue-50 text-blue-800 border border-blue-200",
    resolved:    "bg-emerald-50 text-emerald-800 border border-emerald-300",
    closed:      "bg-gray-100 text-gray-500 border border-gray-200",
    rejected:    "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${styleMap[status] ?? styleMap.pending}`}>
      {label}
    </span>
  );
}
