import Container from "@/components/ui/Container";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SpeakUpIcons } from "@/lib/icon-map";
import CoursePreview from "@/components/course/CoursePreview";

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    id: "traduccion",
    title: "Traducción Mental",
    desc: 'Piensas en español y tratas de "cambiar las palabras". Ese proceso es lento y te frustra.',
    iconIdle: "lessonDone",
    iconHover: "success",
    hoverIconClass: "text-primary",
    hoverTitleClass: "group-hover/card:text-primary",
  },
  {
    id: "panico",
    title: "Pánico Escénico",
    desc: "Sabes la gramática en papel, pero cuando abres la boca, el cerebro se bloquea por miedo al error.",
    iconIdle: "secure",
    iconHover: "accessKey",
    hoverIconClass: "text-accent",
    hoverTitleClass: "group-hover/card:text-accent",
  },
  {
    id: "pasivo",
    title: "Estudio Pasivo",
    desc: "Ver series y usar apps no es hablar. Necesitas construir estructuras, no solo consumirlas.",
    iconIdle: "history",
    iconHover: "progress",
    hoverIconClass: "text-primary",
    hoverTitleClass: "group-hover/card:text-primary",
  },
] as const;

const SPRINTS = [
  { num: "01", title: "Identidad",   desc: "Preséntate. Define quién eres en inglés." },
  { num: "02", title: "Entorno",     desc: "Describe tu espacio y lo que te rodea." },
  { num: "03", title: "Rutina",      desc: "Habla de lo que haces en el día a día." },
  { num: "04", title: "Interacción", desc: "Conversaciones reales con otras personas." },
  { num: "05", title: "Mundo real",  desc: "Situaciones que pasan fuera del aula." },
  { num: "06", title: "Pasado",      desc: "Cuenta experiencias que viviste." },
  { num: "07", title: "Planes",      desc: "Habla del futuro con claridad." },
  { num: "08", title: "Integración", desc: "Todo junto. Comunicación funcional.", final: true },
];

const PISTAS = [
  { key: "audio",      title: "Sonido",    desc: "Cómo se escucha el idioma. Entrenas el oído antes de hablar." },
  { key: "logic",      title: "Lógica",    desc: "Cómo se construye una frase. La gramática como ingeniería." },
  { key: "lessonDone", title: "Input",     desc: "Cómo lo entiendes. Comprensión antes de producción." },
  { key: "languages",  title: "Contexto",  desc: "Cuándo y cómo usarlo. El idioma vive en situaciones reales." },
  { key: "premium",    title: "Juego",     desc: "Cómo lo retienes. La memoria funciona con repetición activa." },
  { key: "writing",    title: "Escritura", desc: "Cómo lo produces. Escribir consolida lo que aprendiste." },
] as const;

const PASOS_REVELACION = [
  "Practicas con piezas reales",
  "Cometes errores sin fricción",
  "Ajustas la estructura",
  "Repites en contexto real",
] as const;

