import { z } from "zod";

export const MailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({
      message: "Invalid email address.",
    })
    .trim(),
});

export type TMailForm = z.infer<typeof MailFormSchema>;