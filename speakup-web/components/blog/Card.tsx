import Link from "next/link";
import Image from "next/image";
import type { Category, BlogMetadata } from "@/app/types/blog";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Union discriminada por `mode`.
 * TypeScript sabe exactamente qué props existen en cada caso
 * y te avisa en compilación si accedes a algo que no corresponde.
 *
 * mode="category" → recibe Category     (slug, title, description, image?, tag?)
 * mode="post"     → recibe BlogMetadata (todo lo anterior + date, author, etc.)
 */
type BlogCardProps =
  | { mode: "category"; data: Category }
  | { mode: "post";     data: BlogMetadata };

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function BlogCard(props: BlogCardProps) {
  const { mode, data } = props;
  const isPost = mode === "post";

  // Campos comunes — vienen de BaseContent en ambos modos
  const { slug, title, description } = data;

  // Imagen: Category la tiene opcional (fallback a /public/blog/{slug}.jpeg)
  //         BlogMetadata la tiene requerida (viene del frontmatter)
  const imageSrc = data.image ?? `/blog/${slug}.jpeg`;

  // Href: categoría → /blog/{slug}
  //       post      → /blog/{category}/{slug}
  const href = isPost
    ? `/blog/${(data as BlogMetadata).category}/${slug}`
    : `/blog/${slug}`;

  // Tag: en categoría es opcional; en post mostramos la categoría como badge
  const tag = isPost
    ? (data as BlogMetadata).category
    : (data as Category).tag;

  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100
                 shadow-sm overflow-hidden h-full hover:shadow-xl hover:-translate-y-1
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50
                 transition-all duration-200"
      aria-label={isPost ? `Leer: ${title}` : `Ver categoría: ${title}`}
    >
      {/* ── Imagen ── */}
      <div className="relative w-full aspect-16/7 overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />

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

        <p className="font-roboto text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Metadatos — solo en modo post */}
        {isPost && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-roboto">
            <span>{formatDate((data as BlogMetadata).date)}</span>
            <span aria-hidden>·</span>
            <span>{(data as BlogMetadata).readingTime} min lectura</span>
            <span aria-hidden>·</span>
            <span>{(data as BlogMetadata).author}</span>
          </div>
        )}

        {/* CTA */}
        <div className="pt-2 mt-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                           bg-brand-green text-white text-xs font-semibold
                           group-hover:bg-brand-green/90 transition-colors">
            {isPost ? "Leer artículo" : "Explorar"}
            <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}