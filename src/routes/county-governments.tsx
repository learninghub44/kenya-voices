import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/county-governments")({
  head: () => ({
    meta: [
      { title: "Kenya County Governments | Voice of Kenya" },
      { name: "description", content: "Directory of all 47 Kenya county governments with official websites. Report local issues to your county government." },
    ],
  }),
  component: CountyGovernments,
});

const counties = [
  { name: "Baringo", website: "https://baringo.go.ke" },
  { name: "Bomet", website: "https://bomet.go.ke" },
  { name: "Bungoma", website: "https://bungoma.go.ke" },
  { name: "Busia", website: "https://busia.go.ke" },
  { name: "Caliber", website: "https://caliber.go.ke" },
  { name: "Elgeyo Marakwet", website: "https://elgeyo-marakwet.go.ke" },
  { name: "Embu", website: "https://embu.go.ke" },
  { name: "Garissa", website: "https://garissa.go.ke" },
  { name: "Gokak", website: "https://gokak.go.ke" },
  { name: "Homa Bay", website: "https://homa-bay.go.ke" },
  { name: "Isiolo", website: "https://isiolo.go.ke" },
  { name: "Kajiado", website: "https://kajiado.go.ke" },
  { name: "Kakamega", website: "https://kakamega.go.ke" },
  { name: "Kericho", website: "https://kericho.go.ke" },
  { name: "Kiambu", website: "https://kiambu.go.ke" },
  { name: "Kilifi", website: "https://kilifi.go.ke" },
  { name: "Kirinyaga", website: "https://kirinyaga.go.ke" },
  { name: "Kisii", website: "https://kisii.go.ke" },
  { name: "Kisumu", website: "https://kisumu.go.ke" },
  { name: "Kitui", website: "https://kitui.go.ke" },
  { name: "Kwale", website: "https://kwale.go.ke" },
  { name: "Laikipia", website: "https://laikipia.go.ke" },
  { name: "Lamu", website: "https://lamu.go.ke" },
  { name: "Machakos", website: "https://machakos.go.ke" },
  { name: "Makueni", website: "https://makueni.go.ke" },
  { name: "Mandera", website: "https://mandera.go.ke" },
  { name: "Marsabit", website: "https://marsabit.go.ke" },
  { name: "Meru", website: "https://meru.go.ke" },
  { name: "Migori", website: "https://migori.go.ke" },
  { name: "Mombasa", website: "https://mombasa.go.ke" },
  { name: "Murang'a", website: "https://murangа.go.ke" },
  { name: "Nairobi City", website: "https://nairobi.go.ke" },
  { name: "Nakuru", website: "https://nakuru.go.ke" },
  { name: "Nandi", website: "https://nandi.go.ke" },
  { name: "Narok", website: "https://narok.go.ke" },
  { name: "Nyamira", website: "https://nyamira.go.ke" },
  { name: "Nyandarua", website: "https://nyandarua.go.ke" },
  { name: "Nyeri", website: "https://nyeri.go.ke" },
  { name: "Samburu", website: "https://samburu.go.ke" },
  { name: "Siaya", website: "https://siaya.go.ke" },
  { name: "Taita Taveta", website: "https://taita-taveta.go.ke" },
  { name: "Tana River", website: "https://tana-river.go.ke" },
  { name: "Tharaka-Nithi", website: "https://tharaka-nithi.go.ke" },
  { name: "Trans Nzoia", website: "https://trans-nzoia.go.ke" },
  { name: "Turkana", website: "https://turkana.go.ke" },
  { name: "Uasin Gishu", website: "https://uasin-gishu.go.ke" },
  { name: "Vihiga", website: "https://vihiga.go.ke" },
  { name: "Wajir", website: "https://wajir.go.ke" },
  { name: "West Pokot", website: "https://west-pokot.go.ke" },
];

function CountyGovernments() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="bg-[#0D0F14] text-[#F5F0E8] py-16 md:py-24 border-b border-[#D8D2C8]/20">
          <div className="container-vok">
            <div className="max-w-3xl animate-rise">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8102E] mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> County Governments
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] mb-4">
                Kenya's 47 County Governments
              </h1>
              <p className="text-base text-[#F5F0E8]/70 max-w-2xl leading-relaxed">
                Access your local county government. Report issues, engage with local leadership, and participate in community development across all 47 counties.
              </p>
              <div className="mt-8 h-[3px] w-20 bg-[#C8102E]" />
            </div>
          </div>
        </section>

        {/* ═══ COUNTIES GRID ═══ */}
        <section className="container-vok py-20 md:py-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {counties.map((county, i) => (
              <a
                key={county.name}
                href={county.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card border border-[#D8D2C8] rounded-lg p-5 hover:shadow-elev hover:border-[#C8102E] transition-all duration-300 animate-rise-${Math.min((i % 3) + 1, 3)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#C8102E]" />
                    <h3 className="font-display text-base font-bold text-[#0D0F14] group-hover:text-[#C8102E] transition-colors">
                      {county.name}
                    </h3>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#6B6459] group-hover:text-[#C8102E] transition-colors" />
                </div>

                <p className="text-xs text-[#6B6459] group-hover:text-[#0D0F14] transition-colors font-mono truncate">
                  {county.website}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ INFO SECTION ═══ */}
        <section className="bg-[#EDE8DF] py-16 md:py-20 border-t border-[#D8D2C8]">
          <div className="container-vok">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[#0D0F14] mb-4">
                Report Issues to Your County
              </h2>
              <p className="text-base text-[#6B6459] leading-relaxed mb-8">
                Counties handle local services including health, agriculture, water, roads, and housing. Report problems directly to your county government for faster resolution.
              </p>
              <Link to="/report" className="btn-primary inline-flex gap-2">
                Report an Issue <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
