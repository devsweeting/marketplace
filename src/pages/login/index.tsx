import type { GetServerSidePropsContext, NextPage } from 'next';
import { loginWithToken } from '@/api/endpoints/login';
import { setUserCookie } from '@/helpers/auth/userCookie';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';

const Login: NextPage = () => {
  const classes = useLoginPageStyles();
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
        <Box className={classNames(classes.loginSuccessBox)}>
          <>
            <Typography variant="h2" className={classNames(classes.loginFailText)}>
              Invalid Token
            </Typography>
            <Typography variant="subtitle2" className={classNames(classes.loginFailSubtext)}>
              Please Try Again. If you continue to have issues, please contact us
            </Typography>
          </>
        </Box>
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
      props: {},
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
