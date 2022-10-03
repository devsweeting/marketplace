import type { IAsset, IMeta, IMarket } from 'src/types';
import { apiClient } from '@/api/client';

export const loadListAssetByPage = async ({
  queryString,
}: {
  queryString: string;
}): Promise<{ items: IAsset[]; meta: IMeta }> => {
  try {
    const res = await apiClient.get(`/assets?${queryString}`, { requireAuth: false });
    if (res.status !== 200 || !res.data) {
      return {
        meta: { currentPage: 1, itemCount: 0, itemsPerPage: 0, totalItems: 0, totalPages: 1 },
        items: [],
      };
    }
    return res.data as unknown as Promise<{ items: IAsset[]; meta: IMeta }>;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      meta: { currentPage: 1, itemCount: 0, itemsPerPage: 0, totalItems: 0, totalPages: 1 },
      items: [],
    };
  }
};

interface LatestDropParams {
  page: number;
  limit?: number;
}
export const latestDropAssets = async ({
  page,
  limit = 12,
}: LatestDropParams): Promise<{ items: IAsset[] }> => {
  const query = `page=${page}&limit=${limit}`;

  try {
    const res = await apiClient.get(`/assets?${query}`, { requireAuth: false });
    if (res.status !== 200 || !res.data) {
      return {
        items: [],
      };
    }
    return res.data as unknown as Promise<{ items: IAsset[] }>;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      items: [],
    };
  }
};

export const trendingMarkets = async (): Promise<{ markets: IMarket[] }> => {
  try {
    const res = await apiClient.get(`/trending`, { requireAuth: false });

    if (res.status !== 200 || !res.data) {
      return {
        markets: [],
      };
    }
    return res.data as unknown as Promise<{ markets: IMarket[] }>;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      markets: [],
    };
  }
};

export const getAssetById = async (id: string) => {
  try {
    const res = await apiClient.get(`/assets/${id}`, { requireAuth: false });
    if (res.status !== 200 || !res.data) {
      return;
    }
    return res as unknown as Promise<{ data: IAsset }>;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return;
  }
};
