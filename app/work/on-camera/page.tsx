import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Play, Video, Film, Award } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "On-Camera Work | Vasanthaa Portfolio",
  description:
    "Explore on-camera work, brand hosting, masterclasses, and visual storytelling performed by Vasanthaa.",
};

export default function OnCameraWorkPage() {
  const cameraProjects = projectsData.filter((p) => p.category === "on-camera");

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-16 border-b border-[#053827] pb-12">
          <SectionLabel number="03C" label="ON-CAMERA WORK" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-4xl leading-[1.08]">
            Bringing Words & Voice <br />
            <span className="italic text-[#C8A75A]">Into the Frame</span>.
          </h1>
          <p className="mt-4 text-base text-[#AFCDC1] max-w-2xl font-sans leading-relaxed">
            Creative hosting, direct-to-lens education, artisan spotlights, and brand walkthroughs. Natural camera presence paired with spontaneous script delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-[#79AD98]">
            <div className="flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>Studio & Location Production</span>
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>Short-form Reels & Long-form Features</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>Teleprompter-Free Fluid Delivery</span>
            </div>
          </div>
        </div>

        {/* On Camera Showcase Grid */}
        <div className="space-y-16 mb-20">
          {cameraProjects.map((project, idx) => (
            <article
              key={project.id}
              className="border border-[#053827] bg-[#03291E] p-8 md:p-12 hover:border-[#0A4C38] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Video Poster / Thumbnail */}
                <div className="lg:col-span-5 relative aspect-video bg-[#021D15] border border-[#0A4C38] flex items-center justify-center group overflow-hidden">
                  {/* Subtle Video Poster Graphic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021D15] via-transparent to-transparent z-10" />

                  <div className="relative z-20 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full border border-[#C8A75A] bg-[#053827]/90 flex items-center justify-center text-[#C8A75A] group-hover:scale-110 group-hover:bg-[#C8A75A] group-hover:text-[#021D15] transition-all shadow-xl">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#DCEAE5] bg-[#021D15]/80 px-2.5 py-1">
                      {project.videoDuration || "01:30"} Preview
                    </span>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-[#C8A75A] tracking-wider uppercase">
                    FEATURE 0{idx + 1}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#79AD98]">
                    <span className="text-[#C8A75A]">{project.industry}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.contentType}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-base text-[#AFCDC1] font-sans leading-relaxed">
                    {project.summary}
                  </p>

                  {project.roleDescription && (
                    <div className="p-3.5 bg-[#021D15] border-l-2 border-[#C8A75A] text-xs font-mono text-[#DCEAE5]">
                      <span className="text-[#79AD98] uppercase block text-[10px]">On-Camera Role:</span>
                      <span>{project.roleDescription}</span>
                    </div>
                  )}

                  {project.keyHighlights && (
                    <ul className="space-y-1.5 pt-2 text-xs text-[#AFCDC1]">
                      {project.keyHighlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#C8A75A]">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4">
                    <Link
                      href={`/contact?service=On+Camera&details=${encodeURIComponent(`Inquiry for ${project.title}`)}`}
                      className="inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
                    >
                      <span>Book for On-Camera Production</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
