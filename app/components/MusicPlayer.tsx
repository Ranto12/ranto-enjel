"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free romantic piano piece
    const audio = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    );
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="music-player"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      {/* Song Label */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "15px",
            color: "var(--gold-dark)",
            whiteSpace: "nowrap",
          }}
        >
          Our Song
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--soft-brown)",
            opacity: 0.8,
          }}
        >
          Romantic Piano
        </span>
      </div>

      {/* Bars / Paused icon */}
      {isPlaying ? (
        <div className="music-bars" aria-hidden="true">
          <div className="music-bar" />
          <div className="music-bar" />
          <div className="music-bar" />
          <div className="music-bar" />
        </div>
      ) : (
        <div
          style={{
            width: "18px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: "14px", color: "var(--gold)", opacity: 0.5 }}>
            ♫
          </span>
        </div>
      )}

      {/* Play/Pause button */}
      <button
        id="music-toggle-btn"
        className="music-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginLeft: "2px" }}
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  );
}
