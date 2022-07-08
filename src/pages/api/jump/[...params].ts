import type { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';
import type { IApiRequest, IApiRequestWithBody } from '@/api/client';
import type { IncomingHttpHeaders } from 'http';
import { unwrapString } from '@/helpers/unwrapString';
import { apiClient } from '@/api/client';

const methods = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;

const jumpApiProxy: NextApiHandler = async (req, res) => {
  const method = parseMethod(req.method);

  if (!method) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send('Unsupported method type');
    return;
  }

  const headers = parseHeaders(req.headers);
  const body = parseBody(headers, req.body);

  const apiRequest: IApiRequestWithBody | IApiRequest = {
    req,
    body,
    headers,
  };

  const url = (req.url?.startsWith('/')
    ? req.url.replace('/api/jump/', '/')
    : undefined) as unknown as `/${string}` | undefined;

  if (!url) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send('Unsupported method type');
    return;
  }

  const apiResponse = await apiClient[method](url, apiRequest);

  res.status(apiResponse.status);

  if (apiResponse.isJson) {
    res.json(apiResponse.data);
  } else {
    res.send(apiResponse.data);
  }
};

const parseMethod = (str?: string): typeof methods[keyof typeof methods] | undefined => {
  if (!str || !(str.toUpperCase() in methods)) {
    return;
  }

  return methods[str as keyof typeof methods];
};

const parseHeaders = (headers: IncomingHttpHeaders): Record<string, string> => {
  const updatedHeaders: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    const updatedValue = unwrapString(value);

    if (updatedValue) {
      updatedHeaders[key] = updatedValue;
    }
  }

  return updatedHeaders;
};

const parseBody = (
  headers: Record<string, string>,
  body: any,
): Record<string, unknown> | URLSearchParams | undefined => {
  const contentType = headers['content-type'];

  if (contentType === 'application/json') {
    return body as Record<string, string>;
  }

  if (contentType === 'application/x-www-form-urlencoded') {
    return new URLSearchParams(body);
  }

  return;
};

export default jumpApiProxy;
