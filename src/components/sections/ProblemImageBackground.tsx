'use client';

import { useEffect, useState } from 'react';
import { InteractiveImage } from "@/components/ui/interactive-image";

export function ProblemImageBackground() {
  const [bgTopOffset, setBgTopOffset] = useState<number>(-9999); // Start off-screen

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    let spacerDocumentTop: number | null = null;

    const findSpacerPosition = () => {
      const spacer = document.getElementById('problem-image-spacer');
      if (!spacer) return;

      const rect = spacer.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      spacerDocumentTop = rect.top + scrollTop;
    };

    const handleScroll = () => {
      if (spacerDocumentTop === null) {
        findSpacerPosition();
        if (spacerDocumentTop === null) return;
      }

      const scrollTop = scrollContainer.scrollTop;

      // Calculate where the background should be positioned
      // Similar to EarthSceneBackground but for the problem section
      const visualPosition = spacerDocumentTop - scrollTop;

      setBgTopOffset(visualPosition);
    };

    // Initial setup
    setTimeout(() => {
      findSpacerPosition();
      handleScroll();
    }, 100);

    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      spacerDocumentTop = null; // Reset on resize
      findSpacerPosition();
      handleScroll();
    });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="absolute left-0 right-0 w-screen z-0 pointer-events-auto h-[600px]"
      style={{ top: `${bgTopOffset}px` }}
    >
      <InteractiveImage
        src="/images/the%20problems/The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg"
        alt="The Garden of Earthly Delights"
        className="w-screen [mask-image:linear-gradient(to_bottom,black_80%,transparent),url(/images/viewing-mask.svg)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent),url(/images/viewing-mask.svg)] [mask-composite:intersect] [-webkit-mask-composite:source-in] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
      />
    </div>
  );
}
