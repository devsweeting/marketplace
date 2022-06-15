import type { GetServerSideProps } from 'next';
import { removeUserCookie } from '@/helpers/auth/userCookie';

const Logout = () => {
  return <p>Logged out</p>;
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  removeUserCookie(req, res);

  return {
    redirect: {
      statusCode: 302,
      destination: '/',
    },
  };
};
