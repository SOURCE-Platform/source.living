'use client';

import { useEffect, useState } from 'react';

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

export function FontSwitcher() {
    const [activeFont, setActiveFont] = useState(FONTS[0].value);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Apply the font directly to the body to ensure override
        document.body.style.fontFamily = activeFont;
    }, [activeFont]);

    // Hidden by default on small screens or simple toggle? 
    // User asked for fixed position. Let's make it collapsible to avoid clutter.

    return (
        <div className="fixed top-5 left-5 z-[100] group">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-border opacity-50 hover:opacity-100 transition-opacity mb-2"
            >
                {isVisible ? 'Hide Typographer' : 'Aa'}
            </button>

            {isVisible && (
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 w-48 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">
                        Select Typeface
                    </h3>
                    <ul className="space-y-1">
                        {FONTS.map((font) => (
                            <li key={font.name}>
                                <button
                                    onClick={() => setActiveFont(font.value)}
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
        </div>
    );
}
