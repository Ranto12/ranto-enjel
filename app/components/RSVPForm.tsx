"use client";

import { useState } from "react";

interface RSVPData {
  name: string;
  attendance: string;
  guests: string;
  message: string;
}

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPData>({
    name: "",
    attendance: "hadir",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "48px 32px",
          animation: "fadeInUp 0.6s ease forwards",
        }}
      >
        <div
          className="animate-heartbeat"
          style={{ fontSize: "48px", marginBottom: "20px" }}
        >
          💍
        </div>
        <h3
          className="font-romantic"
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            color: "var(--gold-dark)",
            marginBottom: "12px",
          }}
        >
          Terima Kasih!
        </h3>
        <p
          className="font-elegant"
          style={{
            fontSize: "18px",
            fontStyle: "italic",
            color: "var(--soft-brown)",
          }}
        >
          Konfirmasi kehadiran Anda telah kami terima.
          <br />
          Kami tidak sabar menyambut Anda!
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid var(--gold-light)",
    borderRadius: "2px",
    background: "rgba(255, 253, 248, 0.8)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "13px",
    color: "var(--charcoal)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    marginTop: "8px",
    appearance: "none" as const,
    WebkitAppearance: "none",
  };

  return (
    <form
      id="rsvp-form"
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div>
        <label
          htmlFor="rsvp-name"
          style={{
            display: "block",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
          }}
        >
          Nama Lengkap
        </label>
        <input
          id="rsvp-name"
          type="text"
          required
          placeholder="Masukkan nama Anda"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--gold)";
            e.target.style.boxShadow = "0 0 0 3px rgba(201, 169, 110, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--gold-light)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label
            htmlFor="rsvp-attendance"
            style={{
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
            }}
          >
            Konfirmasi
          </label>
          <select
            id="rsvp-attendance"
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value })}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
            <option value="mungkin">Mungkin</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="rsvp-guests"
            style={{
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
            }}
          >
            Jumlah Tamu
          </label>
          <select
            id="rsvp-guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {["1", "2", "3", "4", "5+"].map((n) => (
              <option key={n} value={n}>
                {n} Orang
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="rsvp-message"
          style={{
            display: "block",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
          }}
        >
          Ucapan &amp; Doa
        </label>
        <textarea
          id="rsvp-message"
          rows={4}
          placeholder="Tuliskan ucapan dan doa terbaik Anda..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{
            ...inputStyle,
            resize: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--gold)";
            e.target.style.boxShadow = "0 0 0 3px rgba(201, 169, 110, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--gold-light)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      <button type="submit" id="rsvp-submit" className="btn-gold" style={{ alignSelf: "center" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Konfirmasi Kehadiran
      </button>
    </form>
  );
}
