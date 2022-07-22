export interface IAsset {
  id: string;
  refId: string;
  name: string;
  description: string;
  media: Array<IMedia>;
  attributes: Array<IAttribute>;
  slug: string;
  createdAt: string;
  updatedAt: string;
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

export interface IFilter {
  categoryId: string;
  filterId: string;
}
export interface IRange {
  min: string;
  max: string;
}

export type DisabledRanges = {
  Grade: boolean;
  Year: boolean;
};

export type DisabledRangesKey = keyof DisabledRanges;

export type RangeFilters = Record<string, IRange> | null;
