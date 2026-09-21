import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { projectsData } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const writtenProjects = projectsData.filter((p) => p.category === "written");
  return writtenProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Vasanthaa`,
    description: project.summary,
  };
}

export default async function WrittenProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/work/written"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#79AD98] hover:text-[#C8A75A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Written Portfolio</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="border-b border-[#053827] pb-12 mb-12">
          <SectionLabel label="CASE STUDY" className="mb-4" />
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F7F4EC] tracking-tight leading-[1.1] max-w-4xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-[#AFCDC1] font-sans leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Metadata Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#053827] pt-8">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#79AD98]">
                Industry
              </span>
              <span className="mt-1 block font-sans text-sm text-[#F7F4EC]">
                {project.industry}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#79AD98]">
                Content Format
              </span>
              <span className="mt-1 block font-sans text-sm text-[#F7F4EC]">
                {project.contentType}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#79AD98]">
                Year
              </span>
              <span className="mt-1 block font-sans text-sm text-[#F7F4EC]">
                {project.year}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#79AD98]">
                Client / Brand
              </span>
              <span className="mt-1 block font-sans text-sm text-[#F7F4EC]">
                {project.client || "Confidential Partner"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 space-y-10 text-base sm:text-lg text-[#AFCDC1] leading-relaxed font-sans">
            {/* Goal Callout */}
            {project.goal && (
              <div className="bg-[#03291E] border border-[#0A4C38] p-6 sm:p-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block mb-2">
                  Project Challenge & Goal
                </span>
                <p className="font-serif text-xl text-[#F7F4EC] italic leading-normal">
                  &ldquo;{project.goal}&rdquo;
                </p>
              </div>
            )}

            {/* Script Excerpt */}
            {project.writtenExcerpt && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#F7F4EC]">
                  Script Excerpt & Hook Structure
                </h3>
                <div className="bg-[#021D15] border-l-2 border-[#C8A75A] p-6 text-[#DCEAE5] font-serif text-xl italic leading-relaxed">
                  &ldquo;{project.writtenExcerpt}&rdquo;
                </div>
              </div>
            )}

            {/* Full Story Blocks */}
            {project.fullContent && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#F7F4EC]">
                  Strategic Approach & Execution
                </h3>
                {project.fullContent.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Key Deliverables & Highlights */}
            {project.keyHighlights && (
              <div className="border-t border-[#053827] pt-8 space-y-4">
                <h3 className="font-serif text-2xl text-[#F7F4EC]">
                  Campaign Results & Key Highlights
                </h3>
                <ul className="space-y-3">
                  {project.keyHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#DCEAE5]">
                      <Check className="w-4 h-4 text-[#C8A75A] shrink-0 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="border border-[#053827] bg-[#03291E] p-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block">
                Commission Similar Work
              </span>
              <p className="text-sm text-[#AFCDC1]">
                Need high-retention reel scripts or brand storytelling for your niche?
              </p>
              <Link
                href={`/contact?service=Content+Writing&details=${encodeURIComponent(`Inspired by ${project.title}`)}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C8A75A] text-[#021D15] py-3.5 px-6 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
              >
                <span>Inquire About Writing</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {project.originalLink && (
              <div className="p-4 border border-[#053827] text-xs font-mono text-[#79AD98]">
                <span className="block mb-2">Supporting Reference:</span>
                <a
                  href={project.originalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A75A] hover:underline flex items-center gap-1"
                >
                  <span>View original archival document</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
