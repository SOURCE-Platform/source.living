"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  showHorizontal?: boolean
  viewportId?: string
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, showHorizontal = false, viewportId, ...props }, ref) => {
  const [isScrolling, setIsScrolling] = React.useState(false)
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>()

  const handleScroll = () => {
    setIsScrolling(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  React.useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-scroll-viewport={viewportId ?? undefined}
        className="h-full w-full rounded-[inherit]"
        onScroll={handleScroll}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" isScrolling={isScrolling} />
      {showHorizontal ? <ScrollBar orientation="horizontal" isScrolling={isScrolling} /> : null}
      {showHorizontal ? <ScrollAreaPrimitive.Corner /> : null}
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    isScrolling?: boolean
  }
>(({ className, orientation = "vertical", isScrolling = false, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-all duration-300 ease-in-out",
      orientation === "vertical"
        ? "w-1.5 border-l border-border/40 mr-2 my-2"
        : "h-1.5 w-full border-t border-border/40 mb-2 mx-2",
      isScrolling ? "opacity-100" : "opacity-0",
      className
    )}
    style={orientation === "vertical" ? { height: "calc(100% - 1rem)" } : { width: "calc(100% - 1rem)" }}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-foreground/20 hover:bg-foreground/30 active:bg-foreground/40">
      <span className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
    </ScrollAreaPrimitive.ScrollAreaThumb>
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
