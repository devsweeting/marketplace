import type { NextServerRequest } from '@/types/next';
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

export abstract class BaseApiClient {
  abstract getBaseUrl(): string;
  abstract getHeaderFilters(): string[];

  get(url: IApiUrl, request: IApiRequest = {}) {
    return this.send(url, 'GET', request);
  }

  post(url: IApiUrl, request: IApiRequestWithBody) {
    return this.send(url, 'POST', request);
  }

  put(url: IApiUrl, request: IApiRequestWithBody) {
    return this.send(url, 'PUT', request);
  }

  patch(url: IApiUrl, request: IApiRequestWithBody) {
    return this.send(url, 'PATCH', request);
  }

  delete(url: IApiUrl, request: IApiRequest = {}) {
    return this.send(url, 'DELETE', request);
  }

  async send(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
    options?: {
      onError: (response: Response) => void;
      onSuccess: (response: Response) => void;
      onCatch: (url: string, error: unknown) => void;
    },
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

    const responseHeaders: Record<string, string> = {};

    const url = `${this.getBaseUrl()}${path}`;
    try {
      const response = await fetch(url, {
        method,
        headers: request.headers,
        body,
      });
      if (response.ok) {
        options?.onSuccess(response);
      } else {
        options?.onError(response);
      }
      const headerFilters = this.getHeaderFilters();
      response.headers.forEach((value, key) => {
        if (!headerFilters.includes(key)) {
          responseHeaders[key] = value.toLowerCase();
        }
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
      options?.onCatch(url, err);
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
