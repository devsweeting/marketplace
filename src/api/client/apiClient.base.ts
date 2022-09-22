import type { NextServerRequest } from '@/types/next';
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

export abstract class BaseApiClient {
  abstract getBaseUrl(): string;

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
      onCatch?: () => void;
    },
  ): Promise<IApiResponse> {
    // console.log('base send function');
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

  //   private async _sendWithJwtCheck(
  //     path: IApiUrl,
  //     method: string,
  //     request: IApiRequest | IApiRequestWithBody,
  //     res: NextServerResponse | undefined,
  //   ) {
  //     if (request.req && res) {
  //       //DO this in the browser only
  //       const token = getUserCookie(request.req);

  //       if (token && token.accessToken) {
  //         const expireDate = getAccessExpFromJwtAsDate(token);

  //         if (expireDate && expireDate <= new Date()) {
  //           const response = await this._refreshJwt(token, request, res);
  //           if (
  //             response.status === StatusCodes.UNAUTHORIZED ||
  //             response.status === StatusCodes.UNPROCESSABLE_ENTITY
  //           ) {
  //             response.status = StatusCodes.UNAUTHORIZED;
  //             response.data = { message: 'Invalid tokens' };
  //             removeUserCookie(request.req, res);
  //             return response;
  //           }
  //         }
  //       }
  //     }
  //     return await this.send(path, method, request);
  //   }

  //   private async _refreshJwt(
  //     token: IJwt,
  //     request: IApiRequest | IApiRequestWithBody,
  //     res: NextServerResponse,
  //   ): Promise<IApiResponse> {
  //     try {
  //       const jwtRefreshRequest = {
  //         headers: request.headers,
  //         body: { refreshToken: token.refreshToken },
  //       };
  //       const response = await this.send('/users/login/refresh', 'POST', jwtRefreshRequest);
  //       if (!response.ok) {
  //         return response;
  //       }

  //       const data = (await response.data) as unknown as any;
  //       await updateCookie(data, request, res);
  //       return response;
  //     } catch (error) {
  //       if (request.req) {
  //         removeUserCookie(request.req, res);
  //       }
  //       logger.error(error);
  //       return {
  //         status: StatusCodes.INTERNAL_SERVER_ERROR,
  //         ok: false,
  //         headers: {},
  //         isJson: false,
  //       };
  //     }
  //   }
  // }

  // async function updateCookie(
  //   data: { accessToken: string; refreshToken: string } | undefined,
  //   request: IApiRequestWithBody | IApiRequest,
  //   res: NextServerResponse,
  // ) {
  //   if (!data || !data.accessToken || !data.refreshToken || !request.req || !res) {
  //     return;
  //   }
  //   const expireTime: number = getExpFromRefreshToken(data.refreshToken) ?? 0;
  //   const now = new Date().getTime() / 1000;
  //   const cookieExp = expireTime - now - 5;
  //   const newJWt: IJwt = {
  //     accessToken: data.accessToken,
  //     refreshToken: data.refreshToken,
  //   };
  //   await setUserCookie(newJWt, request.req, res, cookieExp);
}
