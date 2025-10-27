"use client";

import { useEffect, useRef, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SourceLogo } from "@/components/source-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, type MainNavItem } from "@/lib/navigation";

const FLOAT_THRESHOLD = 120;

export function MainHeader() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const scrollPositionRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

  const menuItems = useMemo<MainNavItem[]>(() => MAIN_NAV_ITEMS, []);

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "[data-scroll-viewport='main-content']"
    );

    function handleScroll() {
      const offset = viewport ? viewport.scrollTop : window.scrollY;
      
      if (offset > scrollPositionRef.current) {
        scrollDirectionRef.current = "down";
      } else {
        scrollDirectionRef.current = "up";
      }
      
      scrollPositionRef.current = offset;
      
      if (offset > FLOAT_THRESHOLD) {
        setIsHeaderHidden(true);
        setIsFloating(scrollDirectionRef.current === "up");
      } else {
        setIsHeaderHidden(false);
        setIsFloating(false);
      }
    }

    handleScroll();

    if (viewport) {
      viewport.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        viewport.removeEventListener("scroll", handleScroll);
      };
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isFloating) {
      setActiveIndex(null);
    }
  }, [isFloating]);

  function handleMenuEnter(index: number) {
    setActiveIndex(index);
  }

  function handleMenuLeave() {
    setActiveIndex(null);
  }

  function handleSubscribeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function renderMenuItems(buttonPadding: string) {
    return menuItems.map((item, index) => (
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
    ));
  }

  function renderNavigation(
    buttonPadding: string,
    options?: {
      withDecor?: boolean;
      className?: string;
    }
  ) {
    const { withDecor = false, className } = options ?? {};

    return (
      <nav
        className={cn(
          "flex items-center gap-3 text-base font-medium text-muted-foreground",
          "transition-all duration-300 ease-out",
          "rounded-full border backdrop-blur",
          withDecor
            ? "border-border/60 bg-background/95 px-6 py-2 shadow-xl"
            : "border-transparent bg-transparent px-0 py-0 shadow-none",
          className
        )}
      >
        {renderMenuItems(buttonPadding)}
      </nav>
    );
  }

  const navPadding = isFloating ? "px-3 py-2" : "px-4 py-2";
  const navClass = isFloating 
    ? "fixed left-1/2 top-0 hidden -translate-x-1/2 lg:flex"
    : "absolute left-1/2 top-[37.5px] hidden -translate-x-1/2 -translate-y-1/2 lg:flex";
  const navTransform = isFloating
    ? "translate-y-4 opacity-100"
    : "opacity-100";

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        isFloating 
          ? "fixed top-0 left-0 right-0 h-0 pointer-events-auto" 
          : isHeaderHidden
            ? "fixed -top-full left-0 right-0 pointer-events-none"
            : "fixed top-0 left-0 right-0 pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "flex h-[75px] w-full items-center justify-between gap-6 px-4 transition-transform transition-opacity duration-300 ease-out sm:px-6 lg:px-8",
          isFloating && "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <Link href="/" className="flex-shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <SourceLogo className="py-2" />
        </Link>
        <div className="flex flex-shrink-0 items-center gap-3">
          <form
            className={cn(
              "hidden items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 shadow-sm transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40 sm:flex",
              isFloating && "opacity-0"
            )}
            onSubmit={handleSubscribeSubmit}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Subscribe to newsletter"
              className="w-52 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              required
            />
            <Button size="sm" type="submit">
              Subscribe
            </Button>
          </form>
          <ThemeToggle />
        </div>
      </div>
      {renderNavigation(navPadding, {
        withDecor: isFloating,
        className: cn(
          navClass,
          navTransform,
          "pointer-events-auto",
          "transition-all duration-300 ease-out"
        ),
      })}
    </header>
  );
}
