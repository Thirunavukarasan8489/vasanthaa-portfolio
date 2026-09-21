import { Metadata } from "next";
import { Clock, Globe } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/contact/ContactForm";
import { socialLinks } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Contact & Commissions | Vasanthaa",
  description:
    "Get in touch with Vasanthaa for content writing commissions, voice-over auditions, on-camera features, and creative collaborations.",
};

interface Props {
  searchParams: Promise<{ service?: string; details?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="bg-[#021D15] min-h-screen py-16 md:py-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="mb-16 border-b border-[#053827] pb-12">
          <SectionLabel number="04" label="LET'S CONNECT" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EC] tracking-tight max-w-4xl leading-[1.08]">
            Let&apos;s Shape Your <br />
            <span className="italic text-[#C8A75A]">Next Narrative</span>.
          </h1>
          <p className="mt-4 text-base text-[#AFCDC1] max-w-2xl font-sans leading-relaxed">
            Whether you need a full campaign script suite, studio-mastered
            voiceover audio, or on-camera presentation, submit your brief below.
          </p>
        </div>

        {/* Two-Column Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8 bg-[#03291E] border border-[#053827] p-8 md:p-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] mb-2">
              Commission Brief
            </h2>
            <p className="text-xs font-mono text-[#79AD98] mb-8 uppercase tracking-widest">
              Fill out the details below to receive a personalized quote &
              timeline
            </p>

            <ContactForm
              initialService={params.service}
              initialDetails={params.details}
            />
          </div>

          {/* Direct Channels Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="border border-[#053827] bg-[#03291E] p-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A75A] block">
                Direct Channels
              </span>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-mono text-[#79AD98] uppercase block">
                    Email Correspondence
                  </span>
                  <a
                    href="mailto:vasanthaasuresh@gmail.com"
                    className="text-[#F7F4EC] hover:text-[#C8A75A] transition-colors font-sans mt-0.5 block"
                  >
                    vasanthaasuresh@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#79AD98] uppercase block">
                    Social & Updates
                  </span>
                  <div className="flex flex-col gap-1.5 mt-1">
                    {socialLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#AFCDC1] hover:text-[#C8A75A] transition-colors text-xs font-mono"
                      >
                        → {item.name}: {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability info */}
            <div className="border border-[#053827] bg-[#03291E] p-8 space-y-4 text-xs font-mono">
              <span className="uppercase tracking-widest text-[#79AD98] block">
                Working Standards
              </span>

              <div className="flex items-center gap-3 text-[#AFCDC1]">
                <Clock className="w-4 h-4 text-[#C8A75A] shrink-0" />
                <span>Response window: 24–48 hours</span>
              </div>

              <div className="flex items-center gap-3 text-[#AFCDC1]">
                <Globe className="w-4 h-4 text-[#C8A75A] shrink-0" />
                <span>Operating hours: IST (GMT +5:30) & Global Remote</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
