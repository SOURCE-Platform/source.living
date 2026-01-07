/**
 * Audio Player Component Library
 *
 * A complete audio player solution with word-level captions, chapter navigation,
 * and full playback controls.
 *
 * ## Usage
 *
 * ### Pre-composed (Simple)
 * ```tsx
 * import { AudioPlayer } from '@/components/audio-player';
 *
 * <AudioPlayer
 *   audioSrc="/audio.mp3"
 *   transcript={transcriptData}
 *   chapters={chaptersData}
 * />
 * ```
 *
 * ### Modular (Custom Composition)
 * ```tsx
 * import {
 *   AudioExperienceProvider,
 *   useAudioExperience,
 *   AudioWaveform,
 *   TranscriptScroller,
 *   ChapterList
 * } from '@/components/audio-player';
 *
 * function MyCustomPlayer() {
 *   const audioRef = useRef<HTMLAudioElement>(null);
 *
 *   return (
 *     <>
 *       <audio ref={audioRef} src="/audio.mp3" />
 *       <AudioExperienceProvider
 *         audioSrc="/audio.mp3"
 *         transcript={transcript}
 *         chapters={chapters}
 *         audioElement={audioRef.current}
 *       >
 *         <TranscriptScroller />
 *         <ChapterList />
 *         <AudioWaveform />
 *       </AudioExperienceProvider>
 *     </>
 *   );
 * }
 * ```
 */

// Pre-composed component
export { AudioPlayer } from "./AudioPlayer";
export type { AudioPlayerProps, AudioPlayerControls } from "./AudioPlayer";

// Context & Hooks
export { AudioExperienceProvider, useAudioExperience } from "./context/AudioExperienceContext";
export type {
  AudioExperienceState,
  AudioExperienceControls,
  AudioExperienceContextValue,
  AudioExperienceProviderProps,
} from "./context/AudioExperienceContext";

// Types
export type {
  TranscriptWord,
  TranscriptUtterance,
  TranscriptData,
  ChapterSummary,
  AudioExperienceConfig,
  TranscriptDisplayMode,
} from "./context/types";

// Modular Components
export { AudioWaveform } from "./components/AudioWaveform";
export type { AudioWaveformProps } from "./components/AudioWaveform";

export { TranscriptScroller } from "./components/TranscriptScroller";
export type { TranscriptScrollerProps } from "./components/TranscriptScroller";

export { ChapterList } from "./components/ChapterList";
export type { ChapterListProps } from "./components/ChapterList";

export { ChaptersCaptionsMenu } from "./components/ChaptersCaptionsMenu";

export { SegmentedTimeline } from "./components/SegmentedTimeline";
export type { SegmentedTimelineProps } from "./components/SegmentedTimeline";

// Icons
export {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeWavesIcon,
  VolumeMuteIcon,
  CloseIcon,
  LinesCaptionsIcon,
  WordCaptionsIcon,
} from "./components/PlayerIcons";
export type { PlayerIconProps } from "./components/PlayerIcons";
