import { withSentry } from '@sentry/nextjs';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import type { NextApiRequest, NextApiResponse } from 'next';

export const me = (req: NextApiRequest, res: NextApiResponse) => {
  const user = getUserFromRequest(req);
  if (!user) {
    res.send(undefined);
    return;
  }

  res.json(user);
};
// Fix for https://github.com/getsentry/sentry-javascript/issues/3852
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSentry(me);
