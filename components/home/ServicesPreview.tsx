import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { servicesData } from "@/data/services";
import { ArrowRight } from "lucide-react";

export default function ServicesPreview() {
  const writingServices = servicesData.filter((s) => s.category === "writing");
  const voiceServices = servicesData.filter((s) => s.category === "voice-over");

  return (
    <section className="py-24 bg-[#021D15] border-b border-[#053827]" id="services">
      <div className="editorial-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel number="02" label="SERVICES" className="mb-3" />
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F7F4EC] tracking-tight">
              Dual Craft: <span className="italic text-[#C8A75A]">Words × Voice</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-[#79AD98] max-w-md">
            Whether through the written page or behind the microphone, every deliverable is crafted for nuance, rhythm, and genuine emotional resonance.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Column 1: Content Writing */}
          <div className="space-y-6">
            <div className="border-b border-[#0A4C38] pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#F7F4EC] tracking-wide">
                  Content Writing
                </h3>
                <span className="text-xs font-mono text-[#C8A75A]">01</span>
              </div>
              <p className="text-xs font-mono text-[#79AD98] mt-1 flex items-center gap-2">
                <span>Straight Editorial Lines</span>
                <span className="text-[#C8A75A]">────────────</span>
              </p>
            </div>

            <ul className="divide-y divide-[#053827]" role="list">
              {writingServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="group flex items-center justify-between py-4 transition-all duration-200 hover:pl-2"
                  >
                    <div>
                      <span className="font-serif text-lg text-[#DCEAE5] group-hover:text-[#C8A75A] transition-colors">
                        {service.title}
                      </span>
                      <p className="text-xs text-[#79AD98] mt-0.5 line-clamp-1 max-w-md font-sans">
                        {service.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center text-[#79AD98] group-hover:text-[#C8A75A] transition-all">
                      <span className="inline-block transition-all duration-300 transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
              >
                <span>View all writing specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Voice Over */}
          <div className="space-y-6">
            <div className="border-b border-[#0A4C38] pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#F7F4EC] tracking-wide">
                  Voice Over
                </h3>
                <span className="text-xs font-mono text-[#C8A75A]">02</span>
              </div>
              <p className="text-xs font-mono text-[#79AD98] mt-1 flex items-center gap-2">
                <span>Waveform Dynamics</span>
                <span className="text-[#C8A75A]">∿∿∿∿∿∿∿∿</span>
              </p>
            </div>

            <ul className="divide-y divide-[#053827]" role="list">
              {voiceServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="group flex items-center justify-between py-4 transition-all duration-200 hover:pl-2"
                  >
                    <div>
                      <span className="font-serif text-lg text-[#DCEAE5] group-hover:text-[#C8A75A] transition-colors">
                        {service.title}
                      </span>
                      <p className="text-xs text-[#79AD98] mt-0.5 line-clamp-1 max-w-md font-sans">
                        {service.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center text-[#79AD98] group-hover:text-[#C8A75A] transition-all">
                      <span className="inline-block transition-all duration-300 transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
              >
                <span>View all voice over specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
