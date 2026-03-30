import Button from "./Button";

// ─── Roadmap steps ────────────────────────────────────────────────────────────
const ROADMAP = [
  { value: "v0.1", label: "Arquitectura Core", done: true },
  { value: "Alpha", label: "Skill Lab Test", done: true },
  { value: "Beta", label: "Acceso Prioritario", done: false },
];

// ─── Componente ───────────────────────────────────────────────────────────────
export default function UnderConstruction() {
  return (
    <div>
      {/* ── Fondo decorativo (oculto a lectores de pantalla) ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 h-full w-full bg-secondary overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial from-secondary to-secondary-dark" />
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-secondary-dark/50 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Contenedor centrado con max-width ── */}
      <div className="relative flex items-center min-h-[80vh] px-6 sm:px-10 md:px-16 py-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
          {/* ── Columna izquierda — en mobile va segunda (order-2) ── */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            {/* Badge — role="status" para lectores de pantalla */}
            <p
              role="status"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-sm font-heading"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-primary animate-pulse"
              />
              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: "var(--color-primary)" }}
              >
                202 Accepted — Building in progress
              </span>
            </p>

            {/* Título — !text-white sobreescribe color: secondary del global (fondo oscuro) */}
            <h1 className="text-white leading-tight">
              Estamos <span className="text-primary">refactorizando</span>
              <br />
              la educación.
            </h1>

            {/* Descripción */}
            <p className="text-base leading-relaxed max-w-md text-white/65">
              Un sistema diseñado para la ejecución, no para la memorización.
            </p>

            {/* Build in Public tagline — font-heading en lugar de font-mono (fuera del sistema) */}
            <p className="text-sm font-heading text-white/40">
              {"//"} Build in Public: desplegando módulos core.
            </p>

            {/* Roadmap steps — lista semántica */}
            <ul
              aria-label="Estado del roadmap"
              className="flex gap-6 flex-wrap list-none p-0 m-0"
            >
              {ROADMAP.map(({ value, label, done }) => (
                <li key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-2xl font-extrabold italic"
                      style={{
                        color: done
                          ? "var(--color-primary)"
                          : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {value}
                    </span>
                    {done && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="Completado"
                        role="img"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-xs uppercase tracking-tighter"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" href="/">
                Volver al inicio
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>

              <Button
                variant="ghost-light"
                href="https://www.linkedin.com/company/speakup-institute"
                target="_blank"
              >
                Seguir el proceso →
              </Button>
            </div>
          </div>

          {/* ── Columna derecha — en mobile va primera (order-1) ── */}
          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div
              aria-hidden="true"
              className="absolute h-80 w-80 rounded-full blur-[90px] opacity-20"
              style={{ backgroundColor: "var(--color-primary)" }}
            />

            <figure
              className="relative w-full max-w-md rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <figcaption className="sr-only">
                Mockup del editor de código de SpeakUp Platform — skill-lab.tsx
                en desarrollo
              </figcaption>

              {/* Barra de título estilo editor */}
              <div
                aria-hidden="true"
                className="flex items-center gap-2 px-4 py-3 border-b border-white/8"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-amber-400/60" />
                <span className="h-3 w-3 rounded-full bg-primary/60" />
                <span
                  className="ml-3 text-xs font-mono"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  speakup-platform / skill-lab.tsx
                </span>
              </div>

              {/* Líneas de código simuladas — font-mono decorativo, fuera del sistema de diseño intencionalmente */}
              <div
                aria-hidden="true"
                className="px-5 py-5 font-mono text-xs space-y-2"
              >
                {[
                  {
                    indent: 0,
                    text: "export function SkillLab() {",
                    color: "rgba(255,255,255,0.55)",
                  },
                  {
                    indent: 1,
                    text: "const [progress, setProgress]",
                    color: "rgba(255,255,255,0.30)",
                  },
                  {
                    indent: 2,
                    text: "= useState(0); // WIP 🚧",
                    color: "rgba(255,255,255,0.20)",
                  },
                  {
                    indent: 1,
                    text: "return (",
                    color: "rgba(255,255,255,0.30)",
                  },
                  {
                    indent: 2,
                    text: "<Lesson adaptive={true}",
                    color: "var(--color-accent)",
                  },
                  {
                    indent: 3,
                    text: 'lang="en" mode="execution" />',
                    color: "var(--color-accent)",
                  },
                  { indent: 1, text: ");", color: "rgba(255,255,255,0.30)" },
                  { indent: 0, text: "}", color: "rgba(255,255,255,0.55)" },
                ].map(({ indent, text, color }, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{ paddingLeft: `${indent * 1.25}rem` }}
                  >
                    <span
                      className="mr-4 select-none text-right w-4 shrink-0"
                      style={{ color: "rgba(255,255,255,0.15)" }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color }}>{text}</span>
                  </div>
                ))}

                {/* Cursor parpadeante */}
                <div className="flex">
                  <span
                    className="mr-4 select-none text-right w-4 shrink-0"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    9
                  </span>
                  <span
                    className="inline-block w-2 h-4 animate-pulse"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>

              {/* Barra de progreso inferior */}
              <div className="px-5 pb-5">
                <div className="flex justify-between mb-1.5">
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(255,255,255,0.30)" }}
                  >
                    build progress
                  </span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    67%
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={67}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progreso de construcción de la plataforma"
                  className="h-1.5 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "67%",
                      backgroundColor: "var(--color-primary)",
                      boxShadow: "0 0 12px var(--color-primary)",
                    }}
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
