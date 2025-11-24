"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { ChapterSummary } from "../context/types";

export type SegmentedTimelineProps = {
  chapters: ChapterSummary[];
  currentTimeMs: number;
  durationMs: number;
  onSeek: (timeMs: number) => void;
  disabled?: boolean;
  className?: string;
};

const formatTime = (milliseconds: number) => {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const SegmentedTimeline: React.FC<SegmentedTimelineProps> = ({
  chapters,
  currentTimeMs,
  durationMs,
  onSeek,
  disabled = false,
  className = "",
}) => {
  const [hoveredSegmentIndex, setHoveredSegmentIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; time: number } | null>(null);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringPlayhead, setIsHoveringPlayhead] = useState(false);

  // Create segments from chapters
  const segments = useMemo(() => {
    if (!chapters.length || !durationMs) return [];

    const result: Array<{
      start: number;
      end: number;
      title: string;
      index: number;
    }> = [];

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const nextChapter = chapters[i + 1];
      const end = nextChapter ? nextChapter.start : durationMs;

      result.push({
        start: chapter.start,
        end,
        title: chapter.title,
        index: i,
      });
    }

    return result;
  }, [chapters, durationMs]);

  const handleTimelineMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !durationMs) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = x / rect.width;
      const timeMs = percentage * durationMs;

      // Seek to the clicked position
      onSeek(Math.max(0, Math.min(timeMs, durationMs)));

      // Start dragging immediately
      setIsDragging(true);
    },
    [disabled, durationMs, onSeek]
  );

  const handleTimelineMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !durationMs) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(x / rect.width, 1));
      const timeMs = percentage * durationMs;

      // Find which segment we're hovering over
      const segmentIndex = segments.findIndex(
        (seg) => timeMs >= seg.start && timeMs < seg.end
      );

      setHoveredSegmentIndex(segmentIndex >= 0 ? segmentIndex : null);
      setHoverPosition({ x, time: timeMs });
    },
    [disabled, durationMs, segments]
  );

  const handleTimelineMouseEnter = useCallback(() => {
    setIsHoveringTimeline(true);
  }, []);

  const handleTimelineMouseLeave = useCallback(() => {
    if (!isDragging) {
      setIsHoveringTimeline(false);
      setHoveredSegmentIndex(null);
      setHoverPosition(null);
    }
  }, [isDragging]);


  const handleGlobalMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || disabled || !durationMs) return;

      const timeline = document.querySelector('[data-timeline-container]') as HTMLElement;
      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(x / rect.width, 1));
      const timeMs = percentage * durationMs;

      onSeek(timeMs);
    },
    [isDragging, disabled, durationMs, onSeek]
  );

  const handleGlobalMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  // Add global mouse event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleGlobalMouseMove, handleGlobalMouseUp]);

  const currentProgress = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;

  if (!segments.length) return null;

  return (
    <div className={className} style={{ position: "relative", width: "100%" }}>
      {/* Tooltip */}
      {hoverPosition !== null &&
        hoveredSegmentIndex !== null &&
        segments[hoveredSegmentIndex] && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: `${hoverPosition.x}px`,
              transform: "translateX(-50%)",
              background: "var(--audio-time-bg)",
              color: "var(--audio-text)",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 50,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            {formatTime(hoverPosition.time)} {segments[hoveredSegmentIndex].title}
          </div>
        )}

      {/* Timeline container */}
      <div
        data-timeline-container
        onMouseDown={handleTimelineMouseDown}
        onMouseMove={handleTimelineMouseMove}
        onMouseEnter={handleTimelineMouseEnter}
        onMouseLeave={handleTimelineMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          height: "20px",
          cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          userSelect: isDragging ? "none" : "auto",
        }}
      >
        {segments.map((segment, index) => {
          const segmentWidth = ((segment.end - segment.start) / durationMs) * 100;
          const isHovered = hoveredSegmentIndex === index;
          const segmentHeight = isHovered ? "12px" : "6px";

          // Determine if playhead is within this segment
          const isCurrentSegment = currentTimeMs >= segment.start && currentTimeMs < segment.end;
          const isBeforePlayhead = currentTimeMs >= segment.end;
          const isAfterPlayhead = currentTimeMs < segment.start;

          const baseColor = typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
              ? "white"
              : "black";

          let segmentStyle: React.CSSProperties;

          if (isCurrentSegment) {
            // Current segment: use gradient to split at playhead position
            const segmentDuration = segment.end - segment.start;
            const playheadPositionInSegment = ((currentTimeMs - segment.start) / segmentDuration) * 100;

            segmentStyle = {
              flex: `0 0 calc(${segmentWidth}% - ${5 * (segments.length - 1) / segments.length}px)`,
              height: segmentHeight,
              background: `linear-gradient(to right, ${baseColor} 0%, ${baseColor} ${playheadPositionInSegment}%, ${baseColor} ${playheadPositionInSegment}%, ${baseColor} 100%)`,
              maskImage: `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${playheadPositionInSegment}%, rgba(0,0,0,0.3) ${playheadPositionInSegment}%, rgba(0,0,0,0.3) 100%)`,
              WebkitMaskImage: `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${playheadPositionInSegment}%, rgba(0,0,0,0.3) ${playheadPositionInSegment}%, rgba(0,0,0,0.3) 100%)`,
              transition: "height 0.2s ease",
              borderRadius: "999px",
              position: "relative",
            };
          } else {
            // Before or after playhead: solid opacity
            const segmentOpacity = isBeforePlayhead ? 1 : 0.3;

            segmentStyle = {
              flex: `0 0 calc(${segmentWidth}% - ${5 * (segments.length - 1) / segments.length}px)`,
              height: segmentHeight,
              background: baseColor,
              opacity: segmentOpacity,
              transition: "height 0.2s ease, opacity 0.2s ease",
              borderRadius: "999px",
              position: "relative",
            };
          }

          return (
            <div
              key={`segment-${index}`}
              style={segmentStyle}
            />
          );
        })}

        {/* Playhead */}
        <div
          onMouseEnter={() => setIsHoveringPlayhead(true)}
          onMouseLeave={() => setIsHoveringPlayhead(false)}
          style={{
            position: "absolute",
            left: `${currentProgress}%`,
            transform: "translateX(-50%)",
            width: isDragging || isHoveringPlayhead ? "24px" : isHoveringTimeline ? "20px" : "13px",
            height: isDragging || isHoveringPlayhead ? "24px" : isHoveringTimeline ? "20px" : "13px",
            borderRadius: "50%",
            background:
              typeof window !== "undefined" &&
              document.documentElement.classList.contains("dark")
                ? "white"
                : "black",
            transition: isDragging ? "none" : "width 0.2s ease, height 0.2s ease",
            pointerEvents: "none",
            cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "grab",
            zIndex: 10,
            boxShadow: isDragging || isHoveringPlayhead
              ? "0 4px 12px rgba(0, 0, 0, 0.3)"
              : "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
};
