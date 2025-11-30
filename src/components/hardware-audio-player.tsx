'use client';

import { useRef, useEffect, useState } from 'react';
import { AudioExperienceProvider } from '@/components/audio-player';
import { CustomAudioPlayer } from '@/components/custom-audio-player';

export function HardwareAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [, forceUpdate] = useState(0);

  // Force a re-render after mount to ensure audioRef.current is available
  useEffect(() => {
    forceUpdate(1);
  }, []);

  // Minimal data for the audio player (no transcript yet)
  const emptyTranscript = { utterances: [] };
  const emptyChapters: any[] = [];

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/Note on hardware.m4a" preload="metadata" />

      <AudioExperienceProvider
        audioSrc="/audio/Note on hardware.m4a"
        transcript={emptyTranscript}
        chapters={emptyChapters}
        audioElement={audioRef.current}
      >
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <CustomAudioPlayer title="Note on Hardware" />
        </div>
      </AudioExperienceProvider>
    </>
  );
}
