"use client";

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";

export const CaptionModeToggle = () => {
  const { transcriptDisplayMode, setTranscriptDisplayMode } = useGlobalAudio();

  return (
    <div className="flex gap-2 mb-8">
      <button
        onClick={() => setTranscriptDisplayMode('line')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${transcriptDisplayMode === 'line'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'text-muted-foreground hover:text-foreground'
          }`}
        aria-pressed={transcriptDisplayMode === 'line'}
      >
        Line Mode
      </button>
      <button
        onClick={() => setTranscriptDisplayMode('word')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${transcriptDisplayMode === 'word'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'text-muted-foreground hover:text-foreground'
          }`}
        aria-pressed={transcriptDisplayMode === 'word'}
      >
        Word Mode
      </button>
      <button
        onClick={() => setTranscriptDisplayMode('full')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${transcriptDisplayMode === 'full'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'text-muted-foreground hover:text-foreground'
          }`}
        aria-pressed={transcriptDisplayMode === 'full'}
      >
        Full Text
      </button>
    </div>
  );
};
