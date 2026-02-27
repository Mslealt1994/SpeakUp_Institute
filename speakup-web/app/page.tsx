import Container from "@/app/components/ui/Container"
import Link from "next/link"

export default function HomePage() {
  return (
    <section className="py-8 sm:py-24">
      <Container className="max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Texto — izquierda */}
          <div className="flex-1 bg-white/50 p-6 rounded-2xl order-last text-center lg:order-first lg:text-left">
            <p className="mb-4 text-sm font-bold text-brand-blue uppercase tracking-widest">
              Build in Public • El nuevo estándar en inglés
            </p>

            <h1 className="mb-6 font-playfair text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl xl:text-6xl">
              Inglés con estructura, lógica y propósito real.
            </h1>

            <p className="mb-10 max-w-lg mx-auto text-lg font-medium leading-relaxed text-brand-blue lg:mx-0">
              No solo una plataforma, un ecosistema en evolución. Fusionamos rigor académico y lógica técnica para crear profesionales globales.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/blog"
                className="w-full px-7 py-3 text-center rounded-md bg-green-600 shadow-lg text-white font-medium transition-colors duration-200 hover:bg-[#092e48] sm:w-auto"
              >
                Cada paso cuenta
              </Link>

              <Link
                href="/roadmap"
                className="w-full px-7 py-3 text-center rounded-md border bg-brand-blue text-white font-medium transition-colors duration-200 hover:bg-brand-blue hover:text-white sm:w-auto"
              >
                Explorar el roadmap
              </Link>
            </div>
          </div>

          {/* Ilustración — derecha */}
          <div className="flex-1 w-full max-w-55 mx-auto order-first lg:order-last lg:max-w-none bg-white/50 rounded-2xl">
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
    >
        {/* Libro abierto */}
      <rect x="80" y="80" width="140" height="180" rx="8" fill="#0b3c5d" />
      <rect x="260" y="80" width="140" height="180" rx="8" fill="#0b3c5d" opacity="0.85" />
      {/* Lomo */}
      <rect x="218" y="78" width="44" height="184" rx="4" fill="#092e48" />
      {/* Líneas de texto en página izquierda */}
      <rect x="100" y="110" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="126" width="80" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="142" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="158" width="60" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="174" width="90" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="190" width="75" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="100" y="206" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      {/* Líneas de texto en página derecha */}
      <rect x="278" y="110" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="126" width="70" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="142" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="158" width="85" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="174" width="55" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="190" width="100" height="6" rx="3" fill="white" opacity="0.3" />
      <rect x="278" y="206" width="65" height="6" rx="3" fill="white" opacity="0.3" />

      {/* Palabra destacada en página izquierda */}
      <rect x="100" y="230" width="50" height="14" rx="3" fill="#00ff0d" opacity="0.7" />
      <rect x="158" y="230" width="42" height="14" rx="3" fill="#00ff0d" opacity="0.4" />

      {/* Bocadillo de diálogo flotante */}
      <rect x="310" y="30" width="130" height="48" rx="12" fill="white" />
      <polygon points="330,78 350,78 340,92" fill="white" />
      <rect x="322" y="44" width="70" height="6" rx="3" fill="#0b3c5d" opacity="0.5" />
      <rect x="322" y="56" width="50" height="6" rx="3" fill="#0b3c5d" opacity="0.3" />

      {/* Badge "A → B" */}
      <circle cx="96" cy="48" r="28" fill="#0b3c5d" />
      <text x="96" y="53" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="serif">A→C</text>

      {/* Pluma / lápiz */}
      <rect x="370" y="190" width="12" height="60" rx="4" fill="#0b3c5d" transform="rotate(-20 370 190)" />
      <polygon points="370,248 382,248 376,268" fill="#092e48" transform="rotate(-20 376 258)" />
      <rect x="370" y="190" width="12" height="10" rx="2" fill="#00ff0d" opacity="0.8" transform="rotate(-20 370 190)" />

      {/* Estrella pequeña decorativa */}
      <circle cx="60" cy="320" r="6" fill="#00ff0d" opacity="0.6" />
      <circle cx="420" cy="340" r="4" fill="#0b3c5d" opacity="0.3" />
      <circle cx="200" cy="360" r="5" fill="#0b3c5d" opacity="0.2" />

      {/* Línea de progreso abajo */}
      <rect x="80" y="305" width="320" height="8" rx="4" fill="#e2e8f0" />
      <rect x="80" y="305" width="200" height="8" rx="4" fill="#0b3c5d" opacity="0.7" />
      <circle cx="280" cy="309" r="8" fill="#0b3c5d" />
      <circle cx="280" cy="309" r="4" fill="white" />

      {/* Etiqueta de progreso */}
      <rect x="245" y="322" width="70" height="22" rx="6" fill="#0b3c5d" />
      <text x="280" y="337" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">60% done</text>
    </svg>
  )
}