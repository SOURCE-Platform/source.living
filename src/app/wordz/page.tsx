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
            <main className="min-h-screen bg-background text-foreground flex flex-col items-center px-6">

                {/* Fixed Elements - Logo and Back Button */}
                <StickyLogo />

                {/* Back Button - Fixed position under logo */}
                <div className="fixed top-24 left-8 z-50">
                    <TransitionLink
                        href="/"
                        className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 pointer-events-auto w-fit"
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

                <div className="w-full max-w-7xl">
                    {/* Main Layout Grid - 3 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

                        {/* COLUMN 1: Audio List (Span 4) - Widened from 3 */}
                        <div className="lg:col-span-4 flex flex-col py-4">

                            {/* Talks Section */}
                            <div className="flex flex-col gap-6">
                                <div className="text-base font-sans font-normal tracking-tight text-muted-foreground uppercase">TALKS</div>

                                {/* Audio List */}
                                <WordzAudioList />
                            </div>
                        </div>

                        {/* COLUMN 2: Controls & Chapters (Span 4) */}
                        {/* Sticky top-0 h-screen to align with viewport top */}
                        <div className="hidden lg:block lg:col-span-4 relative">
                            <div className="sticky top-0 h-screen flex flex-col py-4 gap-8">

                                {/* Captions Controls Section */}
                                <div className="space-y-4">
                                    <div className="text-base font-sans font-normal tracking-tight text-muted-foreground uppercase">CAPTIONS</div>
                                    <CaptionModeToggle />
                                </div>

                                {/* Chapters Section */}
                                <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                                    {/* Note: ChaptersList has its own title, we might want to hide it or style it there. 
                                        User asked to "Change the font for the 'Chapters' title".
                                        I can configure ChaptersList to accept a className or just edit ChaptersList.
                                        For now, I'll update ChaptersList.tsx directly after this.
                                    */}
                                    <ChaptersList />
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 3: Live Captions (Span 4) - Reduced from 5 */}
                        {/* Sticky top-0 h-screen */}
                        <div className="hidden lg:block lg:col-span-4 relative">
                            {/* Sticky container that spans full viewport height */}
                            <div className="sticky top-0 h-screen">
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
