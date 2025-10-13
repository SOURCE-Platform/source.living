"use client";

import React from "react";
import type { NoiseType } from "./ThreeGradientBackground";
import type { DitherType } from "./shaders/ditherShader";

export interface GradientControlsProps {
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
  ditherLevels?: number;
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
  activeTab: "css" | "simple" | "advanced" | "dither";
  onTabChange: (tab: "css" | "simple" | "advanced" | "dither") => void;
  onChange: (next: {
    complexity?: number;
    speed?: number;
    noiseType?: NoiseType;
    colorA?: string;
    colorB?: string;
    scale?: number;
    warp?: number;
    contrast?: number;
    bias?: number;
    rotation?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    ditherEnabled?: boolean;
    ditherScale?: number;
    ditherContrast?: number;
    ditherBrightness?: number;
    ditherType?: DitherType;
    ditherErrorDiffusion?: number;
    ditherThreshold?: number;
    ditherLevels?: number;
    renderMode?: "advanced" | "simple";
    simpleSpeed?: number;
    simpleScale?: number;
    simpleDirection?: "forward" | "reverse";
    simpleAngle?: number;
    simpleAnimateAngle?: boolean;
    simpleAngleSpeed?: number;
    simpleAngleDirection?: "cw" | "ccw";
    simpleType?: "hard" | "smooth";
    backgroundSource?: "css" | "three";
    cssScale?: number;
    cssAngle?: number;
    cssAnimate?: boolean;
    cssRotateSpeed?: number;
    cssRotateDirection?: "cw" | "ccw";
  }) => void;
  onClose?: () => void;
}

