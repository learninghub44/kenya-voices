import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { FileText, Download, Heart, Smartphone, Shield, AlertCircle, Scale, Globe, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Voice of Kenya" },
      { name: "description", content: "Terms of Service for Voice of Kenya (Sauti ya Wananchi) — independent civic reporting platform." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  {
    icon: Shield,
    color: "#1A5C38",
    title: "1. Platform Ownership & Independence",
    body: "Voice of Kenya (Sauti ya Wananchi) is a privately developed and independently operated civic reporting platform. It is not a government agency, county office, or law enforcement body. The platform is owned and maintained by an independent developer under the brand Zetu Business Solutions.",
  },
  {
    icon: Globe,
    color: "#0D5FA0",
    title: "2. No Government Affiliation",
    body: "This platform has no formal affiliation with the Government of Kenya, any county government, or any public institution unless explicitly stated. Submission of an issue report does not guarantee any official action, response, or acknowledgment by any government entity.",
  },
  {
    icon: AlertCircle,
    color: "#B8620A",
    title: "3. User Responsibilities",
    bullets: [
      "Submit only accurate, truthful reports based on real events or observations.",
      "Do not submit false, misleading, or fabricated reports against individuals or institutions.",
      "Do not publish defamatory, harassing, threatening, or abusive content.",
      "Do not upload manipulated, altered, or illegally obtained images or evidence.",
      "Do not impersonate any person, official, organisation, or government agency.",
      "Do not use the platform for political campaigning, spam, or commercial promotion.",
    ],
  },
  {
    icon: Shield,
    color: "#1A5C38",
    title: "4. Anonymity & Reporting",
    body: "The platform supports anonymous reporting. Your personal information is optional and will not be shared publicly unless you choose to make it visible. A unique tracking code is issued per report — keep it safe as it is the only way to update or track your submission.",
  },
  {
    icon: AlertCircle,
    color: "#C8102E",
    title: "5. Moderation Rights",
    body: "The platform reserves the right to remove, archive, or reject any report that violates these Terms, contains illegal content, or is submitted in bad faith — without prior notice. Repeated abuse may result in IP-level blocking.",
  },
  {
    icon: Heart,
    color: "#C8102E",
    title: "6. Donations & Support",
    body: "Voluntary contributions are used solely for hosting, maintenance, and development costs. Donations do not grant donors any ownership, editorial control, administrative access, or special privileges. All donations are final and non-refundable.",
  },
  {
    icon: FileText,
    color: "#6B6459",
    title: "7. Intellectual Property",
    body: "Reports and media submitted may be used by Voice of Kenya for civic research, statistical analysis, and public-interest journalism in anonymised form. You retain ownership of your original content but grant the platform a non-exclusive licence to display and use it.",
  },
  {
    icon: Scale,
    color: "#0D5FA0",
    title: "8. Disclaimer & Limitation of Liability",
    body: "The platform is provided \"as is\" without warranties of any kind. To the fullest extent permitted by Kenyan law, the platform owner shall not be liable for indirect, incidental, or consequential damages arising from use of this platform.",
  },
  {
    icon: Scale,
    color: "#1A5C38",
    title: "9. Governing Law",
    body: "These Terms are governed by the laws of the Republic of Kenya. Any disputes arising from use of this platform shall be subject to the jurisdiction of the courts of Kenya.",
  },
  {
    icon: FileText,
    color: "#6B6459",
    title: "10. Changes to Terms",
    body: "These terms may be updated at any time. Continued use of the platform after any update constitutes acceptance of the revised terms.",
  },
];

function DonateBanner() {
  return (
    <div className="mt-16 rounded-md overflow-hidden border border-[#D8D2C8]">
      {/* Red top bar */}
      <div className="h-1.5 bg-[#C8102E]" />
      <div className="bg-[#FDFAF4] p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left — message */}
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-sm bg-[#C8102E]/10">
                <Heart className="h-5 w-5 text-[#C8102E]" fill="currentColor" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0D0F14]">Support Voice of Kenya</h3>
            </div>
            <p className="text-[#6B6459] leading-relaxed text-sm">
              This platform is built and maintained entirely by an independent developer — with
              <strong className="text-[#0D0F14]"> no advertising, no government funding, and no corporate backing.</strong>{" "}
              Every shilling you contribute goes directly toward keeping this platform online, improving
              features, and expanding coverage across all 47 counties.
            </p>
            <p className="mt-3 text-[#6B6459] leading-relaxed text-sm">
              Your support helps us pay for servers, fix bugs, build new features, and ensure every Kenyan
              has a free and anonymous voice. <strong className="text-[#1A5C38]">Asante sana. Thank you.</strong>
            </p>
          </div>

          {/* Right — M-Pesa till */}
          <div className="md:w-64 shrink-0">
            <div className="rounded-md border-2 border-[#1A5C38] bg-white p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Smartphone className="h-4 w-4 text-[#1A5C38]" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#1A5C38]">M-Pesa Till</span>
              </div>
              <div className="font-display text-4xl font-bold text-[#1A5C38] tracking-tight leading-none mb-1">
                4577904
              </div>
              <div className="text-[11px] text-[#6B6459] mt-2 leading-snug">
                Lipa na M-Pesa<br />
                <span className="font-semibold">Buy Goods &amp; Services</span>
              </div>
              <div className="mt-4 border-t border-[#D8D2C8] pt-3">
                <p className="text-[10px] text-[#6B6459] leading-relaxed">
                  Any amount welcome.<br />No receipt needed — your support counts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 pt-6 border-t border-[#D8D2C8] flex flex-wrap gap-4 text-sm text-[#6B6459]">
          <a href="mailto:zetubusiness.web@gmail.com" className="flex items-center gap-2 hover:text-[#1A5C38] transition-colors">
            <Mail className="h-4 w-4 text-[#1A5C38]" /> zetubusiness.web@gmail.com
          </a>
          <a href="tel:+254701059192" className="flex items-center gap-2 hover:text-[#C8102E] transition-colors">
            <Phone className="h-4 w-4 text-[#C8102E]" /> +254 701 059 192
          </a>
        </div>
      </div>
    </div>
  );
}

function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero banner */}
        <div className="section-dark border-b border-[#F5F0E8]/10">
          <div className="flag-stripe" />
          <div className="container-vok py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="eyebrow" style={{ color: "#E87080" }}>Legal</div>
                <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#F5F0E8] leading-tight">
                  Terms of Service
                </h1>
                <p className="mt-3 text-[#F5F0E8]/60 max-w-lg text-sm leading-relaxed">
                  By using Voice of Kenya you agree to these terms. Please read them carefully.
                  Last updated: <span className="text-[#F5F0E8]/80 font-semibold">{new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</span>
                </p>
              </div>
              <a
                href="/terms-of-service.pdf"
                download
                className="btn-green shrink-0 self-start md:self-auto"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="container-vok py-14 max-w-4xl">
          {/* Quick nav */}
          <div className="rounded-md border border-[#D8D2C8] bg-[#FDFAF4] p-5 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-[#1A5C38]" />
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#6B6459]">Contents</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.title}
                  href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-sm text-[#6B6459] hover:text-[#1A5C38] transition-colors py-0.5"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((sec) => (
              <div
                key={sec.title}
                id={sec.title.replace(/\s+/g, "-").toLowerCase()}
                className="scroll-mt-24"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-sm mt-0.5"
                    style={{ backgroundColor: `${sec.color}15`, color: sec.color }}
                  >
                    <sec.icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-[#0D0F14] leading-snug">
                    {sec.title}
                  </h2>
                </div>
                <div className="border-l-2 pl-5 ml-4" style={{ borderColor: `${sec.color}40` }}>
                  {sec.bullets ? (
                    <ul className="space-y-2">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[#6B6459] text-sm leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: sec.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#6B6459] text-sm leading-relaxed">{sec.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact section */}
          <div className="mt-12 rounded-md bg-[#EDE8DF] border border-[#D8D2C8] p-6 flex flex-col sm:flex-row gap-4 items-start">
            <Mail className="h-5 w-5 text-[#1A5C38] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-[#0D0F14]">Questions about these Terms?</h3>
              <p className="text-sm text-[#6B6459] mt-1">
                Contact us at{" "}
                <a href="mailto:zetubusiness.web@gmail.com" className="text-[#1A5C38] font-semibold hover:underline">
                  zetubusiness.web@gmail.com
                </a>{" "}
                or WhatsApp{" "}
                <a href="tel:+254701059192" className="text-[#C8102E] font-semibold hover:underline">
                  +254 701 059 192
                </a>
              </p>
            </div>
          </div>

          {/* Donate banner */}
          <DonateBanner />

          {/* Also see */}
          <div className="mt-8 flex items-center gap-4 text-sm text-[#6B6459]">
            <span>Also read:</span>
            <Link to="/privacy" className="text-[#1A5C38] font-semibold hover:underline">Privacy Policy</Link>
            <span>·</span>
            <Link to="/contact" className="text-[#1A5C38] font-semibold hover:underline">Contact Us</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
