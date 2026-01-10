/* eslint-disable @next/next/no-img-element */
'use client'

import { CircularMenu, MenuItem } from '@w3rk17/circular-menu-next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Mail, FileText, Type, X } from 'lucide-react'
import { SystemIcon, DarkIcon, LightIcon, EmailIcon } from '@/components/icons/theme-icons'
import Image from 'next/image'
import { useTransitionTo } from '@/components/providers/transition-context'
import { cn } from '@/lib/utils'

const PARAGRAPH_FONTS = [
    { name: 'Default (PP Mori)', value: 'var(--font-pp-mori)' },
    { name: 'Cabin', value: '"Cabin", sans-serif' },
    { name: 'Figtree', value: '"Figtree", sans-serif' },
    { name: 'Lexend', value: '"Lexend", sans-serif' },
    { name: 'Montserrat', value: '"Montserrat", sans-serif' },
    { name: 'Nunito Sans', value: '"Nunito Sans", sans-serif' },
    { name: 'Outfit', value: '"Outfit", sans-serif' },
    { name: 'Questrial', value: '"Questrial", sans-serif' },
    { name: 'Quicksand', value: '"Quicksand", sans-serif' },
    { name: 'Urbanist', value: '"Urbanist", sans-serif' },
];

const HEADER_FONTS = [
    { name: 'Default (PP Mori)', value: 'var(--font-pp-mori)' },
    { name: 'Atkinson Hyperlegible Mono', value: '"Atkinson Hyperlegible Mono", monospace' },
    { name: 'Inconsolata', value: '"Inconsolata", monospace' },
    { name: 'Source Code Pro', value: '"Source Code Pro", monospace' },
    { name: 'Space Mono', value: '"Space Mono", monospace' },
    { name: 'Forum', value: '"Forum", serif' },
    { name: 'Antic Didone', value: '"Antic Didone", serif' },
    { name: 'Paprika', value: '"Paprika", serif' },
    { name: 'Montaga', value: '"Montaga", serif' },
    { name: 'Aref Ruqaa Ink', value: '"Aref Ruqaa Ink", serif' },
    { name: 'Public Sans', value: '"Public Sans", sans-serif' },
    { name: 'Funnel Display', value: '"Funnel Display", sans-serif' },
];

