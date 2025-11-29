'use client';

import { Link2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function SectionHeading({ id, children, className, as: Tag = 'h2' }: SectionHeadingProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tag id={id} className={cn("scroll-mt-[calc(2.75rem-2px)]", className)}>
        {children}
      </Tag>
      <button
        onClick={handleCopyLink}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+1rem)]",
          "rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50",
          "transition-all duration-200 cursor-pointer",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        aria-label="Copy link to section"
      >
        <Link2 className="h-4 w-4" />
        {showCopied && (
          <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 bg-muted/50 text-foreground text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 backdrop-blur-sm">
            Link copied
          </div>
        )}
      </button>
    </div>
  );
}
