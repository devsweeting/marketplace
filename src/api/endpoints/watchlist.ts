import { apiClient } from '@/api/client';
import type { IAsset, WatchlistAsset } from '@/types/assetTypes';
import { StatusCodes } from 'http-status-codes';
const WATCHLIST = 'watchList' as string;

export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
};
export interface IWatchList {
  name: string;
  id: string;
}

export const isAssetOnWatchlist = async ({ id }: IAsset): Promise<boolean> => {
  try {
    const isOnWatchlist: any = await apiClient.get(`/watchlist/check/${id}`);
    return isOnWatchlist.data?.inWatchlist ?? false;
  } catch (error) {
    return false;
  }
};

interface IWatchlistResponse {
  isSuccessful: boolean;
}
export const addToWatchlist = async ({
  id,
}: IAsset | WatchlistAsset): Promise<IWatchlistResponse> => {
  const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
  });

  const isAdded = await hasBeenAddedWatchlist(addToWatchListResponse.status);
  return { isSuccessful: isAdded };
};

const hasBeenAddedWatchlist = (status: StatusCodes): boolean => {
  return status == StatusCodes.CREATED || status == StatusCodes.CONFLICT;
};

export const removeFromWatchlist = async (item: IWatchList): Promise<IWatchlistResponse> => {
  try {
    const deleteWatchListResponse = await apiClient.delete(`/watchlist/${item.id}`);
    if (deleteWatchListResponse.status === StatusCodes.OK) {
      return { isSuccessful: true };
    }
    return { isSuccessful: false };
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const isAssetInLocalStorage = ({ id }: IAsset): boolean => {
  try {
    if (localStorage.getItem(WATCHLIST)) {
      const localWatchlist = getLocalWatchlist();
      if (localWatchlist.some((asset: WatchlistAsset) => asset.id === id)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const addWatchlistToLocalStorage = async ({
  id,
  name,
}: IAsset): Promise<IWatchlistResponse> => {
  try {
    let localWatchlist: IWatchList[] = await getLocalWatchlist();
    if (localWatchlist) {
      localWatchlist.push({ id, name });
    } else {
      localWatchlist = [{ id, name }];
    }
    localStorage.setItem(WATCHLIST, JSON.stringify(localWatchlist));
    return { isSuccessful: true };
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const removeWatchlistFromLocalStorage = async ({
  id,
}: IAsset): Promise<IWatchlistResponse> => {
  try {
    const localWatchlist = await getLocalWatchlist();
    const watchlist = localWatchlist.filter((watchlist: IWatchList) => watchlist.id !== id);
    localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
    return { isSuccessful: true };
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const getLocalWatchlist = (): WatchlistAsset[] => {
  const localWatchlist = JSON.parse(localStorage.getItem(WATCHLIST) as string);
  return localWatchlist;
};
