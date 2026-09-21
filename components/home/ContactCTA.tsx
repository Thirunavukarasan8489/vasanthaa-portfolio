import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { socialLinks } from "@/data/social-links";
import Reveal from "@/components/animation/Reveal";

export default function ContactCTA() {
  return (
    <section
      className="py-28 bg-[#03291E] relative overflow-hidden"
      id="contact-cta"
    >
      {/* Decorative waveform watermark in background */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 select-none font-serif text-[180px] leading-none text-[#C8A75A]">
        ∿∿∿
      </div>

      <div className="editorial-container relative">
        <Reveal direction="up" duration={0.7} className="max-w-3xl space-y-8">
          <SectionLabel number="08" label="INQUIRIES & COMMISSIONS" />

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight leading-[1.06]">
            Have a story
            <br />
            <span className="italic text-[#C8A75A]">worth telling?</span>
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#AFCDC1] font-light max-w-xl">
            Let&apos;s give it the right words and the right voice.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-[#C8A75A] text-[#021D15] px-8 py-4 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] transition-all"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <a
              href="mailto:vasanthaasuresh@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#DCEAE5] hover:text-[#C8A75A] transition-colors py-2 border-b border-[#0A4C38] hover:border-[#C8A75A]"
            >
              <Mail className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>vasanthaasuresh@gmail.com</span>
            </a>
          </div>

          {/* Social icons inline */}
          <div className="pt-8 border-t border-[#053827] flex items-center gap-6 text-xs font-mono text-[#79AD98]">
            <span className="uppercase tracking-wider text-[11px]">
              Direct Channels:
            </span>
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A75A] transition-colors flex items-center gap-1"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
