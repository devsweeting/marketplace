import { apiClient } from '@/api/client';

interface ISellOrderPurchase {
  fractionsToPurchase: number;
  fractionPriceCents: number;
}
export const purchaseSellOrder = async (id: number, sellOrderData: ISellOrderPurchase) => {
  const response = await apiClient.post(`/sellorders/${id}/purchase`, {
    body: { sellOrderData },
  });
  return response;
};
