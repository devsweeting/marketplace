import {
  assetResponse,
  assetSchema,
  paginatedAssetSchema,
  trendingMarketsSchema,
} from '@/schemas/asset.schemas';
import type { IAsset, IMarket, PaginatedAsset } from '@/types';
import { apiClient } from '@/api/client';

export const loadListAssetByPage = async ({
  queryString,
  signal,
}: {
  queryString: string;
  signal?: AbortSignal;
}): Promise<PaginatedAsset> => {
  try {
    const res = await apiClient.get(`/assets?${queryString}`, { requireAuth: false, signal });

    if (res.status !== 200 || !res.data) {
      return {
        meta: { currentPage: 1, itemCount: 0, itemsPerPage: 0, totalItems: 0, totalPages: 1 },
        items: [],
      };
    }

    return paginatedAssetSchema.parse(res.data);
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
  signal?: AbortSignal;
}

export const latestDropAssets = async ({
  page,
  limit = 12,
  signal,
}: LatestDropParams): Promise<{ items: IAsset[] }> => {
  const query = `page=${page}&limit=${limit}`;

  try {
    const res = await apiClient.get(`/assets?${query}`, { requireAuth: false, signal });

    if (res.status !== 200 || !res.data) {
      return {
        items: [],
      };
    }

    return assetResponse.parse(res.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      items: [],
    };
  }
};

export const trendingMarkets = async (signal?: AbortSignal): Promise<{ markets: IMarket[] }> => {
  try {
    const res = await apiClient.get(`/trending`, { requireAuth: false, signal });

    if (res.status !== 200 || !res.data) {
      return {
        markets: [],
      };
    }

    return trendingMarketsSchema.parse(res.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      markets: [],
    };
  }
};

export const getAssetById = async (
  id: string,
  signal?: AbortSignal,
): Promise<IAsset | undefined> => {
  try {
    const res = await apiClient.get(`/assets/${id}`, { requireAuth: false, signal });

    if (!res || !res.ok) return;

    return assetSchema.parse(res.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return;
  }
};
