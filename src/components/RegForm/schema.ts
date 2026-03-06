import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim(),

  password: z.string().min(8, 'Password must be at least 8 characters'),
});
