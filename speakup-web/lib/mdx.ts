/**
 * lib/blog.ts — Utilidad de lectura de posts MDX
 *
 * Usa los tipos canónicos de @/app/types/blog.ts como única fuente de verdad.
 * No redefine estructuras — solo consume y transforma.
 */

import fs from 'fs';
import path from 'path';
import type { ReactElement } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import type { BlogMetadata, BlogCategory } from '@/types/blog';
import Button from '@/components/ui/Button';

// ─── Tipos ─────────────────────────────────────────────────────────────────────

/**
 * Lo que devuelve getPostBySlug.
 * Separamos meta y content porque en listados solo necesitas meta
 * y compilar el JSX completo tiene un costo — no lo hagas si no lo vas a renderizar.
 */
export interface Post {
  meta: BlogMetadata;
  content: ReactElement;
}

// ─── Constantes ────────────────────────────────────────────────────────────────

const ROOT_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Componentes disponibles dentro del MDX.
 * La responsabilidad visual queda aquí — el MDX solo declara qué componente usar.
 */
const MDX_COMPONENTS = {
  Video: VideoEmbed,
  Button: Button
};

// ─── Helpers privados ──────────────────────────────────────────────────────────

function getMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'));
}

// ─── API pública ───────────────────────────────────────────────────────────────

/**
 * getPostBySlug
 * Lee y compila un post específico desde /content/{category}/{slug}.mdx
 *
 * El genérico <Omit<BlogMetadata, 'slug' | 'category'>> le dice a compileMDX qué
 * forma tiene el frontmatter — slug y category no viven en el frontmatter sino en
 * la ruta, por eso los inyectamos manualmente al construir el objeto meta.
 */
export async function getPostBySlug(
  category: BlogCategory,
  slug: string
): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(ROOT_CONTENT_DIR, category, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `[blog] Post no encontrado → category: "${category}" | slug: "${realSlug}"\n` +
      `Ruta: ${filePath}`
    );
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX<Omit<BlogMetadata, 'slug' | 'category'>>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: MDX_COMPONENTS,
  });

  return {
    meta: { ...frontmatter, slug: realSlug, category },
    content,
  };
}

/**
 * getPostsByCategory
 * Devuelve los metadatos de todos los posts publicados de una categoría,
 * ordenados del más reciente al más antiguo.
 *
 * draft: true → el post existe pero no aparece en producción.
 */
export async function getPostsByCategory(
  category: BlogCategory
): Promise<BlogMetadata[]> {
  const categoryDir = path.join(ROOT_CONTENT_DIR, category);
  const mdxFiles = getMdxFiles(categoryDir);

  if (mdxFiles.length === 0) return [];

  const posts = await Promise.all(
    mdxFiles.map((filename) =>
      getPostBySlug(category, filename.replace(/\.mdx$/, ''))
    )
  );

  return posts
    .map((p) => p.meta)
    .filter((meta) => !meta.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * getAllPosts
 * Agrega los posts publicados de todas las categorías definidas en BlogCategory.
 *
 * Itera sobre un array de categorías conocidas (type-safe) en lugar de leer
 * carpetas del disco — TypeScript valida que no uses una categoría inexistente.
 */
export async function getAllPosts(): Promise<BlogMetadata[]> {
  const categories: BlogCategory[] = ['founders-log', 'methodology', 'mindset'];

  const postsByCategory = await Promise.all(
    categories.map((cat) => getPostsByCategory(cat))
  );

  return postsByCategory
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}