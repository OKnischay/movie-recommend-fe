// import { z } from "zod";

// export const SignupFormSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" })
//     .max(20,{message: "Password must not exceed 20 characters"})
//     // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//     .regex(/[0-9]/, { message: "Password must contain at least one number" }).trim(),
//   confirm_password: z.string().trim(),
//   role: z.enum(["viewer", "admin"], {
//     message: "Please select a valid role",
    
//   }),
// // full_name: z.string().min(1, { message: "Full name is required" }).trim(),
//   username: z
//     .string()
//     .min(3, { message: "Username must be at least 3 characters" })
//     .max(20, { message: "Username must be at most 20 characters" }),
// }).refine((data) => data.password === data.confirm_password, {
//   message: "Passwords do not match",
//   path: ["confirm_password"],
// });

import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z
      .string()
      .min(5, { message: "Email is required" })
      .email({ message: "Enter a valid email address" })
      .regex(/^[a-zA-Z]/, {
        message: "Email must start with a letter",
      })
      .trim(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must not exceed 64 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .trim(),

    confirm_password: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .trim(),

    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
        message:
          "Username must start with a letter and can contain letters, numbers, and underscores only",
      }),

    role: z.enum(["viewer", "admin"], {
      message: "Select either 'viewer' or 'admin' as a role",
    }),

    // Optional:
    // full_name: z
    //   .string()
    //   .min(1, { message: "Full name is required" })
    //   .max(100, { message: "Full name must be less than 100 characters" })
    //   .trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
