import "./globals.css"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"

export const metadata = {
  title: "SpeakUp Institute",
  description: "Professional English training ecosystem.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}