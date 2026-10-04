"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// The Masterminds "mind": the logo's head silhouette sampled into a 3D point cloud that assembles
// from scattered sparks, leans toward the cursor, lights up near it and carries signals along its
// connections. Scrolling past the hero breaks it back apart. three.js is imported lazily so the
// hero copy never waits on it.

type Three = typeof import("three");
type Mark = {
  pixels: { x: number; y: number; r: number; g: number; b: number }[];
  runMin: number[];
  runMax: number[];
  sw: number;
  sh: number;
};

const MARK_SRC = "/brand/mark.png";
const SAMPLE_W = 180;
const HEAD_H = 3.2;
const FOV = 32;
const ASSEMBLE_SECONDS = 2.6;
const MIST: [number, number, number] = [0.596, 0.804, 0.929];

const vertexShader = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uProgress;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAspect;
  uniform vec2 uPointer;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float p = clamp((uProgress - aSeed * 0.4) / 0.6, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);
    vec3 pos = mix(aStart, position, p);
    pos += 0.018 * vec3(sin(uTime * 0.9 + aSeed * 40.0), cos(uTime * 0.7 + aSeed * 31.0), sin(uTime * 0.8 + aSeed * 23.0));
    pos += normalize(position + 0.0001) * uScatter * (0.6 + aSeed) * 1.4;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    vec2 delta = (gl_Position.xy / gl_Position.w - uPointer) * vec2(uAspect, 1.0);
    float glow = smoothstep(0.45, 0.0, length(delta)) * p;
    float twinkle = 0.8 + 0.2 * sin(uTime * (1.5 + aSeed * 2.0) + aSeed * 60.0);

    gl_PointSize = uSize * (0.6 + aSize * 1.2) * (twinkle + glow * 0.9) * uPixelRatio / -mv.z;
    vColor = mix(aColor, vec3(1.0), glow * 0.55);
    vAlpha = (0.2 + 0.6 * p) * (1.0 - uScatter * 0.7);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5));
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

// Reads the blue pixels of the logo mark, plus each row's main (widest) run so the head gets
// rounded depth while the floating network dots beside it stay shallow.
async function sampleMark(): Promise<Mark> {
  const img = new Image();
  img.src = MARK_SRC;
  await img.decode();

  const sw = SAMPLE_W;
  const sh = Math.round((img.naturalHeight / img.naturalWidth) * sw);
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.drawImage(img, 0, 0, sw, sh);
  const data = ctx.getImageData(0, 0, sw, sh).data;

  const pixels: Mark["pixels"] = [];
  const runMin: number[] = [];
  const runMax: number[] = [];
  for (let y = 0; y < sh; y++) {
    let best = [0, -1];
    let runStart = -1;
    let gap = 0;
    for (let x = 0; x <= sw; x++) {
      const i = (y * sw + x) * 4;
      const blue = x < sw && data[i + 2] > 110 && data[i + 2] - data[i] > 60;
      if (blue) {
        pixels.push({ x, y, r: data[i] / 255, g: data[i + 1] / 255, b: data[i + 2] / 255 });
        if (runStart < 0) runStart = x;
        gap = 0;
      } else if (runStart >= 0 && (++gap > 3 || x === sw)) {
        const end = x - gap;
        if (end - runStart > best[1] - best[0]) best = [runStart, end];
        runStart = -1;
        gap = 0;
      }
    }
    runMin.push(best[0]);
    runMax.push(best[1]);
  }
  if (pixels.length === 0) throw new Error("mark has no blue pixels");
  return { pixels, runMin, runMax, sw, sh };
}

