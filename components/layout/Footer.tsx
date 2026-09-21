import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/social-links";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#021D15] border-t border-[#053827] text-[#DCEAE5] pt-16 pb-12">
      <div className="editorial-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#053827]">
          {/* Brand Column */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl md:text-4xl text-[#F7F4EC] tracking-tight block">
                VASANTHAA<sup className="text-xs text-[#C8A75A] ml-1">®</sup>
              </span>
              <p className="mt-4 text-sm tracking-wide text-[#79AD98] max-w-md font-sans">
                Content Writer & Voice Over Artist shaping thoughts into words and tuning voices that make every message felt.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#C8A75A]">
              <span>Words</span>
              <span className="opacity-40">────────────</span>
              <span>Voice</span>
              <span className="opacity-40">∿∿∿∿∿∿∿</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-[#79AD98] font-mono block mb-4">
              Explore
            </span>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#C8A75A] transition-colors">
                  About the Journey
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C8A75A] transition-colors">
                  Writing & Voice Services
                </Link>
              </li>
              <li>
                <Link href="/work/written" className="hover:text-[#C8A75A] transition-colors">
                  Words, Written
                </Link>
              </li>
              <li>
                <Link href="/work/voice-over" className="hover:text-[#C8A75A] transition-colors">
                  Words, Voiced
                </Link>
              </li>
              <li>
                <Link href="/work/on-camera" className="hover:text-[#C8A75A] transition-colors">
                  On-Camera Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C8A75A] transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-[#79AD98] font-mono block mb-4">
              Connect
            </span>
            <ul className="space-y-3 text-sm">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#C8A75A] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[#053827]">
              <span className="text-[11px] uppercase tracking-wider text-[#79AD98] block font-mono">
                Location & Availability
              </span>
              <p className="text-xs text-[#AFCDC1] mt-1">
                India / Global Remote Collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-[#79AD98]">
          <p>© {currentYear} Vasanthaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
