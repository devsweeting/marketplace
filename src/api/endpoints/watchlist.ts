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
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

interface IWatchlistResponse {
  success: boolean;
}
export const addToWatchlist = async ({
  id,
}: IAsset | WatchlistAsset): Promise<IWatchlistResponse> => {
  const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
  });

  const isAdded = await hasBeenAddedWatchlist(addToWatchListResponse.status);
  return { success: isAdded };
};

const hasBeenAddedWatchlist = (status: StatusCodes): boolean => {
  return status == StatusCodes.CREATED || status == StatusCodes.CONFLICT;
};

export const removeFromWatchlist = async (item: IWatchList): Promise<IWatchlistResponse> => {
  try {
    const deleteWatchListResponse = await apiClient.delete(`/watchlist/${item.id}`);
    if (deleteWatchListResponse.isJson) {
      return { success: false };
    }
    if (deleteWatchListResponse.status === StatusCodes.OK) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { success: false };
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
    // eslint-disable-next-line no-console
    console.error(error);
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
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const removeWatchlistFromLocalStorage = async (id: string): Promise<IWatchlistResponse> => {
  try {
    const localWatchlist = await getLocalWatchlist();
    const watchlist = localWatchlist.filter((watchlist: IWatchList) => watchlist.id !== id);
    localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const getLocalWatchlist = (): WatchlistAsset[] => {
  const localWatchlist = JSON.parse(localStorage.getItem(WATCHLIST) as string);
  return localWatchlist;
};