const RESULTADOS = [
  "Puedes presentarte con confianza",
  "Haces preguntas y entiendes respuestas",
  "Resuelves situaciones básicas del día a día",
  "Comunicas ideas simples con claridad",
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CoursePage() {
  return (
    <>
      {/* ── Hero ── */}
      <Container as="section" className="relative overflow-hidden pt-12 pb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16">
          <div className="flex-1 space-y-6 md:space-y-8">
            <h1>
              Domina el sistema. <br />
              No las <span className="text-primary">reglas</span>.
            </h1>
            <p className="text-lg text-gray-medium leading-relaxed max-w-xl">
              Memorizar no funciona cuando necesitas usar el idioma bajo presión.
              Aquí construyes la lógica para comunicarte, incluso cuando no recuerdas todo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" href="#curso-preview">Empieza a construir</Button>
              <Button variant="secondary" href="#como-aprendes">Ver metodología</Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="w-full aspect-4/3 md:aspect-square bg-soft rounded-2xl relative overflow-hidden">
              <Image
                src="/course/hero.jpg"
                alt="Mujer sonriente aprendiendo inglés"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-80 mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── Pain Points ── */}
      <Container as="section" variant="fullbleed" className="bg-soft py-24 overflow-hidden">
        <h2 className="text-center mb-12 md:mb-16">¿Por qué sientes que no avanzas?</h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PAIN_POINTS.map(({ id, title, desc, iconIdle, iconHover, hoverIconClass, hoverTitleClass }) => {
            const IconIdle = SpeakUpIcons[iconIdle];
            const IconHover = SpeakUpIcons[iconHover];
            return (
              <div
                key={id}
                className="group/card relative bg-white p-6 md:p-8 rounded-xl shadow-sm space-y-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:z-10 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-primary to-accent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                />
                <div className="h-12 w-12 flex items-center justify-center">
                  <div className="group-hover/card:hidden text-red-500">
                    <IconIdle size={40} strokeWidth={2} />
                  </div>
                  <div className={`hidden group-hover/card:block animate-in zoom-in-75 ${hoverIconClass}`}>
                    <IconHover size={40} strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className={`text-xl font-bold text-secondary transition-colors ${hoverTitleClass}`}>
                  {title}
                </h3>
                <p className="text-gray-medium leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* ── Manifiesto ── */}
      <Container as="section" variant="fullbleed" className="bg-white py-20 md:py-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-150 h-150 rounded-full bg-primary/5 blur-[120px]" />
        </div>

        {/* max-w-3xl intencional: el fondo toca bordes, el texto no */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-headline font-extrabold italic leading-tight">
            El inglés no se estudia. <br />
            <span className="text-primary">Se construye.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-medium leading-relaxed">
            Tratamos el lenguaje como una herramienta de ingeniería, no como una lista de vocabulario.
            Aprendes las piezas, entiendes la lógica de ensamblaje y luego las usas para expresar quién eres realmente.
          </p>
        </div>
      </Container>

      {/* ── Muestra Interactiva ── */}
      <Container
        id="curso-preview"
        as="section"
        variant="fullbleed"
        className="bg-secondary text-white py-24 overflow-hidden"
      >
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-100 h-100 rounded-full bg-primary/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-100 h-100 rounded-full bg-accent/15 blur-[120px]" />

        <Container as="div" variant="2-col" className="relative z-10 items-center gap-16">
          <div className="space-y-8">
            <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              STUDENT_LOG // SESSION 01
            </span>
            <div className="space-y-4">
              <h2 className="text-white">Protocolo de Entrenamiento Activo</h2>
              <p className="text-white/80 max-w-md leading-relaxed">
                Ejecuta el ciclo de aprendizaje: captura la intención nativa, descompila la lógica del sistema
                y valida tu capacidad de respuesta mediante producción escrita funcional.
              </p>
            </div>
            <CoursePreview />
          </div>

          <div className="hidden md:block relative">
            <div className="w-full aspect-4/3 rounded-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)] relative">
              <Image
                src="/course/the_architecture_of_speech.jpg"
                alt="Bloques de construcción representando el idioma"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Container>

      {/* ── Revelación del sistema ── */}
      <Container as="section" variant="fullbleed" className="py-24 bg-white/50">
        <Container as="div" variant="2-col" className="items-center gap-16">
          <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
            <div className="aspect-square rounded-xl overflow-hidden bg-soft relative">
              <Image src="/course/revelation_a.jpg" alt="Equipo colaborando" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-soft relative translate-y-8">
              <Image src="/course/revelation_b.jpg" alt="Aprendizaje digital" fill sizes="25vw" className="object-cover" />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <SpeakUpIcons.quickTip size={14} strokeWidth={2.5} />
              Lo que acabas de hacer
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold italic text-secondary leading-tight mb-4">
              No memorizaste una regla.
              <br />
              Entendiste una estructura.
            </h2>
            <p className="text-gray-medium text-base leading-relaxed mb-8">
              Así es como progresas en el sistema:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PASOS_REVELACION.map((paso, i) => (
                <div key={paso} className="bg-white border border-line rounded-xl p-5 flex flex-col gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-main leading-relaxed">{paso}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base font-semibold text-secondary">Eso es aprendizaje funcional.</p>
          </div>
        </Container>
      </Container>

      {/* ── Roadmap de Sprints ── */}
      <Container as="section" variant="fullbleed" className="bg-soft py-24">
        <div className="mb-10">
          <h2 className="mb-3">Cómo está construido el curso</h2>
          <p className="text-gray-medium text-sm leading-relaxed max-w-lg">
            No está organizado por temas.
            <br />
            Está organizado por <strong className="text-secondary">uso real del idioma</strong>.
            Avanzas a través de Sprints.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-8">
          {SPRINTS.map(({ num, title, desc, final }) => (
            <div
              key={num}
              className={[
                "shrink-0 w-44 snap-start rounded-xl border p-4 flex flex-col gap-1.5 transition-transform hover:-translate-y-1",
                final
                  ? "bg-secondary border-transparent"
                  : "bg-white border-line border-t-2 border-t-primary",
              ].join(" ")}
            >
              <span className={`text-xs font-bold uppercase tracking-widest ${final ? "text-primary" : "text-primary-dark"}`}>
                Sprint {num}
              </span>
              <span className={`font-headline font-bold italic text-base ${final ? "text-white" : "text-secondary"}`}>
                {title}
              </span>
              <p className={`text-xs leading-relaxed ${final ? "text-white/65" : "text-gray-medium"}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-medium mt-2 md:hidden">← Desliza para ver los 8 sprints</p>
      </Container>

      {/* ── Las 6 pistas ── */}
      <Container
        id="como-aprendes"
        variant="fullbleed"
        as="section"
        className="py-24 bg-white/80"
      >
        <div className="mb-10">
          <h2 className="mb-3">Cómo aprendes: las 6 pistas</h2>
          <p className="text-gray-medium text-sm leading-relaxed max-w-lg">
            Cada sesión entrena múltiples capas del idioma. No aprendes una cosa a la vez.{" "}
            <strong className="text-secondary">Aprendes a usar el idioma.</strong>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PISTAS.map(({ key, title, desc }) => {
            const Icon = SpeakUpIcons[key];
            return (
              <div
                key={title}
                className="group bg-white border border-line rounded-4xl p-8 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-soft flex items-center justify-center text-primary-dark transition-colors group-hover:bg-primary/10">
                  <Icon size={30} strokeWidth={2} />
                </div>
                <span className="text-2xl font-headline font-bold text-secondary">{title}</span>
                <p className="text-base leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* ── Resultado realista ── */}
      <Container as="section" variant="fullbleed" className="bg-soft py-24">
        {/* max-w-2xl intencional: el fondo toca bordes, el texto no */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Resultado realista</h2>
          <p className="text-lg text-gray-medium leading-relaxed mb-8">
            Este curso no te hace fluido.{" "}
            <strong className="text-secondary">Te hace funcional.</strong>
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-left mb-8">
            {RESULTADOS.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-line rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-primary shrink-0 mt-0.5 flex items-center justify-center">
                  <SpeakUpIcons.success size={11} strokeWidth={2.5} className="text-white" />
                </div>
                <span className="text-sm text-main leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-5 py-4 text-left">
            <p className="text-sm text-secondary leading-relaxed">
              No es perfección. Es capacidad de interacción.
              <br />Y eso, para la mayoría de personas, es exactamente lo que necesitan.
            </p>
          </div>
        </div>
      </Container>

      {/* ── CTA Final ── */}
      <Container as="section" className="py-24">
        <div className="relative bg-secondary rounded-[3rem] py-20 px-8 md:px-20 text-center overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full bg-primary/25 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-accent/20 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold italic text-white leading-tight mb-6">
              Deja de intentar recordar.
              <br />
              <span className="text-primary">Empieza a construir.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Entra al sistema y pruébalo. Sin promesas vacías.
            </p>
            <Button variant="primary" className="rounded-full px-10 py-4 text-base font-bold">
              <SpeakUpIcons.ctaArrow size={20} strokeWidth={2} className="mr-2" />
              Entra al sistema
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}