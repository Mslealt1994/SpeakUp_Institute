import { Category, BlogCategory } from "@/types/blog";

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "founders-log": "Bitácora del Fundador",
  "methodology": "Metodologías",
  "mindset": "Cultura & Mentalidad",
};

export const CATEGORY_SUBTITLES: Record<BlogCategory, string> = {
  "founders-log": "Documentamos el proceso, compartimos nuestra evolución y revelamos el futuro de la plataforma.",
  "methodology": "Domina el marco, acelera tu aprendizaje y transforma tu estudio en comunicación real.",
  "mindset": "Reprograma tu mente, vence el juicio externo y libera tu verdadera confianza al hablar.",
}

export const BLOG_CATEGORIES: Category[] = [
  {
    slug: "founders-log",
    tag: "Nuevo",
    title: CATEGORY_LABELS["founders-log"],
    description: "El diario crudo de cómo estamos reinventando el aprendizaje de idiomas. Entérate de las actualizaciones y la visión del futuro de la plataforma.",
  },
  {
    slug: "methodology",
    title: CATEGORY_LABELS["methodology"],
    description: "Olvida los métodos tradicionales. Aquí diseccionamos las técnicas de alto rendimiento que transforman el estudio pasivo en una habilidad de comunicación real.",
  },
  {
    slug: "mindset",
    title: CATEGORY_LABELS["mindset"],
    description: "Vence el miedo al juicio. Herramientas de mentalidad y estrategias culturales para que dejes de traducir en tu cabeza y empieces a vivir el idioma con libertad.",
  },
];

// lib/blog.ts
export const VALID_CATEGORIES: BlogCategory[] = [
  'founders-log',
  'methodology', 
  'mindset',
];