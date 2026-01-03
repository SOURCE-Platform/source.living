'use client'

import { CircularMenu, MenuItem } from '@w3rk17/circular-menu-next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Mail, Monitor, Moon, Sun, Palette, FileText, Type } from 'lucide-react'
import Image from 'next/image'

const FONTS = [
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

export function MobileNav() {
    const { theme: currentTheme, resolvedTheme, setTheme } = useTheme()
    const router = useRouter()
    const [activeFont, setActiveFont] = useState(FONTS[0].value);
    const [showFonts, setShowFonts] = useState(false);
    const [showThemes, setShowThemes] = useState(false);

    useEffect(() => {
        document.body.style.fontFamily = activeFont;
    }, [activeFont]);

    const menuItems: MenuItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: (
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo/SOURCE-pictogram.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0 invert dark:invert-0"
                    />
                    <Image
                        src="/logo/SOURCE-wordmark.svg"
                        alt="SOURCE"
                        width={80}
                        height={24}
                        className="flex-shrink-0 invert dark:invert-0"
                    />
                </div>
            ),
            onClick: () => router.push('/')
        },
        {
            id: 'wordz',
            label: 'WORDz',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-medium">WORDz</span>
                </div>
            ),
            onClick: () => router.push('/wordz')
        },
        {
            id: 'contact',
            label: 'Contact',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <Mail className="h-5 w-5" />
                    <span className="text-sm font-medium">Email</span>
                </div>
            ),
            onClick: () => router.push('/#contact')
        },
        {
            id: 'theme',
            label: 'Theme',
            icon: (
                <div className="flex items-center gap-2 pr-2">
                    <Palette className="h-5 w-5" />
                    <span className="text-sm font-medium">Theme</span>
                </div>
            ),
            onClick: () => {
                setShowFonts(false)
                setShowThemes(!showThemes)
            }
        },
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
                setShowThemes(false)
                setShowFonts(!showFonts)
            }
        }
    ]

    return (
        <>
            <CircularMenu
                items={menuItems}
                position="top-right"
                hideOnScroll={true}
                darkMode={resolvedTheme === 'dark'}
                dotSize={12}
                expandedSize={42.5}
            />

            {showThemes && (
                <div className="fixed top-24 right-6 z-[100] bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 w-48">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">
                        Select Theme
                    </h3>
                    <ul className="space-y-1">
                        {[
                            { name: 'Light', value: 'light', icon: Sun },
                            { name: 'Dark', value: 'dark', icon: Moon },
                            { name: 'System', value: 'system', icon: Monitor },
                        ].map((theme) => (
                            <li key={theme.name}>
                                <button
                                    onClick={() => {
                                        setTheme(theme.value);
                                        setShowThemes(false);
                                    }}
                                    className={`
                                        w-full text-left text-sm px-2 py-1.5 rounded-md transition-all flex items-center gap-2
                                        ${currentTheme === theme.value
                                            ? 'bg-primary text-primary-foreground font-medium'
                                            : 'text-foreground hover:bg-muted font-normal text-muted-foreground hover:text-foreground'
                                        }
                                    `}
                                >
                                    <theme.icon className="h-4 w-4" />
                                    {theme.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showFonts && (
                <div className="fixed top-24 right-6 z-[100] bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 w-48 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">
                        Select Typeface
                    </h3>
                    <ul className="space-y-1">
                        {FONTS.map((font) => (
                            <li key={font.name}>
                                <button
                                    onClick={() => {
                                        setActiveFont(font.value);
                                        setShowFonts(false);
                                    }}
                                    className={`
                      w-full text-left text-sm px-2 py-1.5 rounded-md transition-all
                      ${activeFont === font.value
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
