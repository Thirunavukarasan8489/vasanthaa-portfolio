import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <div className="bg-[#021D15] min-h-[70vh] flex items-center justify-center py-24">
      <div className="editorial-container text-center max-w-xl space-y-6">
        <SectionLabel number="404" label="NOT FOUND" className="mx-auto" />

        <h1 className="font-serif text-5xl sm:text-6xl text-[#F7F4EC] tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm font-sans text-[#AFCDC1] leading-relaxed">
          The page or case study you are looking for does not exist or has been moved. Explore the portfolio or return home.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#C8A75A] text-[#021D15] px-6 py-3 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border border-[#0A4C38] px-6 py-3 text-xs font-mono uppercase tracking-widest text-[#AFCDC1] hover:border-[#C8A75A] hover:text-[#F7F4EC] transition-all"
          >
            <span>View All Work</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
