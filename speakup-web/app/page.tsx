import Container from "@/app/components/ui/Container"
import Link from "next/link"

export default function HomePage() {
  return (
    <section className="py-24">
      <Container className="text-center max-w-3xl">
        
        <p className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
          Building in Public
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          A Professional English Learning Ecosystem.
        </h1>

        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          SpeakUp Institute is being built step by step as a structured 
          platform for serious English training. Follow the journey, 
          explore the progress, and be part of the evolution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
          >
            Follow the Progress
          </Link>

          <span className="px-6 py-3 border rounded-md text-gray-400 cursor-not-allowed">
            Courses Coming Soon
          </span>
        </div>

      </Container>
    </section>
  )
}