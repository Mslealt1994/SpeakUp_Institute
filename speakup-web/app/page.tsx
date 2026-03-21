import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="py-8 sm:py-24">
      <Container className="max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Texto — izquierda ── */}
          <div
            className="flex-1 bg-white/50 p-6 rounded-2xl
                          order-last text-center
                          lg:order-first lg:text-left"
          >
            {/* H6 — etiqueta sobre el título */}
            <p className="mb-4 text-sm font-bold text-gray-medium uppercase tracking-widest">
              Build in Public • El nuevo estándar en inglés
            </p>

            {/* H1 — hereda estilos de globals.css */}
            <h1 className="mb-6">
              Inglés con estructura, lógica y propósito real.
            </h1>

            {/* Lead paragraph */}
            <p className="lead mb-10 max-w-lg mx-auto lg:mx-0">
              No solo una plataforma, un ecosistema en evolución. Fusionamos
              rigor académico y lógica técnica para crear profesionales
              globales.
            </p>

            {/*
              Botones:
              - Mobile:  columna, centrados  → flex-col items-center
              - Desktop: fila, alineados al texto → sm:flex-row lg:justify-start
              En desktop el texto está a la izquierda (lg:text-left),
              por eso los botones también van a la izquierda con lg:justify-start.
            */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {/* ── PRIMARY — Acción principal */}
              <Button variant="primary" href="/blog/founders-log">
                Cada paso cuenta
              </Button>

              <Button
                variant="secondary"
                href="https://github.com/users/Mslealt1994/projects/5"
                target="_blank"
              >
                Explora el roadmap
              </Button>
            </div>
          </div>

          {/* ── Ilustración — derecha ── */}
          <div
            className="flex-1 w-full max-w-sm mx-auto
                          order-first lg:order-last lg:max-w-none
                          bg-white/50 rounded-2xl"
          >
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Ilustración ──────────────────────────────────────────────────────────────

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
      <rect x="80" y="80" width="140" height="180" rx="8" fill="#0B3C5D" />
      <rect
        x="260"
        y="80"
        width="140"
        height="180"
        rx="8"
        fill="#0B3C5D"
        opacity="0.85"
      />
      {/* Lomo */}
      <rect x="218" y="78" width="44" height="184" rx="4" fill="#082D46" />

      {/* Líneas página izquierda */}
      {[110, 126, 142, 158, 174, 190, 206].map((y, i) => (
        <rect
          key={`left-${i}`}
          x="100"
          y={y}
          width={[100, 80, 100, 60, 90, 75, 100][i]}
          height="6"
          rx="3"
          fill="white"
          opacity="0.3"
        />
      ))}

      {/* Líneas página derecha */}
      {[110, 126, 142, 158, 174, 190, 206].map((y, i) => (
        <rect
          key={`right-${i}`}
          x="278"
          y={y}
          width={[100, 70, 100, 85, 55, 100, 65][i]}
          height="6"
          rx="3"
          fill="white"
          opacity="0.3"
        />
      ))}

      {/* Palabras destacadas */}
      <rect
        x="100"
        y="230"
        width="50"
        height="14"
        rx="3"
        fill="#58CC02"
        opacity="0.7"
      />
      <rect
        x="158"
        y="230"
        width="42"
        height="14"
        rx="3"
        fill="#58CC02"
        opacity="0.4"
      />

      {/* Bocadillo de diálogo */}
      <rect x="310" y="30" width="130" height="48" rx="12" fill="white" />
      <polygon points="330,78 350,78 340,92" fill="white" />
      <rect
        x="322"
        y="44"
        width="70"
        height="6"
        rx="3"
        fill="#0B3C5D"
        opacity="0.5"
      />
      <rect
        x="322"
        y="56"
        width="50"
        height="6"
        rx="3"
        fill="#0B3C5D"
        opacity="0.3"
      />

      {/* Badge A→C */}
      <circle cx="96" cy="48" r="28" fill="#0B3C5D" />
      <text
        x="96"
        y="53"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="serif"
      >
        A→C
      </text>

      {/* Pluma */}
      <rect
        x="370"
        y="190"
        width="12"
        height="60"
        rx="4"
        fill="#0B3C5D"
        transform="rotate(-20 370 190)"
      />
      <polygon
        points="370,248 382,248 376,268"
        fill="#082D46"
        transform="rotate(-20 376 258)"
      />
      <rect
        x="370"
        y="190"
        width="12"
        height="10"
        rx="2"
        fill="#58CC02"
        opacity="0.8"
        transform="rotate(-20 370 190)"
      />

      {/* Decoración */}
      <circle cx="60" cy="320" r="6" fill="#58CC02" opacity="0.6" />
      <circle cx="420" cy="340" r="4" fill="#0B3C5D" opacity="0.3" />
      <circle cx="200" cy="360" r="5" fill="#0B3C5D" opacity="0.2" />

      {/* Barra de progreso */}
      <rect x="80" y="305" width="320" height="8" rx="4" fill="#E5E7EB" />
      <rect
        x="80"
        y="305"
        width="200"
        height="8"
        rx="4"
        fill="#0B3C5D"
        opacity="0.7"
      />
      <circle cx="280" cy="309" r="8" fill="#0B3C5D" />
      <circle cx="280" cy="309" r="4" fill="white" />

      {/* Etiqueta progreso */}
      <rect x="245" y="322" width="70" height="22" rx="6" fill="#0B3C5D" />
      <text
        x="280"
        y="337"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontFamily="sans-serif"
      >
        60% done
      </text>
    </svg>
  );
}
