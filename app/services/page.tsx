import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Content Writing & Voice Over",
  description:
    "Explore comprehensive content writing and voice-over services offered by Vasanthaa, including reel scripts, commercial voice overs, brand narratives, and explainers.",
};

export default function ServicesPage() {
  const writingServices = servicesData.filter((s) => s.category === "writing");
  const voiceServices = servicesData.filter((s) => s.category === "voice-over");

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-16 border-b border-[#053827] pb-12">
          <SectionLabel number="02" label="SERVICES CATALOG" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-4xl leading-[1.08]">
            Strategic Words, <br />
            <span className="italic text-[#C8A75A]">Mastered Voice.</span>
          </h1>
          <p className="mt-6 text-base text-[#AFCDC1] max-w-2xl font-sans leading-relaxed">
            Detailed service specifications designed for brands seeking authentic resonance across written and vocal media.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono">
            <a
              href="#writing-services"
              className="border border-[#0A4C38] px-4 py-2 text-[#DCEAE5] hover:border-[#C8A75A] transition-colors"
            >
              ↓ Jump to Content Writing (10 Services)
            </a>
            <a
              href="#voice-services"
              className="border border-[#0A4C38] px-4 py-2 text-[#DCEAE5] hover:border-[#C8A75A] transition-colors"
            >
              ↓ Jump to Voice Over (10 Services)
            </a>
          </div>
        </div>

        {/* SECTION 1: CONTENT WRITING */}
        <div id="writing-services" className="mb-24 pt-4">
          <div className="flex items-center justify-between border-b border-[#0A4C38] pb-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block mb-1">
                Discipline 01
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EC]">
                Content Writing Services
              </h2>
            </div>
            <span className="text-xs font-mono text-[#79AD98] hidden sm:block">
              10 Offerings Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {writingServices.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="relative bg-[#03291E] border border-[#053827] p-8 hover:border-[#0A4C38] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#C8A75A]">
                      0{idx + 1}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-mono tracking-widest uppercase bg-[#053827] text-[#C8A75A] px-2.5 py-1">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl text-[#F7F4EC] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#AFCDC1] leading-relaxed mb-6 font-sans">
                    {service.fullDesc || service.shortDesc}
                  </p>

                  {service.deliverables && (
                    <div className="space-y-2 border-t border-[#053827] pt-4 mb-6">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#79AD98] block">
                        Included Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#DCEAE5]">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C8A75A] shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#053827]/60 flex items-center justify-between">
                  <Link
                    href={`/contact?service=${encodeURIComponent("Content Writing")}&details=${encodeURIComponent(`Inquiry for ${service.title}`)}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
                  >
                    <span>Request this service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: VOICE OVER */}
        <div id="voice-services" className="mb-24 pt-4">
          <div className="flex items-center justify-between border-b border-[#0A4C38] pb-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block mb-1">
                Discipline 02
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EC]">
                Voice Over Services
              </h2>
            </div>
            <span className="text-xs font-mono text-[#79AD98] hidden sm:block">
              10 Vocal Styles Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {voiceServices.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="relative bg-[#03291E] border border-[#053827] p-8 hover:border-[#0A4C38] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#C8A75A]">
                      0{idx + 1}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-mono tracking-widest uppercase bg-[#053827] text-[#C8A75A] px-2.5 py-1">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl text-[#F7F4EC] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#AFCDC1] leading-relaxed mb-6 font-sans">
                    {service.fullDesc || service.shortDesc}
                  </p>

                  {service.deliverables && (
                    <div className="space-y-2 border-t border-[#053827] pt-4 mb-6">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#79AD98] block">
                        Included Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#DCEAE5]">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C8A75A] shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#053827]/60 flex items-center justify-between">
                  <Link
                    href={`/contact?service=${encodeURIComponent("Voice Over")}&details=${encodeURIComponent(`Inquiry for ${service.title}`)}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
                  >
                    <span>Request vocal audition</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="border border-[#0A4C38] bg-[#03291E] p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EC]">
            Need a combined Words × Voice package?
          </h2>
          <p className="text-sm text-[#AFCDC1] max-w-lg mx-auto font-sans leading-relaxed">
            I offer bundled solutions where I write the script from scratch and then voice/perform it for maximum brand coherence.
          </p>
          <Link
            href="/contact?service=Combination+%2F+Other"
            className="inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-8 py-4 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
          >
            <span>Commission a Package</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
