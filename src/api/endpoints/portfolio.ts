import { apiClient } from '@/api/client';

export const getPortfolioAssets = async () => {
  const response = await apiClient.get(`/portfolio/`);
  return response.data;
};

export const getPortfolioWatchlistAssets = async () => {
  const response = await apiClient.get(`/watchlist`);

  return response.data;
};
