import { apiClient } from '@/api/client';
import type { PaginatedWatchlist, WatchlistResponse } from '@/types';
import { StatusCodes } from 'http-status-codes';
import { paginatedWatchlist } from '@/schemas/watchlist.schemas';

export const getWatchlist = async (
  signal?: AbortSignal,
): Promise<PaginatedWatchlist | undefined> => {
  try {
    const res = await apiClient.get(`/watchlist/`, { signal });

    if (!res.ok || !res.isJson) return;

    return paginatedWatchlist.parse(res.data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return;
  }
};

export const inWatchlist = async (id: string, signal?: AbortSignal): Promise<boolean> => {
  try {
    const isOnWatchlist: any = await apiClient.get(`/watchlist/check/${id}`, { signal });
    return isOnWatchlist.data?.inWatchlist ?? false;
  } catch (error) {
    return false;
  }
};

export const addToWatchlist = async (
  id: string,
  signal?: AbortSignal,
): Promise<WatchlistResponse> => {
  const { status } = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
    signal,
  });

  return { isSuccessful: status === StatusCodes.CREATED || status === StatusCodes.CONFLICT };
};

export const removeFromWatchlist = async (id: string): Promise<WatchlistResponse> => {
  try {
    const { status } = await apiClient.delete(`/watchlist/${id}`);

    return { isSuccessful: status === StatusCodes.OK };
  } catch (error) {
    return { isSuccessful: false };
  }
};
