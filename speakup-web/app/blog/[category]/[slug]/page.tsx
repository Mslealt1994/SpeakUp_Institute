import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { VALID_CATEGORIES } from "@/lib/blog";
import { getPostBySlug } from "@/lib/mdx";
import type { BlogCategory } from "@/types/blog";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isBlogCategory(value: string): value is BlogCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── generateStaticParams ─────────────────────────────────────────────────────
// TODO: implementar cuando getAllPosts esté lista
// export async function generateStaticParams() { ... }

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;

  if (!isBlogCategory(category)) notFound();

  const post = await getPostBySlug(category, slug);

  if (!post) notFound();

  const { meta, content } = post;

  return (
    <Container>
      <article className="max-w-4xl mx-auto mt-8 py-12 bg-white/70 rounded-3xl shadow-lg px-6 md:px-12">
        {/* ── Header ── */}
        <header className="flex flex-col gap-6 mb-12">
          <span
            className="w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-widest
                           text-white bg-brand-blue rounded-full"
          >
            {meta.category}
          </span>

          <h1
            className="font-playfair text-center text-4xl md:text-5xl font-black
                         text-brand-blue leading-tight"
          >
            {meta.title}
          </h1>

          <p className="text-xl text-slate-600 font-roboto leading-relaxed">
            {meta.description}
          </p>

          {/* Metadatos */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm text-slate-400
                          font-roboto border-y border-slate-100 py-4"
          >
            <span className="font-bold text-slate-600">{meta.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span aria-hidden>·</span>
            <span>{meta.readingTime} min lectura</span>
          </div>
        </header>

        {/* ── Imagen principal ── */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16">
          <Image
            src={meta.image}
            alt={meta.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ── Contenido MDX ── */}
        <div
          className="prose prose-slate lg:prose-xl max-w-none
                        prose-headings:font-playfair prose-headings:text-brand-blue prose-headings:font-black
                        prose-p:font-roboto prose-p:text-slate-800 prose-p:leading-relaxed
                        prose-strong:text-brand-blue
                        prose-blockquote:border-l-brand-green prose-blockquote:bg-slate-50
                        prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                        prose-img:rounded-3xl prose-img:shadow-lg"
        >
          {content}
        </div>

        {/* ── Footer — Tags ── */}
        <footer className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </Container>
  );
}
