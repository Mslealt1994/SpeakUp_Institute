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
/**
 * Cada variante tiene tres capas:
 * 1. Color base
 * 2. hover:bg-* — cambia el fondo al hacer hover
 * 3. hover:scale-105 — escala sutil
 *
 * La sombra base va en BASE para que todos los botones la hereden.
 * disabled, ghost y ghost-light no escalan — no tiene sentido semántico.
 */
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
/**
 * shadow-md → sombra sutil presente en todos los botones por defecto.
 * Las variantes ghost, ghost-light y disabled la sobreescriben con shadow-none via twMerge.
 */
const BASE = [
  "inline-flex items-center justify-center gap-2",
  "px-7 py-3 rounded-full font-bold text-sm",
  "shadow-md",
  "transition-all duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary",
].join(" ");

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Button({
  variant,
  children,
  fullWidth = false,
  className,
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
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  // ── Modo Button ──
  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}