import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ranto & Enjel — Wedding Invitation",
  description:
    "With great joy, we invite you to celebrate the union of Ranto and Rafael Violani on this sacred and beautiful day.",
  keywords: ["wedding", "pernikahan", "undangan", "invitation"],
  openGraph: {
    title: "Ranto & Rafael — Wedding Invitation",
    description:
      "Join us as we celebrate our love and begin our journey together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // crossOrigin="anonymous"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
