import { apiClient } from '@/api/client';
import type { ProductDataProps } from '@/components/ProductCard';

export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
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
