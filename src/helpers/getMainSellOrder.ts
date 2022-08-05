import type { IAsset, ISellOrder } from '../types';
/**
 * Gets the main (first) sell order from assets
 * @param asset, the asset which sellOrders is to be gleaned from.
 * @returns The first sellOrder or undefined
 */
export const getMainSellOrder = (asset: IAsset): ISellOrder | undefined => {
  if (!asset.sellOrders || !asset.sellOrders[0]) {
    return undefined;
  }
  return asset.sellOrders[0];
};
