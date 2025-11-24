"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { AudioExperienceProvider } from "./context/AudioExperienceContext";
import type { TranscriptData, ChapterSummary, AudioExperienceConfig } from "./context/types";
import { AudioWaveform } from "./components/AudioWaveform";
import { TranscriptScroller } from "./components/TranscriptScroller";
import { ChapterList } from "./components/ChapterList";
import { ChaptersCaptionsMenu } from "./components/ChaptersCaptionsMenu";

export type AudioPlayerProps = {
  /**
   * URL to the audio file
   */
  audioSrc: string;

  /**
   * Transcript data with word-level timing
   */
  transcript: TranscriptData;

  /**
   * Chapter markers with titles and timestamps
   */
  chapters: ChapterSummary[];

  /**
   * Configuration options for the audio player
   */
  config?: AudioExperienceConfig;

  /**
   * Optional className for styling the container
   */
  className?: string;

  /**
   * Layout mode: "stacked" shows chapters below captions, "side-by-side" shows them next to each other
   * @default "stacked"
   */
  layout?: "stacked" | "side-by-side";

  /**
   * Show chapters list
   * @default true
   */
  showChapters?: boolean;

  /**
   * Enable keyboard shortcuts (Space for play/pause, 0-9 for seeking)
   * @default true
   */
  enableKeyboardShortcuts?: boolean;
};

export type AudioPlayerControls = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggle: () => void;
  seekToStart: () => void;
  seekToMs: (timeMs: number) => void;
  getCurrentTimeMs: () => number;
  setPlaybackRate: (rate: number) => void;
};

/**
 * Pre-composed audio player with captions, timeline, and chapters.
 *
 * This is an all-in-one component that provides a complete audio playback experience
 * with word-by-word or line-by-line captions, chapter navigation, and all controls.
 *
 * @example
 * ```tsx
 * import { AudioPlayer } from '@/components/audio-player';
 *
 * function MyPage() {
 *   return (
 *     <AudioPlayer
 *       audioSrc="/audio/episode-1.mp3"
 *       transcript={transcriptData}
 *       chapters={chaptersData}
 *     />
 *   );
 * }
 * ```
 */
export const AudioPlayer = forwardRef<AudioPlayerControls, AudioPlayerProps>(
  (
    {
      audioSrc,
      transcript,
      chapters,
      config,
      className = "",
      layout = "stacked",
      showChapters = true,
      enableKeyboardShortcuts = true,
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Expose controls to parent component via ref
    useImperativeHandle(ref, () => ({
      play: () => {
        if (audioRef.current) audioRef.current.play();
      },
      pause: () => {
        if (audioRef.current) audioRef.current.pause();
      },
      stop: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      },
      toggle: () => {
        if (audioRef.current) {
          if (audioRef.current.paused) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        }
      },
      seekToStart: () => {
        if (audioRef.current) audioRef.current.currentTime = 0;
      },
      seekToMs: (timeMs: number) => {
        if (audioRef.current) audioRef.current.currentTime = timeMs / 1000;
      },
      getCurrentTimeMs: () => {
        return audioRef.current ? Math.round(audioRef.current.currentTime * 1000) : 0;
      },
      setPlaybackRate: (rate: number) => {
        if (audioRef.current) audioRef.current.playbackRate = rate;
      },
    }));

    // Keyboard shortcuts
    useEffect(() => {
      if (!enableKeyboardShortcuts) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        // Ignore if user is typing in an input/textarea
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          if (audioRef.current) {
            if (audioRef.current.paused) {
              audioRef.current.play();
            } else {
              audioRef.current.pause();
            }
          }
        }

        // Seek to position (0-9 keys seek to 0%-90%)
        if (event.key >= "0" && event.key <= "9" && audioRef.current) {
          const digit = parseInt(event.key, 10);
          const percentage = digit / 10;
          audioRef.current.currentTime = audioRef.current.duration * percentage;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [enableKeyboardShortcuts]);

    return (
      <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
        <audio ref={audioRef} src={audioSrc} preload="metadata" />

        <AudioExperienceProvider
          audioSrc={audioSrc}
          transcript={transcript}
          chapters={chapters}
          config={config}
          audioElement={audioRef.current}
        >
          {/* Mobile menu for chapters and caption controls */}
          <ChaptersCaptionsMenu />

          {/* Main layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "0 0 120px 0",
              minHeight: "100vh",
            }}
          >
            {/* Captions */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                padding: "24px",
              }}
            >
              <TranscriptScroller />
            </div>

            {/* Chapters (desktop only, hidden on mobile where menu is used) */}
            {showChapters && (
              <div
                className="hidden lg:flex"
                style={{
                  justifyContent: "center",
                  padding: "0 24px",
                }}
              >
                <ChapterList
                  className="flex-col gap-4"
                  listClassName="flex-col gap-4"
                />
              </div>
            )}

            {/* Caption mode toggles (desktop only) */}
            <div
              className="audio-transcript-controls hidden lg:inline-flex"
              style={{
                alignItems: "center",
                gap: "20px",
                justifyContent: "center",
                padding: "0 24px",
              }}
            >
              <style>{`
                .audio-speed-option {
                  padding: 4px 12px;
                  border-radius: 999px;
                  border: 1px solid var(--audio-border, rgba(0, 0, 0, 0.1));
                  background: transparent;
                  color: var(--audio-text);
                  font-size: 13px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.2s ease;
                }

                .audio-speed-option:hover {
                  background: var(--audio-button-hover-bg, rgba(0, 0, 0, 0.05));
                }

                .audio-speed-option--active {
                  background: var(--audio-accent, #000);
                  color: #fff;
                  border-color: var(--audio-accent, #000);
                }

                .audio-slider {
                  -webkit-appearance: none;
                  appearance: none;
                  background: transparent;
                  cursor: pointer;
                }

                .audio-slider::-webkit-slider-track {
                  background: var(--audio-slider-track, rgba(0, 0, 0, 0.1));
                  border-radius: 999px;
                  height: 4px;
                }

                .audio-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  background: var(--audio-text);
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  margin-top: -6px;
                }

                .audio-slider::-moz-range-track {
                  background: var(--audio-slider-track, rgba(0, 0, 0, 0.1));
                  border-radius: 999px;
                  height: 4px;
                }

                .audio-slider::-moz-range-thumb {
                  background: var(--audio-text);
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  border: none;
                }

                .audio-slider--volume::-webkit-slider-track {
                  background: linear-gradient(to right,
                    var(--audio-text) 0%,
                    var(--audio-text) var(--volume-percent, 0%),
                    var(--audio-slider-track, rgba(0, 0, 0, 0.1)) var(--volume-percent, 0%),
                    var(--audio-slider-track, rgba(0, 0, 0, 0.1)) 100%
                  );
                }
              `}</style>
            </div>
          </div>

          {/* Audio player controls - fixed at bottom */}
          <AudioWaveform />
        </AudioExperienceProvider>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
