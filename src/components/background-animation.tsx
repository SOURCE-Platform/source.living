"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

import {
  GradientControls,
  ThreeBGProvider,
  ThreeGradientBackground,
  useThreeBG,
  type ThreeBGState,
} from "@/three-bg-kit";
import { DITHER_TYPES } from "@/three-bg-kit";

const LIGHT_COLORS: Pick<ThreeBGState, "colorA" | "colorB"> = {
  colorA: "#eef2db",
  colorB: "#dfddf2",
};

const DARK_COLORS: Pick<ThreeBGState, "colorA" | "colorB"> = {
  colorA: "#10100f",
  colorB: "#23222b",
};

const SHARED_INITIAL_STATE: Omit<ThreeBGState, "colorA" | "colorB"> = {
  complexity: 3,
  speed: 0.6,
  noiseType: "simplex" as const,
  scale: 1.15,
  warp: 0.4,
  contrast: 1.05,
  bias: 0.02,
  rotation: 0,
  autoRotate: false,
  autoRotateSpeed: 4,
  ditherEnabled: true,
  ditherScale: 1.25,
  ditherContrast: 1.0,
  ditherBrightness: 1.0,
  ditherType: DITHER_TYPES.BAYER_4X4,
  ditherErrorDiffusion: 1.0,
  ditherThreshold: 0.5,
  ditherLevels: 8,
  renderMode: "simple",
  simpleSpeed: 0.3,
  simpleScale: 1.0,
  simpleDirection: "forward",
  simpleAngle: 55,
  simpleAnimateAngle: false,
  simpleAngleSpeed: 0.2,
  simpleAngleDirection: "cw",
  simpleType: "hard",
  backgroundSource: "three",
  cssScale: 1.0,
  cssAngle: 55,
  cssAnimate: false,
  cssRotateSpeed: 45,
  cssRotateDirection: "cw",
};

const CONTROL_TOGGLE_CLASSES =
  "fixed bottom-5 right-5 z-20 rounded-full bg-neutral-900/80 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200/60 dark:bg-neutral-100/80 dark:text-black dark:hover:bg-neutral-100";

