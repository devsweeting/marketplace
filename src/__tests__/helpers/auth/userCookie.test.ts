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
    setUserCookie('some data', mockReq, res);
    expect(mockCookiesNext.setCookies).toHaveBeenCalledTimes(1);
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
    mockCookiesNext.getCookie.mockImplementation(() => encrypt('test-string'));
    const result = getUserCookie(mockReq);
    expect(result).toBe('test-string');
  });
});

describe('removeUserCookie', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call removeCookies once', () => {
    removeUserCookie(mockReq, res);
    expect(mockCookiesNext.removeCookies).toHaveBeenCalledTimes(1);
  });
});
