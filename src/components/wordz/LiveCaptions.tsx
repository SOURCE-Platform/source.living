"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { ReactLenis } from "lenis/react";
import type { TranscriptData, TranscriptUtterance, TranscriptWord } from "@/components/audio-player/context/types";

import { ChapterSummary } from "@/components/audio-player/context/types";

export type LiveCaptionsProps = {
  transcript: TranscriptData;
  currentTimeMs: number;
  className?: string;
  paragraphs?: number[];
  chapters?: ChapterSummary[];
};

// ... existing styles ...
const containerBaseStyle: React.CSSProperties = {
  width: "100%",
};

const captionContainerStyle: React.CSSProperties = {
  ...containerBaseStyle,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

const isWordActive = (word: TranscriptWord, currentTimeMs: number) => {
  const start = word.start ?? 0;
  const end = word.end ?? start;
  return currentTimeMs >= start && currentTimeMs <= end;
};


export const LiveCaptions: React.FC<LiveCaptionsProps> = ({
  transcript,
  currentTimeMs,
  className,
  paragraphs,
  chapters
}) => {
  const { transcriptDisplayMode } = useGlobalAudio();

  // State for chapter transitions
  const [displayedChapterStart, setDisplayedChapterStart] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Identify current active chapter
  const activeChapterData = useMemo(() => {
    if (!chapters || chapters.length === 0) return { start: 0, end: Infinity };

    // Find chapter that contains currentTimeMs
    const idx = chapters.findIndex((ch, i) => {
      const nextStart = chapters[i + 1]?.start ?? Infinity;
      return currentTimeMs >= ch.start && currentTimeMs < nextStart;
    });

    if (idx === -1) return { start: 0, end: Infinity };

    const start = chapters[idx].start;
    const end = chapters[idx + 1]?.start ?? Infinity;
    return { start, end };
  }, [chapters, currentTimeMs]);

  // Handle Transitions
  // Handle Transitions
  useEffect(() => {
    // If our reliable source of truth (time calculation) says we are in a new chapter
    if (activeChapterData.start !== displayedChapterStart) {
      // Start fade out
      setIsFadingOut(true);

      // Wait for fade out, then switch data and fade in
      const timeout = setTimeout(() => {
        setDisplayedChapterStart(activeChapterData.start);
        setIsFadingOut(false);
      }, 300); // Match CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [activeChapterData.start, displayedChapterStart]);


  // ... (keep renderWords, utterances, sentences, activeUtterance, activeWord, activeSentence calculations)
  // Reuse existing useMemos but filter the final "full text" render

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
      return (
        <span
          key={`${keyPrefix}-word-${index}`}
          style={spanStyle}
        >
          {word.text}
          {" "}
        </span>
      );
    });
  }, [currentTimeMs]);

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

  // Word Mode Effect
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

  // State for hover detection to pause auto-scroll
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll effect for Full Text mode
  useEffect(() => {
    if (transcriptDisplayMode === 'full' && activeSentence && !isHovering) {
      const element = document.getElementById(`full-sentence-${activeSentence.start}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeSentence, transcriptDisplayMode, isHovering]);

  // Determine which chapter range we are actually DISPLAYING (which might trail the real time during fade)
  const currentChapterEnd = useMemo(() => {
    if (!chapters) return Infinity;
    const idx = chapters.findIndex(c => c.start === displayedChapterStart);
    if (idx === -1) return Infinity;
    // The displayed chapter ends when the NEXT chapter starts (ignoring current time, based on structure)
    return chapters[idx + 1]?.start ?? Infinity;
  }, [chapters, displayedChapterStart]);


  if (transcriptDisplayMode === "line") {
    // ... (keep line mode as is)
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
    // ... (keep word mode as is)
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

  // Memoized Sentence Component for Full Text Mode
  const FullTextSentence = React.memo(({
    sentence,
    isActive,
    currentTimeMs,
    isParagraphStart
  }: {
    sentence: CaptionSentence;
    isActive: boolean;
    currentTimeMs: number;
    isParagraphStart: boolean;
  }) => {
    // Re-implement renderWords logic locally or accept as prop?
    // Locally is cleaner to avoid function dependency issues.

    const words = sentence.words;

    const renderedWords = useMemo(() => {
      if (!Array.isArray(words) || words.length === 0) return sentence.text;

      // If not active, we can skip specific time calculations and render static
      // BUT if we want past/future styling, we might need to know. 
      // Current requirement: "active" is highlighted, others are standard text color.
      // So if !isActive, we render all as standard.

      const lineBorderColor = "var(--audio-text)";
      const lineDimmedColor = "color-mix(in srgb, var(--audio-text) 50%, transparent)";

      return words.map((word, index) => {
        // Logic from renderWords
        const active = isActive ? isWordActive(word, currentTimeMs) : false;
        const wordStart = typeof word.start === "number" ? word.start : 0;
        const wordEnd = typeof word.end === "number" ? word.end : wordStart;
        const wordDuration = Math.max(wordEnd - wordStart, 1);

        const elapsedMs = active ? Math.min(Math.max(currentTimeMs - wordStart, 0), wordDuration) : 0;
        const progress = active ? elapsedMs / wordDuration : 0;
        const underlineSize = `${(progress * 100).toFixed(2)}% 1px`;

        const baseSpanStyle: React.CSSProperties = {
          color: lineDimmedColor,
          backgroundImage: `linear-gradient(to right, ${lineBorderColor}, ${lineBorderColor})`,
          backgroundSize: "0% 1px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          transition: "color 0.2s ease, background-size 0.1s linear",
        };

        const activeSpanStyle: React.CSSProperties = {
          color: "var(--audio-text)",
          backgroundSize: underlineSize,
        };

        const spanStyle: React.CSSProperties = active
          ? { ...baseSpanStyle, ...activeSpanStyle }
          : baseSpanStyle;

        return (
          <span
            key={`word-${index}`}
            style={spanStyle}
          >
            {word.text}
            {" "}
          </span>
        );
      });
    }, [words, isActive, currentTimeMs, sentence.text]);

    return (
      <React.Fragment>
        {isParagraphStart && <div style={{ height: '1.5em', width: '100%' }} />}
        <span
          id={`full-sentence-${sentence.start}`}
          style={{ display: 'inline', marginRight: '0.5em' }}
        >
          {renderedWords}
        </span>
      </React.Fragment>
    );
  });
  FullTextSentence.displayName = 'FullTextSentence';

  // ... LiveCaptions component ...

  if (transcriptDisplayMode === "full") {
    // Filter sentences for the DISPLAYED chapter
    const chapterSentences = sentences.filter(s => {
      // Simple logic: sentence starts belong to the chapter? 
      // Or overlap? Usually start time falling in range is sufficient.
      return s.start >= displayedChapterStart && s.start < currentChapterEnd;
    });

    return (
      <ReactLenis
        root={false}
        options={{
          lerp: 0.1,
          duration: 1.5,
          smoothWheel: true,
          // We need to ensure touch scrolling works naturally too
          touchMultiplier: 2
        }}
        className={`${className} custom-scrollbar fading-scrollbar`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        // Removed data-lenis-prevent
        style={{
          ...captionContainerStyle,
          alignItems: 'flex-start',
          overflowY: 'auto',
          height: '100%',
          padding: '1rem',
          display: 'block',
          opacity: isFadingOut ? 0 : 1,                // Control visibility
          transition: 'opacity 300ms ease-in-out',     // Transition effect
          overscrollBehavior: 'contain' // Prevent scroll chaining
        }}
      >
        <div style={{ ...captionSentenceWordsStyle, display: 'block', textAlign: 'left', fontSize: 18, maxWidth: '100%' }}>
          {chapterSentences.map((sentence, sIdx) => {
            const isActiveSentence = activeSentence === sentence;
            const isParagraphStart = paragraphs?.some(pStart => Math.abs(pStart - sentence.start) < 10) ?? false;

            return (
              <FullTextSentence
                key={`full-sentence-wrapper-${sentence.start}`}
                sentence={sentence}
                isActive={isActiveSentence}
                currentTimeMs={isActiveSentence ? currentTimeMs : 0} // Only update time for active sentence
                isParagraphStart={isParagraphStart}
              />
            );
          })}
          {chapterSentences.length === 0 && (
            <div className="text-muted-foreground italic p-4 text-center">
              Waiting for dialogue...
            </div>
          )}
        </div>
      </ReactLenis>
    );
  }

  // Default
  return (
    <div className={className} style={captionContainerStyle}>
      <div style={captionLineStyle}>
        <div style={captionSentenceWordsStyle}></div>
      </div>
    </div>
  );
};
