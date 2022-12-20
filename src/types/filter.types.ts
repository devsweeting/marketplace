export interface IFilter {
  categoryId: string;
  filterId: string;
}
export interface IRange {
  min: string;
  max: string;
}

export interface IQuery {
  [key: string]: string | string[] | undefined;
}
export type IQueryKey = keyof IQuery;

export type DisabledRanges = {
  [key: string]: boolean;
};

export type DisabledRangesKey = keyof DisabledRanges;

export type RangeFilters = Record<string, IRange> | null | undefined;
