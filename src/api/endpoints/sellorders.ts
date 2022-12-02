import { apiClient } from '@/api/client';
import type { IPurchaseInfo, IUserBuyLimit } from '@/types/assetTypes';

export const purchaseSellOrder = async (
  id: string,
  fractionsToPurchase: number,
  fractionPriceCents: number,
) => {
  const response = await apiClient.post(`/sellorders/${id}/purchase`, {
    body: { fractionsToPurchase, fractionPriceCents },
  });
  return response;
};

export const getSellOrderById = async (id: string) => {
  const response = await apiClient.get(`/sellorders/${id}`, { requireAuth: false });
  return response;
};

/**
 * Gets the number of sell orders a user can buy and the number a user already bought.
 * @param id Id of the sell order
 * @returns object
 */
export const getNumSellordersUserCanBuy = async (
  id: string | undefined,
  signal?: AbortSignal,
): Promise<IUserBuyLimit> => {
  try {
    const res = await apiClient.get(`/sellorders/${id}/check`, { signal });

    return res.data as unknown as IUserBuyLimit;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    throw e;
  }
};

export const getPurchaseById = async (
  id: string,
  signal?: AbortSignal,
): Promise<IPurchaseInfo[]> => {
  try {
    const res = await apiClient.get(`/sellorders/purchase-history?assetId=${id}`, {
      requireAuth: true,
      signal,
    });

    return res.data as unknown as IPurchaseInfo[];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    throw err;
  }
};
