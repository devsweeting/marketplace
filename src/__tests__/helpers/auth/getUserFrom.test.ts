import { getUserFromJwt, getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { IncomingMessage } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

jest.mock('@/helpers/auth/userCookie');
const mockGetUserCookie = getUserCookie as unknown as jest.Mock;

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const mockReq = {} as unknown as Request;

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
  test('should get user id from a request', () => {
    mockGetUserCookie.mockReturnValue(mockValidJWT);
    expect(getUserFromRequest(mockReq)).toEqual({ id: 1337 });
  });
});
