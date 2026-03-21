import Link from "next/link";
import Image from "next/image";
import type { Category, BlogMetadata } from "@/app/types/blog";
import Button from "@/components/ui/Button";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Union discriminada por `mode`.
 * mode="category" → recibe Category     (slug, title, description, image?, tag?)
 * mode="post"     → recibe BlogMetadata (todo lo anterior + date, author, etc.)
 */
type BlogCardProps =
  | { mode: "category"; data: Category }
  | { mode: "post"; data: BlogMetadata };

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

  const { slug, title, description } = data;

  const imageSrc = data.image ?? `/blog/${slug}.jpeg`;
  const href = isPost
    ? `/blog/${(data as BlogMetadata).category}/${slug}`
    : `/blog/${slug}`;
  const tag = isPost ? (data as BlogMetadata).category : (data as Category).tag;

  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-white rounded-2xl border border-line
                 shadow-sm overflow-hidden h-full
                 hover:shadow-xl hover:-translate-y-1
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50
                 transition-all duration-200"
      aria-label={isPost ? `Leer: ${title}` : `Ver categoría: ${title}`}
    >
      {/* ── Imagen ── */}
      <div className="relative w-full aspect-16/7 overflow-hidden bg-soft">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />

        {tag && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold tracking-widest
                           uppercase text-white bg-secondary/80 backdrop-blur-sm
                           px-2.5 py-1 rounded-full z-10"
          >
            {tag}
          </span>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* H3 — hereda estilos de globals.css */}
        <h3 className="text-xl leading-snug group-hover:opacity-80 transition-opacity line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-medium leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Metadatos — solo en modo post */}
        {isPost && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-medium">
            <span>{formatDate((data as BlogMetadata).date)}</span>
            <span aria-hidden>·</span>
            <span>{(data as BlogMetadata).readingTime} min lectura</span>
            <span aria-hidden>·</span>
            <span>{(data as BlogMetadata).author}</span>
          </div>
        )}

        {/* CTA */}

        <div className="pt-2 mt-auto">
          <Button variant="primary" className="inline-flex text-xs">
            {isPost ? "Leer artículo" : "Explorar"}
            <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
              →
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