export function MobileNav() {
    const { theme: currentTheme, resolvedTheme, setTheme } = useTheme()
    const { transitionTo } = useTransitionTo()
    const router = useRouter()

    // Independent font states
    const [activeParagraphFont, setActiveParagraphFont] = useState(PARAGRAPH_FONTS[0].value);
    const [activeHeaderFont, setActiveHeaderFont] = useState(HEADER_FONTS[5].value); // Default to Forum
    const [activeParagraphScale, setActiveParagraphScale] = useState(1);
    const [activeHeaderScale, setActiveHeaderScale] = useState(1.4);
    const [activeParagraphSpacing, setActiveParagraphSpacing] = useState(0);
    const [activeHeaderSpacing, setActiveHeaderSpacing] = useState(-0.03);

    // UI states
    const [showFonts, setShowFonts] = useState(false);
    const [activeTab, setActiveTab] = useState<'paragraph' | 'header'>('paragraph');

    useEffect(() => {
        document.documentElement.style.setProperty('--font-paragraph', activeParagraphFont);
        document.documentElement.style.setProperty('--font-header', activeHeaderFont);
        document.documentElement.style.setProperty('--paragraph-scale', activeParagraphScale.toString());
        document.documentElement.style.setProperty('--header-scale', activeHeaderScale.toString());
        document.documentElement.style.setProperty('--paragraph-spacing', `${activeParagraphSpacing}em`);
        document.documentElement.style.setProperty('--header-spacing', `${activeHeaderSpacing}em`);
    }, [activeParagraphFont, activeHeaderFont, activeParagraphScale, activeHeaderScale, activeParagraphSpacing, activeHeaderSpacing]);

    const [isVisible, setIsVisible] = useState(true);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        let scrollContainer: HTMLElement | null = null;
        let intervalId: NodeJS.Timeout;

        const handleScroll = () => {
            if (!scrollContainer) return;
            const currentScrollTop = scrollContainer.scrollTop;
            if (currentScrollTop > lastScrollTop.current && currentScrollTop > 10) {
                setIsVisible(false);
            } else if (currentScrollTop < lastScrollTop.current) {
                setIsVisible(true);
            }
            lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        const attachListener = () => {
            scrollContainer = document.getElementById('scroll-container');
            if (scrollContainer) {
                lastScrollTop.current = scrollContainer.scrollTop;
                scrollContainer.addEventListener('scroll', handleScroll);
                return true;
            }
            return false;
        };

        if (!attachListener()) {
            intervalId = setInterval(() => {
                if (attachListener()) {
                    clearInterval(intervalId);
                }
            }, 100);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // Helper to handle navigation with modifier key support (CMD+Click)
    const handleNavClick = (href: string, e: any) => {

        // If modifier keys are pressed, open in new tab
        if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
            window.open(href, '_blank');
            return;
        }

        if (href.includes('#')) {
            router.push(href);
        } else {
            transitionTo(href);
        }
    };


    const menuItems: MenuItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: (
                <div className="flex items-center gap-[18px]">
                    <img
                        src="/logo/SOURCE-pictogram.svg"
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 min-w-[2.75rem] rounded-full flex-shrink-0 invert dark:invert-0"
                    />
                    <img
                        src="/logo/SOURCE-wordmark.svg"
                        alt="SOURCE"
                        width={184}
                        height={34}
                        className="h-8 w-auto flex-shrink-0 invert dark:invert-0"
                    />
                </div>
            ),
            onClick: ((e: any) => handleNavClick('/', e)) as any
        },
        /*
        {
            id: 'wordz',
            label: 'WORDz',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-medium">WORDz</span>
                </div>
            ),
            onClick: ((e: any) => handleNavClick('/wordz', e)) as any
        },
        */
        {
            id: 'contact-header',
            label: 'CONTACT',
            icon: (
                <div className="flex items-center gap-2 pr-2 opacity-50">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase translate-y-1">CONTACT</span>
                </div>
            ),
            onClick: () => { },
            disabled: true
        },
        {
            id: 'contact',
            label: 'Email',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <EmailIcon className="h-5 w-5" theme={resolvedTheme} />
                    <span className="text-sm font-medium">Email</span>
                </div>
            ),
            onClick: ((e: any) => handleNavClick('/#contact', e)) as any
        },
        /*
        {
            id: 'font-switcher',
            label: 'Typography',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <Type className="h-5 w-5" />
                    <span className="text-sm font-medium">Type</span>
                </div>
            ),
            onClick: () => {
                setShowFonts(!showFonts)
            }
        },
        */
        {
            id: 'theme-header',
            label: 'THEME',
            icon: (
                <div className="flex items-center gap-2 pr-2 opacity-50">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase translate-y-1">THEME</span>
                </div>
            ),
            onClick: () => { },
            disabled: true
        },
        {
            id: 'theme-system',
            label: 'System',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <SystemIcon className="h-5 w-5" theme={resolvedTheme} />
                    <span className="text-sm font-medium">System</span>
                </div>
            ),
            onClick: () => setTheme('system')
        },
        {
            id: 'theme-light',
            label: 'Light',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <LightIcon className="h-5 w-5" theme={resolvedTheme} />
                    <span className="text-sm font-medium">Light</span>
                </div>
            ),
            onClick: () => setTheme('light')
        },
        {
            id: 'theme-dark',
            label: 'Dark',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <DarkIcon className="h-5 w-5" theme={resolvedTheme} />
                    <span className="text-sm font-medium">Dark</span>
                </div>
            ),
            onClick: () => setTheme('dark')
        }
    ]

    const currentFonts = activeTab === 'paragraph' ? PARAGRAPH_FONTS : HEADER_FONTS;
    const currentActiveFont = activeTab === 'paragraph' ? activeParagraphFont : activeHeaderFont;
    const currentScale = activeTab === 'paragraph' ? activeParagraphScale : activeHeaderScale;
    const setScale = activeTab === 'paragraph' ? setActiveParagraphScale : setActiveHeaderScale;
    const currentSpacing = activeTab === 'paragraph' ? activeParagraphSpacing : activeHeaderSpacing;
    const setSpacing = activeTab === 'paragraph' ? setActiveParagraphSpacing : setActiveHeaderSpacing;

    return (
        <>
            <div
                className={cn(
                    "fixed top-[-24px] right-0 z-50 transition-opacity duration-300",
                    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <CircularMenu
                    items={menuItems}
                    position="top-right"
                    hideOnScroll={false}
                    darkMode={resolvedTheme === 'dark'}
                    dotSize={12}
                    expandedSize={42.5}
                />
            </div>

            {showFonts && (
                <div className="fixed top-24 right-6 z-[100] bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 w-48 max-h-[80vh] overflow-y-auto">
                    <button
                        onClick={() => setShowFonts(false)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close typography menu"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2 mt-4">
                        <button
                            onClick={() => setActiveTab('paragraph')}
                            className={cn(
                                "text-xs font-bold uppercase tracking-wider transition-colors",
                                activeTab === 'paragraph' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Paragraph
                        </button>
                        <button
                            onClick={() => setActiveTab('header')}
                            className={cn(
                                "text-xs font-bold uppercase tracking-wider transition-colors",
                                activeTab === 'header' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Header
                        </button>
                    </div>

                    <div className="mb-4 px-1 space-y-3">
                        {/* Font Size Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Scale</span>
                                <span className="text-[10px] text-muted-foreground font-mono">{currentScale.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={currentScale}
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        {/* Letter Spacing Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Spacing</span>
                                <span className="text-[10px] text-muted-foreground font-mono">{currentSpacing.toFixed(2)}em</span>
                            </div>
                            <input
                                type="range"
                                min="-0.1"
                                max="0.5"
                                step="0.01"
                                value={currentSpacing}
                                onChange={(e) => setSpacing(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>

                    <ul className="space-y-1">
                        {currentFonts.map((font) => (
                            <li key={font.name}>
                                <button
                                    onClick={() => {
                                        if (activeTab === 'paragraph') {
                                            setActiveParagraphFont(font.value);
                                        } else {
                                            setActiveHeaderFont(font.value);
                                        }
                                        // Don't close logic so user can experiment
                                        // setShowFonts(false); 
                                    }}
                                    className={`
                      w-full text-left text-sm px-2 py-1.5 rounded-md transition-all
                      ${currentActiveFont === font.value
                                            ? 'bg-primary text-primary-foreground font-medium'
                                            : 'text-foreground hover:bg-muted font-normal text-muted-foreground hover:text-foreground'
                                        }
                    `}
                                    style={{ fontFamily: font.value === 'var(--font-pp-mori)' ? undefined : font.value }}
                                >
                                    {font.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
