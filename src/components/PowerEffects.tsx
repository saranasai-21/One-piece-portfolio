import { useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   HAKI SHOCKWAVE — Conqueror's Haki burst on click
   ═══════════════════════════════════════════════════════════ */
export function ConquerorsHaki() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e: MouseEvent) => {
      // Create shockwave burst
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = 2 + Math.random() * 8;
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, maxLife: 1,
          size: 1 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#daa520' : '#c41e3a',
        });
      }
      // Add inner ring particles
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * (1 + Math.random() * 3),
          vy: Math.sin(angle) * (1 + Math.random() * 3),
          life: 1, maxLife: 1,
          size: 0.5 + Math.random() * 1.5,
          color: '#ffffff',
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.02;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   ARMAMENT HAKI — Metallic coating aura on hoverable elements
   ═══════════════════════════════════════════════════════════ */
export function ArmamentHakiGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let auraParticles: Array<{
      x: number; y: number; vx: number; vy: number;
      life: number; size: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let mouseX = 0, mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Emit Haki aura particles at cursor
      for (let i = 0; i < 2; i++) {
        auraParticles.push({
          x: mouseX + (Math.random() - 0.5) * 20,
          y: mouseY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -1 - Math.random() * 2,
          life: 1,
          size: 1 + Math.random() * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      auraParticles = auraParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;

        if (p.life <= 0) return false;

        const alpha = p.life * 0.6;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(30, 30, 60, ${alpha})`;
        ctx.fillStyle = `rgba(60, 60, 100, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-40"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   LIGHTNING BURST — Gear Second / Thunder effect
   ═══════════════════════════════════════════════════════════ */
export function LightningBurst({ active, x, y }: { active: boolean; x: number; y: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frames = 0;
    const maxFrames = 30;

    const drawBolt = (x1: number, y1: number, x2: number, y2: number, depth: number) => {
      if (depth <= 0) return;

      const segments = 5 + Math.floor(Math.random() * 5);
      let cx = x1, cy = y1;

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      for (let i = 0; i < segments; i++) {
        const t = (i + 1) / segments;
        const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 40;
        const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 40;
        ctx.lineTo(px, py);
        cx = px;
        cy = py;

        if (Math.random() > 0.6 && depth > 1) {
          const branchAngle = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 1.5;
          const branchLen = 30 + Math.random() * 40;
          drawBolt(px, py, px + Math.cos(branchAngle) * branchLen, py + Math.sin(branchAngle) * branchLen, depth - 1);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (frames < maxFrames) {
        const alpha = 1 - frames / maxFrames;
        
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI * 2 * i) / 4 + Math.random() * 0.3;
          const len = 100 + Math.random() * 200;
          
          ctx.save();
          ctx.strokeStyle = `rgba(200, 220, 255, ${alpha})`;
          ctx.lineWidth = 2 + Math.random() * 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(100, 150, 255, ${alpha})`;
          ctx.globalAlpha = alpha;
          
          drawBolt(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len, 3);
          ctx.restore();
        }

        // Central flash
        ctx.save();
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        frames++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [active, x, y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9997] pointer-events-none"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   GEAR SECOND STEAM — Rising steam particles
   ═══════════════════════════════════════════════════════════ */
export function GearSteam({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      life: number; size: number; opacity: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: -2 - Math.random() * 4,
        life: 1,
        size: 5 + Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.5;
        p.y += p.vy;
        p.life -= 0.005;
        p.size += 0.1;

        if (p.life <= 0 || p.y < -50) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 20;
          p.life = 1;
          p.size = 5 + Math.random() * 15;
        }

        ctx.save();
        ctx.globalAlpha = p.life * p.opacity;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(0.5, 'rgba(200, 200, 200, 0.1)');
        grad.addColorStop(1, 'rgba(150, 150, 150, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9996] pointer-events-none opacity-60"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   GEAR FIFTH AURA — Cosmic awakening energy
   ═══════════════════════════════════════════════════════════ */
export function GearFifthAura({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      // Cosmic energy swirl
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      for (let i = 0; i < 200; i++) {
        const angle = (i / 200) * Math.PI * 8 + t;
        const radius = 50 + (i / 200) * Math.min(canvas.width, canvas.height) * 0.4;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        
        const size = 1 + (i / 200) * 3;
        const alpha = 1 - (i / 200) * 0.8;

        ctx.save();
        ctx.globalAlpha = alpha * 0.4;
        ctx.shadowBlur = 10;
        const hue = (i * 2 + t * 50) % 360;
        ctx.shadowColor = `hsl(${hue}, 80%, 70%)`;
        ctx.fillStyle = `hsl(${hue}, 80%, 70%)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9995] pointer-events-none opacity-30 mix-blend-screen"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   HOOK: usePowerClick — Triggers lightning on click
   ═══════════════════════════════════════════════════════════ */
export function usePowerClick() {
  const lightningState = useRef({ active: false, x: 0, y: 0 });

  const trigger = useCallback(() => {
    lightningState.current = { ...lightningState.current, active: true };
    setTimeout(() => {
      lightningState.current = { ...lightningState.current, active: false };
    }, 500);
  }, []);

  return { lightningState, trigger };
}
