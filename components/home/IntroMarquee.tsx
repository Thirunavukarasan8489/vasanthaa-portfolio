export default function IntroMarquee() {
  const marqueeItems = [
    "CONTENT WRITING",
    "VOICE OVER",
    "STORYTELLING",
    "SCRIPT WRITING",
    "ON CAMERA",
    "BRAND CONTENT",
    "REEL SCRIPTS",
    "COMMERCIAL VOICEOVER",
  ];

  return (
    <div
      className="w-full bg-[#03291E] border-y border-[#053827] py-4 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="animate-marquee flex items-center">
        {/* Render twice for seamless infinite scroll */}
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#AFCDC1] uppercase hover:text-[#C8A75A] transition-colors">
              {item}
            </span>
            <span className="text-[#C8A75A] text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
