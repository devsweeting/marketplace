import type { IAsset, ISellOrder } from '../types';
/**
 * Ensures that sellOrders contains at least 1 sellorder object.
 * @param asset, the asset which sellOrders is to be gleaned from.
 * @returns Array of sellOrders containing at least 1 element
 */
export const getSellOrdersFromAsset = (asset: IAsset): ISellOrder[] => {
  if (!asset.sellOrders || !asset.sellOrders[0]) {
    return [
      {
        id: `-1_Not_Exist_${Math.random() * 10000000}`,
        assetId: asset.id ?? `-1_Not_Exist_${Math.random() * 10000000}`,
        userId: `-1_Not_Exist_${Math.random() * 10000000}`,
        partnerId: `-1_Not_Exist_${Math.random() * 10000000}`,
        fractionQty: 0,
        fractionPriceCents: 0,
        expireTime: 0,
        deletedTime: 0,
      },
    ];
  }
  return asset.sellOrders;
};
