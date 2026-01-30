'use client'


import { audioManifest } from "@/data/audio-manifest"
import { TransitionLink } from '@/components/atoms/transition-link'
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext"
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer"
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton"
import { StickyLogo } from "@/components/molecules/sticky-logo"
import { WordzCaptionDisplay } from "@/components/wordz/WordzCaptionDisplay"
import { CaptionModeToggle } from "@/components/wordz/CaptionModeToggle"
import { ChaptersList } from "@/components/wordz/ChaptersList"

// Filter or select tracks specifically for the Wordz page
// For now, we manually select the IDs we want to show here, or filter by some property.
// Based on current usage:
const WORDZ_TRACK_IDS = [
    "jan-30",
    "strong-talk",
    "talking-relationships-yinyang"
];

const AUDIO_FILES = audioManifest
    .filter(track => WORDZ_TRACK_IDS.includes(track.id))
    .map(track => ({
        id: track.id,
        title: track.title,
        filename: track.audioSrc.split('/').pop() || ""
    }));

export default function WordzPage() {
    return (
        <GlobalAudioProvider>
            <StickyLogo />
            <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-6">

                <div className="w-full max-w-7xl">
                    {/* Spacer for Sticky Logo */}
                    <div className="h-24 hidden lg:block" />

                    {/* Header - Styled exactly like Convergence */}
                    <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-4 2xl:gap-12 mb-20 -ml-0 2xl:-ml-[308px]">
                        <div className="w-[260px] flex-shrink-0 flex 2xl:justify-end">
                            <TransitionLink
                                href="/"
                                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 pointer-events-auto"
                            >
                                <div className="relative flex items-center justify-center w-[45px] h-[12px]">
                                    <div
                                        className="absolute inset-0 bg-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-0"
                                        style={{
                                            maskImage: 'url("/icons/back-arrow.svg")',
                                            maskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center center'
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 bg-[image:var(--background-image-playgrade-light)] dark:bg-[image:var(--background-image-playgrade)]"
                                        style={{
                                            maskImage: 'url("/icons/back-arrow.svg")',
                                            maskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center center'
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium tracking-wide uppercase">BACK</span>
                            </TransitionLink>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight">WORDz</h1>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Audio List */}
                        <div className="space-y-8">
                            {AUDIO_FILES.map((audio) => (
                                <div
                                    key={audio.filename}
                                    className="flex items-center gap-4 group"
                                >
                                    <span className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-primary transition-colors">
                                        {audio.title}
                                    </span>
                                    <div className="flex-shrink-0">
                                        <SectionPlayButton
                                            trackId={audio.id}
                                            className="w-12 h-12 text-foreground hover:scale-105 transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Middle Column: Chapters */}
                        <div className="hidden lg:block relative">
                            <div className="sticky top-12 space-y-4">
                                <ChaptersList />
                            </div>
                        </div>

                        {/* Right Column: Live Captions */}
                        <div className="hidden lg:block relative">
                            <div className="sticky top-12 space-y-4">
                                <CaptionModeToggle />
                                <WordzCaptionDisplay />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Player */}
                <GlobalPlayer />
            </main>
        </GlobalAudioProvider>
    )
}
