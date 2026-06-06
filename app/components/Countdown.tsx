"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Wedding date: September 14, 2025
const WEDDING_DATE = new Date("2027-03-21T09:00:00");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = WEDDING_DATE.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  if (isPast) {
    return (
      <p
        className="font-romantic"
        style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          color: "white",
          textAlign: "center",
        }}
      >
        We Are Married! 💍
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(12px, 3vw, 24px)",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {units.map(({ label, value }) => (
        <div key={label} className="countdown-box">
          <span
            className="font-elegant"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300,
              color: "white",
              lineHeight: 1,
            }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginTop: "6px",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
