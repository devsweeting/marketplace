import { getUserFromJwt, getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { IncomingMessage } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

jest.mock('@/helpers/auth/userCookie');
const mockGetUserCookie = getUserCookie as unknown as jest.MockedFn<typeof getUserCookie>;

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const mockReq = {} as unknown as Request;

// JWT Payload
// {
//   "subId": 1337,
//   "id":1337,
//   "email":"test@test.com",
//   "iat": 1655760764,
//   "exp": 1655868764
// }
const mockValidJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6MTMzNywiaWQiOjEzMzcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1NTc2MDc2NCwiZXhwIjoxNjU1ODY4NzY0fQ.sbsnnXF4pygn92GeJ5FMmQjy4HHEFkWZGdldjSxvdQ0';

describe('getUserFromJWT', () => {
  test('Should return undefined if no JWT is supplied', () => {
    expect(getUserFromJwt()).toBe(undefined);
  });

  test('Should return id if a valid jwt is supplied', () => {
    expect(getUserFromJwt(mockValidJwt)).toEqual({
      id: 1337,
      email: 'test@test.com',
    });
  });
});

describe('getUserFromRequest', () => {
  test('should get user id from a request', () => {
    mockGetUserCookie.mockReturnValue(mockValidJwt);
    expect(getUserFromRequest(mockReq)).toEqual({ id: 1337, email: 'test@test.com' });
  });
});
