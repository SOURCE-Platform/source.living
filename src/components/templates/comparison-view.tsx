'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { StickyLogo } from "@/components/molecules/sticky-logo";
import { TransitionLink } from "../atoms/transition-link";
import { BackButton } from "../atoms/back-button";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";

import {
    politicalIssues, economicIssues, socialIssues, techIssues,
    mentalIssues, microSocialIssues, physicalIssues, computingIssues,
    ConvergingIssue
} from "@/data/convergence-data";

import {
    politicalSolutions, economicSolutions, socialSolutions, techSolutions,
    mentalSolutions, microSocialSolutions as microSolutionsData, physicalSolutions as physicalSolutionsData, computingSolutions as computingSolutionsData,
    SolutionItem
} from "@/data/solutions-data";

// Type needed for mapped data
interface CategoryData {
    title: string;
    problems: ConvergingIssue[];
    solutions: SolutionItem[];
}

function getAudioSlug(title: string): string {
    return title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
}

const MACRO_CATEGORIES: CategoryData[] = [
    { title: "Political", problems: politicalIssues, solutions: politicalSolutions },
    { title: "Economic", problems: economicIssues, solutions: economicSolutions },
    { title: "Social", problems: socialIssues, solutions: socialSolutions },
    { title: "Technological", problems: techIssues, solutions: techSolutions },
];

const MICRO_CATEGORIES: CategoryData[] = [
    { title: "Mental Health", problems: mentalIssues, solutions: mentalSolutions },
    { title: "Micro-Social", problems: microSocialIssues, solutions: microSolutionsData },
    { title: "Physical Health", problems: physicalIssues, solutions: physicalSolutionsData },
    { title: "Computing UX", problems: computingIssues, solutions: computingSolutionsData },
];

function getDomain(url: string): string {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
}

// Eye icon for hover hint - Updated to use gradient mask
const HoverEyeIcon = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <div
            className="absolute inset-0 bg-[image:var(--background-image-playgrade-light)] dark:bg-[image:var(--background-image-playgrade)]"
            style={{
                maskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E")`,
                maskSize: 'contain',
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E")`,
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
            }}
        />
    </div>
);

