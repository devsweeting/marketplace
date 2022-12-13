import { z } from 'zod';
import { metaSchema } from './common.schemas';

export const mediaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  absoluteUrl: z.string(),
  assetId: z.string(),
  fileId: z.string(),
  file: z.string(),
  sortOrder: z.number(),
});

export const sellOrderSchema = z.object({
  id: z.string(),
  assetId: z.string(),
  userId: z.string(),
  partnerId: z.string(),
  fractionQty: z.number(),
  fractionQtyAvailable: z.number(),
  fractionPriceCents: z.number(),
  expireTime: z.number(),
  startTime: z.number(),
  deletedTime: z.number(),
  type: z.string(),
  userFractionLimit: z.number().nullable(),
  userFractionLimitEndTime: z.string().nullable(),
});

export const marketSchema = z.object({
  brand: z.string(),
  filter: z.string(),
  value_dollars: z.number(),
  sellOrders: z.array(sellOrderSchema).optional(),
});

export const trendingMarketsSchema = z.object({
  markets: z.array(marketSchema),
});

export const attributeSchema = z.object({
  display: z.string().nullable(),
  trait: z.string(),
  value: z.union([z.array(z.string()), z.string(), z.number(), z.null()]),
});

export const assetSchema = z.object({
  isOnUserPortfolio: z.boolean().optional(),
  userAsset: z
    .object({
      assetId: z.string(),
      id: z.string(),
      quantityOwned: z.number(),
    })
    .optional(),
  data: z.any().optional(),
  isOnWatchlist: z.boolean().optional(),
  id: z.string(),
  refId: z.string(),
  name: z.string(),
  media: z.array(mediaSchema),
  sellOrders: z.array(sellOrderSchema),
  slug: z.string(),
  description: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  attributes: z.array(attributeSchema),
  partner: z.string(),
});

export const assetResponse = z.object({
  items: z.array(assetSchema),
});

export const paginatedAssetSchema = assetResponse.extend({
  meta: metaSchema,
});
