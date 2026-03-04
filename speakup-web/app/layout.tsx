import "./globals.css"
import GeometricBackground from "@/components/ui/GeometricBackground"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Playfair_Display, Roboto } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata = {
  title: "SpeakUp Institute",
  description: "Professional English training ecosystem.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${roboto.variable} h-full`}>
      <body className="min-h-screen flex flex-col bg-brand-bg text-gray-900 antialiased font-roboto">
        <GeometricBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}