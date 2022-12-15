import type { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@/api/client';
import { processHeaders } from '@/helpers/processHeaders';
import type { IServerApiRequest, IServerApiRequestWithBody } from '@/api/client/apiClient.server';

const methods = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;

export const jumpApiProxy: NextApiHandler = async (req, res) => {
  const method = parseMethod(req.method);
  if (!method) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send('Unsupported method type');
    return;
  }
  const headers = processHeaders(req.headers);
  const body = parseBody(headers, req.body);

  const apiRequest: IServerApiRequestWithBody | IServerApiRequest = {
    req,
    body,
    headers,
    __allowAuthInServerSideRequest: true,
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
// Fix for https://github.com/getsentry/sentry-javascript/issues/3852
export const config = {
  api: {
    externalResolver: true,
  },
};

export default jumpApiProxy;
