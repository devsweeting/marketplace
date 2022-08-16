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
  const response = await apiClient.get(`/sellorders/${id}`);
  return response;
};
