"use client";

import { useAudioExperience } from "@/components/audio-player";
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/components/audio-player/components/PlayerIcons";
import { useState } from "react";

const ICON_SCALE = 0.6;

const formatTime = (milliseconds: number) => {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TimeDisplay = ({ current, total }: { current: string; total: string }) => (
  <>
    {current}
    <span className="text-muted-foreground/75 mx-2">/</span>
    {total}
  </>
);

export function CustomAudioPlayer() {
  const {
    isReady,
    isPlaying,
    isMuted,
    volume,
    playbackRate,
    currentTimeMs,
    durationMs,
    chapters,
    config,
    togglePlayback,
    skipBySeconds,
    setVolume,
    toggleMute,
    setPlaybackRate,
    seekToMs,
  } = useAudioExperience();

  const [isSpeedModalOpen, setIsSpeedModalOpen] = useState(false);

  const skipSeconds = config.skipIntervalSeconds;
  const disabled = !isReady;
  const currentTime = formatTime(currentTimeMs);
  const totalTime = formatTime(durationMs);
  const playbackRates = [1, 1.5, 2];

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(e.target.value);
    const newTime = (percentage / 100) * durationMs;
    seekToMs(newTime);
  };

  const progress = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Title and Time Display */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Setting the Stage</h3>
        <div className="text-sm tabular-nums font-mono">
          <TimeDisplay current={currentTime} total={totalTime} />
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full relative" style={{ height: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          disabled={disabled}
          style={{
            width: '100%',
            height: '6px',
            WebkitAppearance: 'none',
            appearance: 'none',
            background: `linear-gradient(to right, currentColor 0%, currentColor ${progress}%, rgba(128, 128, 128, 0.3) ${progress}%, rgba(128, 128, 128, 0.3) 100%)`,
            borderRadius: '999px',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
          className="audio-timeline-slider"
          aria-label="Audio timeline"
        />
        <style>{`
          .audio-timeline-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: currentColor;
            cursor: grab;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }

          .audio-timeline-slider:hover::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .audio-timeline-slider:active::-webkit-slider-thumb {
            cursor: grabbing;
            width: 24px;
            height: 24px;
          }

          .audio-timeline-slider::-moz-range-thumb {
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: currentColor;
            border: none;
            cursor: grab;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }

          .audio-timeline-slider:hover::-moz-range-thumb {
            width: 20px;
            height: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .audio-timeline-slider:active::-moz-range-thumb {
            cursor: grabbing;
            width: 24px;
            height: 24px;
          }

          .audio-timeline-slider::-moz-range-track {
            background: transparent;
            border: none;
          }
        `}</style>
      </div>

      {/* Controls Row - Transport controls on left, speed on right */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Transport Controls */}
        <div className="flex items-center gap-3">
          {/* Skip Back */}
          <button
            type="button"
            onClick={() => skipBySeconds(-skipSeconds)}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-md px-2 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            aria-label={`Skip back ${skipSeconds} seconds`}
          >
            <SkipBackIcon
              style={{ width: 44 * ICON_SCALE, height: 44 * ICON_SCALE }}
              aria-hidden="true"
            />
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={togglePlayback}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-md px-2 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon
                style={{ width: 44 * ICON_SCALE, height: 44 * ICON_SCALE }}
                aria-hidden="true"
              />
            ) : (
              <PlayIcon
                style={{ width: 44 * ICON_SCALE, height: 44 * ICON_SCALE }}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Skip Forward */}
          <button
            type="button"
            onClick={() => skipBySeconds(skipSeconds)}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-md px-2 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            aria-label={`Skip forward ${skipSeconds} seconds`}
          >
            <SkipForwardIcon
              style={{ width: 44 * ICON_SCALE, height: 44 * ICON_SCALE }}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right: Speed */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSpeedModalOpen(!isSpeedModalOpen)}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-md text-sm font-mono font-semibold transition-colors border-2 border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            style={{ width: '60px', height: '42.4px', padding: '8px' }}
            aria-label="Playback speed"
          >
            {playbackRate}<span className="text-muted-foreground/75 font-light ml-1">x</span>
          </button>

          {isSpeedModalOpen && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 flex flex-col gap-1 rounded-lg border border-border/70 bg-background p-3 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] dark:bg-zinc-900 z-[100]">
              {playbackRates.map((rate) => {
                const isActive = rate === playbackRate;
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setPlaybackRate(rate);
                      setIsSpeedModalOpen(false);
                    }}
                    className={`rounded-md px-3 py-2 text-sm font-mono transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-muted/50 font-semibold text-foreground hover:bg-muted/70'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <span className="font-semibold">{rate}</span><span className="text-muted-foreground/75 font-light ml-1">x</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
