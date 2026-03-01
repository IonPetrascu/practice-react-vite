import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters'),

  email: z.email({ message: 'Invalid email address' }).trim(),

  password: z.string().min(6, 'Password must be at least 6 characters'),
});
