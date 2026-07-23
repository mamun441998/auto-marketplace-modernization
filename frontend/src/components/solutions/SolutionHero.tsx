"use client";

import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface SolutionHeroProps {
  badge: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function SolutionHero({
  badge,
  title,
  description,
  icon,
}: SolutionHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Configuration
    const particleCount = Math.floor((width * height) / 15000);
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines and particles
      ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0A0B]">
      {/* Particle Network Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-80"
      />

      {/* Background Radial Glow Enhancements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FC5E0115,transparent_55%)] pointer-events-none z-0" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FC5E01]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FC5E01]/10 blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24">
        <div className="grid w-full gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FC5E01]/30 bg-[#FC5E01]/10 px-5 py-2 text-sm font-semibold text-[#FC5E01] backdrop-blur-md">
              {icon}
              {badge}
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-white lg:text-6xl">
              {title}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FC5E01] px-7 py-4 font-semibold text-white transition hover:scale-105 hover:bg-orange-600 shadow-lg shadow-[#FC5E01]/20"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/10 bg-[#120E0C]/50 backdrop-blur-md px-7 py-4 font-semibold text-white transition hover:border-[#FC5E01]"
              >
                Book Demo
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#FC5E01]" />
                <span className="text-gray-300">Unlimited Vehicles</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#FC5E01]" />
                <span className="text-gray-300">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#FC5E01]" />
                <span className="text-gray-300">AI Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#FC5E01]" />
                <span className="text-gray-300">Real-time Analytics</span>
              </div>
            </div>
          </div>

          {/* Right (Dashboard with Enterprise Animation) */}
          <div className="relative">
            {/* The Enterprise Scan Line Animation Wrapper */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl pointer-events-none">
              <div className="animate-enterprise-scan absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-70" />
            </div>

            {/* Original Dashboard Content */}
            <div className="relative rounded-3xl border border-white/10 bg-[#120E0C]/90 backdrop-blur-md p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Dealer Dashboard
                  </h3>
                  <p className="text-sm text-gray-400">Live Overview</p>
                </div>
                <div className="rounded-xl bg-[#FC5E01]/20 p-3">
                  {icon}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-2xl bg-[#0B0A0B] p-5 border border-white/5">
                  <p className="text-sm text-gray-400">Active Inventory</p>
                  <h2 className="mt-2 text-4xl font-bold text-white">1,245</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#0B0A0B] p-5 border border-white/5">
                    <p className="text-sm text-gray-400">Leads</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">482</h3>
                  </div>
                  <div className="rounded-2xl bg-[#0B0A0B] p-5 border border-white/5">
                    <p className="text-sm text-gray-400">Sales</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">138</h3>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0B0A0B] p-5 border border-white/5">
                  <div className="mb-4 h-3 w-full rounded-full bg-gray-800">
                    <div className="h-3 w-[78%] rounded-full bg-[#FC5E01]" />
                  </div>
                  <p className="text-gray-300">
                    Inventory Performance 78%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes enterprise-scan {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-enterprise-scan {
          animation: enterprise-scan 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}