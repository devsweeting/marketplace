/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod';
import { paymentIntentSchema } from '@/schemas/paymentIntent.schemas';

export type IPaymentIntentData = z.infer<typeof paymentIntentSchema>;
