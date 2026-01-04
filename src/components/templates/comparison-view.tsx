'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

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

const MACRO_CATEGORIES: CategoryData[] = [
    { title: "Political", problems: politicalIssues, solutions: politicalSolutions },
    { title: "Economic", problems: economicIssues, solutions: economicSolutions },
    { title: "Social", problems: socialIssues, solutions: socialSolutions },
    { title: "Technological", problems: techIssues, solutions: techSolutions },
];

const MICRO_CATEGORIES: CategoryData[] = [
    { title: "Mental & Emotional", problems: mentalIssues, solutions: mentalSolutions },
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

// Eye icon for hover hint
const HoverEyeIcon = ({ className }: { className?: string }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

function ProblemCard({ issue }: { issue: ConvergingIssue }) {
    const [menuOffset, setMenuOffset] = useState(0);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkPosition = () => {
            if (triggerRef.current && menuRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const menuHeight = menuRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
                const bottomBuffer = 32; // 32px from viewport bottom

                // Calculate ideal position (aligned with trigger top)
                const idealBottom = triggerRect.top + menuHeight;

                // If menu would overflow, calculate how much to shift it up
                if (idealBottom > viewportHeight - bottomBuffer) {
                    const overflow = idealBottom - (viewportHeight - bottomBuffer);
                    setMenuOffset(-overflow);
                } else {
                    setMenuOffset(0);
                }
            }
        };

        // Check on mount and when hovering
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

    return (
        <div className="mb-4 last:mb-0">
            <div className="flex flex-col gap-1">
                <div ref={triggerRef} className="group/menu relative w-fit">
                    <span className="text-base font-semibold text-foreground cursor-help px-2 py-1 -ml-2 rounded-lg transition-colors hover:bg-muted whitespace-nowrap flex items-center gap-2">
                        {issue.label}
                        <HoverEyeIcon className="w-4 h-4 text-muted-foreground/60 transition-transform group-hover/menu:scale-110 group-hover/menu:text-primary/80" />
                    </span>
                    {/* Tooltip with invisible bridge */}
                    <div
                        ref={menuRef}
                        style={{ top: `${menuOffset}px` }}
                        className="absolute left-full ml-2 z-50 w-72 rounded-lg border border-border bg-background p-3 opacity-0 shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-opacity duration-200 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto hover:opacity-100 hover:pointer-events-auto before:content-[''] before:absolute before:right-full before:inset-y-0 before:w-2 before:bg-transparent"
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
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {issue.description}
                </p>
            </div>
        </div>
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
        <div className="border border-border rounded-lg mb-8">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-muted/30 border-b border-border rounded-t-lg">
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
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 border-b last:border-b-0 last:rounded-b-lg border-border hover:bg-muted/5 transition-colors">
                        <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                            <ProblemCard issue={problem} />
                        </div>
                        <div className="p-6 bg-muted/5 md:bg-muted/10">
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
}
const ComparisonSection = ({ title, categories, isLastSection = false }: { title: string, categories: CategoryData[], isLastSection?: boolean }) => {
    return (
        <section className="relative">
            {/* Mobile Main Title */}
            <h2 className="lg:hidden text-2xl font-bold text-foreground mb-6">{title}</h2>

            {/* Desktop Sticky Main Title Sidebar */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[200px] pointer-events-none">
                <div className="sticky top-4 pt-2">
                    <h2 className="text-2xl font-bold text-foreground mb-1">{title}</h2>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12">
                {categories.map((cat, index) => {
                    const isLastItem = index === categories.length - 1;
                    return (
                        <div key={cat.title} className="contents">
                            {/* Desktop Sticky Sub-Title */}
                            <div className="hidden lg:block lg:col-start-1 pt-2">
                                <div className="sticky top-14 transition-all duration-300">
                                    <h3 className="text-lg font-medium text-muted-foreground">
                                        {cat.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className={`lg:col-start-2 min-w-0 ${isLastSection && isLastItem ? 'min-h-[75vh] pb-0' : ''}`}>
                                {/* Mobile Sub-Title */}
                                <h3 className="lg:hidden text-lg font-medium text-muted-foreground mb-4">
                                    {cat.title}
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

export function ComparisonView({ defaultView }: ComparisonViewProps) {
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [isStuck, setIsStuck] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

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
        <div className="min-h-screen bg-background text-foreground">
            <main className="mx-auto max-w-7xl px-6 sm:px-12 py-12">
                {/* Sentinel for sticky detection */}
                <div id="header-sentinel" className="absolute top-0 h-12 w-full pointer-events-none opacity-0" />

                {/* Header */}
                <div className="mb-12 flex items-center justify-end sticky top-0 z-40 bg-transparent py-4 transition-all pointer-events-none">
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <div className={`
                            flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300
                            ${isStuck
                                ? 'bg-background/80 backdrop-blur-md border-border shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] transform translate-y-2'
                                : 'bg-muted/20 border-transparent sm:border-border'
                            }
                        `}>
                            <span className="text-sm font-medium text-muted-foreground">
                                {defaultView === 'problems' ? "Problems View" : "Solutions View"}
                            </span>

                            <button
                                onClick={() => setIsCompareMode(!isCompareMode)}
                                className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer
                    ${isCompareMode ? 'bg-primary' : 'bg-muted'}
                  `}
                            >
                                <span
                                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-background transition-transform
                      ${isCompareMode ? 'translate-x-6' : 'translate-x-1'}
                    `}
                                />
                            </button>

                            <span className={`text-sm font-medium ${isCompareMode ? 'text-foreground' : 'text-muted-foreground'}`}>
                                Compare
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-20">
                    {/* Header Section */}
                    <section className="max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">
                            {isCompareMode ? "Systemic Analysis" : (defaultView === 'problems' ? "The Systemic Convergence" : "The Source Solution")}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {isCompareMode
                                ? "Comparing the converging systemic failures with the architectural solutions provided by Source."
                                : (defaultView === 'problems'
                                    ? "We are witnessing the convergence of multiple systemic crises, political, economic, social, and technological."
                                    : "How the Source Platform systematically addresses the converging crises through Ambient Computing and High-Resolution Data.")}
                        </p>
                    </section>

                    {/* SINGLE VIEW MODE */}
                    {!isCompareMode && (
                        <>
                            {/* Problems View */}
                            {defaultView === 'problems' && (
                                <>
                                    <section className="space-y-8">
                                        <h2 className="text-2xl font-bold text-foreground">The Macro Problem Set</h2>
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 not-prose">
                                            {MACRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="border border-border p-6 rounded-lg bg-card/50">
                                                    <h3 className="mb-4 text-lg font-semibold text-foreground">{cat.title}</h3>
                                                    <div className="space-y-3">
                                                        {cat.problems.map((p, i) => <ProblemCard key={i} issue={p} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="space-y-8">
                                        <h2 className="text-2xl font-bold text-foreground">The Micro Problem Set</h2>
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 not-prose">
                                            {MICRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="border border-border p-6 rounded-lg bg-card/50">
                                                    <h3 className="mb-4 text-lg font-semibold text-foreground">{cat.title}</h3>
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
                                        <h2 className="text-2xl font-bold text-foreground">Macro Solutions</h2>
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 not-prose">
                                            {MACRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="border border-border p-6 rounded-lg bg-card/50">
                                                    <h3 className="mb-4 text-xl font-bold text-foreground">{cat.title}</h3>
                                                    <div className="space-y-6">
                                                        {cat.solutions.map((s, i) => <SolutionCard key={i} item={s} />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section className="space-y-8">
                                        <h2 className="text-2xl font-bold text-foreground">Micro Solutions</h2>
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 not-prose">
                                            {MICRO_CATEGORIES.map(cat => (
                                                <div key={cat.title} className="border border-border p-6 rounded-lg bg-card/50">
                                                    <h3 className="mb-4 text-xl font-bold text-foreground">{cat.title}</h3>
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
                    {isCompareMode && (
                        <>
                            {/* Macro Analysis Section */}
                            <ComparisonSection title="The Macro Problem Set" categories={MACRO_CATEGORIES} />

                            {/* Micro Analysis Section */}
                            <ComparisonSection title="The Micro Problem Set" categories={MICRO_CATEGORIES} isLastSection={true} />
                        </>
                    )}

                    {/* Footer */}
                    <div className={`pt-24 pb-12 ${isCompareMode ? 'grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12' : 'flex justify-center'}`}>
                        <div className={isCompareMode ? 'lg:col-start-2 flex justify-center' : ''}>
                            <Link
                                href="/"
                                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Investment Memo
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
