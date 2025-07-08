import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, { message: "Field cannot be empty." }),
    new_password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
      .regex(/[0-9]/, { message: "Must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must contain at least one special character.",
      })
      .trim(),

    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

