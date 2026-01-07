import { TranscriptData, ChapterSummary } from "@/components/audio-player/context/types";

export type AudioTrack = {
    id: string;
    title: string;
    audioSrc: string;
    transcriptSrc?: string; // Path to JSON file
    chaptersSrc?: string;   // Path to JSON file
    transcript?: TranscriptData; // Quick inline data
    chapters?: ChapterSummary[]; // Quick inline data
};

export const audioManifest: AudioTrack[] = [
    {
        id: "source-setting-the-stage",
        title: "SOURCE: Setting the Stage",
        audioSrc: "/audio/source-setting-the-stage/audio.mp3",
        // transcriptSrc: "/audio/source-setting-the-stage/transcript.json",
        // chaptersSrc: "/audio/source-setting-the-stage/chapters.json",
        chapters: [
            { title: "Introduction", start: 0 },
            { title: "The Problem", start: 30000 }, // Example
            { title: "The Solution", start: 60000 }  // Example
        ]
    }
];
