"use client";

import { useState } from "react";
import { useForm, Controller, useWatch, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
} from "@/lib/schemas/contactFormSchema";
import { sendContactEmail } from "./configs/Contactactions";
import {
  InputField,
  TextareaField,
  PhoneField,
  ChipGroupField,
  CheckboxField,
  ChipOption,
} from "@/components/ui/Inputs";
import Button from "@/components/ui/Button";
import { SpeakUpIcons } from "@/lib/icon-map";

// ─── Option Maps ─────────────────────────────────────────────────────────────

const INTENTION_OPTIONS: ReadonlyArray<
  ChipOption<ContactFormData["intention"]>
> = [
  {
    value: "interest",
    label: "Interés",
    sublabel: "Quiero ser de los primeros",
    icon: SpeakUpIcons.premium,
  },
  {
    value: "feedback",
    label: "Feedback",
    sublabel: "Tengo una idea",
    icon: SpeakUpIcons.logic,
  },
  {
    value: "alliance",
    label: "Alianza",
    sublabel: "Soy creador/educador",
    icon: SpeakUpIcons.alliance,
  },
  {
    value: "investment",
    label: "Patronage",
    sublabel: "Financia la visión Build in Public",
    icon: SpeakUpIcons.diamond,
  },
];

const CHALLENGE_OPTIONS: ReadonlyArray<
  ChipOption<NonNullable<ContactFormData["englishChallenge"]>>
> = [
  { value: "speaking_fear", label: "Miedo a hablar" },
  { value: "lack_structure", label: "Falta de estructura" },
  { value: "grammar", label: "Gramática" },
  { value: "lack_habit", label: "Falta de hábito" },
  { value: "other", label: "Otro" },
];

const MESSAGE_PLACEHOLDERS: Record<string, string> = {
  default: "Selecciona una opción arriba para empezar a escribir...",
  interest:
    "¿Qué te motiva a dominar el inglés ahora mismo? Queremos conocer tu historia para darte prioridad.",
  feedback:
    "¡Nos encanta el 'build in public'! Cuéntanos tu idea para que la lógica supere a la memoria...",
  alliance:
    "Cuéntanos sobre tu perfil y cómo imaginas que podríamos colaborar en SpeakUp.",
  investment:
    "Cuéntanos qué parte de nuestra visión resuena contigo y cómo te gustaría apoyar nuestro escalado.",
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-gray-medium mb-3">
      {children}
    </p>
  );
}

// ─── SubmitStatus ─────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "success" | "error";

function SubmitFeedback({
  status,
  errorMessage,
}: {
  status: SubmitStatus;
  errorMessage?: string;
}) {
  if (status === "idle") return null;

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800"
      >
        <p className="font-semibold">¡Mensaje enviado! 🎉</p>
        <p className="mt-1 text-emerald-700">
          Gracias por escribirnos. Te responderemos pronto a tu correo.
        </p>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
    >
      <p className="font-semibold">No pudimos enviar tu mensaje</p>
      <p className="mt-1 text-red-700">
        {errorMessage ?? "Ocurrió un error inesperado. Inténtalo de nuevo."}
      </p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: undefined,
      intention: undefined,
      englishChallenge: undefined,
      message: "",
      newsletter: true,
    },
  });

  const intention = useWatch({ control, name: "intention" });
  const message = useWatch({ control, name: "message" }) || "";

  const showChallenge = intention && intention !== "investment";
  const currentPlaceholder = intention
    ? MESSAGE_PLACEHOLDERS[intention]
    : MESSAGE_PLACEHOLDERS.default;

  const getTooltipText = () => {
    if (isSubmitting) return "";
    if (!isValid) {
      if (!intention)
        return "Selecciona el motivo de tu contacto para continuar.";
      if (message.length < 20)
        return "Tu mensaje es demasiado breve (mín. 20 caracteres).";
      return "Completa todos los campos obligatorios para enviar.";
    }
    return "¡Todo listo! Haz clic para enviar.";
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitStatus("idle");
    setSubmitError(undefined);

    const result = await sendContactEmail(data);

    if (result.success) {
      setSubmitStatus("success");
      reset(); // limpiar el formulario tras éxito
    } else {
      setSubmitStatus("error");
      setSubmitError(result.error);
    }
  };

  // Ocultar el formulario una vez enviado con éxito
  if (submitStatus === "success") {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white p-5 md:p-10 shadow-xl">
        <SubmitFeedback status="success" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white p-5 md:p-10 shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* ── Datos personales ── */}
        <fieldset className="flex flex-col gap-4">
          <SectionLabel>Datos personales</SectionLabel>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Nombre completo"
                  placeholder="¿Cómo te llamamos?"
                  autoComplete="name"
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Correo electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  error={errors.email?.message}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneField
                name={field.name}
                label="WhatsApp (Opcional)"
                value={field.value}
                onChange={(val) => field.onChange(val ?? "")}
                hint="Para una comunicación más ágil y humana"
                error={errors.phone?.message}
                defaultCountry="CO"
              />
            )}
          />
        </fieldset>

        {/* ── Intención ── */}
        <fieldset className="flex flex-col gap-4">
          <Controller
            control={control}
            name="intention"
            render={({ field }) => (
              <ChipGroupField
                name={field.name}
                label="¿Cómo podemos ayudarte?"
                options={INTENTION_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.intention?.message}
                gridCols="2x2"
              />
            )}
          />

          {showChallenge && (
            <Controller
              control={control}
              name="englishChallenge"
              render={({ field }) => (
                <ChipGroupField
                  name={field.name}
                  label="Cuéntanos tu mayor obstáculo"
                  options={CHALLENGE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.englishChallenge?.message}
                />
              )}
            />
          )}
        </fieldset>

        {/* ── Mensaje ── */}
        <fieldset className="flex flex-col gap-4">
          <SectionLabel>Mensaje</SectionLabel>

          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <TextareaField
                {...field}
                label="Mensaje"
                srOnly
                placeholder={currentPlaceholder}
                maxLength={500}
                currentLength={message.length}
                rows={5}
                error={errors.message?.message}
              />
            )}
          />
        </fieldset>

        {/* ── Newsletter + submit ── */}
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="newsletter"
            render={({ field }) => (
              <CheckboxField
                name={field.name}
                checked={field.value}
                onChange={field.onChange}
                label="Deseo recibir actualizaciones del progreso y acceso exclusivo al Roadmap en GitHub."
              />
            )}
          />

          {/* Feedback de error inline (justo antes del botón) */}
          <SubmitFeedback status={submitStatus} errorMessage={submitError} />

          <div title={getTooltipText()}>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full"
              style={{
                opacity: isSubmitting || !isValid ? 0.5 : 1,
                cursor: !isValid ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Enviando..." : "Unirme a la conversación"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
