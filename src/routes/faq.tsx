import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Voice of Kenya" },
      { name: "description", content: "Answers to common questions about reporting civic issues, tracking reports, and how Voice of Kenya works." },
    ],
  }),
  component: FAQ,
});

const SECTIONS = [
  {
    heading: "Reporting",
    items: [
      { q: "How do I report an issue?", a: "Go to the Report page, select your county and issue category, describe the problem clearly, and optionally attach a photo. Submit — you'll receive a tracking code instantly." },
      { q: "Do I need to register or create an account?", a: "No account is required. We deliberately made it account-free to lower barriers. Your tracking code is your only identifier." },
      { q: "What types of issues can I report?", a: "Roads and potholes, water and sanitation, electricity, garbage collection, public schools, hospitals, government service failures, corruption, environmental damage, and more." },
      { q: "Can I report anonymously?", a: "Yes. You do not need to provide your name. However, providing a contact (email or phone) allows us to notify you about updates to your report." },
      { q: "Can I attach photos to my report?", a: "Yes, and we strongly encourage it. Photo evidence significantly increases the likelihood that your report gets attention and action." },
    ],
  },
  {
    heading: "Tracking",
    items: [
      { q: "How do I track my report?", a: "Go to the Track page and enter your tracking code. You'll see the current status, any updates, and the history of your report." },
      { q: "I lost my tracking code. Can I recover it?", a: "If you provided an email when submitting, search your inbox for a confirmation. If not, use the Contact page and we'll try to help." },
      { q: "How long does it take to get a response?", a: "This depends entirely on the issue and the government body involved. Our average is 12 days from submission to first acknowledgment. Critical safety issues often move faster." },
    ],
  },
  {
    heading: "Privacy & Safety",
    items: [
      { q: "Is it safe to report corruption?", a: "We display only the issue description and location publicly. Your personal details are never shown. However, we recommend you avoid identifying yourself in the report description if you have safety concerns." },
      { q: "Who can see my report?", a: "Reports are public by default — anyone visiting the site can see them. This is intentional: transparency drives accountability. We hide your personal details." },
      { q: "Do you share my data with the government?", a: "We do not sell or share personal data. We share anonymised report data with relevant county agencies to facilitate resolution." },
    ],
  },
  {
    heading: "Platform",
    items: [
      { q: "Is Voice of Kenya a government website?", a: "No. We are an independent civic technology platform. We are not affiliated with or funded by any government body." },
      { q: "How is the platform funded?", a: "Through small display advertising and occasional grants from civic society organisations. We do not charge users." },
      { q: "Can organisations partner with you?", a: "Yes. NGOs, media outlets, and civic society groups can partner with us. Contact us via the Contact page." },
    ],
  },
];

function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/40 py-14">
          <div className="container-vok max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Help</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to know about reporting, tracking, and using Voice of Kenya.
            </p>
          </div>
        </div>

        <div className="container-vok max-w-3xl py-16 space-y-12">
          {SECTIONS.map(({ heading, items }) => (
            <div key={heading}>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">{heading}</h2>
              <div className="divide-y divide-border">
                {items.map(({ q, a }) => {
                  const id = `${heading}-${q}`;
                  return (
                    <div key={q} className="py-4">
                      <button
                        className="w-full text-left flex justify-between items-start gap-4"
                        onClick={() => setOpen(open === id ? null : id)}
                      >
                        <span className="font-semibold text-foreground">{q}</span>
                        <span className="flex-shrink-0 text-muted-foreground font-mono text-lg leading-none">{open === id ? "−" : "+"}</span>
                      </button>
                      {open === id && (
                        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="border-t border-border pt-10">
            <p className="text-muted-foreground mb-4">Still have questions? Reach out to us.</p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm font-medium text-foreground hover:bg-secondary">
                Contact Us
              </Link>
              <Link to="/report" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm font-medium">
                Report an Issue <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
