import "./globals.css"
import GeometricBackground from "@/app/components/ui/GeometricBackground"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"
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
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased font-roboto">
        <GeometricBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}