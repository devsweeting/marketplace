import { removeCookies } from 'cookies-next';
import { TOKEN_COOKIE } from '@/helpers/constants';
import type { GetServerSideProps } from 'next';

const Logout = () => {
  return <p>Logged out</p>;
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  removeCookies(TOKEN_COOKIE, { req, res });

  return {
    redirect: {
      statusCode: 302,
      destination: '/',
    },
  };
};
