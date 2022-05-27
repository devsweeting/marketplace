import { IFilter } from 'src/types';

interface ListAssetParams {
  page: number;
  limit?: number;
  sort: string | undefined;
  filter?: Array<IFilter>;
}
export const loadListAssetByPage = async ({ page, limit = 12, sort, filter }: ListAssetParams) => {
  let query = `page=${page}&limit=${limit}`;
  if (sort) {
    query += `&sort=asset.createdAt&order=${sort}`;
  }
  if (filter) {
    filter.forEach((item: IFilter) => {
      query += `&attr_eq[${item.categoryId}]=${item.filterId}`;
    });
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets?${query}`);
  return await res.json();
};
