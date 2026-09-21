import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Words, Written | Vasanthaa Portfolio",
  description:
    "Explore written works by Vasanthaa: reel scripts, brand manifestos, carousel campaigns, and educational storytelling.",
};

export default function WrittenWorkPage() {
  const writtenProjects = projectsData.filter((p) => p.category === "written");

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-16 border-b border-[#053827] pb-12">
          <SectionLabel number="03A" label="WORDS, WRITTEN" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-4xl leading-[1.08]">
            Scripts, Concepts & <br />
            <span className="italic text-[#C8A75A]">Brand Narratives</span>.
          </h1>
          <p className="mt-4 text-base text-[#AFCDC1] max-w-2xl font-sans leading-relaxed">
            Writing that pairs editorial precision with retention-engineered hook mechanics. Click into any case study to read excerpts and strategic breakdowns.
          </p>
        </div>

        {/* Written Projects List */}
        <div className="space-y-12">
          {writtenProjects.map((project, idx) => (
            <article
              key={project.id}
              className="border border-[#053827] bg-[#03291E] p-8 md:p-12 hover:border-[#0A4C38] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#79AD98]">
                    <span className="text-[#C8A75A]">CASE STUDY 0{idx + 1}</span>
                    <span>•</span>
                    <span>{project.industry}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F4EC] tracking-tight">
                    <Link
                      href={`/work/written/${project.slug}`}
                      className="hover:text-[#C8A75A] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-base text-[#AFCDC1] font-sans leading-relaxed max-w-2xl">
                    {project.summary}
                  </p>

                  {/* Excerpt quote */}
                  {project.writtenExcerpt && (
                    <blockquote className="border-l-2 border-[#C8A75A] pl-4 py-1 italic font-serif text-[#DCEAE5] text-lg bg-[#021D15]/40 max-w-2xl">
                      &ldquo;{project.writtenExcerpt}&rdquo;
                    </blockquote>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-[#053827] lg:pl-8">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#79AD98] block">
                      Content Format
                    </span>
                    <span className="text-sm font-sans text-[#F7F4EC] block">
                      {project.contentType}
                    </span>

                    {project.client && (
                      <div className="pt-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#79AD98] block">
                          Client / Partner
                        </span>
                        <span className="text-sm font-sans text-[#F7F4EC] block">
                          {project.client}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Link
                      href={`/work/written/${project.slug}`}
                      className="inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
                    >
                      <span>Read Case Study</span>
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
