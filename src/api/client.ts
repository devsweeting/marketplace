import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';

export interface IApiRequest {
  req?: NextServerRequest;
  headers?: Record<string, string>;
}

export interface IApiRequestWithBody extends IApiRequest {
  body: Record<string, unknown>;
}

export interface IBaseApiResponse {
  status: number;
  ok: boolean;
  headers: Record<string, string>;
}

export interface IApiJsonResponse extends IBaseApiResponse {
  data: Record<string, unknown>;
  isJson: true;
}

export interface IApiTextReesponse extends IBaseApiResponse {
  data?: string;
  isJson: false;
}

export type IApiResponse = IApiJsonResponse | IApiTextReesponse;

export type IApiUrl = `/${string}`;

export class ApiClient {
  static _baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    url: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
  ): Promise<IApiResponse> {
    if (!request.headers) {
      request.headers = {};
    }

    let body: string | undefined;

    if ('body' in request && request.body) {
      body = JSON.stringify(request.body);

      request.headers['Content-Type'] = 'application/json';
    }

    if ('req' in request && request.req) {
      const token = getUserCookie(request.req);

      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const responseHeaders: Record<string, string> = {};

    try {
      const response = await fetch(`${ApiClient._baseUrl}${url}`, {
        method,
        headers: request.headers,
        body,
      });

      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseIsJson = responseHeaders['Content-Type']?.includes('application/json') ?? false;

      const data = await (responseIsJson ? response.json() : response.text());

      return {
        status: response.status,
        ok: response.ok,
        data,
        headers: responseHeaders,
        isJson: responseIsJson,
      };
    } catch (err) {
      return {
        status: 500,
        ok: false,
        headers: responseHeaders,
        isJson: false,
      };
    }
  }
}

export const client = new ApiClient();
