"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Utilidad ─────────────────────────────────────────────────────────────────
const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"      // Verde SpeakUp — CTA, conversión
  | "secondary"    // Azul Institucional — exploración, confianza
  | "warning"      // Ámbar — atención sin castigo
  | "danger"       // Rojo — acción irreversible
  | "neutral"      // Gris oscuro — opciones de sistema
  | "ghost"        // Transparente — jerarquía mínima, sobre fondos claros
  | "ghost-light"  // Transparente — jerarquía mínima, sobre fondos oscuros
  | "disabled"     // Gris claro — bloqueado lógicamente
  | "social";      // Blanco con borde — login social

interface BaseProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

type ButtonProps =
  | (BaseProps & {
      href: string;
      target?: "_blank" | "_self" | "_parent" | "_top";
      rel?: string;
      disabled?: never;
    })
  | (BaseProps & {
      href?: never;
      target?: never;
      rel?: never;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

// ─── Variantes ────────────────────────────────────────────────────────────────
const VARIANTS: Record<ButtonVariant, string> = {
  primary:       "bg-primary   text-white hover:bg-primary-dark   hover:scale-105",
  secondary:     "bg-secondary text-white hover:bg-secondary-dark hover:scale-105",
  warning:       "bg-amber-500 text-white hover:bg-amber-600      hover:scale-105",
  danger:        "bg-red-600   text-white hover:bg-red-700        hover:scale-105",
  neutral:       "bg-main      text-white hover:bg-gray-800       hover:scale-105",
  ghost:         "bg-transparent text-secondary underline-offset-4 hover:underline shadow-none",
  "ghost-light": "bg-transparent text-white underline-offset-4 hover:text-white/80 hover:underline shadow-none",
  disabled:      "bg-line text-gray-medium cursor-not-allowed shadow-none pointer-events-none",
  social:        "bg-white text-main border border-line hover:bg-secondary hover:text-white hover:scale-105",
};

// ─── Base classes ─────────────────────────────────────────────────────────────
const BASE = [
  "inline-flex items-center justify-center gap-2",
  "px-7 py-3 rounded-full font-bold text-sm",
  "shadow-md",
  "transition-all duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary",
  "not-prose",
].join(" ");

// ─── Helper: smooth scroll a un ancla interna ─────────────────────────────────
/**
 * Dado un href tipo "#curso-preview", busca el elemento con ese id
 * y hace scroll suave hasta él.
 * Devuelve `true` si pudo manejar el scroll (para hacer preventDefault).
 */
function scrollToAnchor(href: string): boolean {
  if (!href.startsWith("#")) return false;

  const id = href.slice(1); // quita el "#"
  const target = document.getElementById(id);

  if (!target) {
    // El elemento todavía no existe en el DOM — dejamos que Next.js lo maneje
    console.warn(`[Button] No se encontró el elemento con id="${id}"`);
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  // Actualiza la URL sin recargar la página
  window.history.pushState(null, "", href);
  return true;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Button({
  variant,
  children,
  fullWidth = false,
  className,
  id,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const isDisabled =
    variant === "disabled" ||
    ("disabled" in props &&
      (props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled);

  const resolvedVariant = isDisabled ? "disabled" : variant;

  const classes = cn(
    BASE,
    fullWidth ? "w-full" : "w-auto",
    VARIANTS[resolvedVariant],
    className,
  );

  // ── Modo Link ──
  if (href) {
    const isAnchor = href.startsWith("#");

    return (
      <Link
        id={id}
        href={href}
        target={isAnchor ? undefined : target}
        rel={
          !isAnchor && target === "_blank"
            ? (rel ?? "noopener noreferrer")
            : rel
        }
        className={classes}
        onClick={
          isAnchor
            ? (e) => {
                e.preventDefault();
                scrollToAnchor(href);
              }
            : undefined
        }
      >
        {children}
      </Link>
    );
  }

  // ── Modo Button ──
  return (
    <button
      id={id}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}