import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animation/Reveal";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-[#021D15] border-b border-[#053827]" id="about-preview">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Big Editorial Header & Experience Stamp */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" duration={0.6}>
              <SectionLabel number="07" label="ABOUT ME" />

              <h2 className="font-serif text-4xl lg:text-6xl font-normal text-[#F7F4EC] tracking-tight leading-[1.1] mt-4">
                Where<br />
                <span className="italic text-[#C8A75A]">I am now.</span>
              </h2>
            </Reveal>

            {/* Asymmetrical 02+ Years Badge */}
            <Reveal direction="up" delay={0.2} duration={0.65}>
              <div className="border border-[#0A4C38] bg-[#053827] p-6 max-w-xs relative shadow-xl">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C8A75A]" />
                <span className="block font-serif text-4xl text-[#C8A75A]">
                  02+
                </span>
                <span className="block text-xs font-mono tracking-widest text-[#F7F4EC] uppercase mt-1">
                  Years of Dedicated Craft
                </span>
                <p className="text-xs text-[#79AD98] mt-2 font-sans leading-relaxed">
                  Sculpting scripts and voicing campaigns across 24+ industry domains.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Narrative Story */}
          <Reveal direction="up" delay={0.25} duration={0.7} className="lg:col-span-7 space-y-6 text-base text-[#AFCDC1] font-sans leading-relaxed">
            <p className="font-serif text-xl sm:text-2xl text-[#F7F4EC] italic leading-normal border-l-2 border-[#C8A75A] pl-5 py-1">
              &ldquo;What began as an instinctive obsession with phrasing and vocal cadence has grown into a deliberate professional discipline.&rdquo;
            </p>

            <p>
              For the past two years, I have worked at the intersection of language and voice. When writing, my focus is clarity and rhythm—finding the exact turn of phrase that turns an indifferent viewer into a captivated listener.
            </p>

            <p>
              Behind the microphone, that same sensibility translates into breath control, emotional inflection, and tone calibration. Words and voice are not separate skills for me; they are two sides of the same storytelling coin.
            </p>

            <p>
              Today, I bring behind-the-scenes concepts into the spotlight—whether writing the script, narrating the reel, or hosting on camera.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A75A] hover:text-[#D7BC76] transition-colors border-b border-[#0A4C38] pb-1 hover:border-[#C8A75A]"
              >
                <span>Read full background & philosophy</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
