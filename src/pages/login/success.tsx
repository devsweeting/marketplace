import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';
import { getUserCookie } from '@/helpers/auth/userCookie';

const Login: NextPage = (jwt) => {
  const classes = useLoginPageStyles();
  const getWishList = async () => {
    if (localStorage.getItem('wishList') && localStorage.getItem('wishList') !== 'undefined') {
      const wishList = JSON.parse(localStorage.getItem('wishList') as string);
      return wishList;
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (jwt) {
      const fetchingWatchListToAPI = async (jwt: any) => {
        const wishList = await getWishList();
        if (!wishList || wishList === undefined || wishList.length <= 0) return;
        for (let i = 0; i < wishList.length; i++) {
          const item = wishList[i];
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/watchlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt.jwt}`,
            },
            body: JSON.stringify({
              assetId: item.id,
              userId: jwt.user.id,
            }),
          });

          const data = await response.json();

          return data;
        }
      };

      fetchingWatchListToAPI(jwt).then((data) => {
        if (data) {
          localStorage.removeItem('wishList');
        }
      });
    }
  }, [jwt]);

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

export const getServerSideProps = getServerSidePropsWithUser(async ({ req, user }) => {
  if (!user) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/',
      },
    };
  }
  const jwt = getUserCookie(req);

  return {
    props: {
      jwt,
    },
  };
});
