import { apiClient } from '@/api/client';
import type { ProductDataProps } from '@/components/ProductCard';
import { StatusCodes } from 'http-status-codes';

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
  switch (status) {
    case StatusCodes.CREATED:
      return true;
    case StatusCodes.CONFLICT:
      return true;
    default:
      return false;
  }
};

export const addWatchlistToLocalStorage = async (id: string, name: string) => {
  let localWatchlist: ProductDataProps[];
  if (localStorage.getItem('watchList')) {
    localWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
    localWatchlist.push({ id: id, name: name });
  } else {
    localWatchlist = [{ id: id, name: name }];
  }
  localStorage.setItem('watchList', JSON.stringify(localWatchlist));
};

export const removeWatchlistFromLocalStorage = async (id: string) => {
  const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
  const watchlist = originalWatchlist.filter((watchlist: ProductDataProps) => watchlist.id !== id);
  localStorage.setItem('watchList', JSON.stringify(watchlist));
};
