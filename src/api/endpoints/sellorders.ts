import { apiClient } from '@/api/client';
import type { PurchaseInfo, UserBuyLimit } from '@/types';
import { purchaseInfoSchema, userBuyLimitSchema } from '@/schemas/sellorder.schemas';
import type { StripePurchaseTracking } from '@/components/Checkout/Stripe/PaymentHelpers';

export const purchaseSellOrder = async (
  id: string,
  fractionsToPurchase: number,
  fractionPriceCents: number,
  stripeTrackingDetails?: StripePurchaseTracking,
) => {
  const response = await apiClient.post(`/sellorders/${id}/purchase`, {
    body: {
      fractionsToPurchase,
      fractionPriceCents,
      stripeTrackingDetails: stripeTrackingDetails,
    },
  });

  return response;
};

/**
 * Runs the purchase validations without running the actual purchase.
 * @param id Id of the sell order
 * @returns object
 */
export const validateSellOrder = async (
  id: string,
  fractionsToPurchase: number,
  fractionPriceCents: number,
) => {
  const response = await apiClient.post(`/sellorders/${id}/validate`, {
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

    if (!res || res.ok === false) return;

    return purchaseInfoSchema.parse(res.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return;
  }
};
