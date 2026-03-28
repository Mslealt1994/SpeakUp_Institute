/**
 * lib/icons.ts — Librería de iconografía SpeakUp Institute
 *
 * IMPORT:
 * import { SpeakUpIcons } from "@/lib/icons";
 *
 * USO:
 * const Icon = SpeakUpIcons.academy;
 * <Icon size={24} strokeWidth={2} className="text-secondary" />
 *
 * REGLAS DE USO:
 * - strokeWidth: 2 (estándar) | 2.5 (botones grandes)
 * - size:        16 (botones SM) | 20 (botones MD/LG) | 24 (títulos/cards)
 * - color:       className="text-current"   → hereda el color del padre
 *                className="text-secondary" → Azul Institucional
 *                className="text-primary"   → Verde SpeakUp
 *                className="text-accent"    → Cyan
 */

import {
  // ── Academia y Metodología ──
  GraduationCap,
  FlaskConical,
  Route,
  Milestone,
  Zap,
  Brain,
  BookOpenCheck,
  Mic2,
  Languages,
  Library,

  // ── Navegación y Conversión ──
  Home,
  Info,
  Phone,
  Layout,
  ArrowRight,
  MoveRight,
  Sparkles,
  PlayCircle,

  // ── Dashboard y Usuario ──
  UserCircle,
  LayoutDashboard,
  Trophy,
  Clock,
  Calendar,
  Settings,
  LogOut,

  // ── Interfaz y Feedback ──
  Search,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Handshake,
  Gem,
} from "lucide-react";

// ─── Librería organizada por categoría ───────────────────────────────────────

export const SpeakUpIcons = {

  // ── 1. Academia y Metodología ─────────────────────────────────────────────
  // Uso: tarjetas de cursos, secciones de metodología, hitos de aprendizaje

  /** Sección general de Cursos y oferta académica */
  academy:      GraduationCap,

  /** Skill Lab — zonas de experimentación y práctica */
  lab:          FlaskConical,

  /** Roadmap del alumno — visualización del camino */
  roadmap:      Route,

  /** Hitos alcanzados dentro del Roadmap */
  milestone:    Milestone,

  /** Quick Tips / Aprendizaje acelerado — lógica SpeakUp */
  quickTip:     Zap,

  /** Conceptos de estructura mental y lógica */
  logic:        Brain,

  /** Lecciones completadas y progreso de lectura */
  lessonDone:   BookOpenCheck,

  /** Secciones de Speaking y práctica fonética */
  speaking:     Mic2,

  /** Traducción, glosarios y multilingüismo */
  languages:    Languages,

  /** Material descargable y recursos adicionales */
  resources:    Library,

  // ── 2. Navegación y Conversión ────────────────────────────────────────────
  // Uso: navbar, landing pages, botones CTA

  /** Enlace a la página de inicio */
  home:         Home,

  /** Sección "Sobre nosotros" o detalles técnicos del método */
  about:        Info,

  /** Contacto directo, soporte o agendar llamadas */
  contact:      Phone,

  /** Cambio a vista de rejilla / catálogo de cursos */
  catalog:      Layout,

  /** Icono estándar para avance en botones primarios */
  arrowRight:   ArrowRight,

  /** Variante estilizada para CTAs de alto impacto */
  ctaArrow:     MoveRight,

  /** Funciones Premium, beneficios exclusivos o IA */
  premium:      Sparkles,

  /** Video de introducción o demos de clases */
  playDemo:     PlayCircle,

  // ── 3. Dashboard y Usuario ────────────────────────────────────────────────
  // Uso: panel del alumno, perfil, gestión de cuenta

  /** Perfil de usuario — estado neutral/logueado */
  profile:      UserCircle,

  /** Escritorio principal del estudiante */
  dashboard:    LayoutDashboard,

  /** Logros, medallas y certificaciones obtenidas */
  achievement:  Trophy,

  /** Tiempo de estudio invertido e historial */
  studyTime:    Clock,

  /** Gestión de mentorías y fechas de clases */
  schedule:     Calendar,

  /** Configuración de cuenta y preferencias */
  settings:     Settings,

  /** Salida del sistema — usar con variant="danger" en Button */
  logout:       LogOut,

  // ── 4. Interfaz y Feedback ────────────────────────────────────────────────
  // Uso: formularios, estados de carga, validaciones

  /** Buscador de cursos, blog o lecciones */
  search:       Search,

  /** Campo de entrada de correo electrónico */
  email:        Mail,

  /** Campo de contraseña o áreas restringidas */
  password:     Lock,

  /** Éxito — tarea enviada o formulario correcto → text-primary */
  success:      CheckCircle2,

  /** Advertencia — errores o notificaciones → text-amber-500 */
  warning:      AlertCircle,

  /** Alianzas estratégicas — Colaboración con creadores/educadores */
  alliance:     Handshake,

  /** Mecenazgo — Usuarios que financian y catalizan la visión */
  diamond:     Gem,

} as const;

// ─── Tipo utilitario ─────────────────────────────────────────────────────────
// Permite tipar props que reciban un icono de la librería:
//
// interface Props {
//   icon: SpeakUpIconKey;
// }
// const Icon = SpeakUpIcons[props.icon];
// <Icon size={20} />

export type SpeakUpIconKey = keyof typeof SpeakUpIcons;