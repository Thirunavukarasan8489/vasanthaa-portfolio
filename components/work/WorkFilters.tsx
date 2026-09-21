"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectItem } from "@/types/project";
import { ArrowUpRight } from "lucide-react";
import AudioPlayer from "@/components/audio/AudioPlayer";

interface WorkFiltersProps {
  initialProjects: ProjectItem[];
}

export default function WorkFilters({ initialProjects }: WorkFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "written" | "voice-over" | "on-camera">("all");

  const filteredProjects = initialProjects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#053827] pb-6 mb-12">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all ${
            activeFilter === "all"
              ? "bg-[#C8A75A] text-[#021D15] font-semibold"
              : "border border-[#053827] text-[#AFCDC1] hover:border-[#0A4C38] hover:text-[#F7F4EC]"
          }`}
        >
          All Works ({initialProjects.length})
        </button>

        <button
          onClick={() => setActiveFilter("written")}
          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all ${
            activeFilter === "written"
              ? "bg-[#C8A75A] text-[#021D15] font-semibold"
              : "border border-[#053827] text-[#AFCDC1] hover:border-[#0A4C38] hover:text-[#F7F4EC]"
          }`}
        >
          Words, Written ({initialProjects.filter((p) => p.category === "written").length})
        </button>

        <button
          onClick={() => setActiveFilter("voice-over")}
          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all ${
            activeFilter === "voice-over"
              ? "bg-[#C8A75A] text-[#021D15] font-semibold"
              : "border border-[#053827] text-[#AFCDC1] hover:border-[#0A4C38] hover:text-[#F7F4EC]"
          }`}
        >
          Words, Voiced ({initialProjects.filter((p) => p.category === "voice-over").length})
        </button>

        <button
          onClick={() => setActiveFilter("on-camera")}
          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all ${
            activeFilter === "on-camera"
              ? "bg-[#C8A75A] text-[#021D15] font-semibold"
              : "border border-[#053827] text-[#AFCDC1] hover:border-[#0A4C38] hover:text-[#F7F4EC]"
          }`}
        >
          On-Camera ({initialProjects.filter((p) => p.category === "on-camera").length})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          if (project.category === "voice-over") {
            return (
              <div key={project.id} className="h-full">
                <AudioPlayer
                  id={project.id}
                  title={project.title}
                  category={project.industry}
                  language={project.language}
                  tone={project.tone}
                  durationFormatted={project.duration}
                  audioSrc={project.audioSrc}
                />
              </div>
            );
          }

          return (
            <div
              key={project.id}
              className="bg-[#03291E] border border-[#053827] p-8 flex flex-col justify-between hover:border-[#0A4C38] transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#79AD98] mb-4">
                  <span className="uppercase text-[#C8A75A] tracking-wider">
                    {project.category === "written" ? "Words, Written" : "On-Camera"}
                  </span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#F7F4EC] mb-3">
                  {project.title}
                </h3>

                <p className="text-sm text-[#AFCDC1] leading-relaxed mb-6 font-sans">
                  {project.summary}
                </p>

                <div className="border-t border-[#053827] pt-4 mb-6 flex flex-wrap gap-2 text-[11px] font-mono text-[#79AD98]">
                  <span className="bg-[#021D15] px-2.5 py-1 border border-[#053827]">
                    {project.industry}
                  </span>
                  <span className="bg-[#021D15] px-2.5 py-1 border border-[#053827]">
                    {project.contentType}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#053827]/60 flex items-center justify-between">
                {project.category === "written" ? (
                  <Link
                    href={`/work/written/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/work/on-camera"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C8A75A] hover:text-[#D7BC76] transition-colors"
                  >
                    <span>View on-camera feature</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
