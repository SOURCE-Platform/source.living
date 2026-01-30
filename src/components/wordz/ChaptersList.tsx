'use client';

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";

import { cn } from "@/lib/utils";

// Inline utility if not available
const formatTimeMs = (milliseconds: number) => {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const ChaptersList = () => {
    const { currentTrack, seekTo, currentTimeMs, isPlaying } = useGlobalAudio();

    if (!currentTrack) {
        return (
            <div className="space-y-4 opacity-50">
                <h2 className="text-xl font-light tracking-tight text-muted-foreground">Chapters</h2>
                <p className="text-sm text-muted-foreground/60">Select a track to view chapters</p>
            </div>
        );
    }

    const chapters = currentTrack.chapters || [];

    if (chapters.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-light tracking-tight text-muted-foreground">Chapters</h2>
                <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground text-center italic">No chapters available</p>
                </div>
            </div>
        );
    }

    // Determine active chapter
    // We can't know the exact active chapter index from GlobalAudio if it doesn't expose it, 
    // but we have currentTimeMs, so we can calculate it.
    let activeChapterIndex = -1;
    for (let i = 0; i < chapters.length; i++) {
        if (currentTimeMs >= chapters[i].start) {
            activeChapterIndex = i;
        } else {
            break;
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-light tracking-tight text-muted-foreground">Chapters</h2>
            <div className="space-y-1">
                {chapters.map((chapter, index) => {
                    const isActive = index === activeChapterIndex;
                    return (
                        <button
                            key={index}
                            onClick={() => seekTo(chapter.start)}
                            className={cn(
                                "group w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-start justify-between gap-4 border",
                                isActive
                                    ? "bg-primary/5 border-primary/20 shadow-sm"
                                    : "hover:bg-muted/40 border-transparent hover:border-border/30 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <span className={cn(
                                "text-sm font-medium leading-relaxed transition-colors",
                                isActive ? "text-primary" : "group-hover:text-foreground"
                            )}>
                                {chapter.title}
                            </span>
                            <span className={cn(
                                "text-xs font-mono mt-0.5 transition-colors",
                                isActive ? "text-primary/70" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                            )}>
                                {formatTimeMs(chapter.start)}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
