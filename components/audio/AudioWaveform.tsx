"use client";

interface AudioWaveformProps {
  isPlaying: boolean;
  progressPercent: number;
}

export default function AudioWaveform({
  isPlaying,
  progressPercent,
}: AudioWaveformProps) {
  // 24 bars of varied heights representing an audio sample
  const barHeights = [
    25, 45, 75, 35, 90, 60, 40, 80, 100, 65, 30, 85, 70, 45, 95, 60, 40, 75,
    50, 30, 65, 80, 45, 20,
  ];

  return (
    <div
      className="flex items-center gap-[3px] h-8 w-full max-w-[220px] sm:max-w-[280px]"
      aria-hidden="true"
    >
      {barHeights.map((height, i) => {
        const barPercent = (i / barHeights.length) * 100;
        const isPassed = barPercent <= progressPercent;

        return (
          <span
            key={i}
            className={`w-[3px] rounded-full transition-all duration-150 ${
              isPassed ? "bg-[#C8A75A]" : "bg-[#0A4C38]"
            } ${
              isPlaying
                ? "animate-pulse"
                : ""
            }`}
            style={{
              height: `${Math.max(12, height * (isPlaying ? 1 : 0.75))}%`,
              animationDelay: `${(i % 5) * 120}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
