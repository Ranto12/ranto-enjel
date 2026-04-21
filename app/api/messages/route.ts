import { NextResponse } from "next/server";

export async function GET() {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  // Jika URL Google Sheets belum dipasang
  if (!scriptUrl) {
    console.warn("GOOGLE_SCRIPT_URL is not set.");
    // Sementara kita return dummy data agar website tidak error sebelum diset
    return NextResponse.json({
      messages: [
        {
          id: "dummy1",
          name: "Sistem Web (Admin)",
          message:
            "Menunggu koneksi ke Google Sheets. Silakan ikuti instruksi pemasangan.",
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }

  try {
    // Meminta data dari Google Sheets API (Apps script)
    const response = await fetch(scriptUrl, {
      method: "GET",
      // Mencegah cache di Vercel agar pesan baru langsung muncul
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Google Script: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json({ messages: data.messages || [] });
  } catch (error) {
    console.error("GET Messages error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil pesan dari Google Sheets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Sistem Google Sheets belum disambungkan" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan pesan harus diisi" },
        { status: 400 },
      );
    }

    // Mengirim pesannya ke Google Sheets
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        // Menggunakan text/plain karena Google Apps Script terkadang memblokir application/json saat POST cross-origin
        // Jika dari Server ke Server, text/plain lebih aman dan lancar masuknya
      },
      body: JSON.stringify({ name, message }),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.error) {
      throw new Error("Gagal menyimpan ke Google Sheets");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("POST Messages error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan pesan ke Google Sheets" },
      { status: 500 },
    );
  }
}
