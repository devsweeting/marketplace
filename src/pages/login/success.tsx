import type { NextPage } from 'next';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';

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
            <Typography variant="h2" className={classNames(classes.loginSuccessText)}>
              Logged in successfully
            </Typography>
            <Button href="/explore" className={classNames(classes.loginSuccessButton)}>
              <Typography variant="h3">Go Explore</Typography>
              <StorefrontIcon />
            </Button>
          </>
        </Box>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps = getServerSidePropsWithUser(async ({ user }) => {
  if (!user) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
});
