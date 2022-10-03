import { apiClient } from '@/api/client';
import type { IAsset, WatchlistAsset } from '@/types/assetTypes';
import { StatusCodes } from 'http-status-codes';
const WATCHLIST = 'watchList' as string;

export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
};

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

interface IAddToWatchlistResult {
  success: boolean;
}
export const addToWatchlist = async ({
  id,
}: IAsset | WatchlistAsset): Promise<IAddToWatchlistResult> => {
  const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
  });

  const isAdded = await hasBeenAddedWatchlist(addToWatchListResponse.status);
  return { success: isAdded };
};

export const removeFromWatchlist = async ({ id }: IAsset) => {
  try {
    const deleteWatchListResponse = await apiClient.delete(`/watchlist/${id}`);
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
}: IAsset): Promise<IAddToWatchlistResult> => {
  try {
    let localWatchlist = await getLocalWatchlist();
    if (localWatchlist) {
      localWatchlist.push({ id, name });
    } else {
      localWatchlist = [{ id, name }];
    }
    localStorage.setItem(WATCHLIST, JSON.stringify(localWatchlist));
    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { success: false };
  }
};

export const removeWatchlistFromLocalStorage = async ({ id }: IAsset): Promise<void> => {
  try {
    const localWatchlist = await getLocalWatchlist();
    const watchlist = localWatchlist.filter((asset: WatchlistAsset) => asset.id !== id);
    localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }
};

export const getLocalWatchlist = (): WatchlistAsset[] => {
  const localWatchlist = JSON.parse(localStorage.getItem(WATCHLIST) as string);
  return localWatchlist;
};