export const GradientControls: React.FC<GradientControlsProps> = ({
  complexity,
  speed,
  noiseType,
  colorA,
  colorB,
  scale,
  warp,
  contrast,
  bias,
  rotation,
  autoRotate,
  autoRotateSpeed,
  ditherEnabled,
  ditherScale,
  ditherContrast,
  ditherBrightness,
  ditherType,
  ditherErrorDiffusion,
  ditherThreshold,
  ditherLevels = 4,
  renderMode,
  simpleSpeed,
  simpleScale,
  simpleDirection,
  simpleAngle,
  simpleAnimateAngle,
  simpleAngleSpeed,
  simpleAngleDirection,
  simpleType,
  backgroundSource,
  cssScale,
  cssAngle,
  cssAnimate,
  cssRotateSpeed,
  cssRotateDirection,
  activeTab,
  onTabChange,
  onChange,
  onClose,
}) => {
  const handleTabChange = (tab: "css" | "simple" | "advanced" | "dither") => {
    onTabChange(tab);
    if (tab === "css") {
      if (backgroundSource !== "css") {
        onChange({ backgroundSource: "css" });
      }
      return;
    }

    if (backgroundSource !== "three") {
      onChange({ backgroundSource: "three" });
    }

    if (tab === "simple" && renderMode !== "simple") {
      onChange({ renderMode: "simple" });
    } else if (tab === "advanced" && renderMode !== "advanced") {
      onChange({ renderMode: "advanced" });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-20 pointer-events-auto select-none">
      <div className="relative rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-4 shadow-lg w-72">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Hide controls"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow border border-neutral-200 dark:border-neutral-800 flex items-center justify-center"
            title="Hide"
          >
            ×
          </button>
        )}
        <div className="grid grid-cols-4 text-xs font-medium mb-3 overflow-hidden rounded-md border border-neutral-200/70 dark:border-neutral-800/70">
          <button
            onClick={() => handleTabChange("css")}
            className={`${activeTab === "css" ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black" : "bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"} px-2 py-1.5`}
          >
            CSS
          </button>
          <button
            onClick={() => handleTabChange("simple")}
            className={`${activeTab === "simple" ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black" : "bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"} px-2 py-1.5`}
          >
            Simple
          </button>
          <button
            onClick={() => handleTabChange("advanced")}
            className={`${activeTab === "advanced" ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black" : "bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"} px-2 py-1.5`}
          >
            Advanced
          </button>
          <button
            onClick={() => handleTabChange("dither")}
            className={`${activeTab === "dither" ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black" : "bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"} px-2 py-1.5`}
          >
            Dither
          </button>
        </div>

        {activeTab === "css" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color A</label>
                <input
                  type="color"
                  value={colorA}
                  onChange={(e) => onChange({ colorA: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="CSS Gradient Color A"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color B</label>
                <input
                  type="color"
                  value={colorB}
                  onChange={(e) => onChange({ colorB: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="CSS Gradient Color B"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Scale: {(cssScale * 100).toFixed(0)}%</label>
              <input
                type="range"
                min={0.01}
                max={2}
                step={0.01}
                value={cssScale}
                onChange={(e) => onChange({ cssScale: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Angle: {cssAngle.toFixed(0)}°</label>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={cssAngle}
                onChange={(e) => onChange({ cssAngle: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-2 rounded border border-neutral-200/60 dark:border-neutral-800/60 p-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-600 dark:text-neutral-400">Rotate animation</label>
                <input
                  type="checkbox"
                  checked={cssAnimate}
                  onChange={(e) => onChange({ cssAnimate: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Speed {cssRotateSpeed.toFixed(0)}°/s</span>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={cssRotateSpeed}
                    onChange={(e) => onChange({ cssRotateSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-600"
                    disabled={!cssAnimate}
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Direction</label>
                  <select
                    value={cssRotateDirection}
                    onChange={(e) => onChange({ cssRotateDirection: e.target.value as "cw" | "ccw" })}
                    className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 py-1.5 text-xs"
                    disabled={!cssAnimate}
                  >
                    <option value="cw">Clockwise</option>
                    <option value="ccw">Counter-clockwise</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
              This tab reuses the site&apos;s CSS gradient background. Adjust its scale, angle, and optional rotation without rendering Three.js.
            </p>
          </div>
        )}

        {activeTab === "simple" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color A</label>
                <input
                  type="color"
                  value={colorA}
                  onChange={(e) => onChange({ colorA: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="Simple Gradient Color A"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color B</label>
                <input
                  type="color"
                  value={colorB}
                  onChange={(e) => onChange({ colorB: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="Simple Gradient Color B"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Speed: {simpleSpeed.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={simpleSpeed}
                onChange={(e) => onChange({ simpleSpeed: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Scale: {(simpleScale * 100).toFixed(0)}%</label>
              <input
                type="range"
                min={0.01}
                max={2}
                step={0.01}
                value={simpleScale}
                onChange={(e) => onChange({ simpleScale: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Direction</label>
                <select
                  value={simpleDirection}
                  onChange={(e) => onChange({ simpleDirection: e.target.value as "forward" | "reverse" })}
                  className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 py-1.5 text-xs"
                >
                  <option value="forward">Forward</option>
                  <option value="reverse">Reverse</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Type</label>
                <select
                  value={simpleType}
                  onChange={(e) => onChange({ simpleType: e.target.value as "hard" | "smooth" })}
                  className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 py-1.5 text-xs"
                >
                  <option value="hard">Hard</option>
                  <option value="smooth">Smooth Mirror</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Angle: {simpleAngle.toFixed(0)}°</label>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={simpleAngle}
                onChange={(e) => onChange({ simpleAngle: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-2 rounded border border-neutral-200/60 dark:border-neutral-800/60 p-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-600 dark:text-neutral-400">Animate Angle</label>
                <input
                  type="checkbox"
                  checked={simpleAnimateAngle}
                  onChange={(e) => onChange({ simpleAnimateAngle: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Speed {simpleAngleSpeed.toFixed(2)}</span>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.01}
                    value={simpleAngleSpeed}
                    onChange={(e) => onChange({ simpleAngleSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-600"
                    disabled={!simpleAnimateAngle}
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Direction</label>
                  <select
                    value={simpleAngleDirection}
                    onChange={(e) => onChange({ simpleAngleDirection: e.target.value as "cw" | "ccw" })}
                    className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 py-1.5 text-xs"
                    disabled={!simpleAnimateAngle}
                  >
                    <option value="cw">Clockwise</option>
                    <option value="ccw">Counter-clockwise</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
              The simple gradient animates two colors along a 55° angle. Switch to the Advanced tab for the noise-based shader.
            </p>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color A</label>
                <input
                  type="color"
                  value={colorA}
                  onChange={(e) => onChange({ colorA: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="Advanced Gradient Color A"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Color B</label>
                <input
                  type="color"
                  value={colorB}
                  onChange={(e) => onChange({ colorB: e.target.value })}
                  className="h-9 w-full p-0 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded"
                  aria-label="Advanced Gradient Color B"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Complexity: {Math.round(complexity)}</label>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={complexity}
                onChange={(e) => onChange({ complexity: parseInt(e.target.value, 10) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Scale: {scale.toFixed(2)}</label>
              <input
                type="range"
                min={0.25}
                max={4}
                step={0.01}
                value={scale}
                onChange={(e) => onChange({ scale: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Warp: {warp.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={warp}
                onChange={(e) => onChange({ warp: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Speed: {speed.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={4}
                step={0.01}
                value={speed}
                onChange={(e) => onChange({ speed: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Contrast: {contrast.toFixed(2)}</label>
              <input
                type="range"
                min={0.25}
                max={3}
                step={0.01}
                value={contrast}
                onChange={(e) => onChange({ contrast: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Bias: {bias.toFixed(2)}</label>
              <input
                type="range"
                min={-0.5}
                max={0.5}
                step={0.01}
                value={bias}
                onChange={(e) => onChange({ bias: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Rotation: {rotation.toFixed(0)}°</label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => onChange({ rotation: parseInt(e.target.value, 10) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Auto Rotate</label>
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => onChange({ autoRotate: e.target.checked })}
                className="accent-indigo-600 h-4 w-4"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Auto Rotate Speed: {autoRotateSpeed.toFixed(1)}°/s</label>
              <input
                type="range"
                min={-30}
                max={30}
                step={0.1}
                value={autoRotateSpeed}
                onChange={(e) => onChange({ autoRotateSpeed: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Noise Type</label>
              <select
                value={noiseType}
                onChange={(e) => onChange({ noiseType: e.target.value as NoiseType })}
                className="w-full text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-2 py-1"
              >
                <option value="value">Value FBM</option>
                <option value="simplex">Simplex FBM</option>
                <option value="worley">Worley FBM</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "dither" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Enable Dither</label>
              <input
                type="checkbox"
                checked={ditherEnabled}
                onChange={(e) => onChange({ ditherEnabled: e.target.checked })}
                className="accent-indigo-600 h-4 w-4"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Dither Scale: {ditherScale.toFixed(2)}</label>
              <input
                type="range"
                min={0.25}
                max={8}
                step={0.01}
                value={ditherScale}
                onChange={(e) => onChange({ ditherScale: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Contrast: {ditherContrast.toFixed(2)}</label>
              <input
                type="range"
                min={0.25}
                max={3}
                step={0.01}
                value={ditherContrast}
                onChange={(e) => onChange({ ditherContrast: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Brightness: {ditherBrightness.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={ditherBrightness}
                onChange={(e) => onChange({ ditherBrightness: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Dither Type</label>
              <select
                value={ditherType}
                onChange={(e) => onChange({ ditherType: parseInt(e.target.value, 10) as DitherType })}
                className="w-full text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-2 py-1"
              >
                <option value={0}>Bayer 2x2</option>
                <option value={1}>Bayer 4x4</option>
                <option value={2}>Bayer 8x8</option>
                <option value={3}>Random</option>
                <option value={4}>Blue Noise</option>
                <option value={5}>Pattern</option>
                <option value={6}>Threshold</option>
                <option value={7}>Floyd–Steinberg</option>
                <option value={8}>Atkinson</option>
                <option value={9}>Burkes</option>
                <option value={10}>Jarvis</option>
                <option value={11}>Sierra2</option>
                <option value={12}>Stucki</option>
                <option value={13}>Diffusion Row</option>
                <option value={14}>Diffusion Column</option>
                <option value={15}>Diffusion 2D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Error Diffusion: {ditherErrorDiffusion.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={ditherErrorDiffusion}
                onChange={(e) => onChange({ ditherErrorDiffusion: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Levels: {ditherLevels}</label>
              <input
                type="range"
                min={2}
                max={16}
                step={1}
                value={ditherLevels}
                onChange={(e) => onChange({ ditherLevels: parseInt(e.target.value, 10) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Threshold: {ditherThreshold.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={ditherThreshold}
                onChange={(e) => onChange({ ditherThreshold: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
