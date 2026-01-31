'use client';

import { useState, useEffect } from "react";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { cn } from "@/lib/utils";

type WordzTrack = {
    title: string;
    audioUrl: string;
    duration?: number;
    speakers?: number;
    chapters?: Array<{
        title: string;
        start: number;
        end: number;
    }>;
    transcriptId?: string;
    processing?: boolean;
};

export const WordzAudioList = () => {
    const { toggleTrackById, currentTrack, isPlaying } = useGlobalAudio();
    const [tracks, setTracks] = useState<WordzTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTracks() {
            try {
                const response = await fetch('/api/wordz');
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                setTracks(data.tracks);
            } catch (err) {
                console.error('Error fetching WORDz tracks:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        fetchTracks();
    }, []);

    if (loading) {
        return (
            <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-full h-[60px] rounded-lg bg-muted/20 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                Failed to load tracks: {error}
            </div>
        );
    }

    if (tracks.length === 0) {
        return (
            <div className="p-4 rounded-lg bg-muted/20 text-muted-foreground">
                No audio tracks found. Upload a voice memo to get started!
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {tracks.map((track) => {
                // Generate a slug-style ID from the title (remove special chars, replace spaces with hyphens)
                const trackId = track.title.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-');
                const isActive = currentTrack?.src === track.audioUrl && isPlaying;

                return (
                    <div
                        key={track.title}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleTrackById(trackId)}
                        className={cn(
                            "group w-full relative flex items-center p-4 rounded-lg transition-all duration-200 cursor-pointer text-left h-[60px] outline-none",
                            "hover:bg-muted/40",
                            isActive ? "bg-muted/20" : "bg-transparent"
                        )}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleTrackById(trackId);
                            }
                        }}
                    >
                        <span className={cn(
                            "absolute left-4 right-16 text-sm 2xl:text-xl font-light tracking-tight transition-colors whitespace-nowrap overflow-hidden text-ellipsis",
                            isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                        )}>
                            {track.title}
                            {track.processing && (
                                <span className="ml-2 text-xs text-muted-foreground">(Processing...)</span>
                            )}
                        </span>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <SectionPlayButton
                                trackId={trackId}
                                className="w-8 h-8 text-foreground transition-all group-hover:scale-105"
                                waveformAlignment="left"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
