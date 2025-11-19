"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-black/5 dark:hover:bg-white/5">
          <svg
            className="size-[1.2rem]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36 rounded-lg border-border/70 bg-background p-3 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] dark:bg-zinc-900">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer rounded-md hover:bg-muted/50 focus:bg-muted/50">
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer rounded-md hover:bg-muted/50 focus:bg-muted/50">
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer rounded-md hover:bg-muted/50 focus:bg-muted/50">
          <Monitor className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
