import Image from "next/image";

import { cn } from "@/lib/utils";

interface SourceLogoProps {
  className?: string;
}

export function SourceLogo({ className }: SourceLogoProps) {
  return (
    <div className={cn("flex items-center gap-[18px]", className)}>
      <Image
        src="/logo/SOURCE-pictogram.svg"
        alt="SOURCE pictogram"
        width={44}
        height={44}
        className="h-11 w-11 min-w-[2.75rem] invert transition-colors duration-300 dark:invert-0"
        priority
      />
      <Image
        src="/logo/SOURCE-wordmark.svg"
        alt="SOURCE wordmark"
        width={184}
        height={34}
        className="h-8 w-auto invert transition-colors duration-300 dark:invert-0"
        priority
      />
    </div>
  );
}
