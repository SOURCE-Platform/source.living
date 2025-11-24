export type TranscriptWord = {
  text: string;
  /** inclusive start timestamp in milliseconds */
  start: number;
  /** inclusive end timestamp in milliseconds */
  end: number;
};

export type TranscriptUtterance = {
  speaker: string | null;
  /** inclusive start timestamp in milliseconds */
  start: number;
  /** inclusive end timestamp in milliseconds */
  end: number;
  text?: string;
  words?: TranscriptWord[];
};

export type TranscriptData = {
  speakers?: string[];
  utterances: TranscriptUtterance[];
};

export type ChapterSummary = {
  title: string;
  /** start timestamp in milliseconds */
  start: number;
};

export type AudioExperienceConfig = {
  /**
   * Optional flag to begin playback immediately once the waveform is ready.
   * Defaults to false.
   */
  autoPlay?: boolean;
  /**
   * Start muted when the player loads. Defaults to false.
   */
  startMuted?: boolean;
  /**
   * Optional skip interval (in seconds) used for the skip forward/back controls. Defaults to 15 seconds.
   */
  skipIntervalSeconds?: number;
  /**
   * Optional start time in seconds to offset the audio playback. Defaults to 0.
   */
  startTimeSeconds?: number;
};

export type TranscriptDisplayMode = "line" | "word";
