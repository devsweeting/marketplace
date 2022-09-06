import type { IFilter, RangeFilters } from '../types';

export const queryBuilder = async ({
  page,
  sortType,
  checkedFilters,
  rangeFilters,
  search,
}: {
  page: number;
  limit?: number;
  sortType?: string | undefined;
  checkedFilters?: Array<IFilter>;
  rangeFilters?: null | RangeFilters | undefined;
  search?: string | undefined;
}) => {
  const queryString = await queryStringBuilder({
    page,
    sortType,
    checkedFilters,
    rangeFilters,
    search,
  });
  return queryString;
};

const queryStringBuilder = ({
  page,
  sortType,
  checkedFilters,
  rangeFilters,
  search,
}: {
  page: number;
  limit?: number;
  sortType: string | undefined;
  checkedFilters?: Array<IFilter>;
  rangeFilters: null | RangeFilters;
  search?: string | undefined;
}) => {
  const limit = 12;
  let querystring = `page=${page}&limit=${limit}`;
  if (sortType) {
    querystring += `&sort=asset.createdAt&order=${sortType}`;
  }
  if (checkedFilters && checkedFilters.length) {
    checkedFilters.forEach((item: IFilter) => {
      querystring += `&attr_eq[${item.categoryId}]=${item.filterId}`;
    });
  }
  if (rangeFilters && Object.keys(rangeFilters).length > 0) {
    Object.entries(rangeFilters).forEach(([key, value]) => {
      querystring += `&attr_gte[${key}]=${value.min}&attr_lte[${key}]=${value.max}`;
    });
  }
  if (search) {
    querystring += `&search=${search}`;
  }
  return querystring;
};
