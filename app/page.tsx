"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const MusicPlayer = dynamic(() => import("./components/MusicPlayer"), {
  ssr: false,
});
const PetalRain = dynamic(() => import("./components/PetalRain"), {
  ssr: false,
});
const Countdown = dynamic(() => import("./components/Countdown"), {
  ssr: false,
});
const RSVPForm = dynamic(() => import("./components/RSVPForm"), { ssr: false });
const PhotoGallery = dynamic(() => import("./components/PhotoGallery"), {
  ssr: false,
});
const MessagesSection = dynamic(() => import("./components/MessagesSection"), {
  ssr: false,
});

// ========== Gallery placeholder images (using gradient + emoji) ==========
const galleryItems = [
  {
    id: "g1",
    label: "The First Meet",
    bg: "linear-gradient(135deg, #D4A5A5 0%, #C9A96E 100%)",
    emoji: "🌹",
  },
  {
    id: "g2",
    label: "Our Adventure",
    bg: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)",
    emoji: "✈️",
  },
  {
    id: "g3",
    label: "The Proposal",
    bg: "linear-gradient(135deg, #F5E6E6 0%, #D4A5A5 100%)",
    emoji: "💍",
  },
  {
    id: "g4",
    label: "Engagement",
    bg: "linear-gradient(135deg, #F7EDD8 0%, #C9A96E 100%)",
    emoji: "🥂",
  },
  {
    id: "g5",
    label: "Together",
    bg: "linear-gradient(135deg, #B07070 0%, #D4A5A5 100%)",
    emoji: "💑",
  },
  {
    id: "g6",
    label: "Our Story",
    bg: "linear-gradient(135deg, #A07840 0%, #C9A96E 100%)",
    emoji: "📖",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Pertama Bertemu",
    desc: "Pertemuan ini ketika SMK kelas 12 mengadakan acara dan ada keterkitan dengan mereka berdua.",
    icon: "☕",
  },
  {
    year: "2018",
    title: "Jatuh Cinta",
    desc: "Di tengah dunia yang berhenti, cinta kami tumbuh pelan namun pasti, seperti bunga di musim semi.",
    icon: "🌸",
  },
  // {
  //   year: "2019",
  //   title: "Petualangan Bersama",
  //   desc: "Menjelajahi tempat-tempat baru, menciptakan kenangan yang akan selalu kita kenang berdua.",
  //   icon: "✈️",
  // },
  {
    year: "2026",
    title: "Lamaran",
    desc: "Di bawah bintang-bintang, dengan penuh cinta dan harapan, Ranto bertanya dan Enjel menjawab iya.",
    icon: "💍",
  },
  {
    year: "2027",
    title: "Hari Pernikahan",
    desc: "Hari yang paling dinantikan. Dua jiwa bersatu dalam ikatan suci yang abadi.",
    icon: "💒",
  },
];

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <main style={{ backgroundColor: "var(--ivory)", overflowX: "hidden" }}>
      {/* ──────────── FLOATING PETALS ──────────── */}
      <PetalRain />

      {/* ──────────── MUSIC PLAYER ──────────── */}
      <MusicPlayer />

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/hero-bg.png"
            alt="Wedding background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div
            className="hero-overlay"
            style={{ position: "absolute", inset: 0 }}
          />
        </div>

        {/* Decorative top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "24px",
            maxWidth: "700px",
            width: "100%",
          }}
        >
          {/* Announcement label */}
          <div
            className="animate-fadeIn"
            style={{
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              marginBottom: "24px",
              border: "1px solid rgba(201, 169, 110, 0.5)",
              padding: "7px 24px",
              borderRadius: "30px",
            }}
          >
            Wedding Invitation
          </div>

          {/* We Are */}
          <p
            className="font-elegant animate-fadeInUp"
            style={{
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "rgba(247, 237, 216, 0.9)",
              letterSpacing: "8px",
              textTransform: "uppercase",
              fontStyle: "italic",
              marginBottom: "8px",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            The Wedding of
          </p>

          {/* Groom Name */}
          <h1
            className="font-romantic animate-fadeInUp"
            style={{
              fontSize: "clamp(56px, 12vw, 110px)",
              color: "white",
              lineHeight: 0.95,
              textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            Ranto
          </h1>

          {/* Ampersand */}
          <div
            className="animate-fadeInUp animate-float"
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "var(--gold-light)",
              margin: "4px 0",
              fontFamily: "'Great Vibes', cursive",
              animationDelay: "0.6s",
              opacity: 0,
            }}
          >
            &amp;
          </div>

          {/* Bride Name */}
          <h1
            className="font-romantic animate-fadeInUp"
            style={{
              fontSize: "clamp(56px, 12vw, 110px)",
              color: "white",
              lineHeight: 0.95,
              textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              animationDelay: "0.8s",
              opacity: 0,
            }}
          >
            Enjel
          </h1>

          {/* Date */}
          <div
            className="animate-fadeInUp"
            style={{
              marginTop: "28px",
              animationDelay: "1s",
              opacity: 0,
            }}
          >
            <div
              className="gold-divider"
              style={{ maxWidth: "300px", margin: "0 auto 16px" }}
            >
              <span
                className="font-elegant"
                style={{
                  color: "var(--gold-light)",
                  fontSize: "20px",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                  padding: "0 12px",
                }}
              >
                21 Maret 2027
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "rgba(247, 237, 216, 0.8)",
              }}
            >
              Kedaiaman Enjel Violani, Lampung Selatan
            </p>
          </div>

          {/* CTA */}
          <div
            className="animate-fadeInUp"
            style={{
              marginTop: "36px",
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              animationDelay: "1.2s",
              opacity: 0,
            }}
          >
            <a href="#rsvp" className="btn-gold" id="hero-rsvp-btn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Konfirmasi Hadir
            </a>
            <a
              href="#detail"
              className="btn-outline-gold"
              id="hero-detail-btn"
              style={{
                color: "var(--gold-light)",
                borderColor: "rgba(201,169,110,0.6)",
              }}
            >
              Lihat Detail
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(247, 237, 216, 0.6)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "20px",
              height: "34px",
              border: "1.5px solid rgba(201, 169, 110, 0.5)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <div
              className="scroll-dot"
              style={{
                width: "4px",
                height: "8px",
                background: "var(--gold-light)",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — BISMILLAH / OPENING QUOTE
      ══════════════════════════════════════════ */}
      <section
        ref={addToRefs}
        id="opening"
        style={{
          backgroundColor: "var(--cream)",
          padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 48px)",
          textAlign: "center",
          borderTop: "1px solid var(--gold-light)",
          borderBottom: "1px solid var(--gold-light)",
        }}
      >
        <div className="reveal" style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Arabic calligraphy style */}
          <div
            className="font-elegant"
            style={{
              fontSize: "clamp(18px, 4vw, 28px)",
              color: "var(--gold-dark)",
              letterSpacing: "4px",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            ﷽
          </div>

          <div
            className="gold-divider"
            style={{ margin: "0 auto 32px", maxWidth: "400px" }}
          >
            <span style={{ color: "var(--gold)", fontSize: "20px" }}>✦</span>
          </div>

          <blockquote
            className="font-elegant"
            style={{
              fontSize: "clamp(18px, 3.5vw, 26px)",
              fontStyle: "italic",
              color: "var(--soft-brown)",
              lineHeight: 1.7,
              marginBottom: "16px",
            }}
          >
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri supaya kamu cenderung
            dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa
            kasih dan sayang."
          </blockquote>
          <cite
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontStyle: "normal",
            }}
          >
            — QS. Ar-Ruum : 21
          </cite>

          <div
            className="gold-divider"
            style={{ margin: "32px auto 0", maxWidth: "400px" }}
          >
            <span style={{ color: "var(--gold)", fontSize: "20px" }}>✦</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — COUPLE
      ══════════════════════════════════════════ */}
      <section
        id="couple"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)",
          backgroundColor: "var(--ivory)",
        }}
      >
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="section-badge">Mempelai</span>
          <h2
            className="font-romantic"
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "var(--charcoal)",
              marginTop: "4px",
              lineHeight: 1.1,
            }}
          >
            The Beloved Couple
          </h2>
        </div>

        {/* Couple cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(16px, 3vw, 40px)",
            maxWidth: "900px",
            margin: "0 auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="elegant-card reveal"
            style={{
              textAlign: "center",
              flex: "1 1 260px",
              minWidth: "220px",
              maxWidth: "340px",
            }}
          >
            {/* Photo placeholder */}
            <div
              style={{
                width: "clamp(100px, 20vw, 140px)",
                height: "clamp(100px, 20vw, 140px)",
                borderRadius: "50%",
                margin: "0 auto 20px",
                background:
                  "linear-gradient(135deg, var(--gold-light), var(--gold))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(36px, 8vw, 52px)",
                border: "3px solid var(--gold-light)",
                boxShadow: "0 8px 30px rgba(201, 169, 110, 0.3)",
                flexShrink: 0,
              }}
            >
              🤵
            </div>
            <span className="section-badge" style={{ marginBottom: "8px" }}>
              Mempelai Pria
            </span>
            <h3
              className="font-romantic"
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                color: "var(--charcoal)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              Ranto
            </h3>
            <p
              className="font-elegant"
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "var(--soft-brown)",
                marginBottom: "12px",
              }}
            >
              Putra pertama dari
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                color: "var(--charcoal)",
                lineHeight: 1.6,
              }}
            >
              Bapak Iskandar
              <br />
              &amp; Ibu Wagiah
            </p>
          </div>

          {/* Heart divider */}
          <div
            className="reveal"
            style={{
              textAlign: "center",
              padding: "20px",
              flex: "0 0 auto",
              width: "60px",
            }}
          >
            <div
              className="animate-heartbeat"
              style={{
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--rose-deep)",
                display: "block",
                margin: "0 auto 12px",
              }}
            >
              ♥
            </div>
            <div
              className="font-romantic"
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                color: "var(--gold-dark)",
              }}
            >
              &amp;
            </div>
          </div>

          {/* Bride */}
          <div
            className="elegant-card reveal"
            style={{
              textAlign: "center",
              flex: "1 1 260px",
              minWidth: "220px",
              maxWidth: "340px",
            }}
          >
            <div
              style={{
                width: "clamp(100px, 20vw, 140px)",
                height: "clamp(100px, 20vw, 140px)",
                borderRadius: "50%",
                margin: "0 auto 20px",
                background:
                  "linear-gradient(135deg, var(--rose-light), var(--rose-deep))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(36px, 8vw, 52px)",
                border: "3px solid var(--rose)",
                boxShadow: "0 8px 30px rgba(176, 112, 112, 0.3)",
                flexShrink: 0,
              }}
            >
              👰
            </div>
            <span className="section-badge" style={{ marginBottom: "8px" }}>
              Mempelai Wanita
            </span>
            <h3
              className="font-romantic"
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                color: "var(--charcoal)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              Enjel Violani
            </h3>
            <p
              className="font-elegant"
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "var(--soft-brown)",
                marginBottom: "12px",
              }}
            >
              Putri kedua dari
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                color: "var(--charcoal)",
                lineHeight: 1.6,
              }}
            >
              Bapak Suroso
              <br />
              &amp; Ibu Sukati
            </p>
          </div>
        </div>

        {/* Floral divider */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginTop: "60px" }}
        >
          <Image
            src="/floral-divider.png"
            alt="Floral decoration"
            width={700}
            height={280}
            style={{
              maxWidth: "min(700px, 95vw)",
              height: "auto",
              opacity: 0.9,
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — COUNTDOWN
      ══════════════════════════════════════════ */}
      <section
        id="countdown"
        style={{
          background: `linear-gradient(135deg, var(--charcoal) 0%, #5A3838 50%, var(--charcoal) 100%)`,
          padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 48px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        {[
          { size: 300, top: "-150px", left: "-100px", opacity: 0.06 },
          { size: 200, bottom: "-100px", right: "-60px", opacity: 0.04 },
        ].map((c, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              border: "1px solid var(--gold)",
              opacity: c.opacity,
              top: (c as { top?: string }).top,
              left: (c as { left?: string }).left,
              bottom: (c as { bottom?: string }).bottom,
              right: (c as { right?: string }).right,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="reveal">
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "var(--gold)",
                padding: "6px 20px",
                border: "1px solid rgba(201, 169, 110, 0.3)",
                borderRadius: "30px",
                marginBottom: "20px",
              }}
            >
              Menghitung Waktu
            </span>
            <h2
              className="font-romantic"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                color: "white",
                marginBottom: "40px",
                lineHeight: 1.1,
              }}
            >
              Menuju Hari Istimewa
            </h2>
          </div>

          <div className="reveal">
            <Countdown />
          </div>

          <div className="reveal" style={{ marginTop: "40px" }}>
            <p
              className="font-elegant"
              style={{
                fontSize: "clamp(16px, 3vw, 22px)",
                fontStyle: "italic",
                color: "rgba(247, 237, 216, 0.7)",
              }}
            >
              Minggu, 21 Maret 2027 · 09.00 WIB
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — DETAIL ACARA
      ══════════════════════════════════════════ */}
      <section
        id="detail"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)",
          backgroundColor: "var(--champagne)",
        }}
      >
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span className="section-badge">Rangkaian Acara</span>
          <h2
            className="font-romantic"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--charcoal)",
              marginTop: "4px",
            }}
          >
            Detail Acara
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Akad */}
          <div className="elegant-card reveal" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>🕌</div>
            <span className="section-badge" style={{ marginBottom: "12px" }}>
              Akad Nikah
            </span>
            <h3
              className="font-playfair"
              style={{
                fontSize: "22px",
                color: "var(--charcoal)",
                marginBottom: "16px",
              }}
            >
              Ijab Qabul
            </h3>
            <div className="gold-divider" style={{ margin: "0 auto 16px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                { icon: "📅", text: "Minggu, 21 Maret 2027" },
                { icon: "⏰", text: "09.00 – 11.00 WIB" },
                { icon: "📍", text: "Kediaman Enjel violani, Lampung Selatan" },
              ].map(({ icon, text }) => (
                <p
                  key={text}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "13px",
                    color: "var(--soft-brown)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {icon} {text}
                </p>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <a
                id="map-akad-btn"
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ fontSize: "10px", padding: "10px 24px" }}
              >
                📍 Lihat Peta
              </a>
            </div>
          </div>

          {/* Resepsi */}
          {/* <div className="elegant-card reveal" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>🥂</div>
            <span className="section-badge" style={{ marginBottom: "12px" }}>
              Resepsi
            </span>
            <h3
              className="font-playfair"
              style={{ fontSize: "22px", color: "var(--charcoal)", marginBottom: "16px" }}
            >
              Pesta Pernikahan
            </h3>
            <div className="gold-divider" style={{ margin: "0 auto 16px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: "📅", text: "Senin, 14 September 2026" },
                { icon: "⏰", text: "12.00 – 17.00 WIB" },
                { icon: "📍", text: "Grand Ballroom The Ritz Nusantara" },
              ].map(({ icon, text }) => (
                <p
                  key={text}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "13px",
                    color: "var(--soft-brown)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {icon} {text}
                </p>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <a
                id="map-resepsi-btn"
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ fontSize: "10px", padding: "10px 24px" }}
              >
                📍 Lihat Peta
              </a>
            </div>
          </div> */}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — OUR STORY (TIMELINE)
      ══════════════════════════════════════════ */}
      <section
        id="story"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)",
          backgroundColor: "var(--ivory)",
        }}
      >
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="section-badge">Kisah Cinta</span>
          <h2
            className="font-romantic"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--charcoal)",
              marginTop: "4px",
            }}
          >
            Our Love Story
          </h2>
        </div>

        {/* Timeline */}
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, var(--gold-light) 10%, var(--gold-light) 90%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {timeline.map((item, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 1fr",
                gap: "16px",
                marginBottom: "48px",
                alignItems: "center",
              }}
            >
              {/* Left */}
              <div
                style={{
                  textAlign: "right",
                  padding: "0 16px",
                  ...(i % 2 === 0 ? {} : { order: 3 }),
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <span
                      className="font-elegant"
                      style={{
                        fontSize: "clamp(28px, 4vw, 38px)",
                        color: "var(--gold)",
                        fontStyle: "italic",
                        display: "block",
                        lineHeight: 1,
                      }}
                    >
                      {item.year}
                    </span>
                    <h4
                      className="font-playfair"
                      style={{
                        fontSize: "16px",
                        color: "var(--charcoal)",
                        margin: "4px 0",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "12px",
                        color: "var(--soft-brown)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </>
                ) : null}
              </div>

              {/* Center dot */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  order: 2,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--gold-light), var(--gold))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    boxShadow: "0 4px 16px rgba(201, 169, 110, 0.4)",
                    border: "2px solid white",
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Right */}
              <div
                style={{
                  textAlign: "left",
                  padding: "0 16px",
                  ...(i % 2 !== 0 ? {} : { order: 3 }),
                }}
              >
                {i % 2 !== 0 ? (
                  <>
                    <span
                      className="font-elegant"
                      style={{
                        fontSize: "clamp(28px, 4vw, 38px)",
                        color: "var(--gold)",
                        fontStyle: "italic",
                        display: "block",
                        lineHeight: 1,
                      }}
                    >
                      {item.year}
                    </span>
                    <h4
                      className="font-playfair"
                      style={{
                        fontSize: "16px",
                        color: "var(--charcoal)",
                        margin: "4px 0",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "12px",
                        color: "var(--soft-brown)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — PHOTO GALLERY (interactive slider)
      ══════════════════════════════════════════ */}
      <PhotoGallery />

      {/* ═══════════════════════════════════════
          SECTION 8 — RSVP
      ══════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════
          SECTION 9 — MESSAGES
      ══════════════════════════════════════════ */}
      <MessagesSection />

      {/* ═══════════════════════════════════════
          SECTION 10 — CLOSING / QUOTE
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: `linear-gradient(180deg, var(--charcoal) 0%, #2C1C1C 100%)`,
          padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 48px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold dots decorative — fixed sizes to avoid SSR/client hydration mismatch */}
        {([2.4, 1.8, 3.0, 2.1, 2.8, 1.6] as const).map((size, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              background: "var(--gold)",
              borderRadius: "50%",
              opacity: 0.3,
              top: `${15 + i * 13}%`,
              left: `${5 + i * 14}%`,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 2 }} className="reveal">
          <div
            className="animate-heartbeat"
            style={{ fontSize: "40px", marginBottom: "24px", display: "block" }}
          >
            ♥
          </div>

          <h2
            className="font-romantic"
            style={{
              fontSize: "clamp(48px, 9vw, 90px)",
              color: "white",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            Ranto &amp; Enjel
          </h2>

          <p
            className="font-elegant"
            style={{
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontStyle: "italic",
              color: "var(--gold-light)",
              letterSpacing: "2px",
              marginBottom: "32px",
            }}
          >
            21 · 03 · 2027
          </p>

          <div
            className="gold-divider"
            style={{ maxWidth: "300px", margin: "0 auto 32px" }}
          >
            <span
              style={{
                color: "var(--gold)",
                fontSize: "18px",
                padding: "0 12px",
              }}
            >
              ✦
            </span>
          </div>

          <p
            className="font-elegant"
            style={{
              fontSize: "clamp(15px, 2.5vw, 19px)",
              fontStyle: "italic",
              color: "rgba(247, 237, 216, 0.7)",
              maxWidth: "500px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            "Dua hati yang bersatu bukan karena sempurna, melainkan karena
            saling memilih untuk tumbuh bersama setiap harinya."
          </p>

          <div
            style={{
              borderTop: "1px solid rgba(201, 169, 110, 0.2)",
              paddingTop: "32px",
              marginTop: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(247, 237, 216, 0.4)",
              }}
            >
              Made with ♥ · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
