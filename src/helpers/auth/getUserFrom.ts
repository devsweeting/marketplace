import jwtDecode from 'jwt-decode';
import type { IUser } from '@/types/user';
import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';

export const getUserFromRequest = (req: NextServerRequest): IUser | undefined => {
  const token = getUserCookie(req);

  return getUserFromJwt(token);
};

export const getUserFromJwt = (jwt?: string): IUser | undefined => {
  if (!jwt) {
    return;
  }
  const parsedJwt = jwtDecode<{ subId: string; address: string }>(jwt);
  return { id: parsedJwt.subId, email: parsedJwt.address };
};
