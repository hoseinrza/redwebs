"use client";

import { useState, useCallback } from "react";

type CardSpec = {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  bg: string;
  titleColor: string;
  shadow: string;
  position: string;
  factor: { x: number; y: number; deg: number };
  z: number;
};

const cards: CardSpec[] = [
  {
    eyebrow: "UI / UX",
    eyebrowColor: "text-accent-600",
    title: "طراحی که دیده می‌شود.",
    bg: "bg-white",
    titleColor: "text-ink-900",
    shadow: "shadow-card",
    position: "left-0 top-0 z-[2]",
    factor: { x: 18, y: 12, deg: -6 },
    z: 2,
  },
  {
    eyebrow: "DEVELOPMENT",
    eyebrowColor: "text-accent-400",
    title: "ساخته‌شده برای درست کار کردن.",
    bg: "bg-ink-950",
    titleColor: "text-white",
    shadow: "shadow-sign",
    position: "left-[130px] top-[85px] z-[3]",
    factor: { x: -14, y: 18, deg: 4 },
    z: 3,
  },
  {
    eyebrow: "MOTION",
    eyebrowColor: "text-accent-600",
    title: "حرکت، اما با دلیل.",
    bg: "bg-white",
    titleColor: "text-ink-900",
    shadow: "shadow-card",
    position: "left-[20px] top-[195px] z-[1]",
    factor: { x: 12, y: -10, deg: 3 },
    z: 1,
  },
  {
    eyebrow: "STRATEGY",
    eyebrowColor: "text-accent-100",
    title: "اول فکر می‌کنیم، بعد می‌سازیم.",
    bg: "bg-accent-600",
    titleColor: "text-white",
    shadow: "shadow-glow",
    position: "left-[150px] top-[300px] z-[2]",
    factor: { x: -16, y: -8, deg: -3 },
    z: 2,
  },
];

export default function HeroVisual() {
  const [pos, setPos] = useState({ nx: 0, ny: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ nx, ny });
  }, []);

  return (
    <div
      onMouseMove={onMove}
      className="relative hidden h-[470px] lg:block"
      aria-hidden="true"
    >
      {cards.map((card) => {
        const { x, y, deg } = card.factor;
        const transform = `translate(${(pos.nx * x).toFixed(1)}px, ${(pos.ny * y).toFixed(1)}px) rotate(${deg}deg)`;
        return (
          <div
            key={card.title}
            className={`absolute w-[220px] rounded-2xl p-5 transition-transform duration-150 ease-out ${card.bg} ${card.shadow} ${card.position}`}
            style={{ transform }}
          >
            <p className={`m-0 text-[10.5px] font-bold tracking-wide ${card.eyebrowColor}`}>
              {card.eyebrow}
            </p>
            <p className={`m-0 mt-2.5 text-[15px] font-bold leading-relaxed ${card.titleColor}`}>
              {card.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
