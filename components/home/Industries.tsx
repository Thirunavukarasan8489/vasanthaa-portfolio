import SectionLabel from "@/components/ui/SectionLabel";
import { marqueeIndustriesRow1, marqueeIndustriesRow2, industriesData } from "@/data/industries";

export default function Industries() {
  return (
    <section className="py-24 bg-[#03291E] border-b border-[#053827] overflow-hidden" id="industries">
      <div className="editorial-container mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <SectionLabel number="05" label="VERSATILITY" className="mb-3" />
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F7F4EC] tracking-tight">
              Industries & Domains
            </h2>
          </div>
          <p className="text-sm font-sans text-[#79AD98] max-w-sm">
            Storytelling frameworks adapted across 24+ industries without diluting sector nuance or authority.
          </p>
        </div>
      </div>

      {/* Kinetic Typography Marquee Track 1 (Left-moving) */}
      <div className="py-3 border-y border-[#053827]/60 overflow-hidden select-none bg-[#021D15]">
        <div className="animate-marquee flex items-center">
          {[...marqueeIndustriesRow1, ...marqueeIndustriesRow1].map((ind, i) => (
            <div key={i} className="flex items-center gap-8 px-6 shrink-0">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-wider text-[#DCEAE5] hover:text-[#C8A75A] transition-colors">
                {ind}
              </span>
              <span className="text-[#C8A75A] text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kinetic Typography Marquee Track 2 (Right-moving reverse) */}
      <div className="py-3 border-b border-[#053827]/60 overflow-hidden select-none bg-[#03291E]">
        <div className="animate-marquee-reverse flex items-center">
          {[...marqueeIndustriesRow2, ...marqueeIndustriesRow2].map((ind, i) => (
            <div key={i} className="flex items-center gap-8 px-6 shrink-0">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-wider text-[#AFCDC1] hover:text-[#C8A75A] transition-colors">
                {ind}
              </span>
              <span className="text-[#C8A75A] text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Pills Grid - subtle editorial layout */}
      <div className="editorial-container mt-12">
        <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
          {industriesData.map((item) => (
            <span
              key={item.name}
              className={`text-xs font-mono px-3.5 py-1.5 border transition-colors ${
                item.highlight
                  ? "border-[#C8A75A]/50 text-[#C8A75A] bg-[#021D15]"
                  : "border-[#053827] text-[#79AD98] bg-[#021D15]/50 hover:border-[#0A4C38] hover:text-[#DCEAE5]"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
