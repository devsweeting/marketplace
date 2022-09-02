import type { IncomingMessage } from 'http';
import { unwrapString } from '@/helpers/unwrapString';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';
import { apiClient } from '@/api/client';
import type { IJwt } from '@/types/jwt';
import type { NextServerResponse } from '@/types/next';

export const loginConfirm = async ({
  req,
  token,
  res,
}: {
  req: IncomingMessage;
  token?: string | string[];
  res: NextServerResponse;
}): Promise<IJwt | undefined> => {
  const parsedToken = unwrapString(token);
  if (!parsedToken) {
    return;
  }

  const response = await apiClient.post(
    '/users/login/confirm',
    {
      body: {
        token: parsedToken,
        metadata: {
          ipAddress: getIpAddress(req),
          browserUserAgent: req.headers['user-agent'],
          localeInformation: parseLocale(req),
        },
      },
    },
    res,
  );

  if (!response.ok) {
    return;
  }

  if (!response.isJson) {
    return;
  }

  return response.data as unknown as IJwt;
};
