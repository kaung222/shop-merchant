import { object, string } from "yup";
import { z } from "zod";

export const LoginValidationSchema = z
  .object({
    emailOrPhone: z.string(),
    password: z.string().min(8),
  })
  .required({ emailOrPhone: true });

export const RegisterValidationSchema = z
  .object({
    email: z.string(),
    phone: z.string().max(11).min(9),
    address: z.string(),
    password: z.string().min(8),
    name: z.string(),
    company: z.string().nullable(),
  })
  .required({
    email: true,
    phone: true,
    address: true,
    password: true,
    name: true,
  });

export const SendOtpValidationSchema = z.object({
  password: z.string().min(8).max(16),
  emailOrPhone: z.string(),
});
