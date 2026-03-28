import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  contactIntentionSchema,
  englishChallengeSchema,
  messageSchema,
  newsletterSchema,
} from "./InputSchema";

export const contactFormSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    phone: optionalPhoneSchema,
    intention: contactIntentionSchema,
    englishChallenge: englishChallengeSchema.optional(),
    message: messageSchema,
    newsletter: newsletterSchema,
  })
  .refine(
    (data) => data.intention === "investment" || data.englishChallenge !== undefined,
    {
      message: "Selecciona tu mayor reto con el inglés",
      path: ["englishChallenge"],
    }
  );

export type ContactFormData = z.infer<typeof contactFormSchema>;
