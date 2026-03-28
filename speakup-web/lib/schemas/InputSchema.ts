import { z } from "zod";
import type { Value } from "react-phone-number-input";

export const VALIDATION_RULES = {
  name: { min: 2, max: 50 },
  fullName: { min: 2, max: 100 },
  message: { min: 20, max: 500 },
  password: { min: 8, max: 50 },
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  phoneRegex: /^\+[\d\s\-()]{8,15}$/,
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

const baseString = z.string().trim();

export const fullNameSchema = baseString
  .min(VALIDATION_RULES.fullName.min, "Escribe tu nombre completo")
  .max(VALIDATION_RULES.fullName.max, "Nombre demasiado largo");

export const emailSchema = baseString
  .email("Introduce un correo electrónico válido")
  .toLowerCase();

export const optionalPhoneSchema = z
  .custom<Value>()
  .optional()
  .refine(
    (val) => !val || VALIDATION_RULES.phoneRegex.test(val),
    "Incluye el código de país (ej. +57 300 123 4567)"
  );

export const messageSchema = baseString
  .min(VALIDATION_RULES.message.min, `Consulta demasiado corta (mín. ${VALIDATION_RULES.message.min} caracteres)`)
  .max(VALIDATION_RULES.message.max, "Mensaje demasiado extenso");

export const contactIntentionSchema = z.enum(
  ["interest", "feedback", "alliance", "investment"],
  { message: "Selecciona una opción para continuar" }
);

export const englishChallengeSchema = z.enum(
  ["speaking_fear", "lack_structure", "grammar", "lack_habit", "other"],
  { message: "Selecciona tu mayor reto con el inglés" }
);

export const newsletterSchema = z.boolean();