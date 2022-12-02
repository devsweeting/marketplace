import { apiClient } from '@/api/client';
import type { IMeta, WatchlistAsset } from '@/types/assetTypes';
import { StatusCodes } from 'http-status-codes';

type PaginatedResponse<T> = {
  meta: IMeta;
  items: T[];
};

export const getWatchlist = async (): Promise<PaginatedResponse<WatchlistAsset> | undefined> => {
  try {
    const res = await apiClient.get(`/watchlist/`);

    if (!res.ok || !res.isJson) return;

    return res.data as PaginatedResponse<WatchlistAsset>;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return;
  }
};
export interface IWatchList {
  name: string;
  id: string;
}

export const inWatchlist = async (id: string, signal?: AbortSignal): Promise<boolean> => {
  try {
    const isOnWatchlist: any = await apiClient.get(`/watchlist/check/${id}`, { signal });
    return isOnWatchlist.data?.inWatchlist ?? false;
  } catch (error) {
    return false;
  }
};

interface IWatchlistResponse {
  isSuccessful: boolean;
}

export const addToWatchlist = async (id: string): Promise<IWatchlistResponse> => {
  const { status } = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
  });

  const isAdded = hasBeenAddedWatchlist(status);
  return { isSuccessful: isAdded };
};

const hasBeenAddedWatchlist = (status: StatusCodes): boolean => {
  return status == StatusCodes.CREATED || status == StatusCodes.CONFLICT;
};

export const removeFromWatchlist = async (id: string): Promise<IWatchlistResponse> => {
  try {
    const { status } = await apiClient.delete(`/watchlist/${id}`);

    return status === StatusCodes.OK ? { isSuccessful: true } : { isSuccessful: false };
  } catch (error) {
    return { isSuccessful: false };
  }
};
