import type z from 'zod';
import type { cardSchema } from './schema';

export type CardFormValues = z.infer<typeof cardSchema>;
