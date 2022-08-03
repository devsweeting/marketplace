import type { IAsset } from '@/types/assetTypes';

export interface IAssetListView {
  assets: IAsset[];
  activeCardId?: string;
  handleDrawer: (asset: IAsset) => void;
}
