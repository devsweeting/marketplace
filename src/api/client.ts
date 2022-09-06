import type { NextServerRequest, NextServerResponse } from '@/types/next';
import { getUserCookie, removeUserCookie, setUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { logger } from '@/helpers/logger';
import { StatusCodes } from 'http-status-codes';
import * as Sentry from '@sentry/nextjs';
import { padTo2Digits } from '@/helpers/padTo2Digits';
import { getExpFromJwtAsDate } from '@/helpers/auth/getExpFrom';
import type { IJwt } from '@/types/jwt';
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

function formatDate(date: Date) {
  return (
    [
      padTo2Digits(date.getDate()),
      date.toLocaleString('default', { month: 'short' }),
      date.getFullYear(),
    ].join('/') +
    ':' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function getTimezoneOffset() {
  function daylight(n: number) {
    return (n < 10 ? '0' : '') + n;
  }
  let offset = new Date().getTimezoneOffset();
  const sign = offset < 0 ? '+' : '-';
  offset = Math.abs(offset);
  return sign + daylight((offset / 60) | 0) + daylight(offset % 60);
}
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
    return this._send(url, 'POST', request, res);
  }

  put(url: IApiUrl, request: IApiRequestWithBody, res?: NextServerResponse) {
    return this._send(url, 'PUT', request, res);
  }

  patch(url: IApiUrl, request: IApiRequestWithBody, res?: NextServerResponse) {
    return this._send(url, 'PATCH', request, res);
  }

  delete(url: IApiUrl, request: IApiRequest = {}, res?: NextServerResponse) {
    return this._send(url, 'DELETE', request, res);
  }

  private async _send(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
    res?: NextServerResponse,
  ): Promise<IApiResponse> {
    if (!request.headers) {
      request.headers = {};
    }

    let body: string | undefined;
    let host: string | undefined = '-';
    let authuser;
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
        if (getExpFromJwtAsDate(token) <= new Date()) {
          const value = await this._refreshJwt(token, request.req, res);
          if (value?.status === StatusCodes.UNAUTHORIZED) {
            return value;
          }
        }

        request.headers['Authorization'] = `Bearer ${token.accessToken}`;
        authuser = getUserFromJwt(token);
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
          `${host ?? '-'} ${authuser ?? '-'} [${time} ${timeZone}] ${method} ${response.url} ${
            response.status
          } ${returnedByteSize ?? '-'}`,
        );
      } else {
        logger.error(
          `${host ?? '-'} ${authuser ?? '-'} [${time} ${timeZone}]  ${method} ${response.url} ${
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

  private async _refreshJwt(
    token: IJwt,
    req: NextServerRequest,
    res: NextServerResponse | undefined,
  ) {
    //TODO check if the JWT has been tampered with
    if (!res || !req) {
      return;
    }
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      };
      const response = await fetch(`${ApiClient.getBaseUrl()}/users/login/refresh`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      });
      if (!response.ok) {
        //TODO log out user
        const data = await response.json();
        const responseHeaders: Record<string, string> = {};

        response.headers.forEach((value, key) => {
          responseHeaders[key] = value.toLowerCase();
        });

        console.log('Error', response.status);

        return {
          status: response.status,
          ok: response.ok,
          data,
          headers: responseHeaders,
          isJson: true,
        };
      }
      const data = await response.json();
      const newJWt: IJwt = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      if (res === undefined) {
        logger.error('res is undefined');
      }
      setUserCookie(newJWt, req, res);
    } catch (error) {
      removeUserCookie(req, res);
      logger.error(error);
    }
  }
}

export const apiClient = new ApiClient();
