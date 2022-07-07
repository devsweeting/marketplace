import type { IFilter, RangeFilters, IAsset, IMeta } from 'src/types';
import { apiClient } from '@/api/client';
interface ListAssetParams {
  page: number;
  limit?: number;
  sort: string | undefined;
  filter?: Array<IFilter>;
  filterRanges: null | RangeFilters;
  search?: string | undefined;
}
export const loadListAssetByPage = async ({
  page,
  limit = 12,
  sort,
  filter,
  filterRanges,
  search,
}: ListAssetParams): Promise<{ items: IAsset[]; meta: IMeta }> => {
  let query = `page=${page}&limit=${limit}`;
  if (sort) {
    query += `&sort=asset.createdAt&order=${sort}`;
  }
  if (filter) {
    filter.forEach((item: IFilter) => {
      query += `&attr_eq[${item.categoryId}]=${item.filterId}`;
    });
  }
  if (filterRanges) {
    Object.entries(filterRanges).forEach(([key, value]) => {
      query += `&attr_gte[${key}]=${value.min}&attr_lte[${key}]=${value.max}`;
    });
  }
  if (search) {
    query += `&search=${search}`;
  }

  try {
    const res = await apiClient.get(`/assets?${query}`);
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
