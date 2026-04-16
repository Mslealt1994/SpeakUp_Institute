// components/layout/Container.tsx
import React, { ReactNode, forwardRef } from "react";

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
  as?: React.ElementType; 
  variant?: Variant;
  gap?: string;
  py?: string; 
  id?: string;
}

const INNER = "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

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

const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      className = "",
      as: Tag = "div",
      variant = "default",
      gap = "gap-8",
      py = "", // por defecto sin padding vertical extra
      id,
    },
    ref,
  ) => {
    const isGrid =
      variant.includes("col") ||
      variant.startsWith("sidebar") ||
      variant === "golden";

    // Lógica de clases base
    const baseClasses = variantMap[variant] || variantMap.default;
    const gridClasses = isGrid ? `grid ${gap}` : "";

    // Si es fullbleed, el contenedor externo lleva el ID y el fondo,
    // pero el interno lleva el centrado
    if (variant === "fullbleed") {
      return (
        <Tag ref={ref} id={id} className={`w-full ${py} ${className}`}>
          <div className={INNER}>{children}</div>
        </Tag>
      );
    }

    if (variant === "fullbleed-raw") {
      return (
        <Tag ref={ref} id={id} className={`w-full ${py} ${className}`}>
          {children}
        </Tag>
      );
    }

    return (
      <Tag
        ref={ref}
        id={id}
        className={`${baseClasses} ${gridClasses} ${py} ${className}`}
      >
        {children}
      </Tag>
    );
  },
);

Container.displayName = "Container";

export default Container;
