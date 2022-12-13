import { z } from 'zod';

export const metaSchema = z.object({
  currentPage: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});
