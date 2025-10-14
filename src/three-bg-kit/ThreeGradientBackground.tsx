"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PostProcessor } from "./PostProcessor";
import type { DitherType } from "./shaders/ditherShader";

export type NoiseType = "value" | "simplex" | "worley";

export interface ThreeGradientBackgroundProps {
  complexity: number;
  speed: number;
  noiseType: NoiseType;
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
  ditherAnimateNoise?: boolean;
  ditherNoiseSpeed?: number;
  ditherNoiseScale?: number;
  renderMode?: "advanced" | "simple";
  simpleSpeed?: number;
  simpleScale?: number;
  simpleDirection?: "forward" | "reverse";
  simpleAngle?: number;
  simpleAnimateAngle?: boolean;
  simpleAngleSpeed?: number;
  simpleAngleDirection?: "cw" | "ccw";
  simpleType?: "hard" | "smooth";
}

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_complexity;
uniform int u_noiseType;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_scale;
uniform float u_warp;
uniform float u_contrast;
uniform float u_bias;
uniform float u_rotation;

float hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p.x) * p.y * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);} 
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                      -0.577350269189626,
                      0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float worley(vec2 uv) {
  vec2 i_st = floor(uv);
  vec2 f_st = fract(uv);
  float m_dist = 1.0;
  for (int y=-1; y<=1; y++) {
    for (int x=-1; x<=1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = hash(i_st + neighbor) * vec2(1.0);
      point = vec2(hash(i_st + neighbor), hash(i_st + neighbor + 1.234));
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      m_dist = min(m_dist, dist);
    }
  }
  return m_dist;
}

float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i=0; i<8; i++) {
    if (i >= octaves) break;
    value += amp * snoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return value;
}

