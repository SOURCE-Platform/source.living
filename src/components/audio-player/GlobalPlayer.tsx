"use client";

import { useState, useEffect, useRef } from "react";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { AudioExperienceProvider, useAudioExperience } from "@/components/audio-player";
import {
    PlayIcon,
    PauseIcon,
    SkipBackIcon,
    SkipForwardIcon,
    CloseIcon,
    VolumeWavesIcon,
    VolumeMuteIcon,
    ChaptersListIcon
} from "@/components/audio-player/components/PlayerIcons";
import { ChapterPopup } from "@/components/audio-player/components/ChapterPopup";
import { ChapterList } from "@/components/audio-player/components/ChapterList";

const formatTime = (milliseconds: number) => {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const GlobalPlayerContent = ({
    title,
    onClose,
    globalIsPlaying,
    onGlobalPlayPause
}: {
    title: string;
    onClose: () => void;
    globalIsPlaying: boolean;
    onGlobalPlayPause: (playing: boolean) => void;
}) => {
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
        toggleMute,
        chapters
    } = useAudioExperience();

    const [showChapters, setShowChapters] = useState(false);

    // Bidirectional Sync Logic
    const prevGlobalRef = useRef(globalIsPlaying);
    const prevInternalRef = useRef(isPlaying);

    // 1. External (Context) -> Internal (Audio)
    useEffect(() => {
        if (globalIsPlaying !== prevGlobalRef.current) {
            prevGlobalRef.current = globalIsPlaying;
            if (globalIsPlaying !== isPlaying) {
                togglePlayback();
            }
        }
    }, [globalIsPlaying, isPlaying, togglePlayback]);

    // 2. Internal (Audio) -> External (Context)
    useEffect(() => {
        if (isPlaying !== prevInternalRef.current) {
            prevInternalRef.current = isPlaying;
            if (isPlaying !== globalIsPlaying) {
                onGlobalPlayPause(isPlaying);
            }
        }
    }, [isPlaying, globalIsPlaying, onGlobalPlayPause]);

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

    // Global Keyboard Listeners
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
            } else if (e.code === 'KeyM') {
                e.preventDefault();
                toggleMute();
            } else if (e.code === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        // Use capture phase to ensure we get the event first
        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [disabled, togglePlayback, onClose, toggleMute]);

    return (
        <div className="w-full mx-auto px-3 sm:px-4 lg:px-6">
            {/* XS Layout (< 480px) */}
            <div className="flex flex-col gap-4 py-4 xs:hidden">
                {/* 1. Timeline */}
                <div className="flex items-center gap-3 w-full">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground min-w-[35px] text-right">
                        {formatTime(currentTimeMs)}
                    </span>
                    <div className="relative h-1 flex-1 bg-black/15 dark:bg-muted/50 rounded-full group cursor-pointer hover:h-1.5 transition-all">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full group-hover:bg-opacity-80 transition-all"
                            style={{
                                width: `${progress}%`,
                                background: "var(--background-image-playgrade)"
                            }}
                        >
                            <div
                                className="dark:hidden absolute inset-0 rounded-full"
                                style={{ background: "var(--blue-button)" }}
                            />
                        </div>
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

                {/* 2. Controls & Chapters */}
                <div className="flex items-center justify-between w-full">
                    {/* Left: Chapter Toggle */}
                    <div className="relative">
                        {chapters && chapters.length > 0 && (
                            <>
                                {showChapters && (
                                    <ChapterPopup
                                        title={title}
                                        chapters={chapters}
                                        onChapterClick={(time) => {
                                            seekToMs(time);
                                            setShowChapters(false);
                                        }}
                                        onClose={() => setShowChapters(false)}
                                    />
                                )}
                                <button
                                    onClick={() => setShowChapters(!showChapters)}
                                    className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 data-[state=open]:text-foreground data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/5 cursor-pointer"
                                    aria-label="View Chapters"
                                    aria-expanded={showChapters}
                                    data-state={showChapters ? 'open' : 'closed'}
                                >
                                    <ChaptersListIcon className="w-7 h-7 md:w-5 md:h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Center: Skip & Play */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => skipBySeconds(-skipSeconds)}
                            disabled={disabled}
                            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
                            aria-label={`Rewind ${skipSeconds} seconds`}
                        >
                            <SkipBackIcon style={{ width: 22, height: 22 }} />
                        </button>

                        <button
                            onClick={togglePlayback}
                            disabled={disabled}
                            className="inline-flex items-center justify-center rounded-lg transition-colors group cursor-pointer overflow-visible disabled:opacity-50"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            <div className="relative w-[32px] h-[32px]">
                                {isPlaying ? (
                                    <PauseIcon className="w-full h-full [&_path]:fill-foreground" />
                                ) : (
                                    <PlayIcon className="w-full h-full [&_path]:fill-foreground" />
                                )}
                            </div>
                        </button>

                        <button
                            onClick={() => skipBySeconds(skipSeconds)}
                            disabled={disabled}
                            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
                            aria-label={`Skip forward ${skipSeconds} seconds`}
                        >
                            <SkipForwardIcon style={{ width: 22, height: 22 }} />
                        </button>
                    </div>

                    {/* Right: Mute & Close */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-2"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeMuteIcon style={{ width: 40, height: 25 }} />
                            ) : (
                                <VolumeWavesIcon style={{ width: 40, height: 25 }} />
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                            aria-label="Close Player"
                        >
                            <CloseIcon style={{ width: 20, height: 20 }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Standard Layout (≥ 480px) */}
            <div className="hidden xs:flex items-center justify-between h-16 md:h-20 w-full">
                <svg width="0" height="0" className="absolute block w-0 h-0 overflow-hidden" aria-hidden="true">
                    <defs>
                        <linearGradient id="playgrade" gradientTransform="rotate(22, 0.2, 0.5) translate(0.2, 0.5) scale(2.5) translate(-0.5, -0.5)">
                            <stop offset="0%" stopColor="#FFC1D5" />
                            <stop offset="29.69%" stopColor="#FFC1D5" />
                            <stop offset="61.98%" stopColor="#FEFFE3" />
                            <stop offset="100%" stopColor="#97A1FB" />
                        </linearGradient>
                        <linearGradient id="playgrade-hover" gradientTransform="rotate(22, 0.2, 0.5) translate(0.3, 0.5) scale(1.0) translate(-0.5, -0.5)">
                            <stop offset="0%" stopColor="#FFC1D5" />
                            <stop offset="29.69%" stopColor="#FFC1D5" />
                            <stop offset="61.98%" stopColor="#FEFFE3" />
                            <stop offset="100%" stopColor="#97A1FB" />
                        </linearGradient>
                        <linearGradient id="playgrade-light" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#02ABFF" />
                            <stop offset="100%" stopColor="#001AFF" />
                        </linearGradient>
                        <linearGradient id="playgrade-light-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#02ABFF" />
                            <stop offset="100%" stopColor="#001AFF" />
                        </linearGradient>
                        <linearGradient id="playgrade-light-reverse" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#001AFF" />
                            <stop offset="100%" stopColor="#02ABFF" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* LEFT: Title & Controls */}
                <div className="flex items-center gap-6 flex-shrink-0">
                    {/* Chapters & Title */}
                    <div className="relative flex items-center gap-3 min-w-0 max-w-[200px] md:max-w-[300px]">
                        {chapters && chapters.length > 0 && (
                            <div className="relative flex-shrink-0">
                                {showChapters && (
                                    <ChapterPopup
                                        title={title}
                                        chapters={chapters}
                                        onChapterClick={seekToMs}
                                        onClose={() => setShowChapters(false)}
                                    />
                                )}
                                <button
                                    onClick={() => setShowChapters(!showChapters)}
                                    className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 data-[state=open]:text-foreground data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/5 cursor-pointer"
                                    aria-label="View Chapters"
                                    aria-expanded={showChapters}
                                    data-state={showChapters ? 'open' : 'closed'}
                                >
                                    <ChaptersListIcon className="w-8 h-8 md:w-5 md:h-5" />
                                </button>
                            </div>
                        )}

                        <div className="hidden md:flex flex-col min-w-0 flex-1">
                            <span className="font-semibold text-sm truncate" title={title}>{title}</span>
                        </div>
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
                            className="inline-flex items-center justify-center rounded-lg transition-colors group cursor-pointer overflow-visible disabled:opacity-50"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            <div className="relative w-[30px] h-[30px] transition-transform duration-200 group-hover:scale-110">
                                {/* --- PLAY ICON GROUP --- */}
                                <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                    {/* Glow Effect - Blurred Icon */}
                                    <PlayIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                                    {/* Base Icon (Default State) */}
                                    <PlayIcon className="relative z-10 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                                    {/* Hover Icon (Hover State) - Fades in */}
                                    <PlayIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                                </div>

                                {/* --- PAUSE ICON GROUP --- */}
                                <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
                                    {/* Glow Effect - Blurred Icon */}
                                    <PauseIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                                    {/* Base Icon (Default State) */}
                                    <PauseIcon className="relative z-10 w-full h-full opacity-100 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                                    {/* Hover Icon (Hover State) - Fades in */}
                                    <PauseIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                                </div>
                            </div>
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
                <div className="flex items-center gap-3 flex-1 px-4 lg:px-6 min-w-0">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground min-w-[35px] text-right">
                        {formatTime(currentTimeMs)}
                    </span>

                    <div className="relative h-1 flex-1 bg-black/15 dark:bg-muted/50 rounded-full group cursor-pointer hover:h-1.5 transition-all">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full group-hover:bg-opacity-80 transition-all"
                            style={{
                                width: `${progress}%`,
                                background: "var(--background-image-playgrade)"
                            }}
                        >
                            <div
                                className="dark:hidden absolute inset-0 rounded-full"
                                style={{ background: "var(--blue-button)" }}
                            />
                        </div>
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
                    <div className="items-center group flex justify-end hidden sm:flex">
                        <button
                            onClick={toggleMute}
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeMuteIcon style={{ width: 36, height: 22 }} />
                            ) : (
                                <VolumeWavesIcon style={{ width: 36, height: 22 }} />
                            )}
                        </button>
                    </div>

                    {/* Separator - REMOVED */}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                        aria-label="Close Player"
                    >
                        <CloseIcon style={{ width: 20, height: 20 }} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export const GlobalPlayer = () => {
    const { currentTrack, closePlayer, isPlaying, setIsPlaying } = useGlobalAudio();
    const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    // If no track is active, don't render anything
    if (!currentTrack) return null;

    const handleClose = () => {
        setIsClosing(true); // Start exit animation
        setTimeout(() => {
            closePlayer(); // Actually close (unmount) after animation
            setIsClosing(false); // Reset state (though component unmounts)
        }, 300);
    };

    return (
        <div
            className={`fixed bottom-4 md:bottom-6 left-4 right-4 md:left-8 md:right-8 max-w-[1400px] mx-auto z-[100] rounded-2xl xs:rounded-full border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(255,255,255,0.12)] transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isClosing ? 'translate-y-[150%] opacity-0' : 'animate-in slide-in-from-bottom-[150%] opacity-100'
                } bg-[#F4F4F5] dark:bg-[#1F1F28]`}
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
                    <GlobalPlayerContent
                        title={currentTrack.title}
                        onClose={handleClose}
                        globalIsPlaying={isPlaying}
                        onGlobalPlayPause={setIsPlaying}
                    />
                </AudioExperienceProvider>
            )}
        </div>
    );
};
