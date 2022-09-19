import { apiClient } from '@/api/client';
import { StatusCodes } from 'http-status-codes';

export const getPortfolioAssetsByUserId = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/portfolio/${id}`);
    return response;
  } catch (error) {
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};
