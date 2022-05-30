import { IFilter } from 'src/types';
import { isBooleanObject } from 'util/types';

interface ListAssetParams {
  page: number;
  limit?: number;
  sort: string | undefined;
  filter?: Array<IFilter>;
}
export const loadListAssetByPage = async ({
  page,
  limit = 12,
  sort,
  filter,
  ranges,
}: ListAssetParams) => {
  let query = `page=${page}&limit=${limit}`;
  if (sort) {
    query += `&sort=asset.createdAt&order=${sort}`;
  }
  if (filter) {
    filter.forEach((item: IFilter) => {
      query += `&attr_eq[${item.categoryId}]=${item.filterId}`;
    });
  }

  if (ranges) {
    Object.entries(ranges).forEach(([key, value]) => {
      query += `&attr_gte[${key}]=${value.min}&attr_lte[${key}]=${value.max}`;
    });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets?${query}`);
  console.log(query);
  return await res.json();
};
