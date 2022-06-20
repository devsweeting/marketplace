import type { NextPage } from 'next';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';
import { useEffect } from 'react';

const Login: NextPage = ({ user }) => {
  const classes = useLoginPageStyles();

  const getWishList = async () => {
    const wishList = JSON.parse(localStorage.getItem('wishList') as string);

    return wishList;
  };

  const fetchingWatchListToAPI = async () => {
    const wishList = await getWishList();
    if (!wishList || wishList === undefined) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishList),
    });
    const data = await response;
    return data;
  };

  useEffect(() => {
    fetchingWatchListToAPI();
  }, []);

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
    props: { user },
  };
});
