"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundAnimation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background" />
  );
}
