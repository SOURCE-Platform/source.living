'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

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
            <div ref={triggerRef} className="group/menu relative inline-block">
                <span className="font-medium text-foreground cursor-help px-2 py-2 rounded-lg transition-colors hover:bg-muted whitespace-nowrap">
                    {issue.label}
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
        </div>
    );
}

function SolutionCard({ item }: { item: SolutionItem }) {
    return (
        <div className="mb-6 last:mb-0">
            <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Problem: {item.problem}
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden mb-6">
            <div className="bg-card/50 p-6 border-b md:border-b-0 md:border-r border-border">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">{category.title} Problems</h4>
                <div className="space-y-4">
                    {category.problems.map((p, i) => (
                        <div key={i} className="min-h-[100px] flex items-center">
                            <ProblemCard issue={p} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-muted/10 p-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">{category.title} Solutions</h4>
                <div className="space-y-4">
                    {category.solutions.map((s, i) => (
                        <div key={i} className="min-h-[100px]">
                            <SolutionCard item={s} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface ComparisonViewProps {
    defaultView: 'problems' | 'solutions';
}

export function ComparisonView({ defaultView }: ComparisonViewProps) {
    const [isCompareMode, setIsCompareMode] = useState(false);

    // Helper to sync toggle text based on what page we are originally on
    const toggleText = defaultView === 'problems'
        ? (isCompareMode ? "Hide Solutions" : "View Solutions")
        : (isCompareMode ? "Hide Problems" : "View Problems");

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="mx-auto max-w-7xl px-6 sm:px-12 py-12">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between sticky top-0 z-40 bg-background/80 backdrop-blur-md py-4 border-b border-transparent transition-all">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <SourceLogo className="h-10 w-auto" />
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-muted/20 px-4 py-2 rounded-full border border-border">
                            <span className="text-sm font-medium text-muted-foreground">
                                {defaultView === 'problems' ? "Problems View" : "Solutions View"}
                            </span>

                            <button
                                onClick={() => setIsCompareMode(!isCompareMode)}
                                className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
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

                <article className="prose prose-invert max-w-none space-y-12">
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
                                        <h2 className="text-2xl font-bold text-foreground">I. The Macro Problem Set</h2>
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
                                        <h2 className="text-2xl font-bold text-foreground">II. The Micro Problem Set</h2>
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
                                        <h2 className="text-2xl font-bold text-foreground">I. Macro-Systemic Solutions</h2>
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
                                        <h2 className="text-2xl font-bold text-foreground">II. Micro-Personal Solutions</h2>
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
                            <section className="space-y-8">
                                <h2 className="text-2xl font-bold text-foreground">I. Macro Analysis</h2>
                                <div className="not-prose">
                                    {MACRO_CATEGORIES.map(cat => <ComparisonRow key={cat.title} category={cat} />)}
                                </div>
                            </section>

                            <section className="space-y-8">
                                <h2 className="text-2xl font-bold text-foreground">II. Micro Analysis</h2>
                                <div className="not-prose">
                                    {MICRO_CATEGORIES.map(cat => <ComparisonRow key={cat.title} category={cat} />)}
                                </div>
                            </section>
                        </>
                    )}

                    {/* Footer */}
                    <section className="mt-24 pt-8 border-t border-border flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            ← Back to Investment Memo
                        </Link>
                    </section>
                </article>
            </main>
        </div>
    );
}
