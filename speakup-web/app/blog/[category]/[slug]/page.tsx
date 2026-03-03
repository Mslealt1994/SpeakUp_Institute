import { notFound } from "next/navigation";

export default function BlogPostPage() {
  notFound();
  return null; // Añadir esto evita que TS se queje de que falta un retorno de JSX
}