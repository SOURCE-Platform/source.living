"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { SourceLogo } from "@/components/source-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface MegaMenuSection {
  title: string;
  items?: string[];
}

interface MegaMenuItem {
  label: string;
  sections: MegaMenuSection[];
}

const FLOAT_THRESHOLD = 120;

export function MainHeader() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isFloating, setIsFloating] = useState(false);

  const menuItems = useMemo<MegaMenuItem[]>(
    () => [
      {
        label: "Hardware",
        sections: [
          { title: "Sensor Speaker" },
          { title: "AI Computer" },
          { title: "Private & Public" },
        ],
      },
      {
        label: "Software",
        sections: [{ title: "0" }, { title: "CAST" }],
      },
      {
        label: "SOURCE ID",
        sections: [
          { title: "Applications & UX" },
          { title: "Architecture" },
          { title: "ZKPs" },
        ],
      },
      {
        label: "Anti-Ad Platform",
        sections: [
          { title: "Company's Perspective" },
          { title: "Consumer's Perspective" },
        ],
      },
      {
        label: "Roadmap",
        sections: [
          {
            title: "GTM Private",
            items: [
              "Influencers & Streamers",
              "Early Adopters",
              "Elderly",
            ],
          },
          {
            title: "GTM Public",
            items: ["Smart cities", "Government contracts"],
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "[data-scroll-viewport='main-content']"
    );

    function handleScroll() {
      const offset = viewport ? viewport.scrollTop : window.scrollY;
      setIsFloating(offset > FLOAT_THRESHOLD);
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
        <button
          type="button"
          className={cn(
            "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            buttonPadding,
            activeIndex === index && "text-foreground"
          )}
          onFocus={() => handleMenuEnter(index)}
          onBlur={handleMenuLeave}
        >
          {item.label}
        </button>
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 pt-4",
            activeIndex === index && "pointer-events-auto block"
          )}
        >
          <div className="w-[320px] rounded-2xl border border-border/70 bg-card/95 p-6 shadow-xl backdrop-blur-xl">
            <div className="space-y-5 text-left">
              {item.sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {section.title}
                  </h3>
                  {section.items ? (
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {section.items.map((subItem) => (
                        <li key={subItem}>{subItem}</li>
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
          "flex items-center gap-6 text-sm font-medium text-muted-foreground",
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

  const navPadding = isFloating ? "px-3 py-2" : "px-2 py-2";
  const navClass = "fixed left-1/2 top-0 hidden -translate-x-1/2 lg:flex";
  const navTransform = isFloating
    ? "translate-y-6 opacity-100"
    : "translate-y-6 opacity-100";

  return (
    <header
      className={cn(
        "pointer-events-auto z-50 transition-all duration-300",
        isFloating ? "fixed top-0 left-0 right-0 h-0" : "sticky top-0 relative"
      )}
    >
      <div
        className={cn(
          "flex h-[75px] w-full items-center justify-between gap-6 px-4 transition-transform transition-opacity duration-300 ease-out sm:px-6 lg:px-8",
          isFloating && "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <SourceLogo className="flex-shrink-0 py-2" />
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
