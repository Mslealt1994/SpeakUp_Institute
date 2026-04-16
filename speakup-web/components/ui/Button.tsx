"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SpeakUpIcons, type SpeakUpIconKey } from "@/lib/icon-map";

// ─── Utilidad ─────────────────────────────────────────────────────────────────
const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | "neutral"
  | "ghost"
  | "ghost-light"
  | "disabled"
  | "social";

interface BaseProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  icon?: SpeakUpIconKey;
  iconPosition?: "left" | "right";
}

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

// ─── Variantes ────────────────────────────────────────────────────────────────
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary   text-white hover:bg-primary-dark   hover:scale-105",
  secondary: "bg-secondary text-white hover:bg-secondary-dark hover:scale-105",
  warning: "bg-amber-500 text-white hover:bg-amber-600      hover:scale-105",
  danger: "bg-red-600   text-white hover:bg-red-700        hover:scale-105",
  neutral: "bg-main      text-white hover:bg-gray-800       hover:scale-105",
  ghost:
    "bg-transparent text-secondary underline-offset-4 hover:underline shadow-none",
  "ghost-light":
    "bg-transparent text-white underline-offset-4 hover:text-white/80 hover:underline shadow-none",
  disabled:
    "bg-line text-gray-medium cursor-not-allowed shadow-none pointer-events-none",
  social:
    "bg-white text-main border border-line hover:bg-secondary hover:text-white hover:scale-105",
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
function scrollToAnchor(href: string): boolean {
  if (!href.startsWith("#")) return false;

  const id = href.slice(1);
  const target = document.getElementById(id);

  if (!target) {
    console.warn(`[Button] No se encontró el elemento con id="${id}"`);
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
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
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const isActuallyDisabled =
    variant === "disabled" || ("disabled" in props && props.disabled);
  const resolvedVariant = isActuallyDisabled ? "disabled" : variant;

  const classes = cn(
    BASE,
    fullWidth ? "w-full" : "w-auto",
    VARIANTS[resolvedVariant],
    className,
  );

  const Icon = icon ? SpeakUpIcons[icon] : null;

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
      )}
    </>
  );

  // ── Modo Link ──
  if (href) {
    const { target, rel, href: _href, ...rest } = props as ButtonAsLink;
    const isAnchor = href.startsWith("#");
    const isExternal = href.startsWith("http");

    return (
      <Link
        id={id}
        href={href}
        target={isAnchor ? undefined : target}
        rel={isExternal ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        onClick={
          isAnchor
            ? (e) => {
                e.preventDefault();
                scrollToAnchor(href);
              }
            : undefined
        }
        {...rest}
      >
        {content}
      </Link>
    );
  }

  // ── Modo Button ──
  const { type = "button", ...rest } = props as ButtonAsButton;

  return (
    <button
      id={id}
      type={type}
      disabled={isActuallyDisabled}
      aria-disabled={isActuallyDisabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}