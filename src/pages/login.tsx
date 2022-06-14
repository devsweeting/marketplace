import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Container } from '@mui/material';
import { setCookies } from 'cookies-next';
import { TOKEN_COOKIE } from '@/helpers/constants';
import { loginWithToken } from '@/api/endpoints/login';
import { getUserFromJwt, getUserFromRequest } from '@/helpers/getUserFrom';

const Login: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
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
        >
          <div>
            {user && (
              <>
                <p>You are logged in</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps = async ({ req, res, query }: GetServerSidePropsContext) => {
  const jwt = await loginWithToken({ req, token: query.token });

  if (!jwt) {
    res.statusCode = 400;
    return {
      props: {
        // In case the user refreshes this page after successful login
        user: getUserFromRequest(req),
      },
    };
  }

  setCookies(TOKEN_COOKIE, jwt, { req, res, httpOnly: true, maxAge: 60 * 60 * 24 * 365 });

  return {
    props: { user: getUserFromJwt(jwt) },
  };
};
