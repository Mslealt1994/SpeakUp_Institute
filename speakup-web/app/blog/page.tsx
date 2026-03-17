import { BLOG_CATEGORIES } from "@/lib/blog";
import Container from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/Card";

export default function HomeBlog() {
  return (
    <section
      aria-labelledby="blog-heading"
      className="w-full pt-8 pb-10 md:pt-12 md:pb-16"
    >
      <Container>

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h1 id="blog-heading" className="mb-4">
            SpeakUp Blog
          </h1>
          <p className="lead text-gray-medium">
            Acompaña nuestra evolución, domina el método y supera tus barreras
            para hablar inglés.
          </p>
        </div>

        {/* ── Categorías ── */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BLOG_CATEGORIES.map((category) => (
            <li key={category.slug} className="flex flex-col">
              <BlogCard mode="category" data={category} />
            </li>
          ))}
        </ul>

      </Container>
    </section>
  );
}