"use client"

import { useEffect, useState } from "react"

const BREAKPOINT_COLUMNS: { minWidth: number; columns: number }[] = [
  { minWidth: 1536, columns: 16 },
  { minWidth: 1280, columns: 12 },
  { minWidth: 1024, columns: 8 },
  { minWidth: 768, columns: 6 },
  { minWidth: 640, columns: 4 },
  { minWidth: 0, columns: 2 },
]

function resolveColumns(width: number) {
  for (const entry of BREAKPOINT_COLUMNS) {
    if (width >= entry.minWidth) {
      return entry.columns
    }
  }
  return 2
}

export function GridOverlay() {
  const [columns, setColumns] = useState(() =>
    typeof window === "undefined" ? BREAKPOINT_COLUMNS[BREAKPOINT_COLUMNS.length - 1]?.columns ?? 2 : resolveColumns(window.innerWidth)
  )

  useEffect(() => {
    const handler = () => setColumns(resolveColumns(window.innerWidth))
    handler()
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  const columnArray = Array.from({ length: columns }, (_, index) => index + 1)

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex justify-center">
      <div className="relative flex h-full w-full px-6 sm:px-12 lg:px-20 xl:px-32 2xl:px-48">
        <div
          className="grid h-full w-full gap-0"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {columnArray.map((column) => (
            <div key={column} className="relative h-full bg-blue-500/10">
              <span className="absolute left-1/2 top-6 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-500/10">
                {column}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
