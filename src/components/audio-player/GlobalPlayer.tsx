"use client";

import { useState, useEffect } from "react";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { AudioExperienceProvider, useAudioExperience } from "@/components/audio-player";
import {
    PlayIcon,
    PauseIcon,
    SkipBackIcon,
    SkipForwardIcon,
    CloseIcon,
    VolumeSpeakerIcon,
    VolumeMuteIcon
} from "@/components/audio-player/components/PlayerIcons";

const formatTime = (milliseconds: number) => {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const GlobalPlayerContent = ({ title, onClose }: { title: string; onClose: () => void }) => {
    const {
        isReady,
        isPlaying,
        currentTimeMs,
        durationMs,
        togglePlayback,
        skipBySeconds,
        seekToMs,
        volume,
        setVolume,
        isMuted,
        toggleMute
    } = useAudioExperience();

    const disabled = !isReady;
    const progress = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;
    const skipSeconds = 15;

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percentage = Number(e.target.value);
        const newTime = (percentage / 100) * durationMs;
        seekToMs(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    // Global Space Key Listener for Play/Pause
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.code === 'Space') {
                // ALWAYS prevent scrolling if the player is open
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Only toggle if ready
                if (!disabled) {
                    togglePlayback();
                }
            }
        };

        // Use capture phase to ensure we get the event first
        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [disabled, togglePlayback]);

    return (
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">

            {/* LEFT: Title & Controls */}
            <div className="flex items-center gap-6 flex-shrink-0">
                {/* Title */}
                <div className="flex flex-col min-w-0 max-w-[200px] md:max-w-[300px]">
                    <span className="font-semibold text-sm truncate">{title}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => skipBySeconds(-skipSeconds)}
                        disabled={disabled}
                        className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
                        aria-label={`Rewind ${skipSeconds} seconds`}
                    >
                        <SkipBackIcon style={{ width: 20, height: 20 }} />
                    </button>

                    <button
                        onClick={togglePlayback}
                        disabled={disabled}
                        className="bg-foreground text-background rounded-full p-2.5 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <PauseIcon style={{ width: 16, height: 16 }} />
                        ) : (
                            <PlayIcon style={{ width: 16, height: 16 }} className="ml-0.5" />
                        )}
                    </button>

                    <button
                        onClick={() => skipBySeconds(skipSeconds)}
                        disabled={disabled}
                        className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
                        aria-label={`Skip forward ${skipSeconds} seconds`}
                    >
                        <SkipForwardIcon style={{ width: 20, height: 20 }} />
                    </button>
                </div>
            </div>

            {/* CENTER: Timeline */}
            <div className="flex items-center gap-3 flex-1 px-8 lg:px-12 min-w-0">
                <span className="text-xs font-mono tabular-nums text-muted-foreground min-w-[35px] text-right">
                    {formatTime(currentTimeMs)}
                </span>

                <div className="relative h-1 flex-1 bg-muted/50 rounded-full group cursor-pointer hover:h-1.5 transition-all">
                    <div
                        className="absolute inset-y-0 left-0 bg-foreground rounded-full group-hover:bg-green-500 transition-colors"
                        style={{ width: `${progress}%` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        disabled={disabled}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        aria-label="Seek time"
                    />
                </div>

                <span className="text-xs font-mono tabular-nums text-muted-foreground min-w-[35px]">
                    {formatTime(durationMs)}
                </span>
            </div>

            {/* RIGHT: Volume & Close */}
            <div className="flex items-center gap-6 flex-shrink-0">
                {/* Volume Control */}
                <div className="flex items-center gap-2 group w-28 justify-end hidden sm:flex">
                    <button
                        onClick={toggleMute}
                        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? (
                            <VolumeMuteIcon style={{ width: 18, height: 18 }} />
                        ) : (
                            <VolumeSpeakerIcon style={{ width: 18, height: 18 }} />
                        )}
                    </button>
                    <div className="flex-1 h-1 bg-muted/50 rounded-full relative group-hover:bg-muted transition-colors">
                        <div
                            className="absolute inset-y-0 left-0 bg-foreground rounded-full"
                            style={{ width: `${volume * 100}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Volume"
                        />
                    </div>
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-border/50 hidden sm:block" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="p-1.5 -mr-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Close Player"
                >
                    <CloseIcon style={{ width: 22, height: 22 }} />
                </button>
            </div>

        </div>
    );
};

export const GlobalPlayer = () => {
    const { currentTrack, closePlayer } = useGlobalAudio();
    const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

    // If no track is active, don't render anything
    if (!currentTrack) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-full duration-300"
            style={{ fontFamily: 'Outfit, sans-serif' }}
        >
            <audio
                ref={setAudioEl}
                src={currentTrack.src}
                crossOrigin="anonymous"
                preload="metadata"
            />
            {audioEl && (
                <AudioExperienceProvider
                    audioSrc={currentTrack.src}
                    transcript={currentTrack.transcript || { utterances: [] }}
                    chapters={currentTrack.chapters || []}
                    audioElement={audioEl}
                    config={{ autoPlay: true, skipIntervalSeconds: 15 }}
                >
                    <GlobalPlayerContent title={currentTrack.title} onClose={closePlayer} />
                </AudioExperienceProvider>
            )}
        </div>
    );
};
