import { z } from "zod";

// ====================== Login Schema ======================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required") // ✅ instead of required_error
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// ====================== Register Schema ======================
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required") // ✅ FIX
      .min(3, "Username must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required") // ✅ FIX
      .email("Invalid email address"),

    password: z
      .string()
      .min(1, "Password is required") // ✅ FIX
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"), // ✅ FIX

    role: z.enum(["Customer", "Receptionist", "Admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });