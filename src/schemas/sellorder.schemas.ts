import { z } from 'zod';

export const userBuyLimitSchema = z.object({
  fractionsAvailableToPurchase: z.number(),
  fractionsPurchased: z.number(),
});

export const purchaseInfoSchema = z.array(
  z.object({
    id: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
    deletedAt: z.string().nullable(),
    isDeleted: z.boolean(),
    sellOrderId: z.string(),
    userId: z.string(),
    fractionQty: z.number(),
    fractionPriceCents: z.number(),
    assetId: z.string(),
  }),
);
