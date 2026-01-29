"use client";

import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { LiveCaptions } from "./LiveCaptions";

export const WordzCaptionDisplay = () => {
  const { currentTrack, isPlaying, currentTimeMs } = useGlobalAudio();

  // Don't show captions when no track is playing
  if (!currentTrack || !isPlaying) {
    return (
      <div className="p-4 border border-border/50 rounded-lg min-h-[300px] flex items-center justify-center text-muted-foreground/50 text-sm italic">
        Live Captions
      </div>
    );
  }

  // Show "no transcript" message if transcript missing
  if (!currentTrack.transcript || currentTrack.transcript.utterances.length === 0) {
    return (
      <div className="p-4 border border-border/50 rounded-lg min-h-[300px] flex items-center justify-center text-muted-foreground/50 text-sm italic">
        Transcript not available
      </div>
    );
  }

  return (
    <div className="p-4 border border-border/50 rounded-lg min-h-[300px]">
      <LiveCaptions
        transcript={currentTrack.transcript}
        currentTimeMs={currentTimeMs}
      />
    </div>
  );
};
