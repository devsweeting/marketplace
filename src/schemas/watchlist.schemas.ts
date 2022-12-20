import { z } from 'zod';
import { assetSchema } from './asset.schemas';
import { metaSchema } from './common.schemas';

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
