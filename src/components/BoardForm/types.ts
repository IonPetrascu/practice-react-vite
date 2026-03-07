import type z from 'zod';
import type { boardSchema } from './schema';

export type BoardFormValues = z.infer<typeof boardSchema>;
