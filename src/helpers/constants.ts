export const USER_TOKEN_COOKIE = 'USER_TOKEN';
export const ENCRYPTION_KEY =
  typeof window === 'undefined'
    ? Buffer.from(process.env.ENCRYPTION_KEY ?? '', 'base64')
    : undefined;
