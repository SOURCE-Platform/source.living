"use client";

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { PlayIcon, PauseIcon } from "@/components/audio-player/components/PlayerIcons";
import { cn } from "@/lib/utils"; // Assuming cn is available, or I'll just use template literals

export const SectionPlayButton = ({
    title,
    audioSrc,
    transcript,
    chapters,
    className
}: {
    title: string;
    audioSrc: string;
    transcript?: any;
    chapters?: any;
    className?: string;
}) => {
    const { toggleTrack, currentTrack, isPlaying } = useGlobalAudio();

    const isCurrentTrack = currentTrack?.src === audioSrc;
    const isActive = isCurrentTrack && isPlaying;

    const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Blur the button immediately to prevent focus retention
        e.currentTarget.blur();

        toggleTrack({
            title,
            src: audioSrc,
            transcript: transcript || { utterances: [] },
            chapters: chapters || []
        });
    };

    return (
        <>
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
                    <radialGradient id="playgrade-light" cx="0.3" cy="0.3" r="0.8">
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="20%" stopColor="#9B4460" />
                        <stop offset="50%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </radialGradient>
                    <radialGradient id="playgrade-light-hover" cx="0.3" cy="0.3" r="0.8" gradientTransform="scale(1.2)">
                        {/* Note: Radial gradients scale differently, keeping it simple for now or adjusting if needed */}
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="20%" stopColor="#9B4460" />
                        <stop offset="50%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </radialGradient>
                    <linearGradient id="playgrade-reverse" gradientTransform="rotate(168)">
                        <stop offset="0%" stopColor="#97A1FB" />
                        <stop offset="38%" stopColor="#FEFFE3" />
                        <stop offset="70%" stopColor="#FFC1D5" />
                        <stop offset="100%" stopColor="#FFC1D5" />
                    </linearGradient>
                    <radialGradient id="playgrade-light-reverse" cx="0.7" cy="0.7" r="0.8">
                        <stop offset="0%" stopColor="#141B5C" />
                        <stop offset="30%" stopColor="#1F1F1C" />
                        <stop offset="60%" stopColor="#9B4460" />
                        <stop offset="100%" stopColor="#ABAB88" />
                    </radialGradient>
                </defs>
            </svg>
            <button
                onClick={handlePlay}
                className={`inline-flex items-center justify-center rounded-lg pb-2 pt-1 transition-colors group cursor-pointer overflow-visible ${className}`}
                aria-label={`Play section: ${title}`}
                title="Play audio for this section"
            >
                {/* Visual improvement: show play icon. If active, maybe show a playing indicator or just the play icon styled differently */}
                <div className="relative w-[30px] h-[30px]">
                    {/* --- PLAY ICON GROUP --- */}
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isActive ? "opacity-0" : "opacity-100"}`}>
                        {/* Glow Effect - Blurred Icon */}
                        <PlayIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                        {/* Base Icon (Default State) */}
                        <PlayIcon className="relative z-10 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                        {/* Hover Icon (Hover State) - Fades in */}
                        <PlayIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                    </div>

                    {/* --- PAUSE ICON GROUP --- */}
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}>
                        {/* Glow Effect - Blurred Icon */}
                        <PauseIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                        {/* Base Icon (Default State) */}
                        <PauseIcon className="relative z-10 w-full h-full opacity-100 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                        {/* Hover Icon (Hover State) - Fades in */}
                        <PauseIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                    </div>
                </div>
            </button>
        </>
    );
};
