import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animation/Reveal";

export default function FeaturedWork() {
  return (
    <section className="py-24 bg-[#03291E] border-b border-[#053827]" id="work-preview">
      <div className="editorial-container">
        {/* Section Header */}
        <Reveal direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <SectionLabel number="03" label="PORTFOLIO DISCIPLINED" className="mb-3" />
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F7F4EC] tracking-tight">
                Selected Disciplines
              </h2>
            </div>
            <p className="text-xs font-mono text-[#79AD98] uppercase tracking-widest">
              Three Expressions • One Storyteller
            </p>
          </div>
        </Reveal>

        {/* Asymmetrical 3-Category Layout */}
        <div className="space-y-20">
          {/* CATEGORY 01: WORDS, WRITTEN (Left-leaning) */}
          <Reveal direction="up" delay={0.1} duration={0.7} className="relative border-t border-[#053827] pt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
              <div className="md:col-span-2">
                <span className="font-mono text-4xl lg:text-5xl text-[#C8A75A]/40 font-light">
                  01
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#79AD98] mt-1">
                  Drafted & Sculpted
                </span>
              </div>

              <div className="md:col-span-6 space-y-4">
                <h3 className="font-serif text-3xl lg:text-4xl text-[#F7F4EC] tracking-tight">
                  WORDS,<br />
                  <span className="italic text-[#C8A75A]">WRITTEN.</span>
                </h3>
                <p className="text-base text-[#AFCDC1] font-sans leading-relaxed max-w-lg">
                  Scripts, editorial essays, brand manifestos, and short-form video concepts across wellness, technology, food, and architecture.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-[#79AD98] pt-2">
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Reel Scripts</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Brand Campaigns</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Carousels</span>
                </div>
              </div>

              <div className="md:col-span-4 flex md:justify-end items-center">
                <Link
                  href="/work/written"
                  className="group inline-flex items-center gap-2 border border-[#C8A75A] px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-[#F7F4EC] hover:bg-[#C8A75A] hover:text-[#021D15] transition-all"
                >
                  <span>Explore writing</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* CATEGORY 02: WORDS, VOICED (Right-leaning alignment) */}
          <Reveal direction="up" delay={0.15} duration={0.7} className="relative border-t border-[#053827] pt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
              <div className="md:col-span-4 order-3 md:order-1 flex md:justify-start items-center">
                <Link
                  href="/work/voice-over"
                  className="group inline-flex items-center gap-2 border border-[#C8A75A] px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-[#F7F4EC] hover:bg-[#C8A75A] hover:text-[#021D15] transition-all"
                >
                  <span>Listen to voice samples</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="md:col-span-6 md:text-right order-2 space-y-4">
                <h3 className="font-serif text-3xl lg:text-4xl text-[#F7F4EC] tracking-tight">
                  WORDS,<br />
                  <span className="italic text-[#C8A75A]">VOICED.</span>
                </h3>
                <p className="text-base text-[#AFCDC1] font-sans leading-relaxed max-w-lg md:ml-auto">
                  Commercials, brand anthems, narrative audiobooks, and reel voiceovers performed with studio fidelity and evocative cadence.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-[#79AD98] pt-2 md:justify-end">
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Commercials</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Narration</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Explainers</span>
                </div>
              </div>

              <div className="md:col-span-2 order-1 md:order-3 md:text-right">
                <span className="font-mono text-4xl lg:text-5xl text-[#C8A75A]/40 font-light">
                  02
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#79AD98] mt-1">
                  Spoken & Mastered
                </span>
              </div>
            </div>
          </Reveal>

          {/* CATEGORY 03: ON CAMERA (Wide editorial banner) */}
          <Reveal direction="up" delay={0.2} duration={0.7} className="relative border-t border-[#053827] pt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
              <div className="md:col-span-2">
                <span className="font-mono text-4xl lg:text-5xl text-[#C8A75A]/40 font-light">
                  03
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#79AD98] mt-1">
                  Presented & Framed
                </span>
              </div>

              <div className="md:col-span-6 space-y-4">
                <h3 className="font-serif text-3xl lg:text-4xl text-[#F7F4EC] tracking-tight">
                  ON<br />
                  <span className="italic text-[#C8A75A]">CAMERA.</span>
                </h3>
                <p className="text-base text-[#AFCDC1] font-sans leading-relaxed max-w-lg">
                  Presenting scripts, creative hosting, brand spotlights, and masterclasses brought to life directly in front of the lens.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-[#79AD98] pt-2">
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Host & Presenter</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Brand Spotlights</span>
                  <span className="bg-[#053827] px-2.5 py-1 text-[#DCEAE5]">Masterclasses</span>
                </div>
              </div>

              <div className="md:col-span-4 flex md:justify-end items-center">
                <Link
                  href="/work/on-camera"
                  className="group inline-flex items-center gap-2 border border-[#C8A75A] px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-[#F7F4EC] hover:bg-[#C8A75A] hover:text-[#021D15] transition-all"
                >
                  <span>Explore on-camera</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
