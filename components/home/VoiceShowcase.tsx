import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { projectsData } from "@/data/projects";
import { ArrowRight, Mic } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

export default function VoiceShowcase() {
  const voiceProjects = projectsData
    .filter((p) => p.category === "voice-over")
    .slice(0, 3);

  return (
    <section className="py-24 bg-[#021D15] border-b border-[#053827]" id="voice-showcase">
      <div className="editorial-container">
        {/* Header */}
        <Reveal direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionLabel number="04" label="VOICE SHOWCASE" className="mb-3" />
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F7F4EC] tracking-tight">
                Tuned for <span className="italic text-[#C8A75A]">Resonance</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#AFCDC1]">
              <Mic className="w-4 h-4 text-[#C8A75A]" />
              <span>Studio Voice Samples • Broadcast Mastered</span>
            </div>
          </div>
        </Reveal>

        {/* Audio Players Stack with Staggered Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {voiceProjects.map((voice, idx) => (
            <Reveal
              key={voice.id}
              direction="up"
              delay={idx * 0.14}
              duration={0.7}
              className="h-full"
            >
              <AudioPlayer
                id={voice.id}
                sampleNumber={`0${idx + 1}`}
                title={voice.title}
                category={voice.contentType}
                language={voice.language || "English"}
                tone={voice.tone}
                durationFormatted={voice.duration || "00:42"}
                audioSrc={voice.audioSrc}
              />
            </Reveal>
          ))}
        </div>

        {/* Bottom Bar */}
        <Reveal direction="up" delay={0.3} duration={0.6}>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-[#053827]">
            <p className="text-xs font-mono text-[#79AD98]">
              Need a custom audition or live direction session?
            </p>
            <Link
              href="/work/voice-over"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
            >
              <span>Explore all vocal recordings & reels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
