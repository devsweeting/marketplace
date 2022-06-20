import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const socket = new Socket();
const req = new IncomingMessage(socket) as Request;
Object.defineProperty(req, 'cookies', {
  value: 'USER_TOKEN="asdfasdfasdfasdf"',
});

const mockValidJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6MTMzNywiaWF0IjoxNjU1NzYwNzY0LCJleHAiOjE2NTU4Njg3NjR9.jT_lLXBBTqaAOaSesfsASQNhYuBwY2osw8aYAMT2khs';

describe('getUserFromJWT', () => {
  test('Should return undefined if no JWT is supplied', () => {
    expect(getUserFromJwt()).toBe(undefined);
    getUserFromJwt();
  });

  test('Should return id if a valid jwt is supplied', () => {
    expect(getUserFromJwt(mockValidJWT)).toEqual({ id: 1337 });
  });
});

describe('getUserFromRequest', () => {
  jest.mock();
});
