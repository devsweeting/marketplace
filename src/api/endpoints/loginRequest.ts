import { apiClient } from '@/api/client';
import type { StatusCodes } from 'http-status-codes';

export const loginRequest = async (email: string): Promise<StatusCodes> => {
  const res = await apiClient.post('/users/login/request', {
    body: new URLSearchParams({
      email,
    }),
  });

  return res.status;
};
