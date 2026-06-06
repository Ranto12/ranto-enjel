"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const photos = [
  { src: "/photo-1.jpg" },
  { src: "/photo-2.jpg" },
  { src: "/photo-3.jpg" },
  { src: "/photo-4.jpg" },
  { src: "/photo-5.jpg" },
  { src: "/photo-6.jpg" },
  { src: "/photo-7.jpg" },
  { src: "/photo-8.jpg" },
];

export default function PhotoGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const speedRef = useRef(0.5); // px per frame
  const posRef = useRef(0); // running offset
  const isHoverRef = useRef(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOrigin = useRef(0);

  // ── card width + gap ───────────────────────────────────────
  const CARD_W = 320;
  const GAP = 20;
  const STEP = CARD_W + GAP;

  // ── clone photos so we have at least 3× for infinite loop ──
  const tiles = [...photos, ...photos, ...photos];
  const singleSetW = photos.length * STEP;

  const applyTranslate = useCallback((x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-x}px)`;
    }
  }, []);

  // ── auto-scroll loop ───────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      if (!isHoverRef.current && !isDragging) {
        posRef.current += speedRef.current;
        // reset when we've scrolled one full set
        if (posRef.current >= singleSetW) {
          posRef.current -= singleSetW;
        }
        applyTranslate(posRef.current);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, applyTranslate, singleSetW]);

  // ── hover: slow to crawl ───────────────────────────────────
  const handleMouseEnter = () => {
    isHoverRef.current = true;
    speedRef.current = 0.12;
  };
  const handleMouseLeave = () => {
    isHoverRef.current = false;
    speedRef.current = 0.5;
  };

  // ── drag to scroll ─────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    dragOrigin.current = posRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = dragStart.current - e.clientX;
    let next = dragOrigin.current + delta;
    // wrap
    if (next < 0) next += singleSetW;
    if (next >= singleSetW) next -= singleSetW;
    posRef.current = next;
    applyTranslate(next);
  };

  const onPointerUp = () => setIsDragging(false);

  // ── lightbox nav ──────────────────────────────────────────
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () =>
    setLightbox((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  const nextPhoto = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length));

  // keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section
      id="photos"
      style={{
        padding: "clamp(60px, 10vw, 120px) 0",
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 60%),
          var(--ivory)
        `,
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        className="reveal"
        style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}
      >
        <span className="section-badge">Galeri Foto</span>
        <h2
          className="font-romantic"
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "var(--charcoal)",
            lineHeight: 1.1,
            marginTop: "6px",
            marginBottom: "12px",
          }}
        >
          Memories We Cherish
        </h2>
        <p
          className="font-elegant"
          style={{
            fontSize: "clamp(15px, 2.5vw, 18px)",
            fontStyle: "italic",
            color: "var(--soft-brown)",
          }}
        >
          Hover untuk memperlambat · Klik foto untuk melihat lebih besar
        </p>

        {/* gold divider */}
        <div
          className="gold-divider"
          style={{ maxWidth: "300px", margin: "20px auto 0" }}
        >
          <span
            style={{
              color: "var(--gold)",
              fontSize: "18px",
              padding: "0 10px",
            }}
          >
            ✦
          </span>
        </div>
      </div>

      {/* ── Slider track ── */}
      <div
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* left/right fade edges */}
        {["left", "right"].map((side) => (
          <div
            key={side}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              [side]: 0,
              width: "80px",
              background: `linear-gradient(to ${side === "left" ? "right" : "left"}, var(--ivory), transparent)`,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* scrollable track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            display: "flex",
            gap: `${GAP}px`,
            willChange: "transform",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            paddingBottom: "8px",
          }}
        >
          {tiles.map((photo, idx) => {
            // Map back to original photo index for lightbox
            const photoIdx = idx % photos.length;
            return (
              <PhotoCard
                key={idx}
                photo={photo}
                width={CARD_W}
                onClick={() => setLightbox(photoIdx)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "32px",
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            id={`gallery-dot-${i}`}
            aria-label={`Photo ${i + 1}`}
            onClick={() => {
              posRef.current = i * STEP;
              applyTranslate(i * STEP);
            }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--gold-light)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "var(--gold)";
              (e.target as HTMLButtonElement).style.transform = "scale(1.6)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background =
                "var(--gold-light)";
              (e.target as HTMLButtonElement).style.transform = "scale(1)";
            }}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          current={lightbox}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}

/* ════════════════════════════════════════
   Photo Card
════════════════════════════════════════ */
function PhotoCard({
  photo,
  width,
  onClick,
}: {
  photo: { src: string; label?: string; sub?: string };
  width: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        flexShrink: 0,
        width: `${width}px`,
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 24px 60px rgba(61,48,48,0.25), 0 0 0 1px rgba(201,169,110,0.3)"
          : "0 8px 30px rgba(61,48,48,0.12)",
        transform: hovered
          ? "translateY(-6px) scale(1.015)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.45s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.45s ease",
      }}
    >
      {/* Photo */}
      <Image
        src={photo.src}
        alt={photo.label || "Photo"}
        fill
        sizes="320px"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.25,0.8,0.25,1)",
        }}
        draggable={false}
      />

      {/* Gradient overlay — always visible at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(45,30,30,0.75) 0%, rgba(45,30,30,0.15) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(45,30,30,0.55) 0%, transparent 50%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Gold top bar on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(to right, transparent, var(--gold), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 20px 22px",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "transform 0.4s ease",
        }}
      >
        <p
          className="font-romantic"
          style={{
            fontSize: "22px",
            color: "white",
            lineHeight: 1,
            marginBottom: "4px",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {photo.label}
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--gold-light)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
          }}
        >
          {photo.sub}
        </p>

        {/* "Click to view" icon */}
        <div
          style={{
            marginTop: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.3)",
              border: "1px solid rgba(201,169,110,0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold-light)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Lihat
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Lightbox
════════════════════════════════════════ */
function Lightbox({
  photos,
  current,
  onClose,
  onPrev,
  onNext,
}: {
  photos: { src: string; label?: string; sub?: string }[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[current];

  return (
    <div
      id="lightbox-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(30,18,18,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Content — stop propagation so clicking photo doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(880px, 95vw)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4px",
          }}
        >
          <div>
            <p
              className="font-romantic"
              style={{ fontSize: "26px", color: "white", lineHeight: 1 }}
            >
              {photo.label}
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              {photo.sub}
            </p>
          </div>

          {/* Counter + close */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {current + 1} / {photos.length}
            </span>
            <button
              id="lightbox-close"
              aria-label="Close lightbox"
              onClick={onClose}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                transition: "background 0.2s",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "min(880px, 95vw)",
            height: "min(560px, 75vh)",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo?.label || "Photo"}
            fill
            sizes="880px"
            style={{ objectFit: "cover", animation: "fadeIn 0.35s ease" }}
            priority
          />
          {/* side nav arrows */}
          {[
            { side: "left", label: "Previous", icon: "‹", action: onPrev },
            { side: "right", label: "Next", icon: "›", action: onNext },
          ].map(({ side, label, icon, action }) => (
            <button
              key={side}
              id={`lightbox-${side}`}
              aria-label={label}
              onClick={action}
              style={{
                position: "absolute",
                top: "50%",
                [side]: "16px",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                fontSize: "28px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                lineHeight: 1,
              }}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            maxWidth: "100%",
            paddingBottom: "4px",
          }}
        >
          {photos.map((p, i) => (
            <button
              key={i}
              id={`lightbox-thumb-${i}`}
              aria-label={p.label}
              onClick={() => {
                // trigger index change via parent
                const diff = i - current;
                if (diff > 0) for (let x = 0; x < diff; x++) onNext();
                else if (diff < 0) for (let x = 0; x < -diff; x++) onPrev();
              }}
              style={{
                flexShrink: 0,
                width: "60px",
                height: "60px",
                borderRadius: "4px",
                overflow: "hidden",
                border:
                  i === current
                    ? "2px solid var(--gold)"
                    : "2px solid transparent",
                cursor: "pointer",
                padding: 0,
                background: "none",
                transition: "border-color 0.2s, opacity 0.2s",
                opacity: i === current ? 1 : 0.55,
                position: "relative",
              }}
            >
              <Image
                src={p.src}
                alt={p.label || "Photo"}
                fill
                sizes="60px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
