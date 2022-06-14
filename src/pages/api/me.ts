import { apiWithUser } from '@/helpers/withUser';
import type { IUser } from '../../types/user';

const me = apiWithUser<IUser | undefined>((req, res) => {
  if (!req.user) {
    res.send(undefined);
    return;
  }

  res.json(req.user);
});

export default me;
