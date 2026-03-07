import type z from 'zod';
import type { columnSchema } from './schema';

export type ColumnFormValues = z.infer<typeof columnSchema>;
