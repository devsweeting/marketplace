import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PreviewData, Redirect } from 'next/types';
import type { IUser } from '../types/user';
import { getUserFromRequest } from '@/helpers/getUserFrom';
import type { NextApiResponse } from 'next/dist/shared/lib/utils';

export interface IWithUser {
  user?: IUser;
}

export type GetServerSidePropsContextWithUser<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = GetServerSidePropsContext<Q, D> & IWithUser;

export type GetServerSidePropsWithUserContext<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: GetServerSidePropsContextWithUser<Q, D>) => Promise<GetServerSidePropsResult<P>>;

export type GetServerSidePropsResultWithUser<P> =
  | { props: (P & IWithUser) | Promise<P & IWithUser> }
  | { redirect: Redirect }
  | { notFound: true };

export type GetServerSidePropsWithUserResult<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: GetServerSidePropsContext<Q, D>) => Promise<GetServerSidePropsResultWithUser<P>>;

export const getServerSidePropsWithUser = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
>(
  handler: GetServerSidePropsWithUserContext<P, Q, D> = async () => ({ props: {} as P }),
): GetServerSidePropsWithUserResult<P, Q, D> => {
  return async (context) => {
    const user = getUserFromRequest(context.req);

    const updatedContext = context as GetServerSidePropsContextWithUser<Q, D>;

    if (user) {
      updatedContext.user = user;
    }

    const result = await handler(updatedContext);

    const updatedResult = result as GetServerSidePropsResultWithUser<P>;

    if ('props' in updatedResult && user) {
      const props = await updatedResult.props;
      props.user = user;
      updatedResult.props = props;
    }

    return updatedResult;
  };
};

export type NextApiRequestWithUser = NextApiRequest & IWithUser;
export type NextApiHandlerWithUser<T = any> = (
  req: NextApiRequestWithUser,
  res: NextApiResponse<T>,
) => unknown | Promise<unknown>;

export const apiWithUser = <T>(handler: NextApiHandlerWithUser<T>): NextApiHandler<T> => {
  return (req, res) => {
    const user = getUserFromRequest(req);

    const updatedRequest = req as NextApiRequestWithUser;

    if (user) {
      updatedRequest.user = user;
    }

    return handler(updatedRequest, res);
  };
};
