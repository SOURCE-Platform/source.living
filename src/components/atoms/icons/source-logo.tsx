/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface SourceLogoProps {
  className?: string;
  forceWhite?: boolean;
  wordmarkClassName?: string;
}

export function SourceLogo({ className, forceWhite, wordmarkClassName }: SourceLogoProps) {
  return (
    <div className={cn("flex items-center gap-[18px]", className)}>
      <img
        src="/logo/SOURCE-pictogram.svg"
        alt="SOURCE pictogram"
        width={44}
        height={44}
        className={cn(
          "h-11 w-11 min-w-[2.75rem] transition-colors duration-300",
          forceWhite ? "invert-0" : "invert dark:invert-0"
        )}
      />
      <img
        src="/logo/SOURCE-wordmark.svg"
        alt="SOURCE wordmark"
        width={184}
        height={34}
        className={cn(
          "h-8 w-auto transition-colors duration-300",
          forceWhite ? "invert-0" : "invert dark:invert-0",
          wordmarkClassName
        )}
      />
    </div>
  );
}
