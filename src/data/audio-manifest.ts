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
        audioSrc: "/audio/source-setting-the-stage/audio.mp3", // Kept as is if file exists, or update if renormalized
        // transcriptSrc: "/audio/source-setting-the-stage/transcript.json",
        // chaptersSrc: "/audio/source-setting-the-stage/chapters.json",
        chapters: [
            { title: "Introduction", start: 0 },
            { title: "The Problem", start: 30000 }, // Example
            { title: "The Solution", start: 60000 }  // Example
        ]
    },
    {
        id: "taking-relationships-yinyang",
        title: "Taking Relationships & Yinyang",
        audioSrc: "/audio/WORDz/Taking relationships & yinyang.m4a",
        // Transcript will be added later by user
        // transcript: undefined,
        // OR use transcriptSrc for remote loading:
        // transcriptSrc: "/audio/WORDz/transcript.json"
    }
];
