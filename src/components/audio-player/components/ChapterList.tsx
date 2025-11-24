"use client";

import React, { useCallback } from "react";
import { useAudioExperience } from "../context/AudioExperienceContext";

export type ChapterListProps = {
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  title?: string;
};

const containerStyle: React.CSSProperties = {
  flexDirection: "column",
  gap: 12,
  color: "var(--audio-text)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--audio-text)",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  flexDirection: "column",
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  cursor: "pointer",
  color: "var(--audio-text)",
  opacity: 0.5,
  transition: "opacity 0.2s ease",
};

const activeItemStyle: React.CSSProperties = {
  ...itemStyle,
  opacity: 1,
};

const chapterTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 15,
};

const chapterTimeStyle: React.CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--audio-muted)",
};

const formatTime = (milliseconds: number) => {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const ChapterList: React.FC<ChapterListProps> = ({
  className,
  listClassName,
  itemClassName,
  activeItemClassName,
  title = "Chapters",
}) => {
  const { chapters, activeChapterIndex, seekToMs } = useAudioExperience();

  const handleChapterClick = useCallback((start: number) => {
    seekToMs(start);
  }, [seekToMs]);

  return (
    <aside className={`flex ${className}`} style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <ol className={`flex gap-2 lg:gap-4 ${listClassName}`} style={listStyle}>
        {chapters.map((chapter, index) => {
          const isActive = index === activeChapterIndex;
          const baseStyle = isActive ? activeItemStyle : itemStyle;
          return (
            <li
              key={chapter.title}
              className={isActive ? activeItemClassName : itemClassName}
              style={baseStyle}
              onMouseEnter={(event: React.MouseEvent<HTMLLIElement>) => {
                if (isActive) return;
                event.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(event: React.MouseEvent<HTMLLIElement>) => {
                if (isActive) return;
                event.currentTarget.style.opacity = String(itemStyle.opacity ?? 0.5);
              }}
            >
              <button
                type="button"
                onClick={() => handleChapterClick(chapter.start)}
                style={{
                  all: "unset",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  cursor: "pointer",
                  alignItems: "flex-start",
                }}
              >
                <span style={chapterTitleStyle}>{chapter.title}</span>
                  <span className="chapter-time" style={chapterTimeStyle}>{formatTime(chapter.start)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
};
