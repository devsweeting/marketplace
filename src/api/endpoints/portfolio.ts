import { apiClient } from '@/api/client';
import type { IPortfolioData } from '@/types';
import { portfolioSchema } from '@/schemas/portfolio.schemas';

export const getPortfolioAssets = async (
  signal?: AbortSignal,
): Promise<IPortfolioData | undefined> => {
  try {
    const res = await apiClient.get(`/portfolio/`, { signal });

    return portfolioSchema.parse(res.data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }
};
