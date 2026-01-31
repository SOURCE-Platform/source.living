'use client'


import { audioManifest } from "@/data/audio-manifest"
import { TransitionLink } from '@/components/atoms/transition-link'
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext"
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer"
import { StickyLogo } from "@/components/molecules/sticky-logo"
import { WordzCaptionDisplay } from "@/components/wordz/WordzCaptionDisplay"
import { CaptionModeToggle } from "@/components/wordz/CaptionModeToggle"
import { ChaptersList } from "@/components/wordz/ChaptersList"
import { WordzAudioList } from "@/components/wordz/WordzAudioList"


export default function WordzPage() {
    return (
        <GlobalAudioProvider>
            <main className="min-h-screen bg-background text-foreground" style={{ backgroundImage: 'var(--gradient-background)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>

                <div className="w-full">
                    {/* Main Layout Grid - 14 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-14 gap-6 pl-6 pr-6 lg:pr-16">

                        {/* COLUMN 0: Logo and Back Button (Span 1 at lg, 2 at 2xl) */}
                        <div className="hidden lg:block lg:col-span-1 2xl:col-span-2">
                            <div className="sticky top-4 flex flex-col items-start gap-6">
                                {/* Logo */}
                                <StickyLogo wordmarkClassName="hidden 2xl:block" className="relative inset-auto" />

                                {/* Back Button */}
                                <TransitionLink
                                    href="/"
                                    className="group flex flex-col-reverse items-start gap-1 2xl:flex-row 2xl:items-center 2xl:gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 pointer-events-auto w-fit"
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
                        </div>

                        {/* COLUMN 1: Audio List (Span 4) */}
                        <div className="lg:col-start-2 lg:col-span-4 2xl:col-start-3 flex flex-col py-4">

                            {/* Talks Section */}
                            <div className="flex flex-col gap-4">
                                <div className="text-base font-sans font-normal tracking-tight text-muted-foreground uppercase">TALKS</div>

                                {/* Audio List */}
                                <WordzAudioList />
                            </div>
                        </div>

                        {/* COLUMN 2: Chapters (Span 4) */}
                        <div className="hidden lg:block lg:col-start-6 lg:col-span-4 2xl:col-start-7 relative">
                            <div className="sticky top-0 h-screen flex flex-col py-4 gap-8">
                                {/* Chapters Section */}
                                <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                                    <ChaptersList />
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 3: Live Captions & Controls (Span 4) */}
                        <div className="hidden lg:block lg:col-start-10 lg:col-span-4 2xl:col-start-11 relative">
                            {/* Sticky container that spans full viewport height */}
                            <div className="sticky top-0 h-screen flex flex-col">

                                {/* Moved Captions UI - Header Style */}
                                <div className="p-4 border-b border-x border-border/50 bg-muted/10 backdrop-blur-md z-10 rounded-b-3xl">
                                    <div className="space-y-4">
                                        <div className="text-base font-sans font-normal tracking-tight text-muted-foreground uppercase">CAPTIONS</div>
                                        <CaptionModeToggle />
                                    </div>
                                </div>

                                {/* Caption Display - Fills remaining height */}
                                <div className="flex-1 overflow-hidden relative">
                                    <WordzCaptionDisplay />
                                </div>
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
