/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod';
import { paginatedWatchlist, watchlistAsset } from '@/schemas/watchlist.schemas';

export type WatchlistAsset = z.infer<typeof watchlistAsset>;

export type PaginatedWatchlist = z.infer<typeof paginatedWatchlist>;

export type WatchlistResponse = {
  isSuccessful: boolean;
};
