import { apiClient } from '@/api/client';
import type { ProductDataProps } from '@/components/ProductCard';
import { StatusCodes } from 'http-status-codes';
const WATCHLIST = 'watchList' as string;
export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
};

export const checkForAssetOnWatchlist = async (id: string) => {
  const isOnWatchlist: any = await apiClient.get(`/watchlist/check/${id}`);
  return isOnWatchlist.data?.inWatchlist ?? false;
};

export const addToWatchlist = async (item: ProductDataProps) => {
  const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
    body: { assetId: item.id },
  });
  return addToWatchListResponse.status;
};

export const removeFromWatchlist = async (item: ProductDataProps) => {
  const deleteWatchListResponse = await apiClient.delete(`/watchlist/${item.id}`);
  return deleteWatchListResponse.status;
};

export const hasBeenAddedWatchlist = (status: StatusCodes): boolean => {
  return status == StatusCodes.CREATED || status == StatusCodes.CONFLICT;
};

export const isAssetInLocalStorage = (assetId: string): boolean => {
  if (localStorage.getItem(WATCHLIST)) {
    const localWatchlist = getLocalWatchlist();
    if (localWatchlist.some((watchItem: ProductDataProps) => watchItem.id === assetId)) {
      return true;
    }
  }
  return false;
};

export const addWatchlistToLocalStorage = async (id: string, name: string) => {
  let localWatchlist: ProductDataProps[] = getLocalWatchlist();
  if (localWatchlist) {
    localWatchlist.push({ id: id, name: name });
  } else {
    localWatchlist = [{ id: id, name: name }];
  }
  localStorage.setItem(WATCHLIST, JSON.stringify(localWatchlist));
};

export const removeWatchlistFromLocalStorage = async (id: string) => {
  const localWatchlist = getLocalWatchlist();
  const watchlist = localWatchlist.filter((watchlist: ProductDataProps) => watchlist.id !== id);
  localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
};

export const getLocalWatchlist = () => {
  const localWatchlist = JSON.parse(localStorage.getItem(WATCHLIST) as string);
  return localWatchlist;
};
