import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/government-sectors")({
  head: () => ({
    meta: [
      { title: "Kenya Government Sectors | Voice of Kenya" },
      { name: "description", content: "Complete directory of Kenya's national government ministries and their official websites. Report issues directly to responsible sectors." },
    ],
  }),
  component: GovernmentSectors,
});

const sectors = [
  {
    name: "Interior & National Administration",
    website: "https://www.interior.go.ke",
    work: "Security, administration, public order, police operations, prisons, and national ID services",
    icon: "🛡️",
  },
  {
    name: "National Treasury & Economic Planning",
    website: "https://www.treasury.go.ke",
    work: "Budget management, economic policy, revenue, taxation, and financial planning",
    icon: "💰",
  },
  {
    name: "Defence",
    website: "https://www.defence.go.ke",
    work: "National military operations, armed forces administration, and defence policy",
    icon: "🎖️",
  },
  {
    name: "Health",
    website: "https://health.go.ke",
    work: "Healthcare delivery, public health policy, disease prevention, hospitals, and clinics",
    icon: "🏥",
  },
  {
    name: "Education",
    website: "https://www.education.go.ke",
    work: "Primary, secondary, and tertiary education policy, curriculum, exams, and teacher training",
    icon: "📚",
  },
  {
    name: "Foreign & Diaspora Affairs",
    website: "https://www.mfa.go.ke",
    work: "International relations, diplomatic missions, diaspora engagement, and passport services",
    icon: "🌍",
  },
  {
    name: "Roads, Transport & Public Works",
    website: "https://www.roads.go.ke",
    work: "Road infrastructure, transportation policy, public works, airports, and ports",
    icon: "🚗",
  },
  {
    name: "Agriculture & Livestock Development",
    website: "https://www.agriculture.go.ke",
    work: "Farming policy, livestock management, food security, cooperatives, and agricultural extension",
    icon: "🌾",
  },
  {
    name: "Water, Sanitation & Irrigation",
    website: "https://www.water.go.ke",
    work: "Water supply, irrigation systems, sanitation infrastructure, and water resource management",
    icon: "💧",
  },
  {
    name: "Environment & Forestry",
    website: "https://www.environment.go.ke",
    work: "Environmental conservation, climate action, forest management, and natural resource protection",
    icon: "🌿",
  },
  {
    name: "Lands, Housing & Urban Development",
    website: "https://www.lands.go.ke",
    work: "Land policy, property registration, housing development, and urban planning",
    icon: "🏘️",
  },
  {
    name: "Tourism, Wildlife & Heritage",
    website: "https://www.tourism.go.ke",
    work: "Tourism promotion, wildlife conservation, national parks, and cultural heritage preservation",
    icon: "🦁",
  },
  {
    name: "Trade, Investment & Industry",
    website: "https://www.trade.go.ke",
    work: "Business promotion, industrial development, trade regulations, and investment incentives",
    icon: "📊",
  },
  {
    name: "Energy & Petroleum",
    website: "https://www.energy.go.ke",
    work: "Power generation, electricity distribution, petroleum management, and renewable energy",
    icon: "⚡",
  },
  {
    name: "Information, Communications & Digital Economy",
    website: "https://www.ict.go.ke",
    work: "ICT policy, digital transformation, telecommunications, and broadband expansion",
    icon: "💻",
  },
  {
    name: "Youth Affairs, Sports & the Arts",
    website: "https://www.sports.go.ke",
    work: "Youth development, sports promotion, cultural arts, and talent development",
    icon: "🎭",
  },
  {
    name: "Labour & Social Protection",
    website: "https://www.labour.go.ke",
    work: "Employment rights, worker protections, social security, pensions, and welfare",
    icon: "👷",
  },
  {
    name: "Co-operatives & MSME Development",
    website: "https://www.cooperatives.go.ke",
    work: "Small business support, cooperative financing, entrepreneurship, and business development",
    icon: "🤝",
  },
  {
    name: "Mining, Blue Economy & Maritime Affairs",
    website: "https://www.mining.go.ke",
    work: "Mining policy, ocean resources, fisheries, blue economy development, and maritime security",
    icon: "🌊",
  },
  {
    name: "Public Service, Gender & Affirmative Action",
    website: "https://www.publicservice.go.ke",
    work: "Public sector HR, gender equality, social inclusion, and civil service management",
    icon: "👥",
  },
  {
    name: "EAC, ASALs & Regional Development",
    website: "https://www.eac.go.ke",
    work: "East African Community affairs, arid region development, and regional integration",
    icon: "🗺️",
  },
];

function GovernmentSectors() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="bg-[#0D0F14] text-[#F5F0E8] py-16 md:py-24 border-b border-[#D8D2C8]/20">
          <div className="container-vok">
            <div className="max-w-3xl animate-rise">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8102E] mb-4">
                Government Directory
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] mb-4">
                Kenya's National Government Sectors
              </h1>
              <p className="text-base text-[#F5F0E8]/70 max-w-2xl leading-relaxed">
                Direct your reports and feedback to the responsible government sectors. Find official websites, understand each ministry's mandate, and engage with Kenya's national administration.
              </p>
              <div className="mt-8 h-[3px] w-20 bg-[#C8102E]" />
            </div>
          </div>
        </section>

        {/* ═══ SECTORS GRID ═══ */}
        <section className="container-vok py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sector, i) => (
              <a
                key={sector.name}
                href={sector.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card border border-[#D8D2C8] rounded-lg p-6 hover:shadow-elev hover:border-[#C8102E] transition-all duration-300 animate-rise-${Math.min((i % 3) + 1, 3)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{sector.icon}</span>
                  <ExternalLink className="h-4 w-4 text-[#6B6459] group-hover:text-[#C8102E] transition-colors" />
                </div>
                
                <h3 className="font-display text-lg font-bold text-[#0D0F14] group-hover:text-[#C8102E] transition-colors line-clamp-2 mb-3">
                  {sector.name}
                </h3>

                <p className="text-sm text-[#6B6459] leading-relaxed line-clamp-3 mb-4">
                  {sector.work}
                </p>

                <div className="pt-4 border-t border-[#D8D2C8] flex items-center gap-2 text-[11px] font-semibold text-[#1A5C38] group-hover:text-[#C8102E] transition-colors uppercase tracking-wide">
                  Visit website
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="bg-[#0D0F14] text-[#F5F0E8] py-16 md:py-20 border-t border-[#D8D2C8]/20">
          <div className="container-vok text-center">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-4">
              Found a Problem?
            </h2>
            <p className="text-[#F5F0E8]/70 max-w-md mx-auto mb-8">
              Use Voice of Kenya to report issues directly. Our platform helps amplify your concerns to the right government sectors.
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
