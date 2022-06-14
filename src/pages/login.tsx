import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Container, Box, Typography } from '@mui/material';
import classNames from 'classnames';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { setCookies } from 'cookies-next';
import { TOKEN_COOKIE } from '@/helpers/constants';
import { loginWithToken } from '@/api/endpoints/login';
import { getUserFromJwt, getUserFromRequest } from '@/helpers/getUserFrom';
import { Button } from '@/components/Button';
import { removeUndefinedProps } from '@/helpers/removeUndefinedProps';

const Login: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
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
          {user && (
            <>
              <Typography variant="h2" className={classNames(classes.loginSuccessText)}>
                Logged in successfully
              </Typography>
              <Button href="/explore" className={classNames(classes.loginSuccessButton)}>
                <Typography variant="h3">Go Explore</Typography>
                <StorefrontIcon />
              </Button>
            </>
          )}
          {!user && (
            <>
              <Typography variant="h2" className={classNames(classes.loginFailText)}>
                Invalid Token
              </Typography>
              <Typography variant="subtitle2" className={classNames(classes.loginFailSubtext)}>
                Please Try Again. If you continue to have issues, please contact us
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps = removeUndefinedProps(
  async ({ req, res, query }: GetServerSidePropsContext) => {
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
  },
);
