"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { GridOverlay } from "./grid-overlay"

type GridOverlayToggleProps = {
  className?: string
}

export function GridOverlayToggle({ className }: GridOverlayToggleProps) {
  const [showGrid, setShowGrid] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-pressed={showGrid}
        onClick={() => setShowGrid((prev) => !prev)}
        className={cn(
          "rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground shadow-sm backdrop-blur transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40",
          className
        )}
      >
        {showGrid ? "Hide Grid" : "Show Grid"}
      </button>
      {showGrid ? <GridOverlay /> : null}
    </>
  )
}
