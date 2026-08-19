import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/scroll';

export type Weather = 'clear' | 'rain' | 'fog';

export type SceneConfig = {
  kind: 'road' | 'robot';
  weather?: Weather;
  night?: boolean;
  traffic?: number;
  pedestrian?: boolean;
  obstacle?: boolean;
  speed?: number;
  labels?: boolean;
  overlay?: number;
};

type Props = SceneConfig & {className?: string;ariaLabel: string;};

const rand = (seed: number) => {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * Canvas-projected simulation environment. A lightweight perspective renderer
 * (no WebGL dependency) that draws a driveable world or a robot cell with
 * sensor fields, planned paths and generated scene furniture.
 */
export function SimulationScene({ className = '', ariaLabel, ...config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = useRef<SceneConfig>(config);
  cfg.current = config;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let raf = 0;
    let travel = 0;
    let t = 0;
    let visible = true;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '120px' }
    );
    io.observe(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!visible) {
        raf = window.requestAnimationFrame(draw);
        return;
      }
      const c = cfg.current;
      const night = !!c.night;
      const weather = c.weather ?? 'clear';
      const f = h * 0.95;
      const horizon = h * 0.42;
      const camY = c.kind === 'robot' ? 4.4 : 2.6;
      const cx = w / 2;

      const project = (x: number, y: number, d: number): [number, number] | null => {
        if (d < 0.6) return null;
        return [cx + x * f / d, horizon + (camY - y) * f / d];
      };
      const seg = (
      a: [number, number, number],
      b: [number, number, number],
      style: string,
      lw = 1) =>
      {
        const p1 = project(a[0], a[1], a[2]);
        const p2 = project(b[0], b[1], b[2]);
        if (!p1 || !p2) return;
        ctx.strokeStyle = style;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      };
      const box = (x: number, y: number, d: number, sx: number, sy: number, sz: number, style: string, lw = 1) => {
        const x0 = x - sx / 2;
        const x1 = x + sx / 2;
        const y0 = y;
        const y1 = y + sy;
        const d0 = d - sz / 2;
        const d1 = d + sz / 2;
        const edges: [number, number, number][][] = [
        [[x0, y0, d0], [x1, y0, d0]],
        [[x1, y0, d0], [x1, y0, d1]],
        [[x1, y0, d1], [x0, y0, d1]],
        [[x0, y0, d1], [x0, y0, d0]],
        [[x0, y1, d0], [x1, y1, d0]],
        [[x1, y1, d0], [x1, y1, d1]],
        [[x1, y1, d1], [x0, y1, d1]],
        [[x0, y1, d1], [x0, y1, d0]],
        [[x0, y0, d0], [x0, y1, d0]],
        [[x1, y0, d0], [x1, y1, d0]],
        [[x1, y0, d1], [x1, y1, d1]],
        [[x0, y0, d1], [x0, y1, d1]]];

        edges.forEach(([a, b]) => seg(a, b, style, lw));
      };
      const label = (text: string, x: number, y: number, d: number) => {
        const p = project(x, y, d);
        if (!p) return;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(127,245,232,0.85)';
        ctx.fillText(text, p[0] + 8, p[1]);
        ctx.strokeStyle = 'rgba(46,230,214,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p[0], p[1] - 3, 2.5, 0, Math.PI * 2);
        ctx.stroke();
      };

      ctx.clearRect(0, 0, w, h);

      // Sky / atmosphere
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      if (night) {
        sky.addColorStop(0, '#03080b');
        sky.addColorStop(0.42, '#062026');
        sky.addColorStop(1, '#020607');
      } else {
        sky.addColorStop(0, '#04141a');
        sky.addColorStop(0.42, '#0b3b41');
        sky.addColorStop(1, '#030b0d');
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Horizon glow
      const glow = ctx.createRadialGradient(cx, horizon, 0, cx, horizon, w * 0.6);
      glow.addColorStop(0, night ? 'rgba(46,230,214,0.20)' : 'rgba(46,230,214,0.28)');
      glow.addColorStop(1, 'rgba(46,230,214,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const fogFactor = weather === 'fog' ? 0.55 : weather === 'rain' ? 0.25 : 0;
      const far = weather === 'fog' ? 45 : 110;
      const lineAlpha = (d: number, base: number) =>
      `rgba(46,230,214,${Math.max(0, base * (1 - d / far)).toFixed(3)})`;

      // Ground grid
      const spacing = 4;
      const offset = travel % spacing;
      for (let i = 0; i < 34; i++) {
        const d = i * spacing - offset + 1.2;
        if (d > far) break;
        seg([-40, 0, d], [40, 0, d], lineAlpha(d, 0.5), d < 12 ? 1.1 : 0.6);
      }
      for (let x = -24; x <= 24; x += 4) {
        seg([x, 0, 1.2], [x, 0, far], `rgba(46,230,214,${x === 0 ? 0.12 : 0.07})`, 1);
      }

      if (c.kind === 'road') {
        // Road surface edges
        seg([-5.6, 0.01, 1.2], [-5.6, 0.01, far], 'rgba(127,245,232,0.55)', 1.6);
        seg([5.6, 0.01, 1.2], [5.6, 0.01, far], 'rgba(127,245,232,0.55)', 1.6);
        seg([-1.9, 0.01, 1.2], [-1.9, 0.01, far], 'rgba(46,230,214,0.18)', 1);
        seg([1.9, 0.01, 1.2], [1.9, 0.01, far], 'rgba(46,230,214,0.18)', 1);
        // Dashes
        for (let i = 0; i < 26; i++) {
          const d = i * 6 - travel % 6 + 1.2;
          if (d > far) break;
          seg([0, 0.02, d], [0, 0.02, d + 2.6], lineAlpha(d, 0.8), 2);
        }

        // Buildings / terrain blocks
        for (let i = 0; i < 22; i++) {
          const period = 9;
          const d = i * period - travel % period + 4;
          if (d > far || d < 1) continue;
          const side = i % 2 === 0 ? -1 : 1;
          const r = rand(i * 3.3);
          const bw = 3 + r * 4;
          const bh = 4 + rand(i * 7.7) * 18;
          const bx = side * (9 + rand(i * 5.1) * 9);
          box(bx, 0, d, bw, bh, bw, lineAlpha(d, 0.34), 1);
          if (night && r > 0.45) {
            const p = project(bx, bh * 0.6, d);
            if (p) {
              ctx.fillStyle = 'rgba(46,230,214,0.5)';
              ctx.fillRect(p[0] - 1, p[1] - 1, 2, 2);
            }
          }
        }

        // Traffic agents
        const traffic = c.traffic ?? 1;
        for (let i = 0; i < traffic * 4; i++) {
          const period = 14;
          const d = i * 5.5 % (period * 3) + 8 - travel * 0.55 % (period * 3);
          if (d < 2 || d > far) continue;
          const lane = rand(i * 2.9) > 0.5 ? 3.6 : -3.6;
          box(lane, 0, d, 2, 1.3, 4.2, lineAlpha(d, 0.55), 1);
          const p = project(lane, 0.6, d - 2.2);
          if (p) {
            ctx.fillStyle = 'rgba(255,140,120,0.5)';
            ctx.fillRect(p[0] - 3, p[1], 6, 1.4);
          }
        }

        // Obstacle
        if (c.obstacle) {
          const d = 22 - travel * 0.4 % 30;
          const dd = d < 4 ? d + 30 : d;
          box(2.6, 0, dd, 1.2, 1.2, 1.2, 'rgba(255,176,84,0.75)', 1.2);
          if (c.labels !== false) label('ROAD OBSTACLE', 2.6, 1.6, dd);
        }

        // Pedestrian crossing
        if (c.pedestrian) {
          const px = -6 + t * 0.0009 % 1 * 12;
          box(px, 0, 17, 0.5, 1.8, 0.5, 'rgba(255,214,102,0.85)', 1.2);
          if (c.labels !== false) label('PEDESTRIAN INTENT', px, 2.2, 17);
        }

        // Ego vehicle
        const ego: [number, number] = [0, 8.5];
        box(ego[0], 0, ego[1], 2.3, 0.85, 4.8, 'rgba(190,255,248,0.95)', 1.4);
        box(ego[0], 0.85, ego[1] + 0.2, 1.9, 0.7, 2.6, 'rgba(127,245,232,0.7)', 1.1);

        // Sensor fan
        const rays = 22;
        for (let i = 0; i <= rays; i++) {
          const a = (-0.62 + 1.24 * i / rays) * Math.PI * 0.5;
          const reach = (weather === 'fog' ? 16 : weather === 'rain' ? 24 : 34) * (0.75 + 0.25 * Math.cos(a));
          const ex = Math.sin(a) * reach;
          const ez = ego[1] + Math.cos(a) * reach;
          const pulse = 0.1 + 0.12 * Math.abs(Math.sin(t * 0.002 + i * 0.4));
          seg([ego[0], 0.9, ego[1] + 1.4], [ex, 0.15, ez], `rgba(46,230,214,${pulse.toFixed(3)})`, 1);
        }
        // Detection arc
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const a = (-0.62 + 1.24 * i / 40) * Math.PI * 0.5;
          const reach = weather === 'fog' ? 16 : weather === 'rain' ? 24 : 34;
          const p = project(Math.sin(a) * reach, 0.05, ego[1] + Math.cos(a) * reach);
          if (!p) continue;
          if (i === 0) ctx.moveTo(p[0], p[1]);else
          ctx.lineTo(p[0], p[1]);
        }
        ctx.strokeStyle = 'rgba(46,230,214,0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (c.labels !== false) {
          label('LIDAR 128CH', 0, 2.4, 8.5);
          label('PLANNED PATH', 0, 0.4, 26);
          label(weather === 'clear' ? 'VISIBILITY 100%' : weather === 'rain' ? 'VISIBILITY 62%' : 'VISIBILITY 31%', -5.6, 1.2, 13);
        }
      } else {
        // Robot cell
        const rx = Math.sin(t * 0.0006) * 3.2;
        const rd = 11 + Math.cos(t * 0.0006) * 2.4;

        // Planned path
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const s = i / 48;
          const px = -6 + s * 12;
          const pd = 8 + Math.sin(s * Math.PI * 1.6) * 5 + s * 6;
          const p = project(px, 0.03, pd);
          if (!p) continue;
          if (i === 0) ctx.moveTo(p[0], p[1]);else
          ctx.lineTo(p[0], p[1]);
        }
        ctx.strokeStyle = 'rgba(127,245,232,0.55)';
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.setLineDash([]);

        // Obstacles in cell
        for (let i = 0; i < 6; i++) {
          const ox = -9 + rand(i * 4.1) * 18;
          const od = 6 + rand(i * 8.3) * 16;
          box(ox, 0, od, 1.6, 1.4 + rand(i) * 2, 1.6, 'rgba(46,230,214,0.3)', 1);
        }

        // Collision boundary
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const a = i / 48 * Math.PI * 2;
          const p = project(rx + Math.cos(a) * 2.6, 0.02, rd + Math.sin(a) * 2.6);
          if (!p) continue;
          if (i === 0) ctx.moveTo(p[0], p[1]);else
          ctx.lineTo(p[0], p[1]);
        }
        ctx.strokeStyle = 'rgba(255,176,84,0.5)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Sensor sweep
        const sweep = t * 0.0016 % (Math.PI * 2);
        for (let k = 0; k < 26; k++) {
          const a = sweep - k * 0.045;
          seg(
            [rx, 1.6, rd],
            [rx + Math.cos(a) * 9, 0.2, rd + Math.sin(a) * 9],
            `rgba(46,230,214,${(0.3 - k * 0.011).toFixed(3)})`,
            1
          );
        }

        // Robot body
        box(rx, 0, rd, 1.6, 0.9, 2.1, 'rgba(190,255,248,0.95)', 1.4);
        box(rx, 0.9, rd - 0.2, 1.1, 1.5, 1.1, 'rgba(127,245,232,0.8)', 1.2);
        box(rx, 2.4, rd - 0.2, 0.7, 0.35, 0.7, 'rgba(46,230,214,0.9)', 1.2);

        if (c.labels !== false) {
          label('LIDAR', rx, 3.1, rd);
          label('DEPTH SENSOR', rx + 1.2, 2.0, rd - 1);
          label('PATH PLANNING', 4.6, 0.4, 17);
          label('COLLISION ZONE', rx - 2.8, 0.3, rd + 2.4);
          label('OBJECT RECOGNITION', -8.4, 2.6, 12);
        }
      }

      // Weather overlays
      if (weather === 'rain') {
        ctx.strokeStyle = 'rgba(160,220,235,0.28)';
        ctx.lineWidth = 1;
        const drops = w < 700 ? 60 : 130;
        for (let i = 0; i < drops; i++) {
          const x = (rand(i) * w + t * 0.12) % w;
          const y = (rand(i * 2.2) * h + t * 0.9 * (0.6 + rand(i * 3.1))) % h;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 3, y + 14);
          ctx.stroke();
        }
      }
      if (fogFactor > 0) {
        const fog = ctx.createLinearGradient(0, horizon - h * 0.2, 0, h);
        fog.addColorStop(0, `rgba(140,180,185,${fogFactor * 0.5})`);
        fog.addColorStop(1, 'rgba(10,25,28,0)');
        ctx.fillStyle = fog;
        ctx.fillRect(0, 0, w, h);
      }

      // Data overlay grid
      const ov = c.overlay ?? 0;
      if (ov > 0.01) {
        ctx.strokeStyle = `rgba(46,230,214,${(0.13 * ov).toFixed(3)})`;
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 44) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 44) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // Vignette
      const vig = ctx.createRadialGradient(cx, h * 0.5, h * 0.15, cx, h * 0.5, h * 0.95);
      vig.addColorStop(0, 'rgba(3,8,9,0)');
      vig.addColorStop(1, 'rgba(3,8,9,0.85)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) {
        t += 16;
        travel += (cfg.current.speed ?? 0.14) * 1.4;
      }
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const decorative = ariaLabel.trim().length === 0;

  return (
    <canvas
      ref={canvasRef}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      className={`block h-full w-full ${className}`} />);


}