import { apiClient } from '@/api/client';

export const getPortfolioAssetsByUserId = async () => {
  const response = await apiClient.get(`/users/portfolio/`);
  return response.data;
};
