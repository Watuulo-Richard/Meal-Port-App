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

// Zod schema for product validation
export const orderSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Meal name is required')
    .max(100, 'Meal Name must be less than 100 characters'),
  lastName: z
    .string()
    .min(1, 'Meal name is required')
    .max(100, 'Meal Name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid Email')
    .min(1, 'Character must be greater than 1'),
  phone: z.string().min(0, 'Discount price must be 0 or greater'),
  orderItems: z.array(z.string()).optional(),
  totalAmount: z.number().optional().nullable(),
  userId: z.string().optional().nullable()
});

export type OrderTypes = z.infer<typeof orderSchema>;
