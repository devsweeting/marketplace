import type { IAsset } from '@/types';

export interface IAssetListView {
  assets: IAsset[];
  activeCardId?: string;
  handleDrawer: (asset: IAsset) => void;
}
