import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PreviewData, Redirect } from 'next/types';
import type { IUser } from '../types/user';
import { getUserFromRequest } from '@/helpers/getUserFromRequest';

interface WithUser {
  user?: IUser;
}

type GetServerSidePropsContextWithUser<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = GetServerSidePropsContext<Q, D> & WithUser;

type GetServerSidePropsWithUserContext<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: GetServerSidePropsContextWithUser<Q, D>) => Promise<GetServerSidePropsResult<P>>;

type GetServerSidePropsResultWithUser<P> =
  | { props: (P & WithUser) | Promise<P & WithUser> }
  | { redirect: Redirect }
  | { notFound: true };

type GetServerSidePropsWithUserResult<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: GetServerSidePropsContext<Q, D>) => Promise<GetServerSidePropsResultWithUser<P>>;

export const withUser = <
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
