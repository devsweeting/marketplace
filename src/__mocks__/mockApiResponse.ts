import type { IApiJsonResponse, IApiResponse, IApiTextResponse } from '@/api/client/apiClient.base';
import { StatusCodes } from 'http-status-codes';

export interface IMockApiResponseOptions {
  headers?: IApiResponse['headers'];
  status?: IApiResponse['status'];
}

export const mockJsonResponse = (
  data: IApiJsonResponse['data'] = {},
  { headers = {}, status = StatusCodes.OK }: IMockApiResponseOptions = {},
): IApiJsonResponse => {
  const ok = status >= 200 && status <= 299;

  return {
    status,
    ok,
    data,
    headers,
    isJson: true,
  };
};

export const mockTextResponse = (
  data?: IApiTextResponse['data'],
  { headers = {}, status = StatusCodes.OK }: IMockApiResponseOptions = {},
): IApiTextResponse => {
  const ok = status >= 200 && status <= 299;

  return {
    status,
    ok,
    data,
    headers,
    isJson: false,
  };
};
