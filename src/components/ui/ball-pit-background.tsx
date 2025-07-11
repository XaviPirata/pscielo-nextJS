"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#FDE68A", "#93C5FD", "#F9A8D4"];

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function BallPitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouse = useRef<{x:number;y:number}|null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = (window.innerHeight / 3) * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight / 3}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const createBalls = () => {
      const balls: Ball[] = [];
      const count = 70; // casi el doble respecto a 35
      for (let i = 0; i < count; i++) {
        balls.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.3), // arrancan arriba
          vx: (Math.random() - 0.5) * 1.5 * DPR,
          vy: 0,
          radius: (Math.random() * 8 + 4) * 1.3 * DPR, // +30% tamaño
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      ballsRef.current = balls;
    };
    createBalls();

    const resetBalls = () => {
      for (const ball of ballsRef.current) {
        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * (canvas.height * 0.3);
        ball.vx = (Math.random() - 0.5) * 1.5 * DPR;
        ball.vy = 0;
      }
    };

    // Observer para reiniciar cuando la sección entra en vista
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetBalls();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(canvas);

    const gravity = 0.05 * DPR;
    const friction = 0.98;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const ball of ballsRef.current) {
        if (mouse.current) {
          const dx = ball.x - mouse.current.x * DPR;
          const dy = ball.y - mouse.current.y * DPR;
          const dist = Math.hypot(dx, dy);
          const minDist = 60 * DPR;
          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const force = (minDist - dist) / minDist;
            ball.vx += Math.cos(angle) * force * 2;
            ball.vy += Math.sin(angle) * force * 2;
          }
        }
        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= friction;
        ball.vy *= friction;
        if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius;
          ball.vy *= -0.8;
        }
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.vx *= -1;
        }
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY - window.innerHeight * 2 / 3,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute bottom-0 left-0 w-full select-none"
    />
  );
} 