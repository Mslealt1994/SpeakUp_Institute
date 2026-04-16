import "@/app/globals.css"
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import GeometricBackground from "@/components/ui/GeometricBackground";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── Fuentes ──────────────────────────────────────────────────────────────────
// font-heading → Inter (títulos, UI)
// font-body    → Plus Jakarta Sans (lectura, párrafos)
// Las variables CSS conectan con los tokens --font-heading y --font-body
// definidos en globals.css

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "SpeakUp Institute",
  description: "Professional English training ecosystem.",
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-screen flex flex-col text-main antialiased">
        <GeometricBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
