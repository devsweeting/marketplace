/**
 * @jest-environment node
 */
import { getUserCookie, removeUserCookie, setUserCookie } from '@/helpers/auth/userCookie';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { encrypt } from '@/helpers/crypto';

jest.mock('cookies-next');

// jest.mock('@/helpers/constants', () => ({
//   ENCRYPTION_KEY: Buffer.from('testEncyrptionKeyyyyyyyyyyyyyyyyyyyyyyyyyyy=', 'base64'),
// }));

const mockGetCookie = getCookie as unknown as jest.Mock<typeof getCookie>;
const mockRemoveCookie = removeCookies as unknown as jest.Mock<typeof removeCookies>;
const mockSetCookie = setCookies as unknown as jest.Mock<typeof setCookies>;

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const mockReq = {} as unknown as Request;
const res = {} as unknown as ServerResponse;

describe('setUserCookie', () => {
  test('should set user cookies', () => {
    setUserCookie('some data', mockReq, res);
    expect(mockSetCookie).toHaveBeenCalledTimes(1);
  });
});

describe('getUserCookie', () => {
  test('should return undefined if user cookie does not exist', () => {
    const result = getUserCookie(mockReq);
    expect(mockGetCookie).toBeCalledTimes(1);
    expect(result).toBe(undefined);
  });

  test('should return decrypted token if token does exist', () => {
    mockGetCookie.mockImplementation(() => encrypt('test-string') as unknown as typeof getCookie);
    const result = getUserCookie(mockReq);
    expect(result).toBe('test-string');
  });
});

describe('removeUsesrCookie', () => {
  test('should call removeCookies once', () => {
    removeUserCookie(mockReq, res);
    expect(mockRemoveCookie).toHaveBeenCalledTimes(1);
  });
});
