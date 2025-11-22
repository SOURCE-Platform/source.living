"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { type MainNavItem } from "@/lib/navigation";

interface NavIslandProps {
  menuItems: MainNavItem[];
  isFloating: boolean;
  className?: string;
}

export function NavIsland({ menuItems, isFloating, className }: NavIslandProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function handleMenuEnter(index: number) {
    setActiveIndex(index);
  }

  function handleMenuLeave() {
    setActiveIndex(null);
  }

  const buttonPadding = isFloating ? "px-3 py-2" : "px-4 py-2";

  return (
    <nav
      className={cn(
        "flex items-center gap-3 text-base font-medium text-muted-foreground",
        "transition-all duration-300 ease-out",
        "rounded-full border backdrop-blur",
        isFloating
          ? "border-border/60 bg-background/95 px-6 py-2 shadow-xl"
          : "border-transparent bg-transparent px-0 py-0 shadow-none",
        className
      )}
    >
      {menuItems.map((item, index) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMenuEnter(index)}
          onMouseLeave={handleMenuLeave}
        >
          <Link
            href={item.href}
            className={cn(
              "inline-flex items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              "font-normal",
              "hover:text-foreground hover:bg-muted/30",
              "cursor-pointer",
              buttonPadding,
              activeIndex === index && "text-foreground bg-muted/30"
            )}
            onFocus={() => handleMenuEnter(index)}
            onBlur={handleMenuLeave}
          >
            {item.label}
          </Link>
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 pt-4",
              activeIndex === index && "pointer-events-auto block"
            )}
          >
            <div className={cn(
              "rounded-2xl border border-border/70 bg-background shadow-xl",
              item.sections.length === 3 ? "w-[1260px] p-6" : item.sections.length > 1 ? "w-[840px] p-6" : "w-[420px] p-6"
            )}>
              {item.sections.length === 3 && item.label === "Timeline" && (
                <div className="mb-6 flex items-center justify-center px-4">
                  <svg width="100%" height="60" viewBox="0 0 1000 60" className="overflow-visible">
                    <line x1="80" y1="30" x2="920" y2="30" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40" />
                    <circle cx="80" cy="30" r="6" fill="currentColor" className="text-foreground" />
                    <circle cx="500" cy="30" r="6" fill="currentColor" className="text-foreground" />
                    <circle cx="920" cy="30" r="6" fill="currentColor" className="text-foreground" />
                  </svg>
                </div>
              )}
              <div className={cn(
                item.sections.length === 3 ? "grid grid-cols-3 gap-8" : item.sections.length > 1 ? "grid grid-cols-2 gap-8" : "space-y-5",
                "text-left"
              )}>
                {item.sections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <Link
                      href={item.label === "Timeline" ? `/timeline/${section.title.toLowerCase()}` : `/software#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-block text-xs font-bold uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 mb-4"
                    >
                      {section.title}
                    </Link>
                    {section.items ? (
                      <ul className="space-y-3 text-sm">
                        {section.items.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-0 text-left bg-transparent transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                            >
                              <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-muted/40" aria-hidden="true" />
                              <div className="flex flex-col gap-1">
                                <span className="text-base font-medium text-foreground">{subItem.label}</span>
                                {subItem.description && (
                                  <span className="text-xs text-muted-foreground">{subItem.description}</span>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}
