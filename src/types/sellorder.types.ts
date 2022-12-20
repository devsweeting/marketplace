/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod';
import { purchaseInfoSchema, userBuyLimitSchema } from '@/schemas/sellorder.schemas';

export type UserBuyLimit = z.infer<typeof userBuyLimitSchema>;

export type PurchaseInfo = z.infer<typeof purchaseInfoSchema>;
