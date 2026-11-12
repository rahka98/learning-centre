import type React from "react";
import { useEffect, useRef } from "react";
import { Star, GraduationCap, BookOpenCheck } from "lucide-react";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { programs } from "@/data/programs";
import { SmartImage } from "./SmartImage";

/**
 * CSS-3D hero composition: an arch-framed photo with floating glass cards at
 * different depths. Tilts with the pointer on desktop; static on touch devices
 * and for visitors who prefer reduced motion. No WebGL — fast on every phone.
 */
export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const rig = rigRef.current;
    if (!scene || !rig) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      rig.style.transform = `rotateX(${(-cy * 7).toFixed(2)}deg) rotateY(${(cx * 9).toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const google = business.ratings[0];

  return (
    <div ref={sceneRef} className="scene-3d relative mx-auto w-full max-w-[34rem]">
      <div ref={rigRef} className="preserve-3d relative will-change-transform" style={{ transition: "transform 0.1s linear" }}>
        {/* Orbit rings */}
        <svg viewBox="0 0 400 400" className="pointer-events-none absolute -inset-[12%] size-[124%] animate-[spin_60s_linear_infinite] text-gold opacity-50" style={{ transform: "translateZ(-80px)" }} aria-hidden>
          <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeWidth=".6" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth=".4" />
          <circle cx="200" cy="4" r="4" fill="currentColor" />
        </svg>

        {/* Arch photo */}
        <div className="preserve-3d relative" style={{ transform: "translateZ(0px)" }}>
          <div className="arch overflow-hidden border border-border p-2 shadow-elegant bg-card">
            <SmartImage image={images.hero} ratio="4 / 5" priority sizes="(min-width: 1024px) 34rem, 90vw" className="arch" />
          </div>
        </div>

        {/* Rating card */}
        <a
          href={google.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass animate-float-slow absolute -left-3 top-[18%] rounded-2xl px-4 py-3 shadow-elegant sm:-left-10 sm:px-5 sm:py-4"
          style={{ "--z": "90px", transform: "translateZ(90px)" } as React.CSSProperties}
          aria-label={`Rated ${google.value} out of 5 from ${google.count} Google reviews`}
        >
          <div className="flex items-center gap-1 text-gold" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
          <p className="mt-1.5 font-display text-3xl leading-none text-foreground">
            {google.value}
            <span className="ml-1 font-sans text-xs font-medium text-muted-foreground">/ 5</span>
          </p>
          <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">{google.count} Google reviews</p>
        </a>

        {/* Programmes card */}
        <div
          className="glass animate-float-slow absolute -right-2 bottom-[16%] w-[13.5rem] rounded-2xl p-4 shadow-elegant sm:-right-6 sm:w-[15rem] 2xl:-right-10"
          style={{ "--z": "120px", "--r": "2deg", transform: "translateZ(120px) rotate(2deg)", animationDelay: "-3s" } as React.CSSProperties}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon">
            <BookOpenCheck className="size-4" aria-hidden /> Programmes
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {programs.map((p) => (
              <li key={p.slug} className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs font-semibold text-foreground">
                {p.code}
              </li>
            ))}
          </ul>
        </div>

        {/* University seal card */}
        <div
          className="glass animate-float-slow absolute left-[12%] -bottom-6 hidden items-center gap-3 rounded-full py-2 pl-2 pr-5 shadow-elegant sm:flex"
          style={{ "--z": "60px", transform: "translateZ(60px)", animationDelay: "-6s" } as React.CSSProperties}
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <GraduationCap className="size-4.5" aria-hidden />
          </span>
          <span className="text-xs font-semibold leading-tight text-foreground">
            Alagappa University
            <span className="block font-medium text-muted-foreground">Distance Education</span>
          </span>
        </div>
      </div>
    </div>
  );
}
