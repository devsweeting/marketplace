import { apiClient } from '@/api/client';
import type { ProductDataProps } from '@/components/ProductCard';

export const getWatchlist = async () => {
  const addToWatchListResponse = await apiClient.get(`/watchlist/`);
  return addToWatchListResponse.data;
};

export const addToWatchlist = async ({ id }: { id: ProductDataProps }) => {
  const addToWatchListResponse = await apiClient.post(`/watchlist/`, {
    body: { assetId: id },
  });
  return addToWatchListResponse.status;
};

export const removeFromWatchlist = async ({ id }: { id: ProductDataProps }) => {
  const deleteWatchListResponse = await apiClient.delete(`/watchlist/${id}`);
  return deleteWatchListResponse.status;
};
