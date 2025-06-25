import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, 'Minimum Characters Should Be Three'),
  description: z.string().min(5, 'Minimum Characters Should Be Five'),
  images: z
    .array(z.string())
    .min(2, 'At least two images are required')
    .max(2, 'Maximum two images allowed'),
  slug: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const mealSchema = z.object({
  name: z.string().min(3, 'Minimum Characters Should Be Three'),
  description: z.string().min(5, 'Minimum Characters Should Be Five'),
  price: z.coerce.number(),
  slug: z.string().optional(),
  images: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  categoryId: z.string().optional(),
});

export type MealTypes = z.infer<typeof mealSchema>;

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  role: z.enum(['USER', 'ADMIN', 'SERVICE_PROVIDER']),
});

export type SignUpTypes = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginTypes = z.infer<typeof loginSchema>;
