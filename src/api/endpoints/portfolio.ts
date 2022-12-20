import { apiClient } from '@/api/client';
import type { IPortfolioData } from '@/types';

export const getPortfolioAssets = async (signal?: AbortSignal) => {
  const response = await apiClient.get(`/portfolio/`, { signal });
  return response.data;
};

export const getPortfolioWatchlistAssets = async (signal?: AbortSignal) => {
  const response = await apiClient.get(`/watchlist`, { signal });

  return response.data;
};
