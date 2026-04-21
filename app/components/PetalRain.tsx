"use client";

import { useEffect, useRef } from "react";

interface Petal {
  el: HTMLDivElement;
  x: number;
  speed: number;
  delay: number;
}

export default function PetalRain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      "rgba(212, 165, 165, 0.7)",
      "rgba(245, 230, 230, 0.8)",
      "rgba(247, 237, 216, 0.7)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(201, 169, 110, 0.4)",
    ];

    const petals: Petal[] = [];
    const count = window.innerWidth < 768 ? 12 : 22;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 10 + 8;
      const colorIdx = Math.floor(Math.random() * colors.length);
      const rotation = Math.random() * 360;
      const x = Math.random() * 100;
      const speed = Math.random() * 8 + 10;
      const delay = Math.random() * -20;

      el.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${x}vw;
        width: ${size}px;
        height: ${size * 0.7}px;
        background: ${colors[colorIdx]};
        border-radius: 50% 0 50% 0;
        pointer-events: none;
        z-index: 9999;
        transform: rotate(${rotation}deg);
        animation: petalFall${Math.random() > 0.5 ? "" : "2"} ${speed}s linear ${delay}s infinite;
        filter: blur(0.3px);
      `;

      container.appendChild(el);
      petals.push({ el, x, speed, delay });
    }

    return () => {
      petals.forEach(({ el }) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
