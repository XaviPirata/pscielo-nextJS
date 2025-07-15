"use client";

import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import gsap from "gsap";

/* ─── Ajustes globales ─────────────────────────── */
const BIRD_SCALE      = 0.45;
const BIRD_SPEED      = 0.45;
const REPEL_RADIUS    = 130;
const REPEL_STRENGTH  = 160;
const SPRING_DAMPING  = 0.18;
/* ──────────────────────────────────────────────── */

type Props = {
  /** Clase Tailwind para el z-index (p.ej. "z-20").  Por defecto "z-0". */
  zIndexClass?: string;
};

export default function FlyingBirds({ zIndexClass = "z-0" }: Props) {
  const [dark, setDark] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);

  /* — detectar modo oscuro — */
  useEffect(() => {
    const upd = () =>
      setDark(document.documentElement.classList.contains("dark"));
    upd();
    const mo = new MutationObserver(upd);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  /* — montar animación + interactividad — */
  useEffect(() => {
    if (dark || !wrap.current) return;

    anim.current?.destroy();

    (async () => {
      const data = await fetch("/animaciones/pajaritos-volando.json").then(r => r.json());

      /* 1. Colores */
      const palette = [
        [1, 0.984, 0.722, 1],
        [0.898, 0.718, 0.976, 1],
      ];
      data.layers.forEach((l: Record<string, unknown>, i: number) => {
        const fill = (l.shapes as Array<{ it: Array<{ ty: string; c?: { k: number[] } }> }>)?.[0]?.it?.find((it: { ty: string; c?: { k: number[] } }) => it.ty === "fl");
        if (fill?.c?.k) fill.c.k = palette[i % palette.length];
      });

      /* 2. Canvas = viewport */
      data.w = innerWidth;
      data.h = innerHeight;

      /* 3. Reescala posiciones + tamaños */
              data.layers.forEach((l: Record<string, unknown>) => {
          const ks = l.ks as { p?: { k?: Array<{ s: number[] }> }; s?: { k: number[] | Array<{ s: number[] }> | { s: number[] } } };
          ks?.p?.k?.forEach((kf: { s: number[] }) => {
            if (Array.isArray(kf.s)) {
              kf.s[0] = (kf.s[0] / 1920) * data.w;
              kf.s[1] = (kf.s[1] / 1080) * data.h;
            }
          });
          const sk = ks?.s?.k;
          const res = (s: number[]) => { s[0] *= BIRD_SCALE; s[1] *= BIRD_SCALE; };
          if (Array.isArray(sk) && typeof sk[0] === "number") res(sk as number[]);
          else if (Array.isArray(sk)) (sk as Array<{ s: number[] }>).forEach((kf: { s: number[] }) => Array.isArray(kf.s) && res(kf.s));
          else if (typeof sk === "object" && Array.isArray((sk as { s: number[] })?.s)) res((sk as { s: number[] }).s);
        });

      /* 4. Lottie */
      anim.current = lottie.loadAnimation({
        container: wrap.current!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
        animationData: data,
      });
      anim.current.setSpeed(BIRD_SPEED);

      /* 5. Interactividad */
      anim.current.addEventListener("DOMLoaded", () => {
        const svg = wrap.current!.querySelector("svg")!;
        const layers = Array.from(svg.querySelectorAll<SVGGElement>("g"));

        /* wrapper extra que Lottie no toca */
        const wrappers = layers.map((layer) => {
          const w = document.createElementNS("http://www.w3.org/2000/svg", "g");
          layer.parentNode!.insertBefore(w, layer);
          w.appendChild(layer);
          return w;
        });

        const qsX = wrappers.map((w) => gsap.quickTo(w, "x", { damping: SPRING_DAMPING }));
        const qsY = wrappers.map((w) => gsap.quickTo(w, "y", { damping: SPRING_DAMPING }));

        /* posición del puntero en viewport */
        let mx = -9999, my = -9999;
        const pointer = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
        window.addEventListener("pointermove", pointer, { passive: true });
        window.addEventListener("pointerdown", pointer, { passive: true });

        /* loop de física */
        gsap.ticker.add(() => {

          wrappers.forEach((w, i) => {
            const br = w.getBoundingClientRect();
            const cx = br.left + br.width / 2;
            const cy = br.top  + br.height / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.hypot(dx, dy);

            if (dist < REPEL_RADIUS) {
              const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
              qsX[i]((dx / dist) * f);
              qsY[i]((dy / dist) * f);
            } else {
              qsX[i](0);
              qsY[i](0);
            }
          });
        });

        /* limpieza */
        wrap.current!.addEventListener("remove", () => {
          window.removeEventListener("pointermove", pointer);
          window.removeEventListener("pointerdown", pointer);
        });
      });
    })();

    return () => anim.current?.destroy();
  }, [dark]);

  if (dark) return null;

  /* — Render — */
  return (
    <div
      className={`absolute inset-0 ${zIndexClass} overflow-hidden`}
      /* No bloquea clics ni hovers */
      style={{ pointerEvents: "none" }}
    >
      <div ref={wrap} className="w-full h-full" style={{ overflow: "visible" }} />
    </div>
  );
}
