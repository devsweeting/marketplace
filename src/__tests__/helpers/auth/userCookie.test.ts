/**
 * @jest-environment node
 */
import { getUserCookie, removeUserCookie, setUserCookie } from '@/helpers/auth/userCookie';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import * as cookiesNext from 'cookies-next';
import { encrypt } from '@/helpers/crypto';

jest.mock('cookies-next');

const mockCookiesNext = cookiesNext as unknown as jest.Mocked<typeof cookiesNext>;

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const mockReq = {} as unknown as Request;

const res = {} as unknown as ServerResponse;

describe('setUserCookie', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should set user cookies', () => {
    setUserCookie({ accessToken: 'test-string', refreshToken: 'refresh-token' }, mockReq, res);
    expect(mockCookiesNext.setCookie).toHaveBeenCalledTimes(1);
  });
});

describe('getUserCookie', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return undefined if user cookie does not exist', () => {
    const result = getUserCookie(mockReq);
    expect(mockCookiesNext.getCookie).toBeCalledTimes(1);
    expect(result).toBe(undefined);
  });

  test('should return decrypted token if token does exist', () => {
    mockCookiesNext.getCookie.mockImplementation(() => {
      const token = encrypt('test-string');
      const refresh = encrypt('refresh');
      return JSON.stringify({ accessToken: token, refreshToken: refresh });
    });
    const result = getUserCookie(mockReq);
    expect(result).toStrictEqual({ accessToken: 'test-string', refreshToken: 'refresh' });
  });
});

describe('removeUserCookie', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call removeCookies once', () => {
    removeUserCookie(mockReq, res);
    expect(mockCookiesNext.deleteCookie).toHaveBeenCalledTimes(1);
  });
});