function buildCloud(mark: Mark, count: number) {
  const { pixels, runMin, runMax, sw, sh } = mark;
  const scale = HEAD_H / sh;
  const target = new Float32Array(count * 3);
  const start = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const size = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const px = pixels[(Math.random() * pixels.length) | 0];
    const x = px.x + Math.random();
    const y = px.y + Math.random();

    const half = (runMax[px.y] - runMin[px.y]) / 2 + 1;
    const u = (x - (runMax[px.y] + runMin[px.y]) / 2) / half;
    const inHead = Math.abs(u) <= 1.05;
    const depth = inHead ? Math.sqrt(Math.max(0, 1 - u * u)) * half * scale * 0.55 : 0.06;
    const z =
      Math.random() < 0.7
        ? (Math.random() < 0.5 ? -1 : 1) * depth * (0.8 + Math.random() * 0.2)
        : (Math.random() * 2 - 1) * depth;
    target.set([(x - sw / 2) * scale, (sh / 2 - y) * scale, z], i * 3);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 4 + Math.random() * 3;
    start.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi) - 2], i * 3);

    color.set([px.r, px.g, px.b].map((c, k) => (c * 0.7 + MIST[k] * 0.3) * 1.1), i * 3);
    seed[i] = Math.random();
    size[i] = Math.random() ** 3;
  }
  return { target, start, color, seed, size, width: sw * scale };
}

// A sparse subset of the cloud linked to its nearest neighbours: the "connections" signals travel on.
function buildEdges(target: Float32Array, count: number) {
  const total = target.length / 3;
  const nodes = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const j = (Math.random() * total) | 0;
    nodes.set(target.subarray(j * 3, j * 3 + 3), i * 3);
  }
  const dist = (a: number, b: number) =>
    Math.hypot(nodes[a * 3] - nodes[b * 3], nodes[a * 3 + 1] - nodes[b * 3 + 1], nodes[a * 3 + 2] - nodes[b * 3 + 2]);

  const edges: [number, number][] = [];
  const adjacency: number[][] = Array.from({ length: count }, () => []);
  const seen = new Set<number>();
  for (let a = 0; a < count; a++) {
    const near: { b: number; d: number }[] = [];
    for (let b = 0; b < count; b++) {
      if (b === a) continue;
      const d = dist(a, b);
      if (d < 0.42) near.push({ b, d });
    }
    near.sort((p, q) => p.d - q.d);
    for (const { b } of near.slice(0, 3)) {
      const key = Math.min(a, b) * count + Math.max(a, b);
      if (seen.has(key)) continue;
      seen.add(key);
      adjacency[a].push(edges.length);
      adjacency[b].push(edges.length);
      edges.push([a, b]);
    }
  }
  return { nodes, edges, adjacency, dist };
}

