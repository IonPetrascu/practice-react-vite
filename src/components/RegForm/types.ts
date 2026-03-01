import type z from 'zod';
import type { registerSchema } from './schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type Inputs = {
  name: string;
  email: string;
  password: string;
};
