import type { GetServerSideProps } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Container } from '@mui/material';
import { setCookies } from 'cookies-next';
import { TOKEN_COOKIE } from '@/helpers/constants';
import { login } from '@/api/endpoints/login';

const Login = () => {
  return (
    <>
      <OpenGraph title={'Login'} description={'Login page description'} />
      <Container
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        maxWidth="xl"
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            borderRadius: '4px',
            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)',
            height: '25%',
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const jwt = await login({ req, token: query.token });

  if (!jwt) {
    res.statusCode = 400;
    return { props: {} };
  }

  setCookies(TOKEN_COOKIE, jwt, { req, res, httpOnly: true, maxAge: 60 * 60 * 24 * 365 });

  return {
    props: {},
  };
};
