import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight, Shield, Briefcase, Zap, Building2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/government-agencies")({
  head: () => ({
    meta: [
      { title: "Kenya Government Agencies | Voice of Kenya" },
      { name: "description", content: "Directory of Kenya government agencies covering security, regulatory, service delivery, and development sectors." },
    ],
  }),
  component: GovernmentAgencies,
});

const agencies = [
  {
    category: "Security Agencies",
    icon: Shield,
    color: "#C8102E",
    items: [
      { name: "National Police Service (NPS)", website: "https://www.nps.go.ke", work: "Maintains public order, law enforcement, and community policing" },
      { name: "Directorate of Criminal Investigations (DCI)", website: "https://www.dci.go.ke", work: "Investigates serious crimes, forensic analysis, and criminal intelligence" },
      { name: "National Intelligence Service (NIS)", website: "https://www.nis.go.ke", work: "National security intelligence and counterintelligence operations" },
      { name: "Kenya Prisons & Correctional Services", website: "https://www.prisons.go.ke", work: "Inmate management, rehabilitation, and correctional services" },
    ],
  },
  {
    category: "Service Delivery Agencies",
    icon: Building2,
    color: "#1A5C38",
    items: [
      { name: "National Hospital Insurance Fund (NHIF)", website: "https://www.nhif.or.ke", work: "Public health insurance for all Kenyans" },
      { name: "Higher Education Loans Board (HELB)", website: "https://www.helb.co.ke", work: "Student loans, bursaries, and scholarships for higher education" },
      { name: "Kenya Power and Lighting Company (KPLC)", website: "https://www.kplc.co.ke", work: "Electricity transmission, distribution, and retail" },
      { name: "Kenya Medical Supplies Authority (KEMSA)", website: "https://www.kemsa.co.ke", work: "Procurement and supply of medical equipment and supplies" },
      { name: "Kenya Medical Research Institute (KEMRI)", website: "https://www.kemri.go.ke", work: "Medical research for disease prevention and health improvement" },
      { name: "Pharmacy and Poisons Board (PPB)", website: "https://www.ppb.go.ke", work: "Regulates medicines, poisons, and pharmaceutical services" },
    ],
  },
  {
    category: "Regulatory Agencies",
    icon: Briefcase,
    color: "#B8620A",
    items: [
      { name: "Kenya Revenue Authority (KRA)", website: "https://www.kra.go.ke", work: "Tax collection, revenue management, and customs administration" },
      { name: "Communications Authority of Kenya (CA)", website: "https://www.ca.go.ke", work: "ICT industry regulation, telecommunications, and broadcasting" },
      { name: "Energy and Petroleum Regulatory Authority (EPRA)", website: "https://www.epra.go.ke", work: "Regulates electricity, petroleum, and renewable energy" },
      { name: "Kenya Bureau of Standards (KEBS)", website: "https://www.kebs.org", work: "Product quality standards and consumer protection" },
      { name: "Capital Markets Authority (CMA)", website: "https://www.cma.or.ke", work: "Securities market regulation and investor protection" },
      { name: "Insurance Regulatory Authority (IRA)", website: "https://www.ira.go.ke", work: "Insurance industry supervision and consumer protection" },
      { name: "Kenya Plant Health Inspectorate Service (KEPHIS)", website: "https://www.kephis.org", work: "Plant health, agricultural input quality, and food safety" },
      { name: "Central Bank of Kenya (CBK)", website: "https://www.centralbank.go.ke", work: "Monetary policy, banking regulation, and financial stability" },
    ],
  },
  {
    category: "Development Agencies",
    icon: Zap,
    color: "#0D5FA0",
    items: [
      { name: "Kenya Airports Authority (KAA)", website: "https://www.kaa.or.ke", work: "Airport operations, maintenance, and air traffic management" },
      { name: "Kenya National Highways Authority (KeNHA)", website: "https://www.kenha.co.ke", work: "Highway development, maintenance, and management" },
      { name: "Kenya Railways Corporation (KRC)", website: "https://www.krc.co.ke", work: "Railway operations and freight/passenger transport" },
      { name: "Kenya Ports Authority (KPA)", website: "https://www.kpa.go.ke", work: "Port operations, maritime services, and cargo handling" },
      { name: "Kenya Investment Authority (KenInvest)", website: "https://www.investkenya.go.ke", work: "Investment promotion and business facilitation" },
      { name: "Geothermal Development Company (GDC)", website: "https://www.gdc.co.ke", work: "Geothermal energy exploration and development" },
      { name: "Rural Electrification and Renewable Energy (REREC)", website: "https://www.rerec.co.ke", work: "Rural electricity access and renewable energy promotion" },
      { name: "Kenya Pipeline Company (KPC)", website: "https://www.kpc.co.ke", work: "Petroleum pipeline network operation and management" },
    ],
  },
];

function GovernmentAgencies() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="bg-[#0D0F14] text-[#F5F0E8] py-16 md:py-24 border-b border-[#D8D2C8]/20">
          <div className="container-vok">
            <div className="max-w-3xl animate-rise">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8102E] mb-4">
                Government Agencies
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] mb-4">
                Kenya Government Agencies Directory
              </h1>
              <p className="text-base text-[#F5F0E8]/70 max-w-2xl leading-relaxed">
                Complete directory of Kenya's government agencies across security, regulatory, service delivery, and development sectors. Report issues and access services directly.
              </p>
              <div className="mt-8 h-[3px] w-20 bg-[#C8102E]" />
            </div>
          </div>
        </section>

        {/* ═══ AGENCIES BY CATEGORY ═══ */}
        <section className="container-vok py-20 md:py-28">
          {agencies.map((category, catIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={category.category} className={`mb-20 ${catIndex > 0 ? "border-t border-[#D8D2C8] pt-20" : ""}`}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-10 animate-rise">
                  <div className="inline-grid h-12 w-12 place-items-center rounded-lg" style={{ backgroundColor: `${category.color}15` }}>
                    <IconComponent className="h-6 w-6" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#0D0F14]">
                      {category.category}
                    </h2>
                    <div className="h-[2px] w-16 mt-2" style={{ backgroundColor: category.color }} />
                  </div>
                </div>

                {/* Agencies Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((agency, i) => (
                    <a
                      key={agency.name}
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group bg-card border border-[#D8D2C8] rounded-lg p-5 hover:shadow-elev transition-all duration-300 animate-rise-${Math.min((i % 2) + 1, 3)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display text-base font-bold text-[#0D0F14] group-hover:text-[#C8102E] transition-colors line-clamp-2 flex-1">
                          {agency.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-[#6B6459] group-hover:text-[#C8102E] transition-colors ml-2 shrink-0" />
                      </div>

                      <p className="text-sm text-[#6B6459] leading-relaxed">
                        {agency.work}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#D8D2C8]">
                        <p className="text-xs text-[#6B6459] font-mono truncate">
                          {agency.website}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ═══ CTA ═══ */}
        <section className="bg-[#0D0F14] text-[#F5F0E8] py-16 md:py-20 border-t border-[#D8D2C8]/20">
          <div className="container-vok text-center">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-4">
              Report Issues to Responsible Agencies
            </h2>
            <p className="text-[#F5F0E8]/70 max-w-md mx-auto mb-8">
              Voice of Kenya helps direct your reports to the right government agency for faster resolution and accountability.
            </p>
            <Link to="/report" className="btn-primary inline-flex gap-2">
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
