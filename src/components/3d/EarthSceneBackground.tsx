'use client';

import dynamic from 'next/dynamic';

// Dynamic import of EarthSceneV2 to avoid SSR issues
const EarthSceneV2 = dynamic(() => import('@/components/3d/EarthSceneV2').then(mod => mod.EarthSceneV2), {
  ssr: false,
  loading: () => null
});

export function EarthSceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <EarthSceneV2 />
    </div>
  );
}
