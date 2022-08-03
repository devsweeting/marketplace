import type { IAsset, ISellorder } from '@/types/assetTypes';

export interface ITradePanel {
  asset: IAsset;
  sellorder: ISellorder;
  open: boolean;
  handleClose: () => void;
}
