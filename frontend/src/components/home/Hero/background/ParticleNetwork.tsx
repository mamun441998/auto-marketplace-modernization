"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const PARTICLE_COUNT =
  typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 35
      : window.innerWidth < 1200
      ? 60
      : 90
    : 90;
const MAX_DISTANCE = 150;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!ctx) return;

    let width = 0;
    let height = 0;

    let animationId = 0;

    const mouse = {
      x: -9999,
      y: -9999,
    };

    const particles: Particle[] = [];

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;

      // Use the canvas's own bounding box instead of the window,
      // so the coordinate system stays correct even if the canvas
      // isn't full-viewport (e.g. placed inside a section lower on the page).
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function createParticles() {
      particles.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,

          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,

          radius: Math.random() * 1.8 + 1,
        });
      }
    }

    function handleResize() {
      resize();
      // Re-seed particles so they're distributed across the new
      // dimensions instead of clustering awkwardly after a resize.
      createParticles();
    }

    resize();
    createParticles();

    function updateParticles() {
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce + clamp so particles don't sit just outside the
        // boundary and flip back and forth every frame.
        if (particle.x <= 0) {
          particle.x = 0;
          particle.vx *= -1;
        } else if (particle.x >= width) {
          particle.x = width;
          particle.vx *= -1;
        }

        if (particle.y <= 0) {
          particle.y = 0;
          particle.vy *= -1;
        } else if (particle.y >= height) {
          particle.y = height;
          particle.vy *= -1;
        }

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = (120 - distance) / 120;

          particle.x -= dx * force * 0.015;
          particle.y -= dy * force * 0.015;
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw Connection Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MAX_DISTANCE) {
            const opacity = 1 - distance / MAX_DISTANCE;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(56,189,248,${opacity * 0.22})`;
            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      // shadowBlur is expensive when applied per-particle per-frame,
      // so set it once outside the loop instead of inside.
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#38BDF8";
      ctx.fillStyle = "#38BDF8";

      for (const particle of particles) {
        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      // Reset shadow so it doesn't leak into the next frame's line draws.
      ctx.shadowBlur = 0;
    }
    let paused = false;

document.addEventListener("visibilitychange", () => {
  paused = document.hidden;
});

    function animate() {
  if (!paused) {
    updateParticles();
    drawParticles();
  }

  animationId = requestAnimationFrame(animate);
}

    animate();

    function handleMouseMove(event: MouseEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Convert viewport-relative coordinates to canvas-relative
      // coordinates using the canvas's own bounding rect. This fixes
      // the mismatch that occurred when the canvas wasn't positioned
      // at the very top-left of the viewport.
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute
        inset-0
        z-0
        h-full
        w-full
        pointer-events-none
      "
    />
  );
}