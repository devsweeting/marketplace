import { apiWithUser } from '@/helpers/auth/withUser';
import type { IUser } from '../../types/user';
import { withSentry } from '@sentry/nextjs';

const me = apiWithUser<IUser | undefined>((req, res) => {
  if (!req.user) {
    res.send(undefined);
    return;
  }

  res.json(req.user);
});
// Fix for https://github.com/getsentry/sentry-javascript/issues/3852
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSentry(me);
