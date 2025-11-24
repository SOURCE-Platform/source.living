# Audio Player Component

A feature-rich audio player component for Next.js with word-level captions, chapter navigation, and comprehensive playback controls.

## Features

- **Word-by-word & line-by-line captions** - Synchronized transcript display with timing
- **Chapter navigation** - Jump to different sections of the audio
- **Timeline scrubbing** - Visual timeline with chapter segments
- **Playback controls** - Play/pause, skip forward/back, speed control, volume
- **Keyboard shortcuts** - Space for play/pause, 0-9 for seeking
- **Mobile responsive** - Optimized layouts for all screen sizes
- **Themeable** - CSS variables for easy customization
- **TypeScript** - Full type safety

## Installation

1. Copy the `/components/audio-player` directory to your Next.js project
2. Import the CSS file in your `app/layout.tsx` or `_app.tsx`:

```tsx
import '@/components/audio-player/styles/audio-player.css';
```

## Quick Start

### Pre-composed Component (Simple)

The easiest way to use the audio player:

```tsx
'use client';

import { AudioPlayer } from '@/components/audio-player';
import transcriptData from './transcript.json';
import chaptersData from './chapters.json';

export default function MyAudioPage() {
  return (
    <AudioPlayer
      audioSrc="/audio/episode-1.mp3"
      transcript={transcriptData}
      chapters={chaptersData}
    />
  );
}
```

### Modular Components (Custom Composition)

For more control over the layout:

```tsx
'use client';

import { useRef } from 'react';
import {
  AudioExperienceProvider,
  AudioWaveform,
  TranscriptScroller,
  ChapterList,
} from '@/components/audio-player';

export default function CustomPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
      <audio ref={audioRef} src="/audio.mp3" preload="metadata" />

      <AudioExperienceProvider
        audioSrc="/audio.mp3"
        transcript={transcriptData}
        chapters={chaptersData}
        audioElement={audioRef.current}
      >
        <div className="my-custom-layout">
          <TranscriptScroller />
          <ChapterList />
        </div>
        <AudioWaveform />
      </AudioExperienceProvider>
    </div>
  );
}
```

## Data Format

### Transcript Data

The transcript should follow this TypeScript structure:

```typescript
{
  "speakers": ["Speaker Name"],  // Optional
  "utterances": [
    {
      "speaker": "Speaker Name",  // Optional, can be null
      "start": 0,                 // Timestamp in milliseconds
      "end": 5000,                // Timestamp in milliseconds
      "text": "Full text fallback",  // Optional fallback text
      "words": [
        {
          "text": "Hello",
          "start": 0,    // Timestamp in milliseconds
          "end": 500     // Timestamp in milliseconds
        },
        {
          "text": "world",
          "start": 600,
          "end": 1200
        }
      ]
    }
  ]
}
```

### Chapters Data

```typescript
[
  {
    "title": "Introduction",
    "start": 0  // Timestamp in milliseconds
  },
  {
    "title": "Main Discussion",
    "start": 120000  // 2 minutes
  },
  {
    "title": "Conclusion",
    "start": 540000  // 9 minutes
  }
]
```

## Configuration

The `AudioPlayer` component accepts these props:

```typescript
interface AudioPlayerProps {
  // Required
  audioSrc: string;           // URL to audio file
  transcript: TranscriptData; // Transcript data
  chapters: ChapterSummary[]; // Chapter markers

  // Optional
  config?: {
    autoPlay?: boolean;              // Auto-start playback (default: false)
    startMuted?: boolean;            // Start with audio muted (default: false)
    skipIntervalSeconds?: number;    // Skip forward/back interval (default: 15)
    startTimeSeconds?: number;       // Start at specific time (default: 0)
  };

  className?: string;                // Custom className
  layout?: 'stacked' | 'side-by-side';  // Layout mode (default: 'stacked')
  showChapters?: boolean;            // Show chapters list (default: true)
  enableKeyboardShortcuts?: boolean; // Enable keyboard controls (default: true)
}
```

## Programmatic Control

You can control the player programmatically using a ref:

