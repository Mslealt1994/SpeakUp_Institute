import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Category {
  slug: string;
  title: string;
  description: string;
  tag?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// El slug define a la vez:
//   - la ruta:  /blog/{slug}
//   - el icono: /public/blog/{slug}.jpeg
const CATEGORIES: Category[] = [
  {
    slug: "founders-log",
    tag: "Nuevo",
    title: "Bitácora del Fundador",
    description:
      "El diario crudo de cómo estamos reinventando el aprendizaje de idiomas. Entérate de nuestras actualizaciones de software, decisiones estratégicas y la visión del futuro de la plataforma.",
  },
  {
    slug: "methodology",
    title: "Metodologías",
    description:
      "Olvida los métodos tradicionales. Aquí diseccionamos las técnicas de alto rendimiento que transforman el estudio pasivo en una habilidad de comunicación real.",
  },
  {
    slug: "mindset",
    title: "Cultura & Mentalidad",
    description:
      "Vence el miedo al juicio. Herramientas de mentalidad y estrategias culturales para que dejes de traducir en tu cabeza y empieces a vivir el idioma con libertad.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const { slug, tag, title, description } = category;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100
                 shadow-sm overflow-hidden h-full
                 hover:shadow-xl hover:-translate-y-1
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50
                 transition-all duration-200"
      aria-label={`Ver categoría: ${title}`}
    >
      {/* ── Imagen ─────────────────────────────────────────────────────────────
          aspect-video = 16:9, consistente en todas las tarjetas.
          sizes refleja el ancho real en cada breakpoint del grid para que
          Next.js descargue la resolución correcta (sin pixelación).
      */}
      <div className="relative w-full aspect-16/7 overflow-hidden bg-slate-100">
        <Image
          src={`/blog/${slug}.jpeg`}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />

        {/* Tag encima de la imagen */}
        {tag && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest
                           uppercase text-white bg-brand-blue/80 backdrop-blur-sm
                           px-2.5 py-1 rounded-full z-10">
            {tag}
          </span>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-playfair font-black text-base text-brand-blue leading-snug
                       group-hover:text-brand-blue/80 transition-colors">
          {title}
        </h3>

        <p className="font-roboto text-slate-900 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* CTA — verde con letra blanca */}
        <div className="pt-2 mt-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                           bg-brand-green text-white text-xs font-semibold
                           group-hover:bg-brand-green/90 transition-colors">
            Explorar
            <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomeBlog() {
  return (
    <section
      aria-labelledby="blog-heading"
      className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-10 md:pt-8 md:pb-12"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <h1
          id="blog-heading"
          className="font-playfair font-black text-brand-blue tracking-tighter leading-tight
                     text-4xl sm:text-5xl md:text-6xl mb-4"
        >
          SpeakUp Blog
        </h1>
        <p className="font-roboto font-bold text-slate-600 leading-relaxed text-base md:text-lg">
          Domina el método, acompaña nuestra evolución y supera tus barreras para hablar inglés.
        </p>
      </div>

      {/* Grid — sin max-w forzado, usa todo el ancho disponible del layout padre */}
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CATEGORIES.map((category) => (
          <li key={category.slug} className="flex flex-col">
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}