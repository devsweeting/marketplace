import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PreviewData, Redirect } from 'next/types';
import type { IUser } from '@/types/user';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import type { NextApiResponse } from 'next/dist/shared/lib/utils';

export interface IWithUser {
  user?: IUser;
}

// The following types are all copied from Next and slightly modified to include
// the user property on the context object and in the resulting props
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

/**
 * This function is intended to wrap a getServerSideProps handler to both
 * include the current user in the handler's context and update the returned
 * props to also include the user which will get passed to the page component
 * @param handler the getServerSideProps handler to wrap
 */
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

// The following types are all copied from Next and slightly modified
// to include the user property on the request object
export type NextApiRequestWithUser = NextApiRequest & IWithUser;
export type NextApiHandlerWithUser<T = any> = (
  req: NextApiRequestWithUser,
  res: NextApiResponse<T>,
) => unknown | Promise<unknown>;

/**
 * This function is intended to wrap an api handler to
 * include the current user on the request object
 * @param handler the api handler to wrap
 */
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
