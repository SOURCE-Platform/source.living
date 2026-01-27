'use client'

import { ArrowLeft } from 'lucide-react'
import { TransitionLink } from '@/components/atoms/transition-link'
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext"
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer"
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton"

const AUDIO_FILES = [
    { title: "Taking Relationships & Yinyang", filename: "Taking relationships & yinyang.m4a" },
]

export default function WordzPage() {
    return (
        <GlobalAudioProvider>
            <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-6">

                <div className="w-full max-w-2xl space-y-12">
                    {/* Header */}
                    <div className="space-y-6">
                        <TransitionLink
                            href="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Home</span>
                        </TransitionLink>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight">WORDz</h1>
                    </div>

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
                                        title={audio.title}
                                        audioSrc={`/audio/WORDz/${audio.filename}`}
                                        className="w-12 h-12 text-foreground hover:scale-105 transition-all"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Player */}
                <GlobalPlayer />
            </main>
        </GlobalAudioProvider>
    )
}
