"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { audioManifest } from "@/data/audio-manifest";
import { ChapterSummary, TranscriptData, TranscriptDisplayMode } from "@/components/audio-player/context/types";

export type Track = {
    src: string;
    title: string;
    transcript?: TranscriptData;
    chapters?: ChapterSummary[];
};

type GlobalAudioContextType = {
    currentTrack: Track | null;
    isPlaying: boolean;
    currentTimeMs: number;
    transcriptDisplayMode: TranscriptDisplayMode;
    playTrack: (track: Track) => void;
    playTrackById: (id: string) => Promise<void>;
    toggleTrack: (track: Track) => void;
    toggleTrackById: (id: string) => Promise<void>;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentTimeMs: (timeMs: number) => void;
    setTranscriptDisplayMode: (mode: TranscriptDisplayMode) => void;
    closePlayer: () => void;
};

const GlobalAudioContext = createContext<GlobalAudioContextType | null>(null);

export const GlobalAudioProvider = ({ children }: { children: ReactNode }) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTimeMs, setCurrentTimeMs] = useState(0);
    const [transcriptDisplayMode, setTranscriptDisplayMode] = useState<TranscriptDisplayMode>('line');

    const playTrack = useCallback((track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    }, []);

    const playTrackById = useCallback(async (id: string) => {
        const manifestItem = audioManifest.find(t => t.id === id);
        if (!manifestItem) {
            console.error(`Track not found: ${id}`);
            return;
        }

        let transcript = manifestItem.transcript;
        if (!transcript && manifestItem.transcriptSrc) {
            try {
                const res = await fetch(manifestItem.transcriptSrc);
                transcript = await res.json();
            } catch (e) {
                console.error("Failed to load transcript", e);
                transcript = { utterances: [] };
            }
        }

        let chapters = manifestItem.chapters;
        if (!chapters && manifestItem.chaptersSrc) {
            try {
                const res = await fetch(manifestItem.chaptersSrc);
                chapters = await res.json();
            } catch (e) {
                console.error("Failed to load chapters", e);
                chapters = [];
            }
        }

        const track: Track = {
            src: manifestItem.audioSrc,
            title: manifestItem.title,
            transcript,
            chapters
        };

        playTrack(track);
    }, [playTrack]);

    const toggleTrack = useCallback((track: Track) => {
        if (currentTrack?.src === track.src) {
            setIsPlaying((prev) => !prev);
        } else {
            playTrack(track);
        }
    }, [currentTrack, playTrack]);

    const toggleTrackById = useCallback(async (id: string) => {
        const manifestItem = audioManifest.find(t => t.id === id);
        if (!manifestItem) return;

        // Check if this track is already loaded/playing
        if (currentTrack?.src === manifestItem.audioSrc) {
            setIsPlaying(prev => !prev);
            return;
        }

        // Otherwise load and play
        await playTrackById(id);
    }, [currentTrack, playTrackById]);

    const closePlayer = useCallback(() => {
        setIsPlaying(false);
        setCurrentTrack(null);
    }, []);

    return (
        <GlobalAudioContext.Provider value={{ currentTrack, isPlaying, currentTimeMs, transcriptDisplayMode, playTrack, playTrackById, toggleTrack, toggleTrackById, setIsPlaying, setCurrentTimeMs, setTranscriptDisplayMode, closePlayer }}>
            {children}
        </GlobalAudioContext.Provider>
    );
};

export const useGlobalAudio = () => {
    const context = useContext(GlobalAudioContext);
    if (!context) {
        throw new Error("useGlobalAudio must be used within a GlobalAudioProvider");
    }
    return context;
};
