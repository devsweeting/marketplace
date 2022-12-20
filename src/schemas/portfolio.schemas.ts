import { z } from 'zod';
import { assetSchema } from './asset.schemas';

export const purchasedAsset = z.object({
  length: z.number(),
  asset: assetSchema,
  assetId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
  fractionPriceCents: z.number().optional(),
  fractionQty: z.number().optional(),
  id: z.string().optional(),
  isDeleted: z.boolean().optional(),
  purchaseTotal: z.number().optional(),
  sellOrderId: z.string().optional(),
  userId: z.string().optional(),
});

export const portfolioSchema = z.object({
  totalValueInCents: z.number(),
  totalUnits: z.number(),
  purchaseHistory: z.array(purchasedAsset).optional(),
  length: z.number().optional(),
  items: z.any().optional(),
});
