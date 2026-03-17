import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { CATEGORY_LABELS, CATEGORY_SUBTITLES, VALID_CATEGORIES } from "@/lib/blog";
import { getPostsByCategory } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/Card";
import type { BlogCategory } from "@/app/types/blog";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ category: string }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Type guard — verifica en runtime que el string sea un BlogCategory válido.
 * A diferencia del cast `as BlogCategory`, esto es seguro:
 * TypeScript estrecha el tipo dentro del `if` que lo llama.
 */
function isBlogCategory(value: string): value is BlogCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!isBlogCategory(category)) notFound();

  const posts    = await getPostsByCategory(category);
  const title    = CATEGORY_LABELS[category];
  const subtitle = CATEGORY_SUBTITLES[category];

  return (
    <section
      aria-labelledby="category-heading"
      className="w-full pt-8 pb-10 md:pt-12 md:pb-16"
    >
      <Container>

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h1 id="category-heading" className="mb-4">
            {title}
          </h1>
          <p className="lead text-gray-medium">
            {subtitle}
          </p>
        </div>

        {/* ── Posts ── */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-medium">
            No hay artículos publicados en esta categoría todavía.
          </p>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <li key={post.slug} className="flex flex-col">
                <BlogCard mode="post" data={post} />
              </li>
            ))}
          </ul>
        )}

      </Container>
    </section>
  );
}