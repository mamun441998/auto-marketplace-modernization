import { z } from "zod";

/* ===========================
   SIGN IN
=========================== */

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  remember: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

/* ===========================
   REGISTER
=========================== */

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    password_confirmation: z
      .string()
      .min(8, "Confirm password is required"),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the Terms & Conditions",
    }),
  })
  .refine(
    (data) => data.password === data.password_confirmation,
    {
      path: ["password_confirmation"],
      message: "Passwords do not match",
    }
  );

export type RegisterFormValues = z.infer<typeof registerSchema>;