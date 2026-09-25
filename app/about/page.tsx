import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Mic, PenTool } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About the Journey | Vasanthaa",
  description:
    "Learn about Vasanthaa's background, artistic philosophy, and 2+ years of experience bridging content writing and voice-over artistry.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header Breadcrumb / Label */}
        <div className="mb-12">
          <SectionLabel number="01" label="THE STORY" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-3xl leading-[1.08]">
            Where Passion Meets <span className="italic text-[#C8A75A]">Discipline</span>.
          </h1>
        </div>

        {/* Narrative & Portrait Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#053827]">
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#AFCDC1] leading-relaxed font-sans">
            <p className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] italic leading-snug border-l-2 border-[#C8A75A] pl-6 py-1">
              &ldquo;I believe every brand or idea already has an inherent pulse. My craft is translating that pulse into the right words and tuning the voice that brings it to life.&rdquo;
            </p>

            <p>
              My journey did not begin in a corporate boardroom—it started with a love for literature, cadence, and how human voices carry emotion. Over time, that instinctual fascination transformed into a focused professional discipline.
            </p>

            <p>
              For over two years, I have worked as both a Content Writer and a Voice Over Artist. While most practitioners treat these as separate careers, I have discovered they feed each other directly: writing for the ear makes written copy more conversational and punchy; voicing scripts clarifies which words truly resonate when spoken aloud.
            </p>

            <p>
              From drafting high-retention reel hooks to voicing commercial campaigns and hosting on camera, I help founders, creative agencies, and brands articulate their distinct message.
            </p>

            {/* Quick Principles List */}
            <div className="pt-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#C8A75A]">
                Guiding Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#DCEAE5]">
                <div className="flex items-start gap-3 bg-[#053827]/60 p-4 border border-[#0A4C38]">
                  <PenTool className="w-4 h-4 text-[#C8A75A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#F7F4EC] font-serif text-base mb-1">Rhythm in Text</strong>
                    <span className="text-xs text-[#79AD98]">Writing designed for reading ease, retention, and sensory memory.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#053827]/60 p-4 border border-[#0A4C38]">
                  <Mic className="w-4 h-4 text-[#C8A75A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#F7F4EC] font-serif text-base mb-1">Vocal Sincerity</strong>
                    <span className="text-xs text-[#79AD98]">A voice that sounds like an authentic human being, not an announcer robot.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative w-full aspect-[4/5] bg-[#053827] border border-[#0A4C38] p-3">
              <div className="relative w-full h-full overflow-hidden bg-[#03291E]">
                <Image
                  src="/images/hero/vasanthaa.png"
                  alt="Vasanthaa - Content Writer & Voice Over Artist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 bg-[#021D15] border border-[#C8A75A] px-5 py-3 shadow-xl">
                <span className="font-serif text-3xl text-[#C8A75A] block leading-none">02+</span>
                <span className="text-[10px] font-mono tracking-widest text-[#F7F4EC] uppercase">Years Active Craft</span>
              </div>
            </div>

            {/* Experience Checklist */}
            <div className="bg-[#03291E] border border-[#053827] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#79AD98]">
                Proven Experience
              </h3>
              <ul className="space-y-2.5 text-xs text-[#AFCDC1]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A75A]" />
                  <span>Cross-genre writing (Reels, Articles, Manifestos)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A75A]" />
                  <span>Trained vocal dynamics across commercial & narration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A75A]" />
                  <span>On-camera presentation & creative video hosting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A75A]" />
                  <span>Collaborations spanning 24+ industry domains</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl text-[#F7F4EC]">
              Interested in collaborating on your next campaign?
            </h2>
            <p className="text-xs font-mono text-[#79AD98] mt-1">
              Available for writing commissions, voice recording, and on-camera hosting.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
