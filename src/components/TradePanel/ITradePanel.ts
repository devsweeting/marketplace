import type { IAsset } from '@/types/assetTypes';

export interface ITradePanel {
  asset: IAsset;
  open: boolean;
  handleClose: () => void;
  updateAsset: (assetId: string) => void;
}
