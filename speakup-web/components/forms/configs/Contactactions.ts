"use server";

import { Resend } from "resend";
import { contactFormSchema, ContactFormData } from "@/lib/schemas/contactFormSchema";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

// ─── Label Maps ───────────────────────────────────────────────────────────────

const INTENTION_LABELS: Record<ContactFormData["intention"], string> = {
  interest:    "Interés — Quiero ser de los primeros",
  feedback:    "Feedback — Tengo una idea",
  alliance:    "Alianza — Soy creador/educador",
  investment:  "Patronage — Financia la visión Build in Public",
};

const CHALLENGE_LABELS: Record<
  NonNullable<ContactFormData["englishChallenge"]>,
  string
> = {
  speaking_fear:  "Miedo a hablar",
  lack_structure: "Falta de estructura",
  grammar:        "Gramática",
  lack_habit:     "Falta de hábito",
  other:          "Otro",
};

// ─── Email Template ───────────────────────────────────────────────────────────

function buildEmailHtml(data: ContactFormData): string {
  const challenge = data.englishChallenge
    ? CHALLENGE_LABELS[data.englishChallenge]
    : null;

  // ── Tokens de diseño SpeakUp (espejo de globals.css) ──
  const C = {
    primary:      "#58CC02",
    primaryDark:  "#46A302",
    accent:       "#16DACB",
    secondary:    "#0B3C5D",
    main:         "#364153",
    soft:         "#F3F4F6",
    line:         "#E5E7EB",
    grayMedium:   "#666666",
    white:        "#FFFFFF",
  };

  // ── Badge de intención: color por tipo ──
  const INTENTION_COLORS: Record<ContactFormData["intention"], { bg: string; border: string; text: string }> = {
    interest:   { bg: "#ECFDF5", border: "#6EE7B7", text: C.primaryDark },
    feedback:   { bg: "#EFF6FF", border: "#93C5FD", text: "#1D4ED8"     },
    alliance:   { bg: "#F0FDFA", border: "#5EEAD4", text: "#0F766E"     },
    investment: { bg: "#FFF7ED", border: "#FDB97D", text: "#C2410C"     },
  };

  const badge = INTENTION_COLORS[data.intention];

  return /* html */ `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuevo mensaje — SpeakUp Institute</title>
      </head>
      <body style="margin:0;padding:0;background:${C.soft};font-family:'Helvetica Neue',Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.soft};padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:${C.white};border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(11,60,93,0.10);max-width:600px;">

                <!-- ── HEADER ── -->
                <tr>
                  <td style="background:${C.secondary};padding:32px 40px 28px;">

                    <!-- Logo -->
                    <img
                      src="https://speakupinstitute.net/brand/logo-horizontal.svg"
                      alt="SpeakUp Institute"
                      width="180"
                      height="auto"
                      style="display:block;border:0;height:auto;max-width:180px;"
                    />

                    <!-- Subtítulo -->
                    <p style="margin:16px 0 0;font-size:13px;color:rgba(255,255,255,0.55);letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">
                      Nuevo mensaje · Formulario de contacto
                    </p>

                    <!-- Línea decorativa verde -->
                    <div style="margin-top:20px;height:3px;width:48px;background:${C.primary};border-radius:99px;"></div>

                  </td>
                </tr>

                <!-- ── BADGE DE INTENCIÓN ── -->
                <tr>
                  <td style="padding:28px 40px 0;">
                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                      <tr>
                        <td style="background:${badge.bg};border:1.5px solid ${badge.border};border-radius:12px;padding:14px 18px;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:${badge.text};text-transform:uppercase;letter-spacing:1px;">
                            Intención de contacto
                          </p>
                          <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:${C.secondary};">
                            ${INTENTION_LABELS[data.intention]}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ── DATOS PERSONALES ── -->
                <tr>
                  <td style="padding:28px 40px 0;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:${C.grayMedium};text-transform:uppercase;letter-spacing:1px;">
                      Datos personales
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="border:1.5px solid ${C.line};border-radius:12px;overflow:hidden;">

                      <!-- Nombre -->
                      <tr>
                        <td style="padding:12px 16px;background:${C.soft};width:36%;border-bottom:1px solid ${C.line};">
                          <p style="margin:0;font-size:11px;color:${C.grayMedium};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Nombre</p>
                        </td>
                        <td style="padding:12px 16px;border-bottom:1px solid ${C.line};">
                          <p style="margin:0;font-size:14px;color:${C.secondary};font-weight:700;">${data.fullName}</p>
                        </td>
                      </tr>

                      <!-- Correo -->
                      <tr>
                        <td style="padding:12px 16px;background:${C.soft};border-bottom:${data.phone || challenge ? `1px solid ${C.line}` : "none"};">
                          <p style="margin:0;font-size:11px;color:${C.grayMedium};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Correo</p>
                        </td>
                        <td style="padding:12px 16px;border-bottom:${data.phone || challenge ? `1px solid ${C.line}` : "none"};">
                          <a href="mailto:${data.email}"
                            style="font-size:14px;color:${C.accent};font-weight:600;text-decoration:none;">
                            ${data.email}
                          </a>
                        </td>
                      </tr>

                      <!-- WhatsApp (condicional) -->
                      ${data.phone ? `
                      <tr>
                        <td style="padding:12px 16px;background:${C.soft};border-bottom:${challenge ? `1px solid ${C.line}` : "none"};">
                          <p style="margin:0;font-size:11px;color:${C.grayMedium};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">WhatsApp</p>
                        </td>
                        <td style="padding:12px 16px;border-bottom:${challenge ? `1px solid ${C.line}` : "none"};">
                          <a href="https://wa.me/${data.phone.replace(/\D/g, "")}"
                            style="font-size:14px;color:#25D366;font-weight:600;text-decoration:none;">
                            ${data.phone}
                          </a>
                        </td>
                      </tr>` : ""}

                      <!-- Mayor reto (condicional) -->
                      ${challenge ? `
                      <tr>
                        <td style="padding:12px 16px;background:${C.soft};">
                          <p style="margin:0;font-size:11px;color:${C.grayMedium};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Mayor reto</p>
                        </td>
                        <td style="padding:12px 16px;">
                          <p style="margin:0;font-size:14px;color:${C.main};font-weight:600;">${challenge}</p>
                        </td>
                      </tr>` : ""}

                    </table>
                  </td>
                </tr>

                <!-- ── MENSAJE ── -->
                <tr>
                  <td style="padding:24px 40px 0;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:${C.grayMedium};text-transform:uppercase;letter-spacing:1px;">
                      Mensaje
                    </p>
                    <div style="background:${C.soft};border:1.5px solid ${C.line};border-left:4px solid ${C.primary};border-radius:0 12px 12px 0;padding:18px 20px;">
                      <p style="margin:0;font-size:14px;color:${C.main};line-height:1.8;white-space:pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>

                <!-- ── NEWSLETTER ── -->
                <tr>
                  <td style="padding:20px 40px 28px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:8px;vertical-align:middle;">
                          <div style="width:18px;height:18px;border-radius:4px;background:${data.newsletter ? C.primary : C.line};text-align:center;line-height:18px;font-size:12px;color:white;">
                            ${data.newsletter ? "✓" : ""}
                          </div>
                        </td>
                        <td>
                          <p style="margin:0;font-size:12px;color:${C.grayMedium};">
                            ${data.newsletter
                              ? "Quiere recibir actualizaciones del Roadmap en GitHub."
                              : "No desea recibir actualizaciones del Roadmap."}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ── CTA: RESPONDER ── -->
                <tr>
                  <td style="padding:0 40px 32px;">
                    <a href="mailto:${data.email}?subject=Re: Tu mensaje en SpeakUp Institute"
                      style="display:inline-block;background:${C.primary};color:${C.white};font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:99px;letter-spacing:0.2px;">
                      Responder a ${data.fullName.split(" ")[0]} →
                    </a>
                  </td>
                </tr>

                <!-- ── FOOTER ── -->
                <tr>
                  <td style="background:${C.secondary};padding:20px 40px;">
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);text-align:center;line-height:1.6;">
                      Generado automáticamente desde el formulario de contacto de
                      <a href="https://speakupinstitute.net" style="color:${C.accent};text-decoration:none;font-weight:600;">speakupinstitute.net</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
}

// ─── Server Action ────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ActionResult> {
  // 1. Validar en el servidor (nunca confiar solo en el cliente)
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Los datos enviados no son válidos. Por favor revisa el formulario.",
    };
  }

  const data = parsed.data;

  // 2. Enviar con Resend
  try {
    const { error } = await resend.emails.send({
      from:    "SpeakUp Contact <no-reply@speakupinstitute.net>",    // ← tu dominio verificado en Resend
      to:      [process.env.CONTACT_EMAIL!],                // ← tu correo del proyecto (variable de entorno)
      replyTo: data.email,
      subject: `[SpeakUp] ${INTENTION_LABELS[data.intention]} — ${data.fullName}`,
      html:    buildEmailHtml(data),
    });

    if (error) {
      console.error("[sendContactEmail] Resend error:", error);
      return {
        success: false,
        error: "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendContactEmail] Unexpected error:", err);
    return {
      success: false,
      error: "Ocurrió un error inesperado. Por favor intenta más tarde.",
    };
  }
}