import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mic, Volume2, Radio } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Words, Voiced | Voice Over Portfolio | Vasanthaa",
  description:
    "Listen to commercial voice overs, narration, reel audio, and explainer voice samples by Vasanthaa with custom interactive playback.",
};

export default function VoiceOverWorkPage() {
  const voiceProjects = projectsData.filter((p) => p.category === "voice-over");

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-16 border-b border-[#053827] pb-12">
          <SectionLabel number="03B" label="WORDS, VOICED" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-4xl leading-[1.08]">
            Voice, Tuned for <br />
            <span className="italic text-[#C8A75A]">Atmosphere & Precision</span>.
          </h1>
          <p className="mt-4 text-base text-[#AFCDC1] max-w-2xl font-sans leading-relaxed">
            Every audio sample is mastered to broadcast loudness standards in a sound-treated recording studio. Click play on any track to preview cadence and tone.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-[#79AD98]">
            <div className="flex items-center gap-2">
              <Mic className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>Broadcast Quality Studio</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>English & Neutral Global Accents</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>48kHz / 24-bit WAV & Mastered MP3</span>
            </div>
          </div>
        </div>

        {/* Audio Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {voiceProjects.map((project, idx) => (
            <div key={project.id} className="space-y-4">
              <AudioPlayer
                id={project.id}
                sampleNumber={`0${idx + 1}`}
                title={project.title}
                category={project.contentType}
                language={project.language}
                tone={project.tone}
                durationFormatted={project.duration}
                audioSrc={project.audioSrc}
              />

              <div className="p-4 bg-[#03291E] border border-[#053827] space-y-2 text-xs">
                <p className="text-[#AFCDC1] font-sans">
                  {project.summary}
                </p>
                {project.keyHighlights && (
                  <ul className="text-[#79AD98] font-mono space-y-1 pt-1 border-t border-[#053827]">
                    {project.keyHighlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#C8A75A]">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Audition Box */}
        <div className="border border-[#0A4C38] bg-[#03291E] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block">
              Audition Service
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EC]">
              Need a custom sample for your script?
            </h2>
            <p className="text-sm text-[#AFCDC1] font-sans">
              Send over a 2–3 line excerpt from your upcoming campaign, and I will record a complimentary audition sample matching your desired tempo and tone.
            </p>
          </div>

          <Link
            href="/contact?service=Voice+Over&details=Custom+script+audition+request"
            className="shrink-0 inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-7 py-4 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
          >
            <span>Request Free Audition</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
