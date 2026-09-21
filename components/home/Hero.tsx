import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, PencilSparkles } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#021D15] pt-12 pb-20 md:pt-20 md:pb-32 border-b border-[#053827]">
      {/* Editorial Decorative Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#053827_1px,transparent_1px),linear-gradient(to_bottom,#053827_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="editorial-container relative">
        {/* DESKTOP & TABLET LAYOUT */}
        <div className="hidden md:grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Editorial Typography */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-8">
            {/* Section label */}
            <SectionLabel number="01" label="HELLO" />

            {/* Main Greeting & Heading */}
            <div className="space-y-2">
              <span className="font-handwriting text-3xl lg:text-4xl text-[#C8A75A] block">
                Hello,
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl font-normal tracking-tight text-[#F7F4EC] leading-[1.08]">
                I&apos;m Vasanthaa<span className="text-[#C8A75A]">.</span>
              </h1>
            </div>

            {/* Subtitles: Content Writer & Voice Over Artist */}
            <div className="border-l-2 border-[#C8A75A] pl-5 space-y-1 py-1">
              <h2 className="text-sm lg:text-base font-mono uppercase tracking-widest text-[#DCEAE5]">
                Content Writer
              </h2>
              <h2 className="text-sm lg:text-base font-mono uppercase tracking-widest text-[#AFCDC1]">
                Voice Over Artist
              </h2>
              <p className="text-xs text-[#79AD98] font-mono tracking-wider pt-1">
                Creative Storyteller
              </p>
            </div>

            {/* Core Brand Positioning */}
            <p className="font-serif italic text-2xl lg:text-3xl text-[#DCEAE5] leading-relaxed max-w-xl font-light">
              &ldquo;I shape thoughts into words and tune voices that make every
              message felt.&rdquo;
            </p>

            {/* Aesthetic Words x Voice Identity Graphic */}
            <div className="flex items-center gap-6 pt-2 text-xs font-mono text-[#AFCDC1]">
              <div className="flex items-center gap-2">
                <span className="text-[#C8A75A]">Words</span>
                <span className="text-[#0A4C38]">────────</span>
              </div>
              <span className="text-[#C8A75A]">×</span>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A75A]">Voice</span>
                <span className="text-[#C8A75A]/60">∿∿∿∿∿∿</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex items-center gap-6">
              <Link
                href="#work-preview"
                className="group inline-flex items-center gap-2.5 bg-[#C8A75A] text-[#021D15] px-7 py-4 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
              >
                <span>Explore my work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#DCEAE5] hover:text-[#C8A75A] transition-colors border-b border-[#0A4C38] pb-1 hover:border-[#C8A75A]"
              >
                <span>Start a conversation</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column — Editorial Portrait Presentation */}
          <div className="md:col-span-5 relative flex justify-center">
            {/* Experience Stamp */}
            <div className="absolute -top-6 -left-6 z-20 bg-[#053827] border border-[#C8A75A]/40 p-4 shadow-xl backdrop-blur-md">
              <span className="block font-serif text-3xl text-[#C8A75A] leading-none">
                02+
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-[#F7F4EC] uppercase mt-1">
                Years
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-[#79AD98] uppercase">
                Experience
              </span>
            </div>

            {/* Frame & Image */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] bg-[#053827] border border-[#0A4C38] p-3">
              {/* Outer decorative line offset */}
              <div className="absolute -inset-2 border border-[#C8A75A]/30 pointer-events-none" />

              <div className="relative w-full h-full overflow-hidden bg-[#03291E]">
                <Image
                  src="/images/hero/vasanthaa.png"
                  alt="Vasanthaa - Content Writer and Voice Over Artist"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Bottom tag */}
              <div className="absolute bottom-6 right-6 bg-[#021D15]/90 border border-[#053827] px-3 py-1.5 text-[11px] font-mono text-[#C8A75A] flex items-center gap-1.5 backdrop-blur-sm">
                <PencilSparkles className="w-3 h-3 text-[#C8A75A]" />
                <span>Available for Q2 Collaborations</span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (Independently Composed) */}
        <div className="flex md:hidden flex-col space-y-6">
          <SectionLabel number="01" label="HELLO" />

          <div>
            <span className="font-handwriting text-2xl text-[#C8A75A] block">
              Hello,
            </span>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-[#F7F4EC] leading-tight">
              I&apos;m Vasanthaa<span className="text-[#C8A75A]">.</span>
            </h1>
          </div>

          {/* Portrait in center */}
          <div className="relative w-full aspect-[4/5] max-w-[320px] mx-auto bg-[#053827] border border-[#0A4C38] p-2">
            <div className="absolute -top-3 -right-3 z-10 bg-[#053827] border border-[#C8A75A] px-3 py-1 text-[11px] font-mono text-[#C8A75A]">
              02+ YRS EXP
            </div>
            <div className="relative w-full h-full overflow-hidden bg-[#03291E]">
              <Image
                src="/images/hero/vasanthaa.png"
                alt="Vasanthaa - Content Writer and Voice Over Artist"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Roles */}
          <div className="border-l-2 border-[#C8A75A] pl-4 space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#DCEAE5]">
              Content Writer & Voice Over Artist
            </h2>
            <p className="text-xs text-[#79AD98] font-mono">
              Creative Storyteller
            </p>
          </div>

          {/* Message */}
          <p className="font-serif italic text-lg text-[#DCEAE5] leading-snug">
            &ldquo;I shape thoughts into words and tune voices that make every
            message felt.&rdquo;
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="#work-preview"
              className="flex items-center justify-center gap-2 bg-[#C8A75A] text-[#021D15] py-3.5 px-6 text-xs font-mono uppercase tracking-widest font-semibold text-center"
            >
              <span>Explore my work</span>
              <ArrowDownRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border border-[#0A4C38] py-3 px-6 text-xs font-mono uppercase tracking-widest text-[#AFCDC1] text-center"
            >
              <span>Contact Vasanthaa</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
