import { apiClient } from '@/api/client';
import type { PurchaseInfo, UserBuyLimit } from '@/types';
import { purchaseInfoSchema, userBuyLimitSchema } from '@/schemas/sellorder.schemas';

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

/**
 * Gets the number of sell orders a user can buy and the number a user already bought.
 * @param id Id of the sell order
 * @returns object
 */
export const getNumSellordersUserCanBuy = async (
  id: string | undefined,
  signal?: AbortSignal,
): Promise<UserBuyLimit | undefined> => {
  try {
    const res = await apiClient.get(`/sellorders/${id}/check`, { signal });

    if (!res) return;

    return userBuyLimitSchema.parse(res.data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }
};

export const getPurchaseById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PurchaseInfo | undefined> => {
  try {
    const res = await apiClient.get(`/sellorders/purchase-history?assetId=${id}`, {
      requireAuth: true,
      signal,
    });

    if (!res) return;

    return purchaseInfoSchema.parse(res.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return;
  }
};
