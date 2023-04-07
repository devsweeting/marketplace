import type { IAsset } from '@/types';
import type { NextRouter } from 'next/router';

export interface ITradePanel {
  asset: IAsset;
  open: boolean;
  handleClose: () => void;
  updateAsset: (assetId: string) => void;
  router: NextRouter;
}
