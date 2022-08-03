import type { IAsset } from '@/types/assetTypes';

export interface IAssetCard {
  onClick: () => void;
  assetData: IAsset;
  activeCardId?: string;
}
