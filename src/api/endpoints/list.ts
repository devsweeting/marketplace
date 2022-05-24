import { IFilter } from 'src/types';

interface ListAssetParams {
  page: number;
  limit?: number;
  sort: string | undefined;
  filter?: Array<IFilter>;
}
export const loadListAssetByPage = async ({ page, limit = 12, sort, filter }: ListAssetParams) => {
  try {
    let query = `page=${page}&limit=${limit}`;
    if (sort) {
      query += `&sort=${sort}&order=DESC`;
    }
    if (filter) {
      filter.forEach((item: IFilter) => {
        query += `&attr_eq[${item.categoryId}]=${item.filterId}`;
      });
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/assets?${query}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