```tsx
import { useRef } from 'react';
import { AudioPlayer, AudioPlayerControls } from '@/components/audio-player';

export default function MyPage() {
  const playerRef = useRef<AudioPlayerControls>(null);

  const handlePlayClick = () => {
    playerRef.current?.play();
  };

  const handleSeekTo2Minutes = () => {
    playerRef.current?.seekToMs(120000);  // 2 minutes in milliseconds
  };

  return (
    <>
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handleSeekTo2Minutes}>Jump to 2:00</button>

      <AudioPlayer
        ref={playerRef}
        audioSrc="/audio.mp3"
        transcript={transcript}
        chapters={chapters}
      />
    </>
  );
}
```

Available control methods:
- `play()` - Start playback
- `pause()` - Pause playback
- `stop()` - Stop and reset to beginning
- `toggle()` - Toggle play/pause
- `seekToStart()` - Jump to beginning
- `seekToMs(timeMs)` - Seek to specific time in milliseconds
- `getCurrentTimeMs()` - Get current playback position
- `setPlaybackRate(rate)` - Set playback speed (0.5 - 2.5)

## Theming

Customize the appearance using CSS variables:

```css
/* In your global CSS file */
:root {
  --audio-text: #000;
  --audio-bg: #fff;
  --audio-accent: #0066cc;
  --audio-time-bg: rgba(255, 255, 255, 0.9);
  --audio-muted: rgba(0, 0, 0, 0.5);
  --audio-border: rgba(0, 0, 0, 0.1);
  --audio-slider-track: rgba(0, 0, 0, 0.1);
  --audio-button-hover-bg: rgba(0, 0, 0, 0.05);
  --audio-caption-button-text: rgba(0, 0, 0, 0.5);
  --audio-caption-button-text-active: rgba(0, 0, 0, 1);
  --audio-caption-button-text-hover: rgba(0, 0, 0, 0.8);
}

/* Dark theme */
.dark {
  --audio-text: #fff;
  --audio-bg: #000;
  --audio-accent: #fff;
  /* ... etc */
}
```

## Keyboard Shortcuts

When `enableKeyboardShortcuts` is true (default):

- **Space** - Play/pause
- **0-9** - Seek to 0%-90% of audio

## Responsive Behavior

- **Mobile** - Compact controls, slide-out menu for chapters
- **Desktop** - Full controls visible, chapters sidebar

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

All components are fully typed. Import types as needed:

```typescript
import type {
  TranscriptData,
  ChapterSummary,
  AudioExperienceConfig,
  TranscriptWord,
  TranscriptUtterance,
} from '@/components/audio-player';
```

## Examples

### Auto-play with Start Time

```tsx
<AudioPlayer
  audioSrc="/audio.mp3"
  transcript={transcript}
  chapters={chapters}
  config={{
    autoPlay: true,
    startTimeSeconds: 60,  // Start at 1 minute
  }}
/>
```

### Custom Layout

```tsx
<AudioPlayer
  audioSrc="/audio.mp3"
  transcript={transcript}
  chapters={chapters}
  layout="side-by-side"
  className="my-custom-player"
/>
```

### Hide Chapters

```tsx
<AudioPlayer
  audioSrc="/audio.mp3"
  transcript={transcript}
  chapters={chapters}
  showChapters={false}
/>
```

## Component Architecture

```
audio-player/
├── index.tsx                     # Main exports
├── AudioPlayer.tsx               # Pre-composed component
├── README.md                     # This file
├── context/
│   ├── AudioExperienceContext.tsx  # State management
│   └── types.ts                    # TypeScript types
├── components/
│   ├── AudioWaveform.tsx           # Player controls
│   ├── SegmentedTimeline.tsx       # Timeline with chapters
│   ├── TranscriptScroller.tsx      # Caption display
│   ├── ChapterList.tsx             # Chapters navigation
│   ├── ChaptersCaptionsMenu.tsx    # Mobile menu
│   └── PlayerIcons.tsx             # SVG icons
└── styles/
    └── audio-player.css            # Styling
```

## License

This component was extracted from a larger project and is provided as-is for use in your Next.js applications.
