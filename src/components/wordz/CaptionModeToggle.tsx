"use client";

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";

export const CaptionModeToggle = () => {
  const { transcriptDisplayMode, setTranscriptDisplayMode } = useGlobalAudio();

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={() => setTranscriptDisplayMode('line')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${transcriptDisplayMode === 'line'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        aria-pressed={transcriptDisplayMode === 'line'}
      >
        Line Mode
      </button>
      <button
        onClick={() => setTranscriptDisplayMode('word')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${transcriptDisplayMode === 'word'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        aria-pressed={transcriptDisplayMode === 'word'}
      >
        Word Mode
      </button>
      <button
        onClick={() => setTranscriptDisplayMode('full')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${transcriptDisplayMode === 'full'
          ? 'bg-black/10 dark:bg-white/10 text-foreground'
          : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        aria-pressed={transcriptDisplayMode === 'full'}
      >
        Full Text
      </button>
    </div>
  );
};
