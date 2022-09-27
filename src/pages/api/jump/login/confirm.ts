import { apiClient } from '@/api/client';
import { setUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';
import type { IJwt } from '@/types/jwt';
import { withSentry } from '@sentry/nextjs';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

const confirm = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.body.token;

  const request: any = {
    headers: req.headers,
    body: {
      token: token,
      metadata: {
        ipAddress: getIpAddress(req),
        browserUserAgent: req.headers['user-agent'],
        localeInformation: parseLocale(req),
      },
    },
  };

  const response = await apiClient.post('/users/login/confirm', request);

  if (!response.ok) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(undefined);
  }

  if (!response.isJson) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(undefined);
  }
  const jwt = response.data as unknown as IJwt;
  setUserCookie(jwt, req, res);
  return res.status(StatusCodes.OK).send({ data: 'test' });
};
export const config = {
  api: {
    externalResolver: true,
  },
};

export default withSentry(confirm);
