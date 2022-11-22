import type { IAsset } from '@/types/assetTypes';
import type { MouseEvent } from 'react';

export interface IAssetCard {
  onClick: () => void;
  assetData: IAsset;
  activeCardId?: string;
  watched: boolean;
  watchlistAdd: (e: MouseEvent<HTMLElement>, asset: IAsset) => Promise<void>;
  watchlistRemove: (e: MouseEvent<HTMLElement>, asset: IAsset) => Promise<void>;
}
