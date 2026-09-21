import { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import WorkFilters from "@/components/work/WorkFilters";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work | Vasanthaa",
  description:
    "Explore the creative portfolio of Vasanthaa: written campaigns, reel scripts, commercial voice overs, and on-camera storytelling.",
};

export default function WorkPage() {
  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-12 border-b border-[#053827] pb-10">
          <SectionLabel number="03" label="PORTFOLIO" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-3xl leading-[1.08]">
            Selected <span className="italic text-[#C8A75A]">Portfolio</span>.
          </h1>
          <p className="mt-4 text-base text-[#AFCDC1] max-w-xl font-sans leading-relaxed">
            A curated selection of written scripts, voice-over recordings, and on-camera presentations across varied industries.
          </p>
        </div>

        {/* Interactive Filterable Work Archive */}
        <WorkFilters initialProjects={projectsData} />
      </div>
    </div>
  );
}