function BackgroundRuntime() {
  const { resolvedTheme } = useTheme();
  const [controlsOpen, setControlsOpen] = useState(false);
  const controls = useThreeBG();
  const { setState, renderMode, backgroundSource } = controls;
  const [activeTab, setActiveTab] = useState<"css" | "simple" | "advanced" | "dither">(
    backgroundSource === "css" ? "css" : renderMode === "simple" ? "simple" : "advanced"
  );

  const lastThemeRef = useRef<string | undefined>(resolvedTheme ?? undefined);
  const cssAnimationFrameRef = useRef<number | null>(null);

  const targetColors = useMemo<Pick<ThreeBGState, "colorA" | "colorB">>(() => {
    return resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS;
  }, [resolvedTheme]);

  useEffect(() => {
    if (!resolvedTheme) return;
    if (lastThemeRef.current !== resolvedTheme) {
      setState(targetColors);
      lastThemeRef.current = resolvedTheme;
    }
  }, [resolvedTheme, setState, targetColors]);

  useEffect(() => {
    if (backgroundSource === "css") {
      setActiveTab("css");
      return;
    }

    setActiveTab((prev) => {
      if (prev === "dither") return prev;
      return renderMode === "simple" ? "simple" : "advanced";
    });
  }, [renderMode, backgroundSource]);

  const {
    colorA,
    colorB,
    cssScale,
    cssAngle,
    cssAnimate,
    cssRotateSpeed,
    cssRotateDirection,
  } = controls;

  useEffect(() => {
    const body = document.body;
    if (!body) return undefined;

    const applyBackground = (angleDeg: number) => {
      const normalizedAngle = ((angleDeg % 360) + 360) % 360;
      const span = Math.max(cssScale, 0.01);
      const margin = (1 - span) / 2;
      const startStop = margin * 100;
      const endStop = (1 - margin) * 100;
      const gradientStops = [
        { color: colorA, position: Math.min(0, startStop) },
        { color: colorA, position: startStop },
        { color: colorB, position: endStop },
        { color: colorB, position: Math.max(100, endStop) },
      ]
        .map(({ color, position }) => `${color} ${position}%`)
        .join(", ");

      body.style.backgroundImage = `linear-gradient(${normalizedAngle}deg, ${gradientStops})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundPosition = "center";
    };

    if (backgroundSource !== "css") {
      if (cssAnimationFrameRef.current !== null) {
        cancelAnimationFrame(cssAnimationFrameRef.current);
        cssAnimationFrameRef.current = null;
      }
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      body.style.backgroundRepeat = "";
      body.style.backgroundPosition = "";
      return undefined;
    }

    let startTime: number | null = null;
    const direction = cssRotateDirection === "cw" ? 1 : -1;
    const speed = cssRotateSpeed;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsedSeconds = (timestamp - startTime) / 1000;
      const angle = cssAngle + direction * speed * elapsedSeconds;
      applyBackground(angle);
      cssAnimationFrameRef.current = requestAnimationFrame(step);
    };

    if (cssAnimate && speed > 0) {
      cssAnimationFrameRef.current = requestAnimationFrame(step);
    } else {
      applyBackground(cssAngle);
    }

    return () => {
      if (cssAnimationFrameRef.current !== null) {
        cancelAnimationFrame(cssAnimationFrameRef.current);
        cssAnimationFrameRef.current = null;
      }
    };
  }, [
    backgroundSource,
    colorA,
    colorB,
    cssScale,
    cssAngle,
    cssAnimate,
    cssRotateSpeed,
    cssRotateDirection,
  ]);

  return (
    <>
      {backgroundSource === "three" && (
        <ThreeGradientBackground
          complexity={controls.complexity}
          speed={controls.speed}
          noiseType={controls.noiseType}
          colorA={controls.colorA}
          colorB={controls.colorB}
          scale={controls.scale}
          warp={controls.warp}
          contrast={controls.contrast}
          bias={controls.bias}
          rotation={controls.rotation}
          autoRotate={controls.autoRotate}
          autoRotateSpeed={controls.autoRotateSpeed}
          ditherEnabled={controls.ditherEnabled}
          ditherScale={controls.ditherScale}
          ditherContrast={controls.ditherContrast}
          ditherBrightness={controls.ditherBrightness}
          ditherType={controls.ditherType}
          ditherErrorDiffusion={controls.ditherErrorDiffusion}
          ditherThreshold={controls.ditherThreshold}
          ditherLevels={controls.ditherLevels}
          renderMode={controls.renderMode}
          simpleSpeed={controls.simpleSpeed}
          simpleScale={controls.simpleScale}
          simpleDirection={controls.simpleDirection}
          simpleAngle={controls.simpleAngle}
          simpleAnimateAngle={controls.simpleAnimateAngle}
          simpleAngleSpeed={controls.simpleAngleSpeed}
          simpleAngleDirection={controls.simpleAngleDirection}
          simpleType={controls.simpleType}
        />
      )}
      {controlsOpen ? (
        <GradientControls
          complexity={controls.complexity}
          speed={controls.speed}
          noiseType={controls.noiseType}
          colorA={controls.colorA}
          colorB={controls.colorB}
          scale={controls.scale}
          warp={controls.warp}
          contrast={controls.contrast}
          bias={controls.bias}
          rotation={controls.rotation}
          autoRotate={controls.autoRotate}
          autoRotateSpeed={controls.autoRotateSpeed}
          ditherEnabled={controls.ditherEnabled}
          ditherScale={controls.ditherScale}
          ditherContrast={controls.ditherContrast}
          ditherBrightness={controls.ditherBrightness}
          ditherType={controls.ditherType}
          ditherErrorDiffusion={controls.ditherErrorDiffusion}
          ditherThreshold={controls.ditherThreshold}
          ditherLevels={controls.ditherLevels}
          renderMode={controls.renderMode}
          simpleSpeed={controls.simpleSpeed}
          simpleScale={controls.simpleScale}
          simpleDirection={controls.simpleDirection}
          simpleAngle={controls.simpleAngle}
          simpleAnimateAngle={controls.simpleAnimateAngle}
          simpleAngleSpeed={controls.simpleAngleSpeed}
          simpleAngleDirection={controls.simpleAngleDirection}
          simpleType={controls.simpleType}
          backgroundSource={controls.backgroundSource}
          cssScale={controls.cssScale}
          cssAngle={controls.cssAngle}
          cssAnimate={controls.cssAnimate}
          cssRotateSpeed={controls.cssRotateSpeed}
          cssRotateDirection={controls.cssRotateDirection}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onChange={setState}
          onClose={() => setControlsOpen(false)}
        />
      ) : (
        <button type="button" onClick={() => setControlsOpen(true)} className={CONTROL_TOGGLE_CLASSES}>
          Gradient Controls
        </button>
      )}
    </>
  );
}

export function BackgroundAnimation() {
  const { resolvedTheme } = useTheme();

  const initialState = useMemo<Partial<ThreeBGState>>(() => {
    const colors = resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS;
    return { ...SHARED_INITIAL_STATE, ...colors };
  }, [resolvedTheme]);

  return (
    <ThreeBGProvider initialState={initialState}>
      <BackgroundRuntime />
    </ThreeBGProvider>
  );
}
