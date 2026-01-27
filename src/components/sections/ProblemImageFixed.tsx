'use client';

import { useEffect, useState, useRef } from 'react';
import { InteractiveImage } from "@/components/ui/interactive-image";

export function ProblemImageFixed() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState<number>(-9999); // Start off-screen
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    const updatePosition = () => {
      if (!markerRef.current) return;

      // Get the marker's position relative to viewport
      const rect = markerRef.current.getBoundingClientRect();

      // Show when the marker is in or near the viewport
      const viewportHeight = window.innerHeight;
      const imageHeight = 600;

      const isInRange = rect.top < viewportHeight + 200 && rect.bottom > -imageHeight - 200;
      setIsVisible(isInRange);

      if (isInRange) {
        // Position the fixed element at the marker's visual position
        setOffsetY(rect.top);
      }
    };

    // Update on scroll
    scrollContainer.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    // Initial update
    updatePosition();

    return () => {
      scrollContainer.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <>
      {/* Marker div that stays in document flow and reserves space */}
      <div ref={markerRef} className="h-[600px] w-full pointer-events-none" />

      {/* Fixed image that spans full viewport width */}
      {isVisible && (
        <div
          className="fixed left-0 w-screen pointer-events-auto"
          style={{
            top: `${offsetY}px`,
            zIndex: 1, // Below scroll container content (z-10) but visible
          }}
        >
          <InteractiveImage
            src="/images/the%20problems/The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg"
            alt="The Garden of Earthly Delights"
            className="w-screen [mask-image:linear-gradient(to_bottom,black_80%,transparent),url(/images/viewing-mask.svg)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent),url(/images/viewing-mask.svg)] [mask-composite:intersect] [-webkit-mask-composite:source-in] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
          />
        </div>
      )}
    </>
  );
}
