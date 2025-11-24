"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudioExperience } from "../context/AudioExperienceContext";
import type { TranscriptUtterance, TranscriptWord } from "../context/types";

export type TranscriptScrollerProps = {
  className?: string;
  autoScroll?: boolean;
  highlightClassName?: string;
  utteranceHeaderClassName?: string;
  wordsContainerClassName?: string;
  allowSeekOnWordClick?: boolean;
};

const containerBaseStyle: React.CSSProperties = {
  width: "100%",
};

const captionContainerStyle: React.CSSProperties = {
  ...containerBaseStyle,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const scrollingContainerStyle: React.CSSProperties = {
  ...containerBaseStyle,
  overflowY: "auto",
  maxHeight: "70vh",
  paddingRight: 8,
};

const utteranceStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  alignItems: "start",
  gap: "12px",
  marginBottom: "12px",
};

const speakerStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 14,
  color: "var(--audio-text)",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const wordsWrapperStyle: React.CSSProperties = {
  lineHeight: 1.6,
  color: "var(--audio-text)",
  fontSize: 15,
};

const defaultHighlightStyle: React.CSSProperties = {
  background: "color-mix(in srgb, var(--audio-accent) 45%, transparent)",
  borderRadius: 4,
};

const captionLineStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  lineHeight: 1.5,
  color: "var(--audio-text)",
  fontSize: 20,
  minHeight: 120,
  width: "100%",
};

const captionWordStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--audio-text)",
};

const captionSentenceWordsStyle: React.CSSProperties = {
  display: "inline-flex",
  flexWrap: "wrap",
  gap: 6,
  justifyContent: "center",
  fontSize: 24,
  lineHeight: 1.4,
  color: "var(--audio-text)",
  maxWidth: 500,
  width: "100%",
  textAlign: "center",
  margin: "0 auto",
};

type CaptionSentence = {
  words: TranscriptWord[];
  speaker: string | null;
  start: number;
  end: number;
  text: string;
};

const sentenceEndingRegex = /[.!?]+$/;

const useRafThrottle = () => {
  const rafId = useRef<number | null>(null);
  const cancel = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);
  useEffect(() => cancel, [cancel]);
  return { rafId, cancel };
};

const isWordActive = (word: TranscriptWord, currentTimeMs: number) => {
  const start = word.start ?? 0;
  const end = word.end ?? start;
  return currentTimeMs >= start && currentTimeMs <= end;
};

