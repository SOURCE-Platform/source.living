'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Dynamic import of EarthSceneV2 to avoid SSR issues
const EarthSceneV2 = dynamic(() => import('@/components/3d/EarthSceneV2').then(mod => mod.EarthSceneV2), {
  ssr: false,
  loading: () => null
});

export function EarthSceneBackground() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgTopOffset, setBgTopOffset] = useState(0);

  useEffect(() => {
    if (pathname !== '/') return;
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const maxScroll = 500; // Scroll distance over which animation happens
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);

      // Keep background fixed until 600px scroll, then gradually speed up
      const stickyThreshold = 600;
      if (scrollTop < stickyThreshold) {
        setBgTopOffset(0);
      } else {
        const scrollDistance = scrollTop - stickyThreshold;
        const accelerationDistance = 300; // Distance over which it accelerates to full speed

        // Calculate speed multiplier that goes from 0.1 to 1.0
        const speedProgress = Math.min(scrollDistance / accelerationDistance, 1);
        const speedMultiplier = 0.1 + (0.9 * speedProgress);

        // Apply the speed multiplier to the movement
        const actualMovement = scrollDistance * speedMultiplier;
        setBgTopOffset(-actualMovement);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname !== '/') return null;

  return (
    <div
      className="absolute left-0 right-0 z-0 pointer-events-none h-[650px]"
      style={{ top: `${bgTopOffset}px` }}
    >
      <EarthSceneV2 scrollProgress={scrollProgress} />
    </div>
  );
}
