import type { NextApiHandler } from 'next';
import type { IUser } from '../../types/user';
import { getUserFromRequest } from '@/helpers/getUserFromRequest';

const me: NextApiHandler<IUser | undefined> = (req, res) => {
  const user = getUserFromRequest(req);

  if (!user) {
    res.send(undefined);
    return;
  }

  res.json(user);
};

export default me;
