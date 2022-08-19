export interface IAsset {
  id: string;
  refId: string;
  name: string;
  description: string;
  media: IMedia[];
  attributes: IAttribute[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  sellOrders: ISellOrder[];
}

// TODO: Update this when data is available
export interface IMarket {
  brand: string;
  filter: string;
  value_dollars: number;
}

export interface IAttribute {
  display: string | null;
  trait: string;
  value: string | null;
}

export interface IMedia {
  assetId: string;
  title: string;
  description: string | null;
  fileId: string;
  sortOrder: number;
  absoluteUrl: string;
}

export interface IMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IAssetDetails {
  year: string;
  categories: string[];
  set: string;
  grading: string;
  grading_service: string;
}

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

export type RangeFilters = Record<string, IRange> | null;

export interface ISellOrder {
  id: string;
  assetId: string;
  userId: string;
  partnerId: string;
  fractionQty: number;
  fractionPriceCents: number;
  expireTime: number;
  deletedTime: number;
}
