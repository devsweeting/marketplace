import type { IAsset } from '@/types';

export interface ITradePanel {
  asset: IAsset;
  open: boolean;
  handleClose: () => void;
  updateAsset: (assetId: string) => void;
}
