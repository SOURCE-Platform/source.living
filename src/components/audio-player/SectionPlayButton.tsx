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
    const { playTrack, currentTrack, isPlaying } = useGlobalAudio();

    const isCurrentTrack = currentTrack?.src === audioSrc;
    const isActive = isCurrentTrack && isPlaying;

    const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Blur the button immediately to prevent focus retention
        e.currentTarget.blur();

        playTrack({
            title,
            src: audioSrc,
            transcript: transcript || { utterances: [] },
            chapters: chapters || []
        });
    };

    return (
        <button
            onClick={handlePlay}
            className={`inline-flex items-center justify-center rounded-full p-2 hover:bg-muted transition-colors group cursor-pointer ${className}`}
            aria-label={`Play section: ${title}`}
            title="Play audio for this section"
        >
            {/* Visual improvement: show play icon. If active, maybe show a playing indicator or just the play icon styled differently */}
            {isActive ? (
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            ) : (
                <PlayIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            )}
        </button>
    );
};
