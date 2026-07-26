import { useEffect, useRef } from 'react';

// ============================================================
// SIGNATURE INTERACTION: "Thought Field"
// A living constellation of particles that respond to the cursor
// — inspired by K-Means clustering — particles drift, cluster,
// and reorganize around your attention.
// ============================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  opacity: number;
  cluster: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 120;
const CURSOR_INFLUENCE = 140;
const CLUSTER_COLORS = [
  { r: 139, g: 92, b: 246 },  // lavender-500
  { r: 167, g: 139, b: 250 }, // lavender-400
  { r: 196, g: 181, b: 253 }, // lavender-300
  { r: 124, g: 111, b: 205 }, // muted violet
];

export default function ThoughtFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    const initParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        opacity: Math.random() * 0.5 + 0.3,
        cluster: Math.floor(i / (PARTICLE_COUNT / 4)),
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      timeRef.current += 0.008;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      particles.forEach((p) => {
        // Gentle drift
        p.x += p.vx + Math.sin(timeRef.current + p.baseX * 0.01) * 0.15;
        p.y += p.vy + Math.cos(timeRef.current + p.baseY * 0.01) * 0.15;

        // Boundary wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Cursor influence — particles gently attracted to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_INFLUENCE && dist > 0) {
          const force = (CURSOR_INFLUENCE - dist) / CURSOR_INFLUENCE;
          p.vx += (dx / dist) * force * 0.03;
          p.vy += (dy / dist) * force * 0.03;
        }

        // Velocity damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
        p.vy = Math.max(-1.2, Math.min(1.2, p.vy));
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            const color = CLUSTER_COLORS[particles[i].cluster];
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw cursor glow connections
        const pdx = mouse.x - particles[i].x;
        const pdy = mouse.y - particles[i].y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < CURSOR_INFLUENCE) {
          const alpha = (1 - pdist / CURSOR_INFLUENCE) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Draw particles
      particles.forEach((p) => {
        const color = CLUSTER_COLORS[p.cluster];
        const pdx = mouse.x - p.x;
        const pdy = mouse.y - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        const proximity = Math.max(0, 1 - pdist / CURSOR_INFLUENCE);
        const r = p.radius + proximity * 1.5;
        const opacity = p.opacity + proximity * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${opacity})`;
        ctx.fill();

        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${proximity * 0.15})`;
          ctx.fill();
        }
      });

      // Cursor dot
      if (mouse.x > -1000) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,0.6)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,0.08)';
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'none',
      }}
      aria-hidden="true"
    />
  );
}
