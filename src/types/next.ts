import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type NextServerRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export type NextServerResponse = ServerResponse;
