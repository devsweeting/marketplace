export interface IAsset {
  isOnUserPortfolio?: boolean | undefined;
  userAsset?: {
    assetId: string;
    id: string;
    quantityOwned: number;
  };
  data?: any;
  isOnWatchlist?: boolean;
  id: string;
  refId: string;
  name: string;
  media: IMedia[];
  sellOrders: ISellOrder[];
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  attributes: IAttribute[];
  partner: string;
}
export interface IPurchaseInfo {
  id: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  sellOrderId: string;
  userId: string;
  fractionQty: number;
  fractionPriceCents: number;
  assetId: string;
}

export type IPortfolioAsset = {
  isOnUserPortfolio?: boolean | undefined;
  userAsset?: {
    assetId: string;
    id: string;
    quantityOwned: number;
  };
  data?: any;
  isOnWatchlist?: boolean;
  id: string;
  refId: string;
  name: string;
  media: IMedia[];
  sellOrders?: ISellOrder[];
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  attributes: IAttribute[];
  partner: string;
};
interface IPurchaseHistoryItem {
  length: number;
  asset: IPortfolioAsset;
  assetId?: string;
  createdAt?: string;
  deletedAt?: string | null;
  fractionPriceCents?: number;
  fractionQty?: number;
  id?: string;
  isDelete?: boolean;
  purchaseTotal?: number;
  sellOrderId?: string;
  updatedAt?: string;
  userId?: string;
}
export interface IPortfolioData {
  length?: number;
  items?: any;
  totalValueInCents: number;
  totalUnits: number;
  purchaseHistory?: IPurchaseHistoryItem[] | [];
}

export interface IPortfolioDataState {
  isLoading: boolean;
  portfolio: IPortfolioData;
  error: string;
}

export type PortfolioListAction =
  | { type: 'fetching' }
  | { type: 'success'; payload: IPortfolioData }
  | { type: 'error'; error: Error };

export interface IMarket {
  brand: string;
  filter: string;
  value_dollars: number;
  sellOrders?: ISellOrder[];
}

export interface IAttribute {
  display: string | null;
  trait: string;
  value: string | string[] | number | null;
}

export interface IMedia {
  id: string;
  title: string;
  description: string | null;
  absoluteUrl: string;
  assetId: string;
  fileId: string;
  file: string;
  sortOrder: number;
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

export interface IQuery {
  [key: string]: string | string[] | undefined;
}
export type IQueryKey = keyof IQuery;

export type DisabledRanges = {
  [key: string]: boolean;
};

export type DisabledRangesKey = keyof DisabledRanges;

export type RangeFilters = Record<string, IRange> | null | undefined;

export interface IUserBuyLimit {
  fractionsAvailableToPurchase: number;
  fractionsPurchased: number;
}
export interface ISellOrder {
  id: string;
  assetId: string;
  userId: string;
  partnerId: string;
  fractionQty: number;
  fractionQtyAvailable: number;
  fractionPriceCents: number;
  expireTime: number;
  startTime: number;
  deletedTime: number;
  type: string;
  userFractionLimit: number | null;
  userFractionLimitEndTime: string | null;
}

export interface WatchlistAsset {
  id: string;
  refId: string;
  name: string;
  media: IMedia[];
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  attributes: IAttribute[];
  partner: string;
}
