import Link from "next/link"
import Container from "@/app/components/ui/Container"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          SpeakUp Institute
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="hover:text-gray-600 transition">
            Blog
          </Link>
          <span className="text-gray-400 cursor-not-allowed">
            Premium (soon)
          </span>
        </nav>
      </Container>
    </header>
  )
}