import { unwrapString } from '@/helpers/unwrapString';
import { apiClient } from '@/api/client';
import type { StatusCodes } from 'http-status-codes';

export const loginConfirm = async (
  token: string | string[] | undefined,
): Promise<StatusCodes | undefined> => {
  console.log('token', token);
  if (!token) {
    throw new Error('No token provided');
  }
  const parsedToken = unwrapString(token);

  if (!parsedToken) {
    throw new Error('No token provided');
  }

  const response = await apiClient.post('/login/confirm', {
    body: {
      token: parsedToken,
    },
  });
  console.log(response);

  if (!response.ok) {
    throw new Error('Internal error');
  }

  return response.status;
};