export const TranscriptScroller: React.FC<TranscriptScrollerProps> = ({
  className,
  autoScroll = true,
  highlightClassName,
  utteranceHeaderClassName,
  wordsContainerClassName,
  allowSeekOnWordClick = true,
}) => {
  const {
    transcript,
    currentTimeMs,
    seekToMs,
    transcriptDisplayMode,
  } = useAudioExperience();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);
  const { rafId, cancel } = useRafThrottle();

  const handleWordClick = useCallback((word: TranscriptWord) => {
    if (!allowSeekOnWordClick) return;
    if (typeof word.start === "number") {
      seekToMs(word.start);
    }
  }, [allowSeekOnWordClick, seekToMs]);

  const renderWords = useCallback((
    words: TranscriptWord[] | undefined,
    keyPrefix: string,
    options?: { variant?: "line" | "default" },
  ) => {
    if (!Array.isArray(words) || words.length === 0) return null;
    const isLineVariant = options?.variant === "line";
    const lineBorderColor = "var(--audio-text)";
    const lineDimmedColor = "color-mix(in srgb, var(--audio-text) 50%, transparent)";
    return words.map((word, index) => {
      const active = isWordActive(word, currentTimeMs);
      const wordStart = typeof word.start === "number" ? word.start : 0;
      const wordEnd = typeof word.end === "number" ? word.end : wordStart;
      const wordDuration = Math.max(wordEnd - wordStart, 1);
      const elapsedMs = active ? Math.min(Math.max(currentTimeMs - wordStart, 0), wordDuration) : 0;
      const progress = active ? elapsedMs / wordDuration : 0;
      const underlineSize = `${(progress * 100).toFixed(2)}% 1px`;
      const baseSpanStyle: React.CSSProperties = isLineVariant
        ? {
          color: lineDimmedColor,
          backgroundImage: `linear-gradient(to right, ${lineBorderColor}, ${lineBorderColor})`,
          backgroundSize: "0% 1px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          transition: "color 0.2s ease, background-size 0.1s linear",
        }
        : {};
      const activeSpanStyle: React.CSSProperties = isLineVariant
        ? {
          color: "var(--audio-text)",
          backgroundSize: underlineSize,
        }
        : { ...defaultHighlightStyle };
      const spanStyle: React.CSSProperties = active
        ? { ...baseSpanStyle, ...activeSpanStyle }
        : baseSpanStyle;
      const appliedClassName = active && !isLineVariant && highlightClassName ? highlightClassName : undefined;
      const refCallback = (el: HTMLSpanElement | null) => {
        if (active) {
          activeWordRef.current = el;
        }
      };
      return (
        <span
          key={`${keyPrefix}-word-${index}`}
          ref={refCallback}
          className={appliedClassName}
          style={spanStyle}
          onClick={() => handleWordClick(word)}
          role={allowSeekOnWordClick ? "button" : undefined}
          tabIndex={allowSeekOnWordClick ? 0 : undefined}
          onKeyDown={(event) => {
            if (!allowSeekOnWordClick) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleWordClick(word);
            }
          }}
        >
          {word.text}
          {" "}
        </span>
      );
    });
  }, [allowSeekOnWordClick, currentTimeMs, handleWordClick, highlightClassName]);

  const utterances: TranscriptUtterance[] = useMemo(() => transcript.utterances ?? [], [transcript.utterances]);

  const sentences = useMemo<CaptionSentence[]>(() => {
    const results: CaptionSentence[] = [];

    utterances.forEach((utterance) => {
      if (!Array.isArray(utterance.words) || utterance.words.length === 0) {
        if (utterance.text) {
          results.push({
            words: [],
            speaker: utterance.speaker ?? null,
            start: utterance.start,
            end: utterance.end,
            text: utterance.text,
          });
        }
        return;
      }

      let currentWords: TranscriptWord[] = [];
      const flushSentence = () => {
        if (currentWords.length === 0) return;
        const start = currentWords.find((word) => typeof word.start === "number")?.start ?? utterance.start;
        const end = [...currentWords]
          .reverse()
          .find((word) => typeof word.end === "number")?.end ?? utterance.end;
        const text = currentWords.map((word) => word.text ?? "").join(" ").trim();
        results.push({
          words: [...currentWords],
          speaker: utterance.speaker ?? null,
          start,
          end,
          text,
        });
        currentWords = [];
      };

      utterance.words.forEach((word) => {
        currentWords.push(word);
        const wordText = (word.text ?? "").trim();
        if (sentenceEndingRegex.test(wordText)) {
          flushSentence();
        }
      });

      flushSentence();
    });

    return results;
  }, [utterances]);

  const activeUtterance = useMemo(() => {
    return utterances.find((utterance, index) => {
      const nextStart = utterances[index + 1]?.start ?? Number.POSITIVE_INFINITY;
      return currentTimeMs >= utterance.start && currentTimeMs < nextStart;
    }) ?? null;
  }, [utterances, currentTimeMs]);

  const activeWord = useMemo(() => {
    if (!activeUtterance || !Array.isArray(activeUtterance.words)) return null;
    return activeUtterance.words.find((word) => isWordActive(word, currentTimeMs)) ?? null;
  }, [activeUtterance, currentTimeMs]);

  const activeSentence = useMemo(() => {
    if (!sentences.length) return null;
    return sentences.find((sentence, index) => {
      const nextStart = sentences[index + 1]?.start ?? Number.POSITIVE_INFINITY;
      return currentTimeMs >= sentence.start && currentTimeMs < nextStart;
    }) ?? null;
  }, [currentTimeMs, sentences]);

  const [wordCaptionText, setWordCaptionText] = useState<string>(activeWord?.text ?? "");
  const [isWordCaptionVisible, setIsWordCaptionVisible] = useState<boolean>(Boolean(activeWord?.text));

  useEffect(() => {
    if (transcriptDisplayMode !== "word") {
      setIsWordCaptionVisible(false);
      setWordCaptionText("");
      return;
    }

    const nextText = activeWord?.text ?? "";
    if (nextText) {
      setWordCaptionText(nextText);
      const raf = requestAnimationFrame(() => setIsWordCaptionVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setIsWordCaptionVisible(false);
    const timeout = window.setTimeout(() => {
      setWordCaptionText("");
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [activeWord?.text, transcriptDisplayMode]);

  if (transcriptDisplayMode === "line") {
    // Only show content if there's an active sentence
    if (!activeSentence) {
      return (
        <div className={className} style={captionContainerStyle}>
          <div style={captionLineStyle}>
            <div style={captionSentenceWordsStyle}></div>
          </div>
        </div>
      );
    }

    const wordsForSentence = activeSentence.words ?? [];
    const sentenceKey = `sentence-${activeSentence.start}`;
    const fallbackText = activeSentence.text ?? "";

    return (
      <div className={className} style={captionContainerStyle}>
        <div style={captionLineStyle}>
          <div style={captionSentenceWordsStyle}>
            {wordsForSentence.length > 0
              ? renderWords(wordsForSentence, sentenceKey, { variant: "line" })
              : fallbackText}
          </div>
        </div>
      </div>
    );
  }

  if (transcriptDisplayMode === "word") {
    return (
      <div className={className} style={captionContainerStyle}>
        <div style={captionLineStyle}>
          <span
            style={{
              ...captionWordStyle,
              opacity: isWordCaptionVisible ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          >
            {wordCaptionText}
          </span>
        </div>
      </div>
    );
  }

  // Default to line mode if somehow in an invalid state
  return (
    <div className={className} style={captionContainerStyle}>
      <div style={captionLineStyle}>
        <div style={captionSentenceWordsStyle}></div>
      </div>
    </div>
  );
};
