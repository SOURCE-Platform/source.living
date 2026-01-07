"use client";

import React from "react";
import { ChapterSummary } from "../context/types";

const formatTime = (milliseconds: number) => {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

interface ChapterPopupProps {
    title: string;
    chapters: any[];
    onChapterClick: (ms: number) => void;
    onClose: () => void;
}

export const ChapterPopup: React.FC<ChapterPopupProps> = ({ title, chapters, onChapterClick, onClose }) => {
    // Styling matches GlobalPlayer: bg, border, shadow
    return (
        <div
            className="absolute bottom-[calc(100%+38px)] left-[-16px] w-[280px] bg-[#F4F4F5] dark:bg-[#1F1F28] rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(255,255,255,0.12)] overflow-hidden flex flex-col max-h-[300px] z-[90] animate-in slide-in-from-bottom-2 fade-in duration-200 origin-bottom-left"
        >
            <div className="flex flex-col px-4 py-3 border-b border-black/5 dark:border-white/5 sticky top-0 z-10 bg-[#F4F4F5] dark:bg-[#1F1F28]">
                <span className="text-sm font-semibold text-foreground truncate mb-1" title={title}>{title}</span>
                <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-medium text-muted-foreground">Timestamps</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{chapters.length} items</span>
                </div>
            </div>
            <div className="overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {chapters.map((chapter, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            onChapterClick(chapter.start);
                            onClose();
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-3 group border-l-2 border-transparent hover:border-black/20 dark:hover:border-white/20 cursor-pointer"
                    >
                        <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors min-w-[35px] opacity-70">
                            {formatTime(chapter.start)}
                        </span>
                        <span className="text-sm text-foreground truncate flex-1 font-medium opacity-90 group-hover:opacity-100">
                            {chapter.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
