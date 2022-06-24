import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { logger } from '@/helpers/logger';
import { StatusCodes } from 'http-status-codes';

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

      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
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
        logger.info(`${method} ${response.url} ${response.status}`);
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
