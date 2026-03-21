/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BUTTON — Referencia de uso
 * Componente: @/components/ui/Button
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * IMPORT:
 * import Button from "@/components/ui/Button";
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIANTES DISPONIBLES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * variant="primary"    → Verde SpeakUp  (#58CC02) — CTA principal, conversión
 * variant="secondary"  → Azul Institucional (#0B3C5D) — exploración, confianza
 * variant="warning"    → Ámbar (#F59E0B) — atención sin castigo
 * variant="danger"     → Rojo (#DC2626) — acciones irreversibles
 * variant="neutral"    → Gris Medianoche (#364153) — sistema, dashboard
 * variant="ghost"      → Transparente — jerarquía mínima, links de texto
 * variant="disabled"   → Gris Plata (#E5E7EB) — bloqueado lógicamente
 * variant="social"     → Blanco con borde — login social (Google, LinkedIn)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * variant    → (requerido) define el estilo visual
 * children   → (requerido) contenido del botón (texto, íconos o ambos)
 * href       → convierte el botón en <Link> de Next.js para navegación
 * target     → "_blank" | "_self" | "_parent" | "_top" (solo con href)
 * rel        → atributo rel del link (se auto-completa con "noopener noreferrer" si target="_blank")
 * fullWidth  → boolean — ocupa el 100% del ancho del contenedor
 * disabled   → boolean — bloquea el botón (solo sin href)
 * className  → clases adicionales para overrides puntuales
 * onClick    → manejador de eventos (solo sin href)
 * type       → "button" | "submit" | "reset" (solo sin href, default: "button")
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EJEMPLOS DE USO
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── PRIMARY — CTA principal ──────────────────────────────────────────────────
// Uso: Inscribirse, Pagar, Finalizar examen, Comenzar.

// <Button variant="primary" href="/blog">
//   Cada paso cuenta
// </Button>

// <Button variant="primary" onClick={handleSubmit}>
//   Inscribirse
// </Button>

// <Button variant="primary" href="/checkout" fullWidth>
//   Pagar ahora
// </Button>


// ── SECONDARY — Exploración y confianza ──────────────────────────────────────
// Uso: Ver metodología, Contáctanos, Saber más, Explorar roadmap.

// <Button variant="secondary" href="/about">
//   Conócenos
// </Button>

// <Button variant="secondary" href="https://github.com/..." target="_blank">
//   Explorar el roadmap
// </Button>

// <Button variant="secondary" onClick={handleContact}>
//   Contáctanos
// </Button>


// ── WARNING — Atención sin castigo ───────────────────────────────────────────
// Uso: Cambiar plan, Suscripción por vencer, Acción con consecuencias leves.

// <Button variant="warning" onClick={handlePlanChange}>
//   Cambiar plan
// </Button>

// <Button variant="warning" href="/billing">
//   Renovar suscripción
// </Button>


// ── DANGER — Acción irreversible ─────────────────────────────────────────────
// Uso: Eliminar cuenta, Cancelar suscripción, Borrar datos.

// <Button variant="danger" onClick={handleDelete}>
//   Eliminar cuenta
// </Button>

// <Button variant="danger" onClick={handleCancel}>
//   Cancelar suscripción
// </Button>


// ── NEUTRAL — Opciones de sistema ────────────────────────────────────────────
// Uso: Configuración, Dashboard, Filtros, Opciones secundarias de UI.

// <Button variant="neutral" href="/dashboard">
//   Ir al Dashboard
// </Button>

// <Button variant="neutral" onClick={handleFilter}>
//   Aplicar filtros
// </Button>


// ── GHOST — Jerarquía mínima ─────────────────────────────────────────────────
// Uso: Volver, Leer más, Términos legales, Acciones de baja prioridad.

// <Button variant="ghost" href="/blog">
//   ← Volver al blog
// </Button>

// <Button variant="ghost" onClick={handleSkip}>
//   Omitir por ahora
// </Button>


// ── DISABLED — Bloqueado lógicamente ─────────────────────────────────────────
// Uso: Botón inactivo hasta llenar campos de formulario.
// Opción A: usando la variante directamente
// Opción B: usando la prop `disabled` en variant primary/secondary

// <Button variant="disabled">
//   Continuar
// </Button>

// <Button variant="primary" disabled>
//   Continuar
// </Button>


// ── SOCIAL — Login social ─────────────────────────────────────────────────────
// Uso: Entrar con Google, Entrar con LinkedIn.

// <Button variant="social" onClick={handleGoogleLogin}>
//   <img src="/icons/google.svg" className="w-4 h-4" alt="" />
//   Entrar con Google
// </Button>

// <Button variant="social" onClick={handleLinkedInLogin}>
//   <img src="/icons/linkedin.svg" className="w-4 h-4" alt="" />
//   Entrar con LinkedIn
// </Button>


// ── FULL WIDTH — Ancho completo ───────────────────────────────────────────────
// Uso: Botones en mobile, formularios, CTAs de sección completa.

// <Button variant="primary" href="/registro" fullWidth>
//   Crear cuenta gratis
// </Button>


// ── CON ÍCONO ─────────────────────────────────────────────────────────────────
// El gap-2 del base ya separa el ícono del texto automáticamente.

// <Button variant="primary" href="/curso/ingles-b2">
//   <PlayIcon className="w-4 h-4" />
//   Comenzar lección
// </Button>


// ── SUBMIT DE FORMULARIO ──────────────────────────────────────────────────────

// <Button variant="primary" type="submit">
//   Enviar
// </Button>


// ── OVERRIDE PUNTUAL ─────────────────────────────────────────────────────────
// Para casos excepcionales usa className — twMerge resuelve conflictos.

// <Button variant="primary" className="text-base px-10">
//   CTA especial
// </Button>
