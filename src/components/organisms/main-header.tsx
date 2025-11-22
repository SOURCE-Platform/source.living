"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { cn } from "@/lib/utils";

const FLOAT_THRESHOLD = 120;

export function MainHeader() {
  const [isFloating, setIsFloating] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const scrollPositionRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

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
        <div className="flex flex-shrink-0 items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
