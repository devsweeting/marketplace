import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const loginAuthCookie = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
    }),
  );
  res.statusCode = 200;
  res.json({ success: true });
};

export default loginAuthCookie;
