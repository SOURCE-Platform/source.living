'use client'

import React, { useRef, useState, use } from 'react'
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import Link from 'next/link'
import { TransitionLink } from './atoms/transition-link'
import { useRouter } from 'next/navigation'
import { VIDEOS } from '@/data/videos'

export function VideoPlayerClient({ slug }: { slug: string }) {
    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const video = VIDEOS.find(v => v.slug === slug)

    if (!video) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Video not found</h1>
                    <TransitionLink href="/wordz" className="text-primary hover:underline">Return to Gallery</TransitionLink>
                </div>
            </div>
        )
    }

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const seekTo = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-80 bg-background flex flex-col h-auto md:h-screen sticky top-0 md:overflow-y-auto z-10">
                <div className="p-6">
                    <TransitionLink
                        href="/wordz"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 group font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Gallery</span>
                    </TransitionLink>
                    <h1 className="text-xl font-bold tracking-tight">{video.title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground font-medium">
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{video.topic}</span>
                        <span>{new Date(video.date).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Chapters</h2>
                    <div className="space-y-1">
                        {video.chapters.map((chapter, index) => (
                            <button
                                key={index}
                                onClick={() => seekTo(chapter.time)}
                                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm transition-all flex justify-between items-center group font-medium cursor-pointer
                  ${currentTime >= chapter.time && (index === video.chapters.length - 1 || currentTime < video.chapters[index + 1].time)
                                        ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                    }
                `}
                            >
                                <span>{chapter.title}</span>
                                <span className="text-xs opacity-60 font-mono group-hover:opacity-100">{formatTime(chapter.time)}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full bg-black/5">
                <div className="flex-1 flex items-center justify-center p-4 md:p-12">
                    <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster="/placeholder-poster.jpg"
                            onClick={togglePlay}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                        >
                            <source src="/placeholder-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Custom Controls Overlay */}
                        <div className={`
              absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300
              ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
            `}>
                            {!isPlaying && (
                                <button
                                    onClick={togglePlay}
                                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <Play className="h-8 w-8 text-white fill-current ml-1" />
                                </button>
                            )}
                        </div>

                        {/* Bottom Controls Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-4 text-white">
                                <button onClick={togglePlay}>
                                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                                </button>

                                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = x / rect.width;
                                    seekTo(percentage * duration);
                                }}>
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    />
                                </div>

                                <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                <Maximize className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
