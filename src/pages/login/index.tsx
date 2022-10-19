import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { loginConfirm } from '@/api/endpoints/loginConfirm';
import { setUserCookie } from '@/helpers/auth/userCookie';
import { OpenGraph } from '@/components/OpenGraph';
import { Container, Typography } from '@mui/material';
import type { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { LoginTextContainer } from '@/styles/LoginPage.styles';

const Login: NextPage = () => {
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
      >
        <LoginTextContainer>
          <Typography variant="xl3" fontWeight={700}>
            Invalid Token
          </Typography>
          <Typography variant="body1">
            Please Try Again. If you continue to have issues, please contact us
          </Typography>
        </LoginTextContainer>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps = async ({
  req,
  res,
  query,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: NextApiRequestQuery;
}) => {
  const jwt = await loginConfirm({ req, token: query.token });

  if (!jwt) {
    res.statusCode = 400;
    return {
      props: {},
    };
  }

  if (!jwt) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/login/success',
      },
    };
  }

  setUserCookie(jwt, req, res);

  return {
    redirect: {
      statusCode: 302,
      destination: '/login/success',
    },
  };
};
