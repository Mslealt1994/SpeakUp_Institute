import Container from "@/components/ui/Container";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SpeakUpIcons } from "@/lib/icon-map";

// ─── Datos ────────────────────────────────────────────────────────────────────

const MANIFEST_VALUES = [
  {
    icon: "logic" as const,
    title: "Lógica sobre memoria",
    description:
      "Priorizamos la comprensión profunda del idioma sobre la repetición mecánica. Entender la estructura permite generar lenguaje, no solo recordarlo.",
  },
  {
    icon: "lab" as const,
    title: "Práctica radical",
    description:
      "El aprendizaje ocurre en la ejecución. Diseñamos entornos (Skill Lab) donde el error no se evita, sino que se utiliza como el motor esencial del progreso.",
  },
  {
    icon: "lessonDone" as const,
    title: "Claridad estructural",
    description:
      "Reducimos la complejidad innecesaria. Todo —desde nuestra metodología pedagógica hasta la interfaz de nuestra plataforma— está diseñado para ser claro, ordenado y funcional.",
  },
  {
    icon: "milestone" as const,
    title: "Progreso medible",
    description:
      "El aprendizaje debe ser visible. Construimos procesos donde cada avance es tangible, permitiendo al estudiante entender exactamente qué está mejorando y por qué.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Steven Leal Talero",
    role: "Fundador & Arquitecto del Sistema",
    bio: "Desarrollador fullstack y diseñador de metodologías de aprendizaje. Construyó SpeakUp Institute desde cero con la convicción de que aprender inglés debe ser un proceso lógico, medible y transformador.",
    image: "/about/founder.jpg",
    linkedin: "https://www.linkedin.com/in/mslealt/",
    github: "https://github.com/Mslealt1994",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      {/* mt-10 compensa la altura del navbar fijo */}
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden min-h-[85vh] flex items-center mt-10 py-16"
      >
        <Image
          src="/about/hero-image.jpg"
          alt="Persona representando el aprendizaje de inglés"
          fill
          priority
          className="object-cover object-left -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10
                     bg-linear-to-b from-white/70 to-white/70
                     md:bg-linear-to-r md:from-transparent md:via-white/10 md:to-white"
        />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block" aria-hidden="true" />
            <div className="flex flex-col items-center md:items-start gap-8">
              <h1 id="about-heading" className="text-center md:text-left">
                Cerrando la brecha entre la teoría y la comunicación real
              </h1>
              <p className="text-center md:text-left">
                Aprender inglés no es memorizar — es entender el sistema y
                usarlo.
              </p>
              <Button
                variant="primary"
                href="https://github.com/users/Mslealt1994/projects/5"
                target="_blank"
                aria-label="Explora el roadmap en GitHub"
              >
                Explora el roadmap
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Misión ── */}
      <section
        aria-labelledby="mission-heading"
        className="bg-soft/90 py-16 md:py-24 lg:py-48"
      >
        <Container className="grid grid-cols-1 md:grid-cols-[1fr_4fr_1fr] items-center gap-8">
          <div className="hidden md:flex justify-end pr-16">
            <Image
              src="/about/recurso1.svg"
              alt=""
              aria-hidden="true"
              width={128}
              height={0}
              style={{ height: "auto" }}
              className="object-contain"
            />
          </div>
          <div className="text-center space-y-6">
            <h2 id="mission-heading">Nuestra Misión</h2>
            <p className="font-semibold text-secondary text-lg leading-relaxed">
              SpeakUp Institute existe para cerrar la brecha entre el
              conocimiento teórico del inglés y la capacidad real de
              comunicación. Entendemos el idioma no como un conjunto de reglas
              aisladas, sino como un sistema estructurado que, al ser
              comprendido, permite a las personas expresar ideas con claridad y
              confianza en contextos de la vida real.
            </p>
            <p className="font-semibold text-secondary text-lg leading-relaxed">
              Nuestra metodología se basa en la práctica deliberada y el
              pensamiento estructural. A través del{" "}
              <em className="text-primary font-bold not-italic">Skill Lab</em>,
              convertimos el error en una herramienta de aprendizaje, eliminando
              la barrera del miedo y facilitando un progreso constante hacia la
              comunicación activa.
            </p>
          </div>
          <div className="hidden md:flex justify-start pl-16">
            <Image
              src="/about/recurso2.svg"
              alt=""
              aria-hidden="true"
              width={128}
              height={0}
              style={{ height: "auto" }}
              className="object-contain"
            />
          </div>
        </Container>
      </section>

      {/* ── Manifiesto de Valores ── */}
      <section aria-labelledby="manifest-heading" className="py-20">
        <Container>
          <h2 id="manifest-heading" className="text-center mb-12">
            El Manifiesto de Valores
          </h2>
          <ul
            role="list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {MANIFEST_VALUES.map(({ icon, title, description }) => {
              const Icon = SpeakUpIcons[icon];
              return (
                <li
                  key={title}
                  className="flex flex-col items-center text-center gap-4 bg-white
                       rounded-3xl py-8 px-6 shadow-md
                       transition-all duration-200 hover:shadow-lg hover:scale-105
                       max-w-sm mx-auto w-full"
                >
                  <Icon
                    size={50}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-primary"
                  />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ── Skill Lab ── */}
      <section
        aria-labelledby="skilllab-heading"
        className="w-full bg-secondary py-32"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
            <div className="flex justify-center">
              <div
                className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden
                     shadow-lg ring-2 ring-primary"
              >
                <Image
                  src="/about/skilllab.png"
                  alt="Skill Lab — práctica activa"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 text-center md:text-left">
              <h2 id="skilllab-heading" className="text-white">
                El Skill Lab: donde el error es progreso
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                El{" "}
                <em className="text-primary not-italic font-bold">Skill Lab</em>{" "}
                es el corazón de nuestra metodología: un ecosistema de práctica
                medible donde aplicas la lógica sobre la memoria. Mediante
                ejercicios de construcción de ideas y feedback inmediato,
                transformamos el conocimiento pasivo en habilidad activa. No
                estás aquí para repetir; estás aquí para experimentar,
                estructurar y dominar el sistema del inglés en tiempo real.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Visión ── */}
      <section
        aria-labelledby="vision-heading"
        className="bg-soft/90 py-16 md:py-24 lg:py-48"
      >
        <Container className="md:max-w-xl lg:max-w-4xl text-center">
          <h2 id="vision-heading" className="mb-10">
            Nuestra Visión
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Convertirnos en el estándar de referencia para el aprendizaje del
              inglés en el mundo hispanohablante, integrando claridad
              estructural, práctica constante y pensamiento lógico. Aspiramos a
              construir un ecosistema donde aprender inglés deje de ser un
              proceso ambiguo y se convierta en una disciplina clara, medible y
              orientada a resultados.
            </p>
            <p className="text-lg leading-relaxed">
              Buscamos que el idioma deje de ser una barrera y se transforme en
              una herramienta de crecimiento profesional y personal, ampliando
              las oportunidades y la capacidad de expresión de nuestros
              estudiantes.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Equipo ── */}
      <section aria-labelledby="team-heading" className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 id="team-heading" className="mb-4">
              Detrás del proyecto
            </h2>
            <p className="lead max-w-xl mx-auto">
              SpeakUp Institute es un proyecto construido en público. Cada
              decisión, cada línea de código y cada metodología se desarrolla
              con transparencia y propósito.
            </p>
          </div>

          <ul role="list" className="flex justify-center">
            {TEAM_MEMBERS.map(
              ({ name, role, bio, image, linkedin, github }) => (
                <li
                  key={name}
                  className="flex flex-col items-center text-center gap-5
                       bg-white rounded-3xl p-8 shadow-md max-w-sm w-full"
                >
                  {image ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                      <Image
                        src={image}
                        alt={name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="w-32 h-32 rounded-full bg-soft flex items-center
                           justify-center ring-4 ring-primary/20 text-gray-medium text-sm"
                    >
                      Foto pendiente
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <h3>{name}</h3>
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                      {role}
                    </p>
                    <p className="text-gray-medium text-sm leading-relaxed">
                      {bio}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {linkedin && (
                      <Button
                        variant="social"
                        href={linkedin}
                        target="_blank"
                        aria-label={`LinkedIn de ${name}`}
                        className="px-4 py-2 text-xs"
                      >
                        LinkedIn
                      </Button>
                    )}
                    {github && (
                      <Button
                        variant="social"
                        href={github}
                        target="_blank"
                        aria-label={`GitHub de ${name}`}
                        className="px-4 py-2 text-xs"
                      >
                        GitHub
                      </Button>
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      {/* ── CTA Final ── */}
      <section aria-labelledby="cta-heading" className="py-24">
        <Container>
          <div
            className="bg-secondary rounded-3xl p-12 flex flex-col items-center
                          text-center gap-8 max-w-2xl mx-auto"
          >
            <h2 id="cta-heading" className="text-white">
              ¿Listo para construir tu inglés con lógica?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Únete al método que transforma la teoría en comunicación real. Da
              el primer paso hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" href="/blog">
                Explorar el Blog
              </Button>
              <Button
                variant="ghost-light"
                href="https://github.com/users/Mslealt1994/projects/5"
                target="_blank"
              >
                Ver el Roadmap →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
