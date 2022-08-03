import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { logger } from '@/helpers/logger';
import { StatusCodes } from 'http-status-codes';
import * as Sentry from '@sentry/nextjs';
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

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

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

  post(url: IApiUrl, request: IApiRequestWithBody) {
    return this._send(url, 'POST', request);
  }

  put(url: IApiUrl, request: IApiRequestWithBody) {
    return this._send(url, 'PUT', request);
  }

  patch(url: IApiUrl, request: IApiRequestWithBody) {
    return this._send(url, 'PATCH', request);
  }

  delete(url: IApiUrl, request: IApiRequest = {}) {
    return this._send(url, 'DELETE', request);
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
    let authuser;
    const time = formatDate(new Date());
    const timeZone = getTimezoneOffset();

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

      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
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
          }`,
        );
      } else {
        logger.error(`${method} ${response.url} ${response.status} ${response.statusText}`);
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
}

export const apiClient = new ApiClient();
