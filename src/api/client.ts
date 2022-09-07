import type { NextServerRequest, NextServerResponse } from '@/types/next';
import { getUserCookie, removeUserCookie, setUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { logger } from '@/helpers/logger';
import { StatusCodes } from 'http-status-codes';
import * as Sentry from '@sentry/nextjs';
import { getExpFromJwtAsDate } from '@/helpers/auth/getExpFrom';
import type { IJwt } from '@/types/jwt';
import { formatDate, getTimezoneOffset } from '@/helpers/time';
export interface IApiRequest {
  req?: NextServerRequest;
  headers?: Record<string, string>;
}

export interface IApiRequestWithBody extends IApiRequest {
  body?: Record<string, unknown> | URLSearchParams;
}

interface IBaseApiResponse {
  status: StatusCodes;
  ok: boolean;
  headers: Record<string, string>;
}

export interface IApiJsonResponse extends IBaseApiResponse {
  data: Record<string, unknown>;
  isJson: true;
}

export interface IApiTextResponse extends IBaseApiResponse {
  data?: string;
  isJson: false;
}

export type IApiResponse = IApiJsonResponse | IApiTextResponse;

export type IApiUrl = `/${string}`;

export class ApiClient {
  static getBaseUrl() {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_BACKEND_URL;
    }
    return '/api/jump';
  }

  get(url: IApiUrl, request: IApiRequest = {}) {
    return this._send(url, 'GET', request);
  }

  post(url: IApiUrl, request: IApiRequestWithBody, res?: NextServerResponse) {
    return this._sendWithJwtCheck(url, 'POST', request, res);
  }

  put(url: IApiUrl, request: IApiRequestWithBody, res?: NextServerResponse) {
    return this._sendWithJwtCheck(url, 'PUT', request, res);
  }

  patch(url: IApiUrl, request: IApiRequestWithBody, res?: NextServerResponse) {
    return this._sendWithJwtCheck(url, 'PATCH', request, res);
  }

  delete(url: IApiUrl, request: IApiRequest = {}, res?: NextServerResponse) {
    return this._sendWithJwtCheck(url, 'DELETE', request, res);
  }

  private async _send(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
  ): Promise<IApiResponse> {
    if (!request.headers) {
      request.headers = {};
    }

    let body: string | undefined;
    let host: string | undefined = '-';
    let authUser;
    const time = formatDate(new Date());
    const timeZone = getTimezoneOffset();
    let returnedByteSize;

    if ('body' in request && request.body) {
      if (request.body instanceof URLSearchParams) {
        body = request.body.toString();
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        body = JSON.stringify(request.body);
        request.headers['Content-Type'] = 'application/json';
      }
    }

    if ('req' in request && request.req) {
      const token = getUserCookie(request.req);

      host = getIpAddress(request.req);

      if (request.headers['content-length']) {
        returnedByteSize = request.headers['content-length'];
      }

      if (token && token.accessToken) {
        request.headers['Authorization'] = `Bearer ${token.accessToken}`;
        authUser = getUserFromJwt(token);
      }
    }

    const responseHeaders: Record<string, string> = {};

    const url = `${ApiClient.getBaseUrl()}${path}`;
    try {
      const response = await fetch(url, {
        method,
        headers: request.headers,
        body,
      });
      if (response.ok) {
        logger.info(
          `${host ?? '-'} ${authUser ?? '-'} [${time} ${timeZone}] ${method} ${response.url} ${
            response.status
          } ${returnedByteSize ?? '-'}`,
        );
      } else {
        logger.error(
          `${host ?? '-'} ${authUser ?? '-'} [${time} ${timeZone}]  ${method} ${response.url} ${
            response.status
          } ${response.statusText} ${returnedByteSize ?? '-'}`,
        );
      }

      response.headers.forEach((value, key) => {
        responseHeaders[key] = value.toLowerCase();
      });

      const responseIsJson = responseHeaders['content-type']?.includes('application/json') ?? false;
      const data = await (responseIsJson ? response.json() : response.text());
      return {
        status: response.status,
        ok: response.ok,
        data,
        headers: responseHeaders,
        isJson: responseIsJson,
      };
    } catch (err) {
      logger.error(`${method} ${url} ${err}`);
      Sentry.captureException(err);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        ok: false,
        headers: responseHeaders,
        isJson: false,
      };
    }
  }

  private async _sendWithJwtCheck(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
    res: NextServerResponse | undefined,
  ) {
    if (request.req && res) {
      const token = getUserCookie(request.req);

      if (token && token.accessToken) {
        if (getExpFromJwtAsDate(token) <= new Date()) {
          const response = await this._refreshJwt(token, request, res);
          if (
            response.status === StatusCodes.UNAUTHORIZED ||
            response.status === StatusCodes.UNPROCESSABLE_ENTITY
          ) {
            response.status = StatusCodes.MOVED_TEMPORARILY;
            response.headers = { ...response.headers, Location: '/logout' };
            // TODO handle logout
            return response;
          }
        }
      }
    }
    return await this._send(path, method, request);
  }

  private async _refreshJwt(
    token: IJwt,
    request: IApiRequest | IApiRequestWithBody,
    res: NextServerResponse,
  ): Promise<IApiResponse> {
    try {
      const jwtRefreshRequest = {
        headers: request.headers,
        body: { refreshToken: token.refreshToken },
      };
      const response = await this._send('/users/login/refresh', 'POST', jwtRefreshRequest);
      if (!response.ok) {
        return response;
      }

      const data = (await response.data) as unknown as any;
      await updateCookie(data, request, res);
      return response;
    } catch (error) {
      if (request.req) {
        removeUserCookie(request.req, res);
      }
      logger.error(error);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        ok: false,
        headers: {},
        isJson: false,
      };
    }
  }
}

async function updateCookie(
  data: { accessToken: string; refreshToken: string } | undefined,
  request: IApiRequestWithBody | IApiRequest,
  res: NextServerResponse,
) {
  if (!data || !data.accessToken || !data.refreshToken || !request.req || !res) {
    return;
  }

  const newJWt: IJwt = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
  await setUserCookie(newJWt, request.req, res);
}
export const apiClient = new ApiClient();
