import { z } from 'zod';

export const paymentIntentSchema = z.object({
  clientSecret: z.unknown(),
});
