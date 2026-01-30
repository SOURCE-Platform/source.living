import { TranscriptData, ChapterSummary } from "@/components/audio-player/context/types";

export type AudioTrack = {
    id: string;
    title: string;
    audioSrc: string;
    transcriptSrc?: string; // Path to JSON file
    chaptersSrc?: string;   // Path to JSON file
    paragraphsSrc?: string; // Path to JSON file
    transcript?: TranscriptData; // Quick inline data
    chapters?: ChapterSummary[]; // Quick inline data
    paragraphs?: number[];       // Quick inline data
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
        id: "jan-30",
        title: "Jan 30",
        audioSrc: "/audio/WORDz/jan 30.mp3",
        transcriptSrc: "/audio/WORDz/WORDz_JSON/jan 30.json",
        chaptersSrc: "/audio/WORDz/WORDz_JSON/jan 30_chapters.json",
        paragraphsSrc: "/audio/WORDz/WORDz_JSON/jan 30_paragraphs.json"
    },
    {
        id: "strong-talk",
        title: "Strong Talk",
        audioSrc: "/audio/WORDz/strong talk.mp3",
        transcriptSrc: "/audio/WORDz/WORDz_JSON/strong talk.json",
        chaptersSrc: "/audio/WORDz/WORDz_JSON/strong talk_chapters.json",
        paragraphsSrc: "/audio/WORDz/WORDz_JSON/strong talk_paragraphs.json"
    },
    {
        id: "talking-relationships-yinyang",
        title: "Talking Relationships & Yinyang",
        audioSrc: "/audio/WORDz/talking relationships & yinyang.mp3",
        transcriptSrc: "/audio/WORDz/WORDz_JSON/talking relationships & yinyang.json",
        chaptersSrc: "/audio/WORDz/WORDz_JSON/talking relationships & yinyang_chapters.json",
        paragraphsSrc: "/audio/WORDz/WORDz_JSON/talking relationships & yinyang_paragraphs.json"
    }
];