function glowTexture(THREE: Three) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function mount(THREE: Three, host: HTMLDivElement, mark: Mark, onReady: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = host.clientWidth < 520;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "absolute inset-0 h-full w-full";
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
  const group = new THREE.Group();
  scene.add(group);

  // Point cloud
  const cloud = buildCloud(mark, small ? 2400 : 5200);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(cloud.target, 3));
  geo.setAttribute("aStart", new THREE.BufferAttribute(cloud.start, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(cloud.color, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(cloud.seed, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(cloud.size, 1));
  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: reduced ? 1 : 0 },
    uScatter: { value: 0 },
    uSize: { value: 26 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uAspect: { value: 1 },
    uPointer: { value: new THREE.Vector2(9, 9) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);

  // Connections
  const { nodes, edges, adjacency, dist } = buildEdges(cloud.target, small ? 260 : 520);
  const linePos = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    linePos.set(nodes.subarray(a * 3, a * 3 + 3), i * 6);
    linePos.set(nodes.subarray(b * 3, b * 3 + 3), i * 6 + 3);
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x98cded,
    transparent: true,
    opacity: reduced ? 0.16 : 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  // Signals travelling along the connections; every fifth one is brand gold
  const pulseCount = edges.length ? (small ? 14 : 28) : 0;
  const pulsePos = new Float32Array(pulseCount * 3);
  const pulseCol = new Float32Array(pulseCount * 3);
  const randomEdge = () => (Math.random() * edges.length) | 0;
  const pulses = Array.from({ length: pulseCount }, (_, i) => {
    pulseCol.set(i % 5 === 0 ? [0.95, 0.71, 0.23] : [0.85, 0.94, 1], i * 3);
    return { edge: randomEdge(), forward: Math.random() < 0.5, t: Math.random(), speed: 0.5 + Math.random() * 0.7 };
  });
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseCol, 3));
  const pulseTex = glowTexture(THREE);
  const pulseMat = new THREE.PointsMaterial({
    size: 0.12,
    map: pulseTex,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
  pulsePoints.frustumCulled = false;
  group.add(pulsePoints);

  const stepPulses = (dt: number) => {
    pulses.forEach((p, i) => {
      let [a, b] = edges[p.edge];
      let from = p.forward ? a : b;
      let to = p.forward ? b : a;
      p.t += (dt * p.speed) / Math.max(dist(from, to), 0.05);
      if (p.t >= 1) {
        const options = adjacency[to].filter((e) => e !== p.edge);
        p.edge = options.length ? options[(Math.random() * options.length) | 0] : randomEdge();
        [a, b] = edges[p.edge];
        p.forward = options.length ? a === to : Math.random() < 0.5;
        from = p.forward ? a : b;
        to = p.forward ? b : a;
        p.t = 0;
      }
      for (let k = 0; k < 3; k++) pulsePos[i * 3 + k] = nodes[from * 3 + k] + (nodes[to * 3 + k] - nodes[from * 3 + k]) * p.t;
    });
    pulseGeo.attributes.position.needsUpdate = true;
  };

  // Input: cursor anywhere over the hero section; scroll progress past the scene itself
  const section = host.closest("section") ?? host;
  const pointer = { x: 0, y: 0, active: false };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    pointer.active = true;
  };
  const onLeave = () => {
    pointer.active = false;
  };
  const scrollProgress = () => {
    const r = host.getBoundingClientRect();
    return clamp(-r.top / r.height);
  };

  const render = () => renderer.render(scene, camera);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the whole head in frame whether the box is wide or narrow
    const tan = Math.tan(((FOV / 2) * Math.PI) / 180);
    camera.position.z = Math.max((HEAD_H / 2 + 0.35) / tan, (cloud.width / 2 + 0.35) / (tan * camera.aspect));
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = camera.aspect;
    if (reduced) render();
  };

  let raf = 0;
  let visible = true;
  // Scene time only advances while on screen, so the assembly plays when it is first seen
  let t = 0;
  let last = performance.now();
  const rot = { x: 0, y: 0 };

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    const progress = clamp(t / ASSEMBLE_SECONDS);
    const scatter = scrollProgress();
    const linesIn = smooth(clamp((progress - 0.7) / 0.3)) * (1 - clamp(scatter * 1.6));
    uniforms.uTime.value = t;
    uniforms.uProgress.value = progress;
    uniforms.uScatter.value = scatter;
    uniforms.uPointer.value.set(pointer.active ? pointer.x : 9, pointer.active ? pointer.y : 9);
    lineMat.opacity = 0.16 * linesIn;
    pulseMat.opacity = linesIn;

    const tx = pointer.active ? clamp(pointer.x, -1, 1) : 0;
    const ty = pointer.active ? clamp(pointer.y, -1, 1) : 0;
    rot.y += (tx * 0.4 + Math.sin(t * 0.25) * 0.12 - rot.y) * 0.04;
    rot.x += (-ty * 0.15 + Math.sin(t * 0.18) * 0.04 - rot.x) * 0.04;
    group.rotation.set(rot.x, rot.y, 0);

    if (pulseCount) stepPulses(dt);
    render();
    if (visible) raf = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !raf && !reduced) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
  const ro = new ResizeObserver(resize);

  resize();
  render();
  onReady();
  ro.observe(host);
  if (!reduced) {
    io.observe(host);
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", onLeave);
  }

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    section.removeEventListener("pointermove", onMove as EventListener);
    section.removeEventListener("pointerleave", onLeave);
    geo.dispose();
    mat.dispose();
    lineGeo.dispose();
    lineMat.dispose();
    pulseGeo.dispose();
    pulseMat.dispose();
    pulseTex.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

export function MindScene({ className, fallback }: { className?: string; fallback?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const [THREE, mark] = await Promise.all([import("three"), sampleMark()]);
        if (disposed) return;
        cleanup = mount(THREE, host, mark, () => setState("ready"));
      } catch {
        if (!disposed) setState("failed");
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      {state === "failed" && fallback}
      <div
        ref={ref}
        aria-hidden
        className={cn("absolute inset-0 transition-opacity duration-1000", state === "ready" ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
