import type { IApiRequest, IApiRequestWithBody, IApiResponse } from '@/api/client/apiClient.base';
import { ServerApiClient } from '@/api/client/apiClient.server';
import { getAccessExpFromJwtAsDate, getExpFromRefreshToken } from '@/helpers/auth/getExpFrom';
import { getUserCookie, setUserCookie } from '@/helpers/auth/userCookie';
import type { IJwt } from '@/types/jwt';
import type { NextServerResponse } from '@/types/next';
import { withSentry } from '@sentry/nextjs';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Check if refresh token has expired.
 * This should NEVER be called outside of BrowserApiClient
 * @returns
 */
const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req || !res) {
    res.send(undefined);
    return;
  }

  const token = getUserCookie(req);

  if (!token || !token.accessToken) {
    res.status(StatusCodes.UNAUTHORIZED);
    res.send(undefined);
    return;
  }

  const expireDate = getAccessExpFromJwtAsDate(token);

  if (expireDate && expireDate <= new Date()) {
    const response = await refreshJwt(token, req, res);

    res.status(response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(undefined);
    return;
  }
  res.send(undefined);
  return;
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSentry(refreshToken);

async function refreshJwt(token: IJwt, req: NextApiRequest, res: NextServerResponse) {
  try {
    const client = new ServerApiClient();
    const request: any = {
      headers: req.headers,
      body: { refreshToken: token.refreshToken },
    };

    const response = await client.send('/users/login/refresh', 'POST', request);
    console.log('Refresh called', response.status, ' ---- ', new Date().getTime());
    if (!response.ok) {
      return response;
    }

    const data = (await response.data) as unknown as any;
    await updateCookie(data, request, res);
    return response;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      ok: false,
      headers: {},
      isJson: false,
    };
  }
}

async function updateCookie(
  data: { accessToken: string; refreshToken: string } | undefined,
  req: NextApiRequest,
  res: NextServerResponse,
) {
  if (!data || !data.accessToken || !data.refreshToken || !req || !res) {
    return;
  }
  const expireTime: number = getExpFromRefreshToken(data.refreshToken) ?? 0;
  const now = new Date().getTime() / 1000;
  const cookieExp = expireTime - now - 5;
  const newJWt: IJwt = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
  await setUserCookie(newJWt, req, res, cookieExp);
  return;
}
