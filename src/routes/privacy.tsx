import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { FileText, Download, Heart, Smartphone, Shield, Eye, Database, Lock, Users, Globe, Mail, Phone, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Voice of Kenya" },
      { name: "description", content: "Privacy Policy for Voice of Kenya (Sauti ya Wananchi). We respect your anonymity and data rights." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    icon: Shield,
    color: "#1A5C38",
    title: "1. Who We Are",
    body: "Voice of Kenya (Sauti ya Wananchi) is an independently operated civic platform developed and maintained by Zetu Business Solutions, a technology brand based in Kenya. We are not owned, endorsed, or controlled by the Government of Kenya or any public institution unless explicitly stated.",
  },
  {
    icon: Database,
    color: "#0D5FA0",
    title: "2. What Information We Collect",
    bullets: [
      "Report content: Title, description, category, county, sub-county, ward, and images you upload.",
      "Optional contact info: Name, phone number, or email — only if you choose to provide them.",
      "Tracking data: A unique code generated per report so you can follow its progress.",
      "Technical data: Browser type, approximate location (if granted), and device type — for analytics only.",
      "We do NOT collect passwords, payment details, or government ID numbers.",
    ],
  },
  {
    icon: Eye,
    color: "#B8620A",
    title: "3. How We Use Your Information",
    bullets: [
      "Display your report publicly on the platform.",
      "Generate a unique tracking code for your report.",
      "Contact you (if you provided details) with status updates on your report.",
      "Produce anonymised civic statistics and public-interest research.",
      "Improve platform performance and user experience.",
      "We do not sell, rent, or trade your personal information to any third party.",
    ],
  },
  {
    icon: Globe,
    color: "#C8102E",
    title: "4. Public Nature of Reports",
    body: "Reports submitted to Voice of Kenya are public by design. Report title, description, category, location, images, status updates, and support counts may be visible to all visitors. Do not include sensitive personal information such as ID numbers, home addresses, or phone numbers in your report body.",
  },
  {
    icon: Shield,
    color: "#1A5C38",
    title: "5. Anonymity",
    body: "You may submit reports completely anonymously — no account or registration is required. If you choose to remain anonymous, we will not associate your report with any personal identity. Your IP address may be logged for abuse prevention but is never displayed publicly.",
  },
  {
    icon: FileText,
    color: "#6B6459",
    title: "6. Images & Media",
    bullets: [
      "You own the content or have the right to share it.",
      "The content does not violate the rights, privacy, or dignity of others.",
      "The content does not contain unlawful material.",
      "Uploaded media may be compressed or resized for display. We reserve the right to remove images that violate these guidelines without notice.",
    ],
  },
  {
    icon: Lock,
    color: "#0D5FA0",
    title: "7. Data Storage & Security",
    body: "Your data is stored on Supabase, a secure cloud database platform. We apply reasonable technical and organisational measures to protect your data from unauthorised access, loss, or misuse. However, no internet transmission is 100% secure.",
  },
  {
    icon: Eye,
    color: "#B8620A",
    title: "8. Cookies & Analytics",
    body: "We may use basic analytics tools to understand platform usage — page views, report volumes, county activity. These tools use anonymised, aggregated data only. We do not use advertising cookies or cross-site tracking.",
  },
  {
    icon: Database,
    color: "#6B6459",
    title: "9. Data Retention",
    body: "Reports and associated data are retained for as long as they serve civic or historical value. You may request removal of personal information associated with a report by contacting us. Anonymised report records may be retained indefinitely for civic research purposes.",
  },
  {
    icon: AlertCircle,
    color: "#C8102E",
    title: "10. Legal Disclosure",
    bullets: [
      "A valid court order or subpoena issued by a Kenyan court.",
      "A lawful request from law enforcement agencies.",
      "Regulatory obligations under Kenyan law.",
      "We will make reasonable efforts to notify affected users before disclosure where legally permitted.",
    ],
  },
  {
    icon: Users,
    color: "#1A5C38",
    title: "11. Children's Privacy",
    body: "This platform is intended for users aged 18 and above. We do not knowingly collect personal information from children. If you believe a child has submitted personal information, contact us immediately for removal.",
  },
  {
    icon: Shield,
    color: "#0D5FA0",
    title: "12. Your Rights",
    bullets: [
      "Access personal data we hold about you.",
      "Request correction of inaccurate data.",
      "Request deletion of your personal data (where legally permissible).",
      "Object to processing of your data for certain purposes.",
      "To exercise any of these rights, contact: zetubusiness.web@gmail.com",
    ],
  },
  {
    icon: Globe,
    color: "#6B6459",
    title: "13. Third-Party Services",
    bullets: [
      "Supabase — database and authentication infrastructure.",
      "Vercel — website hosting and deployment.",
      "Resend — transactional email delivery (if enabled).",
      "Each service operates under its own privacy policy.",
    ],
  },
  {
    icon: FileText,
    color: "#B8620A",
    title: "14. Changes to This Policy",
    body: "This Privacy Policy may be updated from time to time. The effective date on this page reflects the most recent revision. Continued use of the platform after any update constitutes your acceptance of the revised policy.",
  },
];

function DonateBanner() {
  return (
    <div className="mt-16 rounded-md overflow-hidden border border-[#D8D2C8]">
      <div className="h-1.5 bg-[#C8102E]" />
      <div className="bg-[#FDFAF4] p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
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
              has a free and anonymous voice.{" "}
              <strong className="text-[#1A5C38]">Asante sana. Thank you from the bottom of our hearts.</strong>
            </p>
          </div>

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

function Privacy() {
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
                <div className="eyebrow" style={{ color: "#6EC894" }}>Legal</div>
                <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#F5F0E8] leading-tight">
                  Privacy Policy
                </h1>
                <p className="mt-3 text-[#F5F0E8]/60 max-w-lg text-sm leading-relaxed">
                  We respect your anonymity and data rights. This policy explains what we collect and how we use it.
                  Last updated: <span className="text-[#F5F0E8]/80 font-semibold">{new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</span>
                </p>
              </div>
              <a
                href="/privacy-policy.pdf"
                download
                className="btn-green shrink-0 self-start md:self-auto"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="container-vok py-14 max-w-4xl">
          {/* TL;DR card */}
          <div className="rounded-md border border-[#1A5C38]/30 bg-[#1A5C38]/5 p-6 mb-12">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#1A5C38] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-[#0D0F14] mb-2">The short version</h3>
                <ul className="space-y-1.5 text-sm text-[#6B6459]">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1A5C38] shrink-0" /> You can report issues completely anonymously — no account needed.</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1A5C38] shrink-0" /> We never sell your data to anyone.</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1A5C38] shrink-0" /> Reports are public — don't include sensitive personal details in the report body.</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1A5C38] shrink-0" /> We only share data when required by Kenyan law.</li>
                </ul>
              </div>
            </div>
          </div>

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

          {/* Contact */}
          <div className="mt-12 rounded-md bg-[#EDE8DF] border border-[#D8D2C8] p-6 flex flex-col sm:flex-row gap-4 items-start">
            <Mail className="h-5 w-5 text-[#1A5C38] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-[#0D0F14]">Privacy questions or data requests?</h3>
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

          {/* Donate */}
          <DonateBanner />

          {/* Also see */}
          <div className="mt-8 flex items-center gap-4 text-sm text-[#6B6459]">
            <span>Also read:</span>
            <Link to="/terms" className="text-[#1A5C38] font-semibold hover:underline">Terms of Service</Link>
            <span>·</span>
            <Link to="/contact" className="text-[#1A5C38] font-semibold hover:underline">Contact Us</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
