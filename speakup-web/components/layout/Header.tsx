"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Conócenos" },
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-full text-sm font-black font-roboto transition-colors ${
      pathname === path
        ? "bg-gray-100 text-brand-green"
        : "text-gray-700 hover:text-brand-green"
    }`

  return (
    <div className="flex justify-center mt-6 px-4">
      <header className="w-full max-w-6xl bg-white/70 border-g shadow-md rounded-full px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-brand-blue font-playfair"
        >
          SpeakUp Institute
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 rounded-full text-sm font-black uppercase tracking-wide transition-transform hover:scale-105 bg-sky-600 text-white font-roboto"
          >
            Contáctanos
          </Link>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-brand-blue transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-blue transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-blue transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 md:hidden z-50">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass(href)}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-wide text-center transition-transform hover:scale-105 bg-sky-600 text-white font-roboto"
            onClick={() => setIsOpen(false)}
          >
            Contáctanos
          </Link>
        </div>
      )}
    </div>
  )
}