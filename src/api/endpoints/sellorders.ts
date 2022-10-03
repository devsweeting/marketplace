import { apiClient } from '@/api/client';

export const purchaseSellOrder = async (
  id: string,
  fractionsToPurchase: number,
  fractionPriceCents: number,
) => {
  const response = await apiClient.post(`/sellorders/${id}/purchase`, {
    body: { fractionsToPurchase: fractionsToPurchase, fractionPriceCents: fractionPriceCents },
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
export const getNumSellordersUserCanBuy = async (id: string) => {
  const response = await apiClient.get(`/sellorders/${id}/check`);
  return response;
};
