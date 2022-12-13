import { z } from 'zod';
import { assetSchema } from './asset.schemas';
import { metaSchema } from './common.schemas';

// export const watchlistAsset = z.object({
//   id: z.string(),
//   refId: z.string(),
//   name: z.string(),
//   media: z.array(mediaSchema),
//   slug: z.string(),
//   description: z.string(),
//   updatedAt: z.string(),
//   createdAt: z.string(),
//   attributes: z.array(attributeSchema),
//   partner: z.string(),
// });

export const watchlistAsset = assetSchema.omit({
  isOnUserPortfolio: true,
  userAsset: true,
  data: true,
  inOnWatchlist: true,
  sellOrders: true,
});

export const paginatedWatchlist = z.object({
  items: z.array(watchlistAsset),
  meta: metaSchema,
});
