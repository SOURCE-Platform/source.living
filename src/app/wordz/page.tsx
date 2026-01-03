'use client'

import { ArrowLeft, Calendar, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { VIDEOS } from '@/data/videos'

// Mock Data
const TOPICS = ['All', 'System', 'Hardware', 'Software', 'Social', 'Updates']

export default function BlogPage() {
    const router = useRouter()
    const [selectedTopic, setSelectedTopic] = useState('All')
    const [dateRange, setDateRange] = useState({ start: '', end: '' })
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const filteredVideos = useMemo(() => {
        return VIDEOS.filter((video) => {
            const matchesTopic = selectedTopic === 'All' || video.topic === selectedTopic

            const videoDate = new Date(video.date)
            const afterStart = dateRange.start ? videoDate >= new Date(dateRange.start) : true
            const beforeEnd = dateRange.end ? videoDate <= new Date(dateRange.end) : true

            return matchesTopic && afterStart && beforeEnd
        })
    }, [selectedTopic, dateRange])

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Mobile Header for Sidebar Toggle */}
            <div className="md:hidden p-4 border-b border-border flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Home</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                </button>
            </div>

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar */}
                <aside
                    className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-background transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto md:min-h-screen
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
                >
                    <div className="h-full overflow-y-auto p-6 flex flex-col gap-8">
                        <div className="hidden md:block">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to Home</span>
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight mb-1">WORDz</h1>
                        </div>

                        {/* Mobile Close Button */}
                        <div className="md:hidden flex justify-end">
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Topic Filter */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Topics</h3>
                            <div className="flex flex-col gap-1">
                                {TOPICS.map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`
                                        text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer font-medium
                                    ${selectedTopic === topic
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                            }
                                `}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Filter */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Date Range</h3>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground ml-1">From</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="date"
                                            className="w-full bg-secondary/30 border border-input rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                            value={dateRange.start}
                                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground ml-1">To</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="date"
                                            className="w-full bg-secondary/30 border border-input rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                            value={dateRange.end}
                                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                    <header className="mb-8 md:hidden">
                        <h1 className="text-2xl font-light tracking-tight">WORDz</h1>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <div
                                key={video.id}
                                className="group flex flex-col gap-3 cursor-pointer"
                                onClick={() => router.push(`/wordz/${video.slug}`)}
                            >
                                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border/50 group-hover:border-foreground/30 transition-all shadow-sm group-hover:shadow-md">
                                    {/* Video Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-foreground border-b-[6px] border-b-transparent ml-1" />
                                        </div>
                                    </div>
                                    {/* Topic Badge */}
                                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-white tracking-wide border border-white/10">
                                        {video.topic}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                        <span>{new Date(video.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <h3 className="font-medium leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
                                </div>
                            </div>
                        ))}

                        {filteredVideos.length === 0 && (
                            <div className="col-span-full py-20 text-center text-muted-foreground">
                                <p>No videos found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedTopic('All')
                                        setDateRange({ start: '', end: '' })
                                    }}
                                    className="mt-4 text-primary hover:underline text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