function ProblemCard({ issue }: { issue: ConvergingIssue }) {
    const [menuOffset, setMenuOffset] = useState(0);
    const [alignment, setAlignment] = useState<'left' | 'right'>('right');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkPosition = () => {
            if (triggerRef.current && menuRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const menuWidth = menuRef.current.offsetWidth;
                const menuHeight = menuRef.current.offsetHeight;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const bottomBuffer = 32;

                // Vertical positioning logic
                const idealBottom = triggerRect.top + menuHeight;
                if (idealBottom > viewportHeight - bottomBuffer) {
                    const overflow = idealBottom - (viewportHeight - bottomBuffer);
                    setMenuOffset(-overflow);
                } else {
                    setMenuOffset(0);
                }

                // Horizontal positioning logic
                // Provide a small buffer so it doesn't flip at the exact pixel
                const rightEdge = triggerRect.right + menuWidth + 16;

                if (rightEdge > viewportWidth) {
                    setAlignment('left');
                } else {
                    setAlignment('right');
                }
            }
        };

        const trigger = triggerRef.current;
        if (trigger) {
            trigger.addEventListener('mouseenter', checkPosition);
            window.addEventListener('resize', checkPosition);
            window.addEventListener('scroll', checkPosition);
        }

        return () => {
            if (trigger) {
                trigger.removeEventListener('mouseenter', checkPosition);
            }
            window.removeEventListener('resize', checkPosition);
            window.removeEventListener('scroll', checkPosition);
        };
    }, []);

    const alignmentClasses = alignment === 'right'
        ? "left-full ml-2 before:right-full before:w-2"
        : "right-full mr-2 before:left-full before:w-2";

    return (
        <div className="mb-4 last:mb-0">
            <div className="flex flex-col gap-1 pl-7 relative">
                <div ref={triggerRef} className="group/menu relative w-fit">
                    <div className="absolute -left-8 top-0.5 cursor-help">
                        <HoverEyeIcon className="w-5 h-5" />
                    </div>
                    <span className="text-base font-semibold text-foreground lg:cursor-help px-2 py-1 -ml-2 rounded-lg transition-colors group-hover/menu:bg-muted whitespace-normal inline decoration-clone leading-snug">
                        {issue.label}
                    </span>
                    {/* Tooltip with invisible bridge */}
                    <div
                        ref={menuRef}
                        style={{ top: `${menuOffset}px` }}
                        className={`absolute ${alignmentClasses} z-40 w-72 rounded-lg border border-border bg-background p-3 opacity-0 shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-opacity duration-200 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto hover:opacity-100 hover:pointer-events-auto before:content-[''] before:absolute before:inset-y-0 before:bg-transparent hidden lg:block`}
                    >
                        <ul className="space-y-2">
                            {issue.links.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-md p-2 text-xs transition-colors hover:bg-muted"
                                    >
                                        <span className="block font-medium text-foreground mb-0.5">{link.title}</span>
                                        <span className="block text-[10px] text-muted-foreground">{getDomain(link.url)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile/Touch CLICK Handler Overlay */}
                    <div
                        className="absolute inset-0 z-30 lg:hidden cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {issue.description}
                </p>

                {/* Mobile/Accessible Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={issue.label}
                >
                    <div className="space-y-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {issue.description}
                        </p>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                Related Signals & Research
                            </h4>
                            <ul className="grid gap-2">
                                {issue.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block rounded-lg p-3 transition-all bg-background/50 playgrade-border playgrade-link-bg group/link"
                                        >
                                            <span className="block text-sm font-medium text-foreground mb-1">
                                                {link.title}
                                            </span>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                </svg>
                                                {getDomain(link.url)}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        </div >
    );
}

function SolutionCard({ item, showProblem = true }: { item: SolutionItem; showProblem?: boolean }) {
    return (
        <div className="mb-6 last:mb-0">
            {showProblem && (
                <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Problem: {item.problem}
                </div>
            )}
            <div className="mb-1 text-base font-semibold text-foreground">
                {item.solutionTitle}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {item.solutionDescription}
            </p>
        </div>
    );
}

function ComparisonRow({ category }: { category: CategoryData }) {
    return (
        <div className="border border-border rounded-2xl bg-card shadow-lg mb-8">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
                <div className="p-4 border-b md:border-b-0 md:border-r border-border">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Problems</h4>
                </div>
                <div className="p-4">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Solutions</h4>
                </div>
            </div>

            {/* Content Rows */}
            {category.problems.map((problem, i) => {
                const solution = category.solutions.find(s => s.problem === problem.label);
                return (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 border-b last:border-b-0 last:rounded-b-lg border-border transition-colors">
                        <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                            <ProblemCard issue={problem} />
                        </div>
                        <div className="p-6">
                            {solution ? (
                                <SolutionCard item={solution} showProblem={false} />
                            ) : (
                                <div className="h-full flex items-center justify-center p-4 border border-dashed border-border/50 rounded-lg text-muted-foreground/50 text-sm italic">
                                    No direct solution mapped
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

interface ComparisonViewProps {
    defaultView: 'problems' | 'solutions';
    initialCompareMode?: boolean;
}

const StickySubsectionTitle = ({ title }: { title: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;
        const scrollContainer = document.getElementById('scroll-container') || window;

        const handleScroll = () => {
            if (!ref.current || !ref.current.parentElement) return;

            // Use RAF to decouple read/write and prevent layout trashing/jitter
            rafId = requestAnimationFrame(() => {
                if (!ref.current || !ref.current.parentElement) return;

                const parentRect = ref.current.parentElement.getBoundingClientRect();
                const elementHeight = ref.current.offsetHeight;

                // The element starts to "slide up" (unstick) when the parent's bottom
                // reaches the bottom of the sticky element.
                // Collision point (relative to viewport top) = 144 + height.
                const stickyTop = 144;
                const collisionPoint = stickyTop + elementHeight;

                // Distance remaining before it hits the collision point and starts moving up
                const distanceRemaining = parentRect.bottom - collisionPoint;

                // We want to start fading before it hits that point.
                // Let's say we start fading 150px before it unsticks.
                const fadeRange = 150;

                if (distanceRemaining < fadeRange) {
                    // Phase 1: Fading out BEFORE sticking ends (distance > 0)
                    // We go from Opacity 1.0 -> 0.3
                    if (distanceRemaining > 0) {
                        // Progress 0 (start of fade) -> 1 (collision point)
                        const progress = 1 - (distanceRemaining / fadeRange);

                        // Opacity: 1 -> 0.3
                        const opacity = 1 - (progress * 0.7);
                        // Blur: 0 -> 3px
                        const blur = progress * 3;

                        ref.current.style.opacity = opacity.toFixed(2);
                        ref.current.style.filter = `blur(${blur.toFixed(1)}px)`;
                    }
                    // Phase 2: Sliding up (distance <= 0)
                    // We go from Opacity 0.3 -> 0.0
                    else {
                        const slideUpDistance = Math.abs(distanceRemaining);
                        // Fade out completely over the next 50px of movement
                        const slideProgress = Math.min(1, slideUpDistance / 50);

                        // Opacity: 0.3 -> 0
                        const opacity = 0.3 * (1 - slideProgress);

                        // Keep max blur
                        ref.current.style.opacity = opacity.toFixed(2);
                        ref.current.style.filter = 'blur(3px)';
                    }
                } else {
                    // Reset if we scrolled back up
                    if (ref.current.style.opacity !== '1') {
                        ref.current.style.opacity = '1';
                        ref.current.style.filter = 'blur(0px)';
                    }
                }
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={ref} className="sticky top-36 will-change-[opacity,filter] flex flex-col items-start gap-4">
            <h3
                className="text-base font-extralight text-muted-foreground/70 leading-[0.9]"
                style={{ fontFamily: 'var(--font-paragraph)' }}
            >
                {title}
            </h3>
            <SectionPlayButton
                title={title}
                audioSrc={`/audio/${getAudioSlug(title)}.mp3`}
                className="origin-left"
            />
        </div>
    );
};

const ComparisonSection = ({ title, categories, isLastSection = false }: { title: string, categories: CategoryData[], isLastSection?: boolean }) => {
    return (
        <section className="relative">
            {/* Mobile Main Title */}
            <h2 className="lg:hidden text-xl font-bold text-foreground mb-6">{title}</h2>

            {/* Desktop Sticky Main Title Sidebar */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[260px] pointer-events-none pt-20">
                <div className="sticky top-8 pt-2">
                    <h2 className="text-xl font-bold text-foreground mb-1 leading-[0.9]">{title}</h2>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-12 lg:pt-48">
                {categories.map((cat, index) => {
                    const isLastItem = index === categories.length - 1;
                    return (
                        <div key={cat.title} className="contents">
                            {/* Desktop Sticky Sub-Title */}
                            <div className="hidden lg:block lg:col-start-1 pt-2">
                                <StickySubsectionTitle title={cat.title} />
                            </div>

                            {/* Mobile Sub-Title */}
                            <div className={`lg:col-start-2 min-w-0 ${isLastSection && isLastItem ? 'min-h-[75vh] pb-0' : ''}`}>
                                {/* Mobile Sub-Title */}
                                <h3 className="lg:hidden text-base font-bold text-muted-foreground mb-4 flex flex-col items-start gap-3">
                                    {cat.title}
                                    <SectionPlayButton
                                        title={cat.title}
                                        audioSrc={`/audio/${getAudioSlug(cat.title)}.mp3`}
                                        className="origin-left"
                                    />
                                </h3>
                                <div className="scroll-mt-24">
                                    <ComparisonRow category={cat} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export function ComparisonView({ defaultView, initialCompareMode = false }: ComparisonViewProps) {
    const [isCompareMode, setIsCompareMode] = useState(initialCompareMode);
    const [activeCompareMode, setActiveCompareMode] = useState(initialCompareMode);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [isStuck, setIsStuck] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (isCompareMode === activeCompareMode) return;

        setIsContentVisible(false);
        const timer = setTimeout(() => {
            setActiveCompareMode(isCompareMode);
            setIsContentVisible(true);
        }, 200);
        return () => clearTimeout(timer);
    }, [isCompareMode, activeCompareMode]);

    useEffect(() => {
        const scrollContainer = document.getElementById('scroll-container') || window;

        const handleScroll = () => {
            // If using #scroll-container, get its scrollTop. Otherwise use window.scrollY
            const currentScrollY = scrollContainer instanceof HTMLElement
                ? scrollContainer.scrollTop
                : window.scrollY;

            // Show when scrolling up or at the top
            if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
                setIsVisible(true);
            }
            // Hide when scrolling down and not at the top
            else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sentinel = document.getElementById('header-sentinel');

        if (sentinel) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    setIsStuck(!entry.isIntersecting);
                },
                { threshold: 1, rootMargin: '-10px 0px 0px 0px' }
            );

            observerRef.current.observe(sentinel);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    // Helper to sync toggle text based on what page we are originally on
    const toggleText = defaultView === 'problems'
        ? (isCompareMode ? "Hide Solutions" : "View Solutions")
        : (isCompareMode ? "Hide Problems" : "View Problems");

    return (
        <div className="min-h-screen text-foreground">
            <StickyLogo />
            <main className="mx-auto max-w-7xl px-6 sm:px-12 pt-0 pb-12">
                {/* Sentinel for sticky detection */}
                <div id="header-sentinel" className="absolute top-0 h-12 w-full pointer-events-none opacity-0" />

                <div className="mb-6 flex items-center justify-center sm:justify-end sticky top-0 z-40 bg-transparent py-4 mt-32 sm:mt-0 transition-all duration-300 pointer-events-none sm:pr-4">
                    <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className={`
                            flex items-center gap-5 px-6 py-2 rounded-full border transition-all duration-300 pointer-events-auto
                            ${isStuck
                                ? 'bg-background backdrop-blur-md border-border shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] transform translate-y-2'
                                : 'bg-muted/20 border-transparent sm:border-border'
                            }
                        `}>
                            <button
                                onClick={() => setIsCompareMode(false)}
                                className={`text-sm font-medium transition-colors hover:text-foreground cursor-pointer ${!isCompareMode ? 'text-foreground' : 'text-muted-foreground'}`}
                            >
                                {defaultView === 'problems' ? "Problems" : "Solutions"}
                            </button>

                            <button
                                onClick={() => setIsCompareMode(!isCompareMode)}
                                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer bg-muted overflow-hidden"
                            >
                                <div
                                    className={`absolute inset-0 transition-opacity duration-200 opacity-100 bg-[image:var(--blue-button)] dark:bg-[image:var(--background-image-playgrade)]`}
                                />
                                <span
                                    className={`
                      relative z-10 inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform duration-200
                      ${isCompareMode ? 'translate-x-6' : 'translate-x-1'}
                    `}
                                />
                            </button>

                            <button
                                onClick={() => setIsCompareMode(true)}
                                className={`text-sm font-medium transition-colors hover:text-foreground cursor-pointer ${isCompareMode ? 'text-foreground' : 'text-muted-foreground'}`}
                            >
                                Compare
                            </button>
                        </div>
                    </div>
                </div>


                {/* Spacer to push content down for logo */}
                <div className="h-24" />

                <section className="max-w-4xl mb-20">
                    <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-4 2xl:gap-12 mb-8 -ml-0 2xl:-ml-[308px]">
                        <div className="w-[260px] flex-shrink-0 flex 2xl:justify-end">
                            <BackButton />
                        </div>

                        <h1 className={`text-4xl font-bold tracking-tight transition-opacity duration-200 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
                            {activeCompareMode ? "Systemic Analysis" : (defaultView === 'problems' ? "The Systemic Convergence" : "The SOURCE Solution")}
                        </h1>
                    </div>
                    <p className={`text-xl text-muted-foreground max-w-lg transition-opacity duration-200 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {activeCompareMode
                            ? "Comparing the converging systemic failures with the architectural solutions provided by SOURCE."
                            : (defaultView === 'problems'
                                ? "We are witnessing the convergence of multiple systemic crises, political, economic, social, and technological."
                                : "How the SOURCE Platform systematically addresses the converging crises through Ambient Computing and High-Resolution Data.")}
                    </p>
                </section>

                <div className={`space-y-20 transition-opacity duration-200 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>

                    {/* SINGLE VIEW MODE */}
                    {!activeCompareMode && (
                        <>
                            {/* Problems View */}
                            {defaultView === 'problems' && (
                                <>
                                    <section className="space-y-8">
                                        <h2 className="text-xl font-bold text-foreground">The Macro Problem Set</h2>
                                        <div className="grid gap-6 grid-cols-1 min-[850px]:grid-cols-2 not-prose">
                                            {MACRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="convergence-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                                                        <SectionPlayButton
                                                            title={cat.title}
                                                            audioSrc={`/audio/${getAudioSlug(cat.title)}.mp3`}
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {cat.problems.map((p, i) => <ProblemCard key={i} issue={p} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="space-y-8">
                                        <h2 className="text-xl font-bold text-foreground">The Micro Problem Set</h2>
                                        <div className="grid gap-6 grid-cols-1 min-[850px]:grid-cols-2 not-prose">
                                            {MICRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="convergence-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                                                        <SectionPlayButton
                                                            title={cat.title}
                                                            audioSrc={`/audio/${getAudioSlug(cat.title)}.mp3`}
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {cat.problems.map((p, i) => <ProblemCard key={i} issue={p} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}

                            {/* Solutions View */}
                            {defaultView === 'solutions' && (
                                <>
                                    <section className="space-y-8">
                                        <h2 className="text-xl font-bold text-foreground">Macro Solutions</h2>
                                        <div className="grid gap-6 grid-cols-1 min-[850px]:grid-cols-2 not-prose">
                                            {MACRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="convergence-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                                                        <SectionPlayButton
                                                            title={cat.title}
                                                            audioSrc={`/audio/${getAudioSlug(cat.title)}.mp3`}
                                                        />
                                                    </div>
                                                    <div className="space-y-6">
                                                        {cat.solutions.map((s, i) => <SolutionCard key={i} item={s} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section className="space-y-8">
                                        <h2 className="text-xl font-bold text-foreground">Micro Solutions</h2>
                                        <div className="grid gap-6 grid-cols-1 min-[850px]:grid-cols-2 not-prose">
                                            {MICRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="convergence-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                                                        <SectionPlayButton
                                                            title={cat.title}
                                                            audioSrc={`/audio/${getAudioSlug(cat.title)}.mp3`}
                                                        />
                                                    </div>
                                                    <div className="space-y-6">
                                                        {cat.solutions.map((s, i) => <SolutionCard key={i} item={s} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}
                        </>
                    )}

                    {/* COMPARE MODE */}
                    {activeCompareMode && (
                        <>
                            {/* Macro Analysis Section */}
                            <ComparisonSection title="The Macro Problem Set" categories={MACRO_CATEGORIES} />

                            {/* Micro Analysis Section */}
                            <ComparisonSection title="The Micro Problem Set" categories={MICRO_CATEGORIES} isLastSection={true} />
                        </>
                    )}

                    {/* Footer */}
                    <div className={`pt-24 pb-12 ${activeCompareMode ? 'grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-12' : 'flex justify-center'}`}>
                        <div className={activeCompareMode ? 'lg:col-start-2 flex justify-center' : ''}>
                            <BackButton />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
