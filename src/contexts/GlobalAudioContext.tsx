"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { TranscriptData, ChapterSummary } from "@/components/audio-player/context/types";

export type Track = {
    src: string;
    title: string;
    transcript?: TranscriptData;
    chapters?: ChapterSummary[];
};

type GlobalAudioContextType = {
    currentTrack: Track | null;
    isPlaying: boolean;
    playTrack: (track: Track) => void;
    closePlayer: () => void;
};

const GlobalAudioContext = createContext<GlobalAudioContextType | null>(null);

export const GlobalAudioProvider = ({ children }: { children: ReactNode }) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = useCallback((track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    }, []);

    const closePlayer = useCallback(() => {
        setIsPlaying(false);
        setCurrentTrack(null);
    }, []);

    return (
        <GlobalAudioContext.Provider value={{ currentTrack, isPlaying, playTrack, closePlayer }}>
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
