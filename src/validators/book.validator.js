import { z } from "zod";

export const CreateBookSchema = z.object({
  title: z.string().min(3, "title should be atleast 3 characters"),
  author: z.string(),
  isbn: z.string().min(10, "ISBN is too short,minimum 10 characters"),
  quantity: z.number().int().positive(),
});

export const UpdateBookSchema = z.object({
  title: z.string().min(3).optional(),

  author: z.string().min(2).optional(),

  isbn: z.string().min(10).optional(),

  quantity: z.number().int().positive().optional(),
});

export const BookIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});