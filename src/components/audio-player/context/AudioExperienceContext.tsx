"use client";

import React, { createContext, useContext, useMemo, useRef, useState, useCallback, useEffect } from "react";
import type { AudioExperienceConfig, ChapterSummary, TranscriptData, TranscriptDisplayMode } from "./types";

export type AudioExperienceState = {
  audioSrc: string;
  transcript: TranscriptData;
  chapters: ChapterSummary[];
  isReady: boolean;
  isPlaying: boolean;
  hasPlaybackStarted: boolean;
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  currentTimeMs: number;
  durationMs: number;
  activeChapterIndex: number;
  config: Required<AudioExperienceConfig>;
  isTranscriptVisible: boolean;
  transcriptDisplayMode: TranscriptDisplayMode;
};

export type AudioExperienceControls = {
  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  seekToMs: (timeMs: number) => void;
  skipBySeconds: (deltaSeconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  revealTranscript: () => void;
  setTranscriptDisplayMode: (mode: TranscriptDisplayMode) => void;
  resetExperience: () => void;
};

export type AudioExperienceContextValue = AudioExperienceState & AudioExperienceControls;

const DEFAULT_CONFIG: Required<AudioExperienceConfig> = {
  autoPlay: false,
  startMuted: false,
  skipIntervalSeconds: 15,
  startTimeSeconds: 0,
};

const AudioExperienceContext = createContext<AudioExperienceContextValue | null>(null);

export type AudioExperienceProviderProps = {
  audioSrc: string;
  transcript: TranscriptData;
  chapters: ChapterSummary[];
  config?: AudioExperienceConfig;
  children: React.ReactNode;
  audioElement?: HTMLAudioElement | null;
};

export const AudioExperienceProvider: React.FC<AudioExperienceProviderProps> = ({
  audioSrc,
  transcript,
  chapters,
  config,
  audioElement,
  children,
}) => {
  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(mergedConfig.startMuted ?? false);
  const [volume, setVolumeState] = useState(mergedConfig.startMuted ? 0 : 1);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [transcriptDisplayMode, setTranscriptDisplayModeState] = useState<TranscriptDisplayMode>("line");

  const revealTranscript = useCallback(() => {
    setIsTranscriptVisible(true);
  }, []);

  useEffect(() => {
    audioRef.current = audioElement ?? null;

    if (!audioElement) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const handleLoadedMetadata = () => {
      const durationMilliseconds = Math.round((audioElement.duration || 0) * 1000);
      setDurationMs(durationMilliseconds);
      setIsReady(true);

      const startMuted = mergedConfig.startMuted ?? false;
      audioElement.muted = startMuted;
      const initialVolume = startMuted ? 0 : audioElement.volume ?? 1;
      audioElement.volume = initialVolume;
      setVolumeState(initialVolume);
      setIsMuted(startMuted || initialVolume === 0);
      if (!startMuted && initialVolume > 0) {
        setVolumeBeforeMute(initialVolume);
      }

      const startTimeSeconds = mergedConfig.startTimeSeconds ?? 0;
      if (startTimeSeconds > 0 && Math.abs(audioElement.currentTime - startTimeSeconds) > 0.01) {
        try {
          audioElement.currentTime = startTimeSeconds;
        } catch (error) {
          console.warn('[AudioExperience] Unable to set start time on audio element', error);
        }
      }

      setPlaybackRateState(audioElement.playbackRate || 1);
      setCurrentTimeMs(Math.round(audioElement.currentTime * 1000));

      if (mergedConfig.autoPlay) {
        revealTranscript();
        audioElement.play().catch(() => {
          /* ignore autoplay failures */
        });
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasPlaybackStarted(true);
      revealTranscript();
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      const finalTime = Math.round((audioElement.duration || audioElement.currentTime) * 1000);
      setCurrentTimeMs(finalTime);
    };

    const handleRateChange = () => {
      const currentRate = audioElement.playbackRate || 1;
      setPlaybackRateState(currentRate);
    };

    const handleVolumeChange = () => {
      const effectiveVolume = audioElement.muted ? 0 : audioElement.volume;
      setVolumeState(effectiveVolume);
      setIsMuted(audioElement.muted || effectiveVolume === 0);
      if (!audioElement.muted && effectiveVolume > 0) {
        setVolumeBeforeMute(effectiveVolume);
      }
    };

    const updateTime = () => {
      if (audioRef.current) {
        const newTimeMs = Math.round(audioRef.current.currentTime * 1000);
        // Only update state if time changed by at least 100ms to prevent excessive re-renders
        setCurrentTimeMs(prev => {
          if (Math.abs(newTimeMs - prev) >= 100) {
            return newTimeMs;
          }
          return prev;
        });
      }
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    animationFrameRef.current = requestAnimationFrame(updateTime);

    if (audioElement.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('ratechange', handleRateChange);
    audioElement.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('ratechange', handleRateChange);
      audioElement.removeEventListener('volumechange', handleVolumeChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [audioElement, mergedConfig.startMuted, mergedConfig.startTimeSeconds, mergedConfig.autoPlay, revealTranscript]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    revealTranscript();
    audio.play().catch(() => {
      /* ignore audio playback errors */
    });
  }, [revealTranscript]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  const seekToMs = useCallback((timeMs: number) => {
    const audio = audioRef.current;
    if (!audio || durationMs <= 0) return;
    const timeSeconds = timeMs / 1000;
    try {
      audio.currentTime = timeSeconds;
    } catch (error) {
      console.warn('[AudioExperience] Unable to seek audio element', error);
    }
    setCurrentTimeMs(Math.round(timeSeconds * 1000));
  }, [durationMs]);

  const skipBySeconds = useCallback(
    (deltaSeconds: number) => {
      const audio = audioRef.current;
      if (!audio || durationMs <= 0) return;
      const targetSeconds = audio.currentTime + deltaSeconds;
      const clamped = Math.max(0, Math.min(targetSeconds, durationMs / 1000));
      try {
        audio.currentTime = clamped;
      } catch (error) {
        console.warn('[AudioExperience] Unable to skip audio element', error);
      }
      setCurrentTimeMs(Math.round(clamped * 1000));
    },
    [durationMs]
  );

  const setVolume = useCallback(
    (vol: number) => {
      const clamped = Math.max(0, Math.min(vol, 1));
      setVolumeState(clamped);
      setIsMuted(clamped === 0);
      const audio = audioRef.current;
      if (audio) {
        audio.volume = clamped;
        audio.muted = clamped === 0;
      }
      if (clamped > 0) {
        setVolumeBeforeMute(clamped);
      }
    },
    []
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const audio = audioRef.current;
      if (prev) {
        // Unmuting - restore previous volume
        setVolumeState(volumeBeforeMute);
        if (audio) {
          audio.volume = volumeBeforeMute;
          audio.muted = false;
        }
        return false;
      }
      // Muting - save current volume first
      if (volume > 0) {
        setVolumeBeforeMute(volume);
      }
      setVolumeState(0);
      if (audio) {
        audio.volume = 0;
        audio.muted = true;
      }
      return true;
    });
  }, [volume, volumeBeforeMute]);

  const setPlaybackRate = useCallback(
    (rate: number) => {
      const clamped = Math.max(0.5, Math.min(rate, 2.5));
      setPlaybackRateState(clamped);
      const audio = audioRef.current;
      if (audio) {
        audio.playbackRate = clamped;
      }
    },
    []
  );

  useEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    setHasPlaybackStarted(false);
    setCurrentTimeMs(0);
    setDurationMs(0);
    setIsTranscriptVisible(false);
  }, [audioSrc]);

  // Chapter tracking: update active index when currentTimeMs changes.
  useEffect(() => {
    if (!chapters.length) {
      setActiveChapterIndex(-1);
      return;
    }
    const currentIndex = chapters.findIndex((chapter, idx) => {
      const nextStart = chapters[idx + 1]?.start ?? Number.POSITIVE_INFINITY;
      return currentTimeMs >= chapter.start && currentTimeMs < nextStart;
    });
    setActiveChapterIndex(currentIndex);
  }, [chapters, currentTimeMs]);

  const setTranscriptDisplayMode = useCallback((mode: TranscriptDisplayMode) => {
    setTranscriptDisplayModeState(mode);
  }, []);

  const resetExperience = useCallback(() => {
    setIsTranscriptVisible(false);
    setTranscriptDisplayModeState("line");
    setHasPlaybackStarted(false);
    setIsPlaying(false);
    const resetTimeSeconds = mergedConfig.startTimeSeconds ?? 0;
    setCurrentTimeMs(Math.round(resetTimeSeconds * 1000));
    setActiveChapterIndex(0);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      try {
        audio.currentTime = resetTimeSeconds;
      } catch (error) {
        console.warn('[AudioExperience] Unable to reset audio element', error);
      }
    }
  }, [mergedConfig.startTimeSeconds]);

  const contextValue = useMemo<AudioExperienceContextValue>(() => ({
    audioSrc,
    transcript,
    chapters,
    isReady,
    isPlaying,
    hasPlaybackStarted,
    isMuted,
    volume,
    playbackRate,
    currentTimeMs,
    durationMs,
    activeChapterIndex,
    config: mergedConfig,
    isTranscriptVisible,
    transcriptDisplayMode,
    play,
    pause,
    togglePlayback,
    seekToMs,
    skipBySeconds,
    setVolume,
    toggleMute,
    setPlaybackRate,
    revealTranscript,
    setTranscriptDisplayMode,
    resetExperience,
  }), [
    audioSrc,
    transcript,
    chapters,
    isReady,
    isPlaying,
    hasPlaybackStarted,
    isMuted,
    volume,
    playbackRate,
    currentTimeMs,
    durationMs,
    activeChapterIndex,
    mergedConfig,
    isTranscriptVisible,
    transcriptDisplayMode,
    play,
    pause,
    togglePlayback,
    seekToMs,
    skipBySeconds,
    setVolume,
    toggleMute,
    setPlaybackRate,
    revealTranscript,
    setTranscriptDisplayMode,
    resetExperience,
  ]);

  return (
    <AudioExperienceContext.Provider value={contextValue}>
      {children}
    </AudioExperienceContext.Provider>
  );
};

export const useAudioExperience = (): AudioExperienceContextValue => {
  const ctx = useContext(AudioExperienceContext);
  if (!ctx) {
    throw new Error("useAudioExperience must be used within an AudioExperienceProvider");
  }
  return ctx;
};
