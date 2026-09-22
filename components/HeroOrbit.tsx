"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

type Three = typeof import("three");

// Software tiles riding the rings, one or two per course track. `ring` + `angle` place a tile on the
// 3D orbit; `top`/`left` are its spot in the flat CSS fallback shown before WebGL starts (or without it).
const orbitIcons = [
  { label: "Ps", title: "Photoshop", bg: "#001e36", fg: "#31a8ff", ring: 0, angle: 2.4, top: "14%", left: "24%" },
  { label: "Tally", title: "Tally Prime", bg: "#fff", fg: "#1f4fd8", ring: 1, angle: 0.9, top: "4%", left: "70%" },
  { label: "CAD", title: "AutoCAD", bg: "#fff", fg: "#c8102e", ring: 0, angle: 5.6, top: "32%", left: "90%" },
  { label: "Ai", title: "Illustrator", bg: "#330000", fg: "#ff9a00", ring: 1, angle: 4.0, top: "56%", left: "8%" },
  { label: "Ads", title: "Google Ads", bg: "#ffcc00", fg: "#0a1a5c", ring: 2, angle: 1.6, top: "72%", left: "84%" },
  { label: "Xl", title: "MS Excel", bg: "#1d6f42", fg: "#fff", ring: 2, angle: 4.7, top: "86%", left: "44%" },
];

const R = 3; // ring radius (world units)
const RING_TILT = 1.1; // how far each ring leans back from the screen, in radians
const CAMERA_Z = 11;
const ICON_SPEED = 0.16; // radians per second along a ring
const ELECTRON_SPEED = 0.9;
// Screen-plane angle of each ring (matching the old flat layout) and how fast it precesses.
const RINGS = [
  { tilt: -0.49, spin: 0.1 },
  { tilt: 0.49, spin: -0.08 },
  { tilt: Math.PI / 2, spin: 0.06 },
];

export default function HeroOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cleanup = () => {};
    let cancelled = false;

    // three.js is loaded lazily so it stays out of the page's initial bundle.
    import("three").then((THREE) => {
      if (!cancelled) cleanup = startScene(THREE, stage);
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className="orbit-stage" ref={stageRef} aria-hidden="true">
      <span className="orbit orbit-1" />
      <span className="orbit orbit-2" />
      <span className="orbit orbit-3" />
      <div className="orbit-logo">
        <Image src="/techcadd-logo.webp" alt={site.fullName} width={952} height={262} priority />
      </div>
      {orbitIcons.map((icon, i) => (
        <span
          key={icon.label}
          className="orbit-icon"
          title={icon.title}
          style={{ top: icon.top, left: icon.left, background: icon.bg, color: icon.fg, animationDelay: `${i * -0.7}s` }}
        >
          {icon.label}
        </span>
      ))}
    </div>
  );
}

function startScene(THREE: Three, stage: HTMLDivElement) {
  let renderer: InstanceType<Three["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return () => {}; // no WebGL: keep the flat CSS orbit
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = "orbit-canvas";
  stage.prepend(renderer.domElement);
  stage.classList.add("is-3d");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.z = CAMERA_Z;
  const atom = new THREE.Group();
  scene.add(atom);

  const ringGeo = new THREE.TorusGeometry(R, 0.012, 8, 240);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  const glowTex = glowTexture(THREE);
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    color: 0x7dd3fc,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  // pivot = the ring's angle on screen; ring = the lean back into the scene. A ring's local XY plane is its orbit.
  const rings = RINGS.map((cfg) => {
    const pivot = new THREE.Group();
    const ring = new THREE.Group();
    const electron = new THREE.Sprite(glowMat);
    electron.scale.setScalar(0.5);
    ring.add(new THREE.Mesh(ringGeo, ringMat), electron);
    pivot.add(ring);
    atom.add(pivot);
    return { cfg, pivot, ring, electron };
  });

  const iconEls = [...stage.querySelectorAll<HTMLElement>(".orbit-icon")];
  const size = { width: 1, height: 1 };
  const point = new THREE.Vector3();
  const pointer = { x: 0, y: 0 };
  const look = { x: 0, y: 0 };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = 0;
  let last = performance.now();

  function frame() {
    const now = performance.now();
    t += Math.min((now - last) / 1000, 0.05);
    last = now;

    // Slow tumble plus a gentle lean towards the mouse.
    look.x += (pointer.x - look.x) * 0.05;
    look.y += (pointer.y - look.y) * 0.05;
    atom.rotation.y = Math.sin(t * 0.3) * 0.35 + look.x * 0.4;
    atom.rotation.x = Math.sin(t * 0.23) * 0.12 + look.y * 0.3;

    rings.forEach((r, i) => {
      r.pivot.rotation.z = r.cfg.tilt + t * r.cfg.spin;
      r.ring.rotation.x = RING_TILT + Math.sin(t * 0.5 + i * 2) * 0.1;
      const a = t * ELECTRON_SPEED + i * 2.1;
      r.electron.position.set(R * Math.cos(a), R * Math.sin(a), 0);
    });
    scene.updateMatrixWorld();

    // Tiles are HTML (crisp text), placed by projecting their 3D spot on the ring to the screen.
    // Tiles on the near half of a ring pass in front of the logo, the far half behind it.
    iconEls.forEach((el, k) => {
      const icon = orbitIcons[k];
      const a = icon.angle + t * ICON_SPEED;
      point.set(R * Math.cos(a), R * Math.sin(a), 0).applyMatrix4(rings[icon.ring].ring.matrixWorld);
      const depth = point.z;
      const near = (depth + R) / (2 * R); // 0 = far side of the ring, 1 = nearest point
      point.project(camera);
      const x = ((point.x + 1) / 2) * size.width;
      const y = ((1 - point.y) / 2) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(0.8 + near * 0.3).toFixed(3)})`;
      el.style.zIndex = depth > 0 ? "3" : "1";
      el.style.opacity = (0.55 + near * 0.45).toFixed(2);
    });

    renderer.render(scene, camera);
  }

  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    size.width = width;
    size.height = height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (reduceMotion) frame();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  // Only animate while the hero is on screen; with reduced motion, draw a single still frame.
  let raf = 0;
  let visible = false;
  const loop = () => {
    frame();
    if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) {
      last = performance.now();
      loop();
    }
  });
  io.observe(stage);

  const onPointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    ringGeo.dispose();
    ringMat.dispose();
    glowMat.dispose();
    glowTex.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    stage.classList.remove("is-3d");
    iconEls.forEach((el) => {
      el.style.transform = el.style.zIndex = el.style.opacity = "";
    });
  };
}

// Soft round glow used for the "electrons" travelling along each ring.
function glowTexture(THREE: Three) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}
