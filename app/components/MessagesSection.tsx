"use client";

import { useState, useEffect } from "react";

interface Message {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function MessagesSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchMessages();
    
    // Setup observer for reveals inside this dynamically loaded component
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    setTimeout(() => {
      document.querySelectorAll(".msg-reveal").forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Gagal mengambil pesan:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setMessageStatus(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        setName("");
        setMessage("");
        setMessageStatus({ type: 'success', text: 'Terima kasih atas ucapan dan doa Anda!' });
        fetchMessages();
        
        // Sembunyikan pesan sukses setelah 3 detik
        setTimeout(() => {
          setMessageStatus(null);
        }, 3000);
      } else {
        setMessageStatus({ type: 'error', text: 'Gagal mengirim pesan, silakan coba lagi.' });
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setMessageStatus({ type: 'error', text: 'Terjadi kesalahan pada server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section
      id="wishes"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)",
        backgroundColor: "var(--cream)", // Changed to cream to contrast with RSVP section
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="msg-reveal reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-badge">Buku Tamu</span>
          <h2
            className="font-romantic"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--charcoal)",
              marginTop: "4px",
              marginBottom: "12px",
            }}
          >
            Ucapan & Doa
          </h2>
          <p
            className="font-elegant"
            style={{
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontStyle: "italic",
              color: "var(--soft-brown)",
            }}
          >
            Tinggalkan pesan manis, ucapan syukur, dan doa restu Anda untuk kedua mempelai.
          </p>
        </div>

        {/* Form Input */}
        <div className="elegant-card msg-reveal reveal" style={{ marginBottom: "40px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", marginBottom: "8px", color: "var(--charcoal)", fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: 500 }}>
                Nama Anda
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(201, 169, 110, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(201, 169, 110, 0.4)"}
              />
            </div>
            <div>
              <label htmlFor="message" style={{ display: "block", marginBottom: "8px", color: "var(--charcoal)", fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: 500 }}>
                Ucapan / Doa
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan / doa untuk mempelai"
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(201, 169, 110, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(201, 169, 110, 0.4)"}
              />
            </div>

            {messageStatus && (
              <div 
                style={{ 
                  padding: "12px", 
                  borderRadius: "8px", 
                  backgroundColor: messageStatus.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: messageStatus.type === 'success' ? '#2e7d32' : '#d32f2f',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "13px",
                  textAlign: "center"
                }}
              >
                {messageStatus.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{ 
                alignSelf: "center", 
                width: "100%", 
                justifyContent: "center", 
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </form>
        </div>

        {/* List of Messages */}
        <div className="msg-reveal reveal" style={{ 
          maxHeight: "500px", 
          overflowY: "auto",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column", 
          gap: "16px" 
        }}>
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--soft-brown)", fontStyle: "italic" }}>
              Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
            </p>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--gold)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h4 style={{ margin: 0, color: "var(--charcoal)", fontWeight: 600, fontFamily: "'Montserrat', sans-serif", fontSize: "15px" }}>
                    {msg.name}
                  </h4>
                  <span style={{ fontSize: "11px", color: "var(--soft-brown)", fontFamily: "'Montserrat', sans-serif" }}>
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p style={{ margin: 0, color: "var(--soft-brown)", fontSize: "14px", lineHeight: 1.6 }}>
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
