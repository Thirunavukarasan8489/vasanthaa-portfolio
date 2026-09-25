"use client";

import { useState, useRef, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonialsData, Testimonial } from "@/data/testimonials";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(testimonialsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Sync with API & BroadcastChannel for zero-reload instant updates from Admin panel
  useEffect(() => {
    // 1. Initial fresh fetch from API
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        const list = data.testimonials || data.data;
        if (data.success && Array.isArray(list) && list.length > 0) {
          setItems(list);
        }
      })
      .catch(() => {
        // Fallback to static items
      });

    // 2. Real-time cross-tab BroadcastChannel listener (sub-second reflection)
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("portfolio-testimonials-sync");
      channel.onmessage = (event) => {
        const list = event.data?.testimonials || event.data?.data;
        if (list && Array.isArray(list)) {
          setItems(list);
          setCurrentIndex((prev) => Math.min(prev, Math.max(0, list.length - 1)));
        }
      };
    } catch {
      // BroadcastChannel not supported in legacy environment
    }

    // 3. Fallback Storage event listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "portfolio-testimonials-sync" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setItems(parsed);
            setCurrentIndex((prev) => Math.min(prev, Math.max(0, parsed.length - 1)));
          }
        } catch {
          // Ignore parse errors
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Safe items fallback
  const testimonials = items.length > 0 ? items : testimonialsData;
  const safeIndex = Math.min(currentIndex, testimonials.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="py-24 bg-[#021D15] border-b border-[#053827] relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Watermark Quote */}
      <div className="absolute right-6 -bottom-10 pointer-events-none opacity-[0.03] select-none font-serif text-[280px] leading-none text-[#C8A75A]">
        “
      </div>

      <div className="editorial-container relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel number="06" label="TESTIMONIALS & TRUST" className="mb-3" />
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F7F4EC] tracking-tight">
              Words From <span className="italic text-[#C8A75A]">Collaborators</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-[#79AD98] max-w-sm">
            Perspectives from creative directors, brand producers, and founders who have commissioned writing and vocal performances.
          </p>
        </div>

        {/* Outer Editorial Container */}
        <div
          className="border border-[#053827] bg-[#03291E] p-5 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Carousel Track */}
          <div className="overflow-hidden w-full">
            <div
              className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 min-w-full"
                  aria-hidden={testimonials[safeIndex]?.id !== item.id}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                    {/* Quote Icon & Discipline Meta */}
                    <div className="lg:col-span-3 flex flex-wrap sm:flex-nowrap lg:flex-col justify-between items-start gap-4 border-b lg:border-b-0 lg:border-r border-[#053827] pb-5 lg:pb-0 lg:pr-8">
                      <div className="flex items-center lg:items-start gap-3 lg:gap-0 lg:space-y-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#C8A75A] bg-[#053827] text-[#C8A75A] shadow-md shrink-0">
                          <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98] block">
                            Discipline
                          </span>
                          <span className="text-xs font-mono text-[#C8A75A] font-semibold mt-0.5 block">
                            {item.discipline}
                          </span>
                        </div>
                      </div>

                      {item.highlightMetric && (
                        <div className="bg-[#021D15] border border-[#0A4C38] px-3 py-1.5 sm:px-3.5 sm:py-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98] block">
                            Result / Impact
                          </span>
                          <span className="text-xs font-mono text-[#F7F4EC] font-semibold block mt-0.5 whitespace-nowrap">
                            {item.highlightMetric}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quote & Author Info */}
                    <div className="lg:col-span-9 space-y-4 sm:space-y-6">
                      <blockquote className="font-serif italic text-lg sm:text-2xl lg:text-3xl text-[#F7F4EC] leading-relaxed font-light select-none">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>

                      <div>
                        <h3 className="font-serif text-lg sm:text-xl text-[#F7F4EC] tracking-wide">
                          {item.author}
                        </h3>
                        <p className="text-xs font-mono text-[#AFCDC1] mt-0.5">
                          {item.role} •{" "}
                          <span className="text-[#C8A75A]">{item.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls Bar - Anchored inside card */}
          <div className="border-t border-[#053827] pt-5 sm:pt-6 mt-6 sm:mt-8 flex items-center justify-between gap-4">
            {/* Slide Position Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#79AD98]">
                0{safeIndex + 1} / 0{testimonials.length}
              </span>
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 transition-all duration-300 ${
                      safeIndex === i
                        ? "w-6 bg-[#C8A75A]"
                        : "w-1.5 bg-[#053827]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Prev / Next Slide Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial slide"
                className="p-2.5 sm:p-3 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-[#C8A75A]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial slide"
                className="p-2.5 sm:p-3 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-[#C8A75A]"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selector Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 max-w-full truncate ${
                safeIndex === idx
                  ? "bg-[#C8A75A] text-[#021D15] font-semibold scale-105 shadow-md"
                  : "bg-[#03291E] border border-[#053827] text-[#79AD98] hover:border-[#0A4C38] hover:text-[#F7F4EC]"
              }`}
            >
              0{idx + 1} — {item.author} ({item.discipline})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
