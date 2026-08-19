import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/scroll';

type Particle = {x: number;y: number;z: number;vx: number;vy: number;};
type Pulse = {line: number;t: number;speed: number;};

/**
 * Persistent simulation field rendered behind the entire site: terrain
 * contours, coordinate rays, drifting particles and data pulses that bend
 * with scroll and react to pointer proximity.
 */
export function BackgroundField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let time = 0;

    const pointer = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    const LINES = 13;
    const pulses: Pulse[] = Array.from({ length: 5 }, (_, i) => ({
      line: i * 3 % LINES,
      t: Math.random(),
      speed: 0.0011 + Math.random() * 0.0016
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 700 ? 26 : width < 1200 ? 52 : 86;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.14
      }));
    };

    /** y of contour line `i` at horizontal position `px`. */
    const contourY = (i: number, px: number, scroll: number) => {
      const base = (i + 0.5) / LINES * (height * 1.35) - height * 0.16;
      const drift = scroll * (0.06 + i * 0.012) % (height * 1.35);
      const amp = 16 + i % 4 * 13;
      const wave =
      Math.sin(px * 0.0032 + i * 0.9 + time * 0.00035 + scroll * 0.0016) * amp +
      Math.sin(px * 0.0011 - i * 0.5 + time * 0.00022) * amp * 0.5;
      let y = base - drift + wave;
      const span = height * 1.35;
      while (y < -80) y += span;
      while (y > height + 80) y -= span;
      return y;
    };

    const draw = () => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      // Vertical coordinate rays
      ctx.lineWidth = 1;
      const cols = width < 700 ? 6 : 12;
      for (let c = 0; c <= cols; c++) {
        const x = c / cols * width;
        const g = ctx.createLinearGradient(x, 0, x, height);
        g.addColorStop(0, 'rgba(46,230,214,0)');
        g.addColorStop(0.5, `rgba(46,230,214,${0.05 + 0.03 * Math.sin(c + time * 0.0006)})`);
        g.addColorStop(1, 'rgba(46,230,214,0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Terrain contours
      const step = width < 700 ? 34 : 22;
      for (let i = 0; i < LINES; i++) {
        ctx.beginPath();
        for (let px = -step; px <= width + step; px += step) {
          const y = contourY(i, px, scroll);
          if (px === -step) ctx.moveTo(px, y);else
          ctx.lineTo(px, y);
        }
        const near = 0.05 + 0.06 * Math.abs(Math.sin(i * 1.3 + time * 0.0004));
        ctx.strokeStyle = `rgba(46,230,214,${near.toFixed(3)})`;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.7;
        ctx.stroke();

        // Nodes on every fourth line
        if (i % 4 === 0) {
          for (let n = 0; n <= 4; n++) {
            const px = n / 4 * width;
            const y = contourY(i, px, scroll);
            const beat = 0.25 + 0.35 * Math.abs(Math.sin(time * 0.0012 + n + i));
            ctx.fillStyle = `rgba(46,230,214,${beat.toFixed(3)})`;
            ctx.fillRect(px - 1.5, y - 1.5, 3, 3);
          }
        }
      }

      // Data pulses travelling along contours
      for (const p of pulses) {
        p.t += reduced ? 0 : p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.line = Math.floor(Math.random() * LINES);
        }
        const px = p.t * width;
        const y = contourY(p.line, px, scroll);
        const tail = ctx.createLinearGradient(px - 110, y, px, y);
        tail.addColorStop(0, 'rgba(46,230,214,0)');
        tail.addColorStop(1, 'rgba(127,245,232,0.55)');
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let d = 110; d >= 0; d -= 14) {
          const qx = px - d;
          const qy = contourY(p.line, qx, scroll);
          if (d === 110) ctx.moveTo(qx, qy);else
          ctx.lineTo(qx, qy);
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba(180,255,248,0.9)';
        ctx.beginPath();
        ctx.arc(px, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles with pointer displacement
      for (const pt of particles) {
        if (!reduced) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          const dx = pt.x - pointer.x;
          const dy = pt.y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 22000) {
            const f = (22000 - dist2) / 22000;
            pt.x += dx / (Math.sqrt(dist2) || 1) * f * 1.6;
            pt.y += dy / (Math.sqrt(dist2) || 1) * f * 1.6;
          }
          if (pt.y < -10) pt.y = height + 10;
          if (pt.x < -10) pt.x = width + 10;
          if (pt.x > width + 10) pt.x = -10;
        }
        ctx.fillStyle = `rgba(127,245,232,${(0.1 + pt.z * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.z * 1.25, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) time += 16;
      raf = window.requestAnimationFrame(draw);
    };

    const onPointer = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onPointer);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a2a2c_0%,#051012_45%,#030809_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_50%,rgba(3,8,9,0)_0%,rgba(3,8,9,0.55)_100%)]" />
    </div>);

}