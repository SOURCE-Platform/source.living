"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { GradientPreset } from "./presets";
import type { DitherType } from "./shaders/ditherShader";
import { DITHER_TYPES } from "./shaders/ditherShader";

export type NoiseType = "value" | "simplex" | "worley";

export interface ThreeBGState {
  complexity: number;
  speed: number;
  noiseType: NoiseType;
  colorA: string;
  colorB: string;
  scale: number;
  warp: number;
  contrast: number;
  bias: number;
  rotation: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  ditherEnabled: boolean;
  ditherScale: number;
  ditherContrast: number;
  ditherBrightness: number;
  ditherType: DitherType;
  ditherErrorDiffusion: number;
  ditherThreshold: number;
  ditherLevels: number;
  renderMode: "advanced" | "simple";
  simpleSpeed: number;
  simpleScale: number;
  simpleDirection: "forward" | "reverse";
  simpleAngle: number;
  simpleAnimateAngle: boolean;
  simpleAngleSpeed: number;
  simpleAngleDirection: "cw" | "ccw";
  simpleType: "hard" | "smooth";
  backgroundSource: "css" | "three";
  cssScale: number;
  cssAngle: number;
  cssAnimate: boolean;
  cssRotateSpeed: number;
  cssRotateDirection: "cw" | "ccw";
}

export interface ThreeBGControls extends ThreeBGState {
  setState: (next: Partial<ThreeBGState>) => void;
  applyPreset: (preset: GradientPreset) => void;
}

const defaultState: ThreeBGState = {
  complexity: 4,
  speed: 1.0,
  noiseType: "simplex",
  colorA: "#0a0a0a",
  colorB: "#4f46e5",
  scale: 1.0,
  warp: 0.5,
  contrast: 1.0,
  bias: 0.0,
  rotation: 0,
  autoRotate: true,
  autoRotateSpeed: 5.0,
  ditherEnabled: false,
  ditherScale: 1.0,
  ditherContrast: 1.0,
  ditherBrightness: 1.0,
  ditherType: DITHER_TYPES.BAYER_4X4,
  ditherErrorDiffusion: 1.0,
  ditherThreshold: 0.5,
  ditherLevels: 4,
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

const ThreeBGContext = createContext<ThreeBGControls | null>(null);

export interface ThreeBGProviderProps {
  children: React.ReactNode;
  initialState?: Partial<ThreeBGState>;
  onStateChange?: (state: ThreeBGState) => void;
}

export const ThreeBGProvider: React.FC<ThreeBGProviderProps> = ({ children, initialState, onStateChange }) => {
  const [state, setStateRaw] = useState<ThreeBGState>({ ...defaultState, ...initialState });

  const setState = useCallback((next: Partial<ThreeBGState>) => {
    setStateRaw((prev) => {
      const updated = { ...prev, ...next };
      onStateChange?.(updated);
      return updated;
    });
  }, [onStateChange]);

  const applyPreset = useCallback((preset: GradientPreset) => {
    setStateRaw((prev) => {
      const updated: ThreeBGState = {
        ...prev,
        complexity: preset.complexity,
        speed: preset.speed,
        noiseType: preset.noiseType,
        colorA: preset.colorA,
        colorB: preset.colorB,
        scale: preset.scale,
        warp: preset.warp,
        contrast: preset.contrast,
        bias: preset.bias,
        rotation: preset.rotation,
        autoRotate: preset.autoRotate,
        autoRotateSpeed: preset.autoRotateSpeed,
        ditherEnabled: preset.ditherEnabled,
        ditherScale: preset.ditherScale,
        ditherContrast: preset.ditherContrast,
        ditherBrightness: preset.ditherBrightness,
        ditherType: preset.ditherType,
        ditherErrorDiffusion: preset.ditherErrorDiffusion,
        ditherThreshold: preset.ditherThreshold,
        ditherLevels: preset.ditherLevels,
        renderMode: preset.renderMode,
        simpleSpeed: preset.simpleSpeed,
        simpleScale: preset.simpleScale,
        simpleDirection: preset.simpleDirection,
        simpleAngle: preset.simpleAngle,
        simpleAnimateAngle: preset.simpleAnimateAngle,
        simpleAngleSpeed: preset.simpleAngleSpeed,
        simpleAngleDirection: preset.simpleAngleDirection,
        simpleType: preset.simpleType,
        backgroundSource: prev.backgroundSource,
        cssScale: prev.cssScale,
        cssAngle: prev.cssAngle,
        cssAnimate: prev.cssAnimate,
        cssRotateSpeed: prev.cssRotateSpeed,
        cssRotateDirection: prev.cssRotateDirection,
      };
      onStateChange?.(updated);
      return updated;
    });
  }, [onStateChange]);

  const value = useMemo<ThreeBGControls>(() => ({
    ...state,
    setState,
    applyPreset,
  }), [state, setState, applyPreset]);

  return (
    <ThreeBGContext.Provider value={value}>
      {children}
    </ThreeBGContext.Provider>
  );
};

export function useThreeBG(): ThreeBGControls {
  const ctx = useContext(ThreeBGContext);
  if (!ctx) {
    throw new Error("useThreeBG must be used within a ThreeBGProvider");
  }
  return ctx;
}