float getNoise(vec2 uv, int type, int octaves) {
  if (type == 0) {
    float v = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i=0; i<8; i++) {
      if (i >= octaves) break;
      v += amp * valueNoise(uv * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return v;
  } else if (type == 1) {
    return fbm(uv, octaves);
  } else {
    float v = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i=0; i<8; i++) {
      if (i >= octaves) break;
      v += amp * (1.0 - worley(uv * freq));
      freq *= 2.0;
      amp *= 0.5;
    }
    return v;
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * 2.0;
  float c = cos(u_rotation);
  float s = sin(u_rotation);
  mat2 R = mat2(c, -s, s, c);
  p = R * p * u_scale;
  float t = u_time * u_speed * 0.25;
  float base = getNoise(p + vec2(t, -t), u_noiseType, int(u_complexity));
  vec2 warp = vec2(
    getNoise(p + base + vec2(1.7, 9.2) + t, u_noiseType, int(u_complexity)),
    getNoise(p + base + vec2(-8.3, -2.8) - t, u_noiseType, int(u_complexity))
  );
  float n = getNoise(p + warp * u_warp, u_noiseType, int(u_complexity));
  n = clamp(n + u_bias, 0.0, 1.0);
  n = pow(n, u_contrast);

  vec3 col = mix(u_colorA, u_colorB, n);
  gl_FragColor = vec4(col, 1.0);
}
`;

const simpleFragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_simpleScale;
uniform float u_simpleDirection;
uniform float u_simpleAngle;
uniform float u_simpleAnimateAngle;
uniform float u_simpleAngleSpeed;
uniform float u_simpleAngleDirection;
uniform float u_simpleType;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = uv - 0.5;
  float angle = u_simpleAngle;
  if (u_simpleAnimateAngle > 0.5) {
    angle += u_simpleAngleDirection * u_simpleAngleSpeed * u_time;
  }
  vec2 direction = vec2(cos(angle), sin(angle));
  float scale = max(u_simpleScale, 0.0001);
  float offset = dot(centered, direction) / scale;
  offset += u_time * u_speed * u_simpleDirection;
  float t = fract(offset);
  float blend = t;
  if (u_simpleType > 0.5) {
    blend = abs(fract(offset) * 2.0 - 1.0);
  }
  vec3 col = mix(u_colorA, u_colorB, blend);
  gl_FragColor = vec4(col, 1.0);
}
`;

export const ThreeGradientBackground: React.FC<ThreeGradientBackgroundProps> = ({
  complexity,
  speed,
  noiseType,
  colorA = "#191919",
  colorB = "#4f46e5",
  scale = 1.0,
  warp = 0.5,
  contrast = 1.0,
  bias = 0.0,
  rotation = 0.0,
  autoRotate = false,
  autoRotateSpeed = 5.0,
  ditherEnabled = false,
  ditherScale = 1.0,
  ditherContrast = 1.0,
  ditherBrightness = 1.0,
  ditherType = 1 as DitherType,
  ditherErrorDiffusion = 1.0,
  ditherThreshold = 0.5,
  ditherLevels = 4,
  ditherAnimateNoise = false,
  ditherNoiseSpeed = 0.6,
  ditherNoiseScale = 1.0,
  renderMode = "advanced",
  simpleSpeed = 0.3,
  simpleScale = 1.0,
  simpleDirection = "forward",
  simpleAngle = 55,
  simpleAnimateAngle = false,
  simpleAngleSpeed = 0.2,
  simpleAngleDirection = "cw",
  simpleType = "hard",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const animIdRef = useRef<number | null>(null);
  const rotationDegRef = useRef<number>(rotation);
  const rotateSpeedDegRef = useRef<number>(autoRotateSpeed);
  const autoRotateRef = useRef<boolean>(autoRotate);
  const renderModeRef = useRef<"advanced" | "simple">(renderMode);
  const simpleSpeedRef = useRef<number>(simpleSpeed);
  const simpleScaleRef = useRef<number>(simpleScale);
  const simpleDirectionRef = useRef<number>(simpleDirection === "forward" ? 1 : -1);
  const simpleAngleRef = useRef<number>(simpleAngle);
  const simpleAnimateAngleRef = useRef<boolean>(simpleAnimateAngle);
  const simpleAngleSpeedRef = useRef<number>(simpleAngleSpeed);
  const simpleAngleDirectionRef = useRef<number>(simpleAngleDirection === "cw" ? 1 : -1);
  const simpleTypeRef = useRef<number>(simpleType === "smooth" ? 1 : 0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const [ready, setReady] = React.useState(false);
  const lastPathRef = useRef<'dither' | 'normal' | null>(null);
  const lastLogTimeRef = useRef<number>(0);
  const ditherEnabledRef = useRef<boolean>(ditherEnabled);

  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.zIndex = '1';
    container.style.pointerEvents = 'none';
    container.style.width = '100%';
    container.style.height = '100%';
    containerRef.current = container;
    document.body.appendChild(container);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    sceneRef.current = scene;
    cameraRef.current = camera;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_time: { value: 0 },
      u_speed: { value: renderMode === "simple" ? simpleSpeed : speed },
      u_complexity: { value: complexity },
      u_noiseType: { value: noiseType === "value" ? 0 : noiseType === "simplex" ? 1 : 2 },
      u_colorA: { value: new THREE.Color(colorA) },
      u_colorB: { value: new THREE.Color(colorB) },
      u_scale: { value: scale },
      u_warp: { value: warp },
      u_contrast: { value: contrast },
      u_bias: { value: bias },
      u_rotation: { value: rotation * 3.14159265 / 180.0 },
      u_simpleScale: { value: simpleScale },
      u_simpleDirection: { value: simpleDirectionRef.current },
      u_simpleAngle: { value: (simpleAngle * Math.PI) / 180 },
      u_simpleAnimateAngle: { value: simpleAnimateAngle ? 1 : 0 },
      u_simpleAngleSpeed: { value: simpleAngleSpeed },
      u_simpleAngleDirection: { value: simpleAngleDirectionRef.current },
      u_simpleType: { value: simpleTypeRef.current },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: renderMode === "simple" ? simpleFragmentShader : fragmentShader,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;
    renderModeRef.current = renderMode;
    simpleSpeedRef.current = simpleSpeed;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    container.appendChild(renderer.domElement);
    setReady(true);

    const onResize = () => {
      let w = container.clientWidth;
      let h = container.clientHeight;
      if (w < 2 || h < 2) {
        w = window.innerWidth;
        h = window.innerHeight;
      }
      renderer.setSize(w, h, true);
      (material.uniforms.u_resolution.value as THREE.Vector2).set(w, h);
    };
    onResize();

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    resizeObserverRef.current = ro;

    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const renderLoop = () => {
      const t = clock.getElapsedTime();
      (material.uniforms.u_time as any).value = t;
      if (renderModeRef.current === "simple") {
        const angleBase = (simpleAngleRef.current * Math.PI) / 180;
        let angleValue = angleBase;
        if (simpleAnimateAngleRef.current) {
          angleValue += simpleAngleDirectionRef.current * simpleAngleSpeedRef.current * t;
        }
        (material.uniforms.u_simpleAngle as any).value = angleValue;
        (material.uniforms.u_speed as any).value = simpleSpeedRef.current;
        (material.uniforms.u_simpleDirection as any).value = simpleDirectionRef.current;
        (material.uniforms.u_simpleScale as any).value = simpleScaleRef.current;
        (material.uniforms.u_simpleType as any).value = simpleTypeRef.current;
      } else if (autoRotateRef.current) {
        const angleRad = (rotationDegRef.current + t * rotateSpeedDegRef.current) * Math.PI / 180.0;
        (material.uniforms.u_rotation as any).value = angleRad;
      }
      const canDither = Boolean((renderer as any).renderWithDither);
      const now = performance.now();
      if (ditherEnabledRef.current && canDither) {
        if (lastPathRef.current !== 'dither' && now - lastLogTimeRef.current > 1000) {
          console.log('[ThreeGradientBackground] Using DITHER render path');
          lastPathRef.current = 'dither';
          lastLogTimeRef.current = now;
        }
        (renderer as any).renderWithDither(t);
      } else {
        if (lastPathRef.current !== 'normal' && now - lastLogTimeRef.current > 1000) {
          console.log('[ThreeGradientBackground] Using NORMAL render path', { ditherEnabled: ditherEnabledRef.current, canDither });
          lastPathRef.current = 'normal';
          lastLogTimeRef.current = now;
        }
        renderer.render(scene, camera);
      }
      animIdRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (document.body.contains(container)) document.body.removeChild(container);
    };
  }, []);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    if (renderMode !== "advanced") {
      return;
    }
    (mat.uniforms.u_speed as any).value = speed;
    (mat.uniforms.u_complexity as any).value = Math.max(1, Math.min(8, Math.round(complexity)));
    (mat.uniforms.u_noiseType as any).value = noiseType === "value" ? 0 : noiseType === "simplex" ? 1 : 2;
    (mat.uniforms.u_scale as any).value = scale;
    (mat.uniforms.u_warp as any).value = warp;
    (mat.uniforms.u_contrast as any).value = contrast;
    (mat.uniforms.u_bias as any).value = bias;
    (mat.uniforms.u_rotation as any).value = rotation * Math.PI / 180.0;
    rotationDegRef.current = rotation;
    rotateSpeedDegRef.current = autoRotateSpeed;
    autoRotateRef.current = autoRotate;
  }, [renderMode, speed, complexity, noiseType, scale, warp, contrast, bias, rotation, autoRotate, autoRotateSpeed]);

  useEffect(() => {
    ditherEnabledRef.current = ditherEnabled;
  }, [ditherEnabled]);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    (mat.uniforms.u_colorA as any).value = new THREE.Color(colorA);
    (mat.uniforms.u_colorB as any).value = new THREE.Color(colorB);
  }, [colorA, colorB]);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    renderModeRef.current = renderMode;
    simpleSpeedRef.current = simpleSpeed;
    simpleScaleRef.current = simpleScale;
    simpleDirectionRef.current = simpleDirection === "forward" ? 1 : -1;
    simpleAngleRef.current = simpleAngle;
    simpleAnimateAngleRef.current = simpleAnimateAngle;
    simpleAngleSpeedRef.current = simpleAngleSpeed;
    simpleAngleDirectionRef.current = simpleAngleDirection === "cw" ? 1 : -1;
    simpleTypeRef.current = simpleType === "smooth" ? 1 : 0;
    const targetShader = renderMode === "simple" ? simpleFragmentShader : fragmentShader;
    if (mat.fragmentShader !== targetShader) {
      mat.fragmentShader = targetShader;
      mat.needsUpdate = true;
    }
    (mat.uniforms.u_speed as any).value = renderMode === "simple" ? simpleSpeed : speed;
    (mat.uniforms.u_simpleScale as any).value = simpleScaleRef.current;
    (mat.uniforms.u_simpleDirection as any).value = simpleDirectionRef.current;
    (mat.uniforms.u_simpleAngle as any).value = (simpleAngleRef.current * Math.PI) / 180;
    (mat.uniforms.u_simpleAnimateAngle as any).value = simpleAnimateAngleRef.current ? 1 : 0;
    (mat.uniforms.u_simpleAngleSpeed as any).value = simpleAngleSpeedRef.current;
    (mat.uniforms.u_simpleAngleDirection as any).value = simpleAngleDirectionRef.current;
    (mat.uniforms.u_simpleType as any).value = simpleTypeRef.current;
  }, [renderMode, simpleSpeed, speed, simpleScale, simpleDirection, simpleAngle, simpleAnimateAngle, simpleAngleSpeed, simpleAngleDirection, simpleType]);

  return ready ? (
    <PostProcessor
      renderer={rendererRef.current}
      scene={sceneRef.current}
      camera={cameraRef.current}
      ditherScale={ditherScale}
      contrast={ditherContrast}
      brightness={ditherBrightness}
      ditherType={ditherType}
      errorDiffusion={ditherErrorDiffusion}
      threshold={ditherThreshold}
      enabled={ditherEnabled}
      colorA={new THREE.Color(colorA)}
      colorB={new THREE.Color(colorB)}
      levels={ditherLevels}
      ditherAnimateNoise={ditherAnimateNoise}
      ditherNoiseSpeed={ditherNoiseSpeed}
      ditherNoiseScale={ditherNoiseScale}
    />
  ) : null;
};
