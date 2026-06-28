import { z } from "zod";

export const CreateStudentSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number should be at least 10 digits"),
});

export const UpdateStudentSchema = z.object({
  name: z.string().min(3).optional(),

  email: z.string().email().optional(),

  phone: z.string().min(10).optional(),
});

export const StudentIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});