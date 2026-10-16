import { useEffect, useRef } from "react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Plane } from "lucide-react";
import worldData from "world-atlas/countries-110m.json";

type Port = { name: string; lon: number; lat: number };

const HUB: Port = { name: "Dubai", lon: 55.27, lat: 25.2 };
const PORTS: Port[] = [
  { name: "Rotterdam", lon: 4.4, lat: 51.9 },
  { name: "Piraeus", lon: 23.6, lat: 37.9 },
  { name: "Jeddah", lon: 39.2, lat: 21.5 },
  { name: "Mombasa", lon: 39.7, lat: -4.05 },
  { name: "Karachi", lon: 67.0, lat: 24.8 },
  { name: "Mumbai", lon: 72.9, lat: 19.1 },
  { name: "Singapore", lon: 103.8, lat: 1.3 },
  { name: "Shanghai", lon: 121.5, lat: 31.2 },
];

const DOT_GAP = 7;
const DOT_COLOR = "rgba(147, 197, 253, 0.28)";
const ARC_COLOR = "rgba(96, 165, 250, 0.35)";
const GLOW_COLOR = "rgba(186, 230, 253, 1)";

type Pt = { x: number; y: number };
type Arc = { from: Pt; ctrl: Pt; to: Pt; speed: number; offset: number };

const bezier = (a: Arc, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * a.from.x + 2 * u * t * a.ctrl.x + t * t * a.to.x,
    y: u * u * a.from.y + 2 * u * t * a.ctrl.y + t * t * a.to.y,
  };
};

function RouteMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const topology = worldData as unknown as Topology;
    const land = feature(topology, topology.objects["countries"]!);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let base: HTMLCanvasElement | null = null;
    let hub: Pt = { x: 0, y: 0 };
    let ports: Pt[] = [];
    let arcs: Arc[] = [];
    let raf = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Map is at least 900px wide so it stays legible on phones, centred near the Gulf.
      // Push the hub to the right on wide screens so routes stay clear of the headline text.
      const hubX = width >= 1024 ? 0.74 : width >= 640 ? 0.62 : 0.5;
      const mapWidth = Math.max(width * 1.0, 900);
      const projection = geoEquirectangular()
        .scale(mapWidth / (2 * Math.PI))
        .center([48, 18])
        .translate([width * hubX, height * 0.52]);

      // Rasterise land, then sample it on a grid to get a dotted map.
      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const mctx = mask.getContext("2d", { willReadFrequently: true })!;
      mctx.fillStyle = "#000";
      mctx.beginPath();
      geoPath(projection, mctx)(land);
      mctx.fill();
      const pixels = mctx.getImageData(0, 0, width, height).data;
      const alphaAt = (x: number, y: number) => pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] ?? 0;

      base = document.createElement("canvas");
      base.width = width;
      base.height = height;
      const bctx = base.getContext("2d")!;
      bctx.fillStyle = DOT_COLOR;
      for (let y = DOT_GAP / 2; y < height; y += DOT_GAP) {
        for (let x = DOT_GAP / 2; x < width; x += DOT_GAP) {
          if (alphaAt(x, y) > 128) {
            bctx.beginPath();
            bctx.arc(x, y, 1.1, 0, Math.PI * 2);
            bctx.fill();
          }
        }
      }

      const toPt = (p: Port): Pt => {
        const [x, y] = projection([p.lon, p.lat]) ?? [0, 0];
        return { x, y };
      };
      hub = toPt(HUB);
      ports = PORTS.map(toPt);
      arcs = ports.map((to, i) => {
        const dx = to.x - hub.x;
        const dy = to.y - hub.y;
        const dist = Math.hypot(dx, dy) || 1;
        // Bow every arc upwards, proportional to its length.
        const lift = dist * 0.28;
        const nx = dy / dist;
        const ny = -dx / dist;
        const dir = ny <= 0 ? 1 : -1;
        return {
          from: hub,
          to,
          ctrl: { x: (hub.x + to.x) / 2 + nx * lift * dir, y: (hub.y + to.y) / 2 + ny * lift * dir },
          speed: 0.055 + (i % 3) * 0.012,
          offset: i / PORTS.length,
        };
      });
    };

    const pulse = (p: Pt, time: number, phase: number, strong: boolean) => {
      const t = (time * 0.0004 + phase) % 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 + t * (strong ? 16 : 11), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(147, 197, 253, ${(1 - t) * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, strong ? 3.5 : 2.4, 0, Math.PI * 2);
      ctx.fillStyle = GLOW_COLOR;
      ctx.fill();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (base) ctx.drawImage(base, 0, 0, width, height);

      for (const a of arcs) {
        ctx.beginPath();
        ctx.moveTo(a.from.x, a.from.y);
        ctx.quadraticCurveTo(a.ctrl.x, a.ctrl.y, a.to.x, a.to.y);
        ctx.strokeStyle = ARC_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.save();
      ctx.shadowColor = GLOW_COLOR;
      ctx.shadowBlur = 10;
      for (const a of arcs) {
        const head = reduceMotion ? 0.6 : (time * 0.001 * a.speed + a.offset) % 1;
        // Fading trail behind the moving dot.
        for (let i = 0; i < 14; i++) {
          const t = head - i * 0.012;
          if (t < 0) break;
          const p = bezier(a, t);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, 2.2 - i * 0.15), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${1 - i / 14})`;
          ctx.fill();
        }
      }
      ctx.restore();

      ports.forEach((p, i) => pulse(p, time, i / ports.length, false));
      pulse(hub, time, 0, true);
    };

    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduceMotion) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    start();
    const observer = new ResizeObserver(start);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

/** Side-on container ship, bow pointing right. */
function ContainerShip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="currentColor" style={{ transformOrigin: "50% 85%" }}>
      {/* hull */}
      <path d="M2 30 H116 L102 46 H16 Z" />
      {/* bridge */}
      <rect x="10" y="12" width="14" height="18" opacity="0.9" />
      <rect x="13" y="6" width="8" height="6" opacity="0.9" />
      {/* container stacks */}
      <g opacity="0.75">
        {[30, 45, 60, 75, 90].map((x) => (
          <g key={x}>
            <rect x={x} y="22" width="13" height="8" />
            <rect x={x} y="14" width="13" height="7" opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Decorative animated backdrop for the hero: route map, drifting plane/ship, clouds and waves. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <RouteMap />

      <div className="hero-cloud left-[8%] top-[14%] h-16 w-72 [animation-duration:110s]" />
      <div className="hero-cloud left-[55%] top-[30%] h-12 w-56 [animation-delay:-40s] [animation-duration:140s]" />
      <div className="hero-cloud left-[25%] top-[62%] h-14 w-64 [animation-delay:-80s] [animation-duration:125s]" />

      <Plane className="hero-plane absolute left-0 top-1 h-7 w-7 text-sky-200/70" strokeWidth={1.5} />
      <div className="hero-ship absolute bottom-[1.15rem] left-0 sm:bottom-[1.9rem]">
        <ContainerShip className="hero-ship-bob h-8 w-20 text-sky-200/70 sm:h-10 sm:w-24" />
      </div>

      <svg className="absolute bottom-0 left-0 h-14 w-[200%] text-sky-300/10 hero-wave sm:h-20" viewBox="0 0 1600 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 40 Q100 0 200 40 T400 40 T600 40 T800 40 T1000 40 T1200 40 T1400 40 T1600 40 V80 H0 Z" />
      </svg>
      <svg className="absolute bottom-0 left-0 h-10 w-[200%] text-sky-300/10 hero-wave-slow sm:h-14" viewBox="0 0 1600 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 40 Q100 80 200 40 T400 40 T600 40 T800 40 T1000 40 T1200 40 T1400 40 T1600 40 V80 H0 Z" />
      </svg>
    </div>
  );
}
