// components/layout/Container.tsx
import { JSX, ReactNode } from "react";

type Variant =
  | "default" // centrado, max-w-7xl
  | "sm" // centrado, max-w-2xl (posts, formularios)
  | "md" // centrado, max-w-4xl
  | "fullbleed" // fondo toca bordes, children centrados adentro
  | "fullbleed-raw" // fondo toca bordes, SIN container interno
  | "2-col" // dos columnas iguales
  | "3-col" // tres columnas iguales
  | "4-col" // cuatro columnas iguales
  | "sidebar" // 1/3 + 2/3
  | "sidebar-right" // 2/3 + 1/3
  | "golden"; // proporción áurea 1 : 1.618

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  gap?: string;
  id?: string;
}

const INNER = "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ";

const variantMap: Record<Variant, string> = {
  default: `${INNER}`,
  sm: "mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8",
  md: "mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8",
  fullbleed: "w-full",
  "fullbleed-raw": "w-full",
  "2-col": `${INNER} grid grid-cols-1 md:grid-cols-2`,
  "3-col": `${INNER} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`,
  "4-col": `${INNER} grid grid-cols-2 lg:grid-cols-4`,
  sidebar: `${INNER} grid grid-cols-1 md:grid-cols-[1fr_2fr]`,
  "sidebar-right": `${INNER} grid grid-cols-1 md:grid-cols-[2fr_1fr]`,
  golden: `${INNER} grid grid-cols-1 md:grid-cols-[1fr_1.618fr]`,
};

export default function Container({
  children,
  className,
  as: Tag = "div",
  variant = "default",
  gap = "gap-8",
  id, // ← desestructurado
}: ContainerProps) {
  if (variant === "fullbleed") {
    return (
      <Tag id={id} className={`w-full ${className ?? ""}`}>
        {" "}
        {/* ← id aquí */}
        <div className={INNER}>{children}</div>
      </Tag>
    );
  }

  if (variant === "fullbleed-raw") {
    return (
      <Tag id={id} className={`w-full ${className ?? ""}`}>
        {" "}
        {/* ← id aquí */}
        {children}
      </Tag>
    );
  }

  const isGrid =
    variant.includes("col") ||
    variant.startsWith("sidebar") ||
    variant === "golden";

  return (
    <Tag
      id={id}
      className={`${variantMap[variant]} ${isGrid ? gap : ""} ${className ?? ""}`}
    >
      {" "}
      {/* ← id aquí */}
      {children}
    </Tag>
  );
}
