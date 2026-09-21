"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import AudioWaveform from "./AudioWaveform";

interface AudioPlayerProps {
  id: string;
  sampleNumber?: string;
  title: string;
  category?: string;
  language?: string;
  tone?: string;
  audioSrc?: string;
  durationFormatted?: string;
}

export default function AudioPlayer({
  id,
  sampleNumber = "01",
  title,
  category = "Commercial",
  language = "English",
  tone,
  audioSrc,
  durationFormatted = "00:42",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Synchronize across multiple players: only one can play at a time
  useEffect(() => {
    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ activeId: string }>;
      if (customEvent.detail?.activeId !== id && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("audio-play-exclusive", handleGlobalPlay);
    return () => {
      window.removeEventListener("audio-play-exclusive", handleGlobalPlay);
    };
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Notify other audio players to pause
      window.dispatchEvent(
        new CustomEvent("audio-play-exclusive", { detail: { activeId: id } })
      );

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If audio file doesn't exist yet, simulate playback for seamless UI testing
          setIsPlaying(true);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalTimeStr = duration > 0 ? formatTime(duration) : durationFormatted;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative border border-[#053827] bg-[#021D15] p-6 hover:border-[#0A4C38] transition-all duration-300">
      {/* Audio element underneath */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-[#053827] pb-3 mb-4">
        <span className="text-xs font-mono text-[#C8A75A] tracking-wider uppercase">
          VOICE SAMPLE {sampleNumber}
        </span>
        <span className="text-xs text-[#79AD98] font-mono flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-[#C8A75A]" />
          <span>{category}</span>
          <span className="opacity-40">•</span>
          <span>{language}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg text-[#F7F4EC] tracking-tight mb-4">
        {title}
      </h3>

      {/* Controls and Waveform */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#C8A75A] bg-[#053827] text-[#C8A75A] hover:bg-[#C8A75A] hover:text-[#021D15] transition-all focus:outline-none focus:ring-2 focus:ring-[#C8A75A]"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Waveform Visualization */}
          <AudioWaveform isPlaying={isPlaying} progressPercent={progressPercent} />
        </div>

        {/* Progress & Time */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Audio progress slider"
            className="h-1.5 w-full sm:w-32 bg-[#053827] accent-[#C8A75A] cursor-pointer rounded-none"
          />
          <span className="font-mono text-xs text-[#79AD98] shrink-0 min-w-[45px] text-right">
            {formatTime(currentTime)} / {totalTimeStr}
          </span>
        </div>
      </div>

      {tone && (
        <div className="mt-4 pt-3 border-t border-[#053827]/60 flex items-center gap-2 text-xs text-[#AFCDC1]">
          <span className="text-[#79AD98] font-mono text-[10px] uppercase">Tone:</span>
          <span>{tone}</span>
        </div>
      )}
    </div>
  );
}
