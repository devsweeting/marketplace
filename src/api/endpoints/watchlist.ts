import { apiClient } from '@/api/client';
import type { ProductDataProps } from '@/components/ProductCard';
import { StatusCodes } from 'http-status-codes';
const WATCHLIST = 'watchList' as string;
export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
};

export const checkForAssetOnWatchlist = async (id: string) => {
  try {
    const isOnWatchlist: any = await apiClient.get(`/watchlist/check/${id}`);
    return isOnWatchlist.data?.inWatchlist ?? false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

export const addToWatchlist = async (item: ProductDataProps) => {
  try {
    const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
      body: { assetId: item.id },
    });
    return addToWatchListResponse.status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

export const removeFromWatchlist = async (item: ProductDataProps) => {
  try {
    const deleteWatchListResponse = await apiClient.delete(`/watchlist/${item.id}`);
    return deleteWatchListResponse.status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

export const hasBeenAddedWatchlist = (status: StatusCodes): boolean => {
  return status == StatusCodes.CREATED || status == StatusCodes.CONFLICT;
};

export const isAssetInLocalStorage = (assetId: string): boolean => {
  try {
    if (localStorage.getItem(WATCHLIST)) {
      const localWatchlist = getLocalWatchlist();
      if (localWatchlist.some((watchItem: ProductDataProps) => watchItem.id === assetId)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

export const addWatchlistToLocalStorage = async (id: string, name: string) => {
  try {
    let localWatchlist: ProductDataProps[] = await getLocalWatchlist();
    if (localWatchlist) {
      localWatchlist.push({ id: id, name: name });
    } else {
      localWatchlist = [{ id: id, name: name }];
    }
    localStorage.setItem(WATCHLIST, JSON.stringify(localWatchlist));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const removeWatchlistFromLocalStorage = async (id: string) => {
  try {
    const localWatchlist = await getLocalWatchlist();
    const watchlist = localWatchlist.filter((watchlist: ProductDataProps) => watchlist.id !== id);
    localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const getLocalWatchlist = () => {
  const localWatchlist = JSON.parse(localStorage.getItem(WATCHLIST) as string);
  return localWatchlist;
};
