"use client";

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { LiveCaptions } from "./LiveCaptions";

export const WordzCaptionDisplay = () => {
  const { currentTrack, isPlaying, currentTimeMs } = useGlobalAudio();

  // Don't show captions when no track is playing
  if (!currentTrack) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-4">
        <div className="w-full h-full bg-muted/20 rounded-xl flex items-center justify-center border border-dashed border-border/30">
          <span className="text-sm text-muted-foreground/60 font-medium italic">Live Captions</span>
        </div>
      </div>
    );
  }

  // Show "no transcript" message if transcript missing
  if (!currentTrack.transcript || currentTrack.transcript.utterances.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-4">
        <div className="w-full h-full bg-muted/20 rounded-xl flex items-center justify-center border border-dashed border-border/30">
          <span className="text-sm text-muted-foreground/60 font-medium italic">Transcript not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <LiveCaptions
        transcript={currentTrack.transcript}
        currentTimeMs={currentTimeMs}
        paragraphs={currentTrack.paragraphs}
        chapters={currentTrack.chapters}
      />
    </div>
  );
};
