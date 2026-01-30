'use client';

import { audioManifest } from "@/data/audio-manifest";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { cn } from "@/lib/utils";

// Filter or select tracks specifically for the Wordz page
const WORDZ_TRACK_IDS = [
    "jan-30",
    "strong-talk",
    "talking-relationships-yinyang"
];

const AUDIO_FILES = audioManifest
    .filter(track => WORDZ_TRACK_IDS.includes(track.id))
    .map(track => ({
        id: track.id,
        title: track.title,
        audioSrc: track.audioSrc,
        filename: track.audioSrc.split('/').pop() || ""
    }));

export const WordzAudioList = () => {
    const { toggleTrackById, currentTrack, isPlaying } = useGlobalAudio();

    return (
        <div className="space-y-2">
            {AUDIO_FILES.map((audio) => {
                const isActive = currentTrack?.src === audio.audioSrc && isPlaying;

                return (
                    <div
                        key={audio.filename}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleTrackById(audio.id)}
                        className={cn(
                            "group w-full relative flex items-center p-4 rounded-lg transition-all duration-200 cursor-pointer text-left h-[60px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Reduced height
                            "hover:bg-muted/40",
                            isActive ? "bg-muted/20" : "bg-transparent"
                        )}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleTrackById(audio.id);
                            }
                        }}
                    >
                        <span className={cn(
                            "absolute left-4 right-16 text-sm 2xl:text-xl font-light tracking-tight transition-colors whitespace-nowrap overflow-hidden text-ellipsis", // Responsive font size: sm below 2xl, xl above
                            isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                        )}>
                            {audio.title}
                        </span>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <SectionPlayButton
                                trackId={audio.id}
                                className="w-8 h-8 text-foreground transition-all group-hover:scale-105"  // Reduced container size
                                waveformAlignment="left"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
