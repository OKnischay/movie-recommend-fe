import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .regex(/^[a-zA-Z]/, {
      message: "Email must start with a letter",
    })
    .trim(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must not exceed 64 characters" })
    .trim(),
});
