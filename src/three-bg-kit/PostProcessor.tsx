'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ditherVertexShader, ditherFragmentShader, ditherShaderUniforms, DitherType } from './shaders/ditherShader';

interface PostProcessorProps {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  ditherScale?: number;
  contrast?: number;
  brightness?: number;
  ditherType?: DitherType;
  errorDiffusion?: number;
  threshold?: number;
  enabled?: boolean;
  colorA?: THREE.Color | string;
  colorB?: THREE.Color | string;
  levels?: number;
  ditherAnimateNoise?: boolean;
  ditherNoiseSpeed?: number;
  ditherNoiseScale?: number;
}

export function PostProcessor({
  renderer,
  scene,
  camera,
  ditherScale = 1.0,
  contrast = 1.0,
  brightness = 1.0,
  ditherType = 1,
  errorDiffusion = 1.0,
  threshold = 0.5,
  enabled = true,
  colorA = new THREE.Color(0x000000),
  colorB = new THREE.Color(0xffffff),
  levels = 4,
  ditherAnimateNoise = false,
  ditherNoiseSpeed = 1.0,
  ditherNoiseScale = 1.0,
}: PostProcessorProps) {
  const renderTargetRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const ditherMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const quadGeometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const quadMeshRef = useRef<THREE.Mesh | null>(null);
  const postSceneRef = useRef<THREE.Scene | null>(null);
  const postCameraRef = useRef<THREE.OrthographicCamera | null>(null);

  const initializePostProcessing = useCallback(() => {
    if (!renderer) return;

    const renderTarget = new THREE.WebGLRenderTarget(
      renderer.domElement.width,
      renderer.domElement.height,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        stencilBuffer: false,
        depthBuffer: false
      }
    );
    renderTargetRef.current = renderTarget;

    const ditherMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...ditherShaderUniforms,
        tDiffuse: { value: renderTarget.texture },
        uResolution: {
          value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height)
        },
        uDitherScale: { value: ditherScale },
        uContrast: { value: contrast },
        uBrightness: { value: brightness },
        uDitherType: { value: ditherType },
        uErrorDiffusion: { value: errorDiffusion },
        uThreshold: { value: threshold },
        uColorA: { value: (colorA instanceof THREE.Color) ? colorA : new THREE.Color(colorA as string) },
        uColorB: { value: (colorB instanceof THREE.Color) ? colorB : new THREE.Color(colorB as string) },
        uLevels: { value: levels },
        uTime: { value: 0.0 },
        uAnimateNoise: { value: ditherAnimateNoise ? 1.0 : 0.0 },
        uNoiseSpeed: { value: ditherNoiseSpeed },
        uNoiseScale: { value: ditherNoiseScale },
      },
      vertexShader: ditherVertexShader,
      fragmentShader: ditherFragmentShader,
      transparent: false
    });
    ditherMaterialRef.current = ditherMaterial;

    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    quadGeometryRef.current = quadGeometry;

    const quadMesh = new THREE.Mesh(quadGeometry, ditherMaterial);
    quadMeshRef.current = quadMesh;

    const postScene = new THREE.Scene();
    postScene.add(quadMesh);
    postSceneRef.current = postScene;

    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    postCameraRef.current = postCamera;

    console.log('Post-processing pipeline initialized');
  }, [renderer, ditherScale]);

  const updateResolution = useCallback(() => {
    if (!renderer || !renderTargetRef.current || !ditherMaterialRef.current) return;

    const { width, height } = renderer.domElement;

    renderTargetRef.current.setSize(width, height);

    ditherMaterialRef.current.uniforms.uResolution.value.set(width, height);
  }, [renderer]);

  const render = useCallback((time?: number) => {
    if (!renderer || !scene || !camera || !enabled) return;
    if (!renderTargetRef.current || !postSceneRef.current || !postCameraRef.current) return;
    if (!ditherMaterialRef.current) return;

    const now = time ?? performance.now() * 0.001;
    ditherMaterialRef.current.uniforms.uTime.value = now;

    const originalTarget = renderer.getRenderTarget();
    renderer.setRenderTarget(renderTargetRef.current);
    renderer.render(scene, camera);

    renderer.setRenderTarget(originalTarget);
    renderer.render(postSceneRef.current, postCameraRef.current);
  }, [renderer, scene, camera, enabled]);

  useEffect(() => {
    if (renderer) {
      initializePostProcessing();
    }

    return () => {
      if (renderTargetRef.current) {
        renderTargetRef.current.dispose();
      }
      if (ditherMaterialRef.current) {
        ditherMaterialRef.current.dispose();
      }
      if (quadGeometryRef.current) {
        quadGeometryRef.current.dispose();
      }
    };
  }, [renderer, initializePostProcessing]);

  useEffect(() => {
    if (renderer) {
      const resizeObserver = new ResizeObserver(() => {
        updateResolution();
      });

      resizeObserver.observe(renderer.domElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [renderer, updateResolution]);

  useEffect(() => {
    if (ditherMaterialRef.current) {
      ditherMaterialRef.current.uniforms.uDitherScale.value = ditherScale;
      ditherMaterialRef.current.uniforms.uContrast.value = contrast;
      ditherMaterialRef.current.uniforms.uBrightness.value = brightness;
      ditherMaterialRef.current.uniforms.uDitherType.value = ditherType;
      ditherMaterialRef.current.uniforms.uErrorDiffusion.value = errorDiffusion;
      ditherMaterialRef.current.uniforms.uThreshold.value = threshold;
      const ca = (colorA instanceof THREE.Color) ? colorA : new THREE.Color(colorA as string);
      const cb = (colorB instanceof THREE.Color) ? colorB : new THREE.Color(colorB as string);
      ditherMaterialRef.current.uniforms.uColorA.value = ca;
      ditherMaterialRef.current.uniforms.uColorB.value = cb;
      ditherMaterialRef.current.uniforms.uLevels.value = Math.max(2, Math.floor(levels));
      ditherMaterialRef.current.uniforms.uAnimateNoise.value = ditherAnimateNoise ? 1.0 : 0.0;
      ditherMaterialRef.current.uniforms.uNoiseSpeed.value = ditherNoiseSpeed;
      ditherMaterialRef.current.uniforms.uNoiseScale.value = ditherNoiseScale;
    }
  }, [
    ditherScale,
    contrast,
    brightness,
    ditherType,
    errorDiffusion,
    threshold,
    colorA,
    colorB,
    levels,
    ditherAnimateNoise,
    ditherNoiseSpeed,
    ditherNoiseScale,
  ]);

  useEffect(() => {
    if (renderer && render) {
      (renderer as any).renderWithDither = render;
      console.log('[Dither] renderWithDither attached to renderer');
    }
  }, [renderer, render]);

  return null;
}

export function usePostProcessor(
  renderer: THREE.WebGLRenderer | null,
  scene: THREE.Scene | null,
  camera: THREE.Camera | null,
  _options: {
    ditherScale?: number;
    contrast?: number;
    brightness?: number;
    ditherType?: DitherType;
    errorDiffusion?: number;
    threshold?: number;
    enabled?: boolean;
  } = {}
) {
  const render = useCallback(() => {
    if (renderer && (renderer as any).renderWithDither) {
      (renderer as any).renderWithDither();
    }
  }, [renderer]);

  return { render };
}
