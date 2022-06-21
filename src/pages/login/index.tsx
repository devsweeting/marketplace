import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { loginWithToken } from '@/api/endpoints/login';
import { setUserCookie } from '@/helpers/auth/userCookie';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';

const Login: NextPage = (jwt) => {
  const classes = useLoginPageStyles();
  console.log(jwt);

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
        console.log('fetchingWatchListToAPI');
        console.log(jwt);
        const wishList = await getWishList();
        if (!wishList || wishList === undefined || wishList.length <= 0) return;
        for (let i = 0; i < wishList.length; i++) {
          const item = wishList[i];
          const response = await fetch(`${process.env.API_URL}/api/wishlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              itemId: item.itemId,
            }),
          });
          console.log(response);
          const data = await response.json();
          console.log(data);
          return data;
        }
      };

      fetchingWatchListToAPI(jwt).then((data) => {
        if (data) {
          console.log('Successfully added watchlist to API');
          console.log(data);
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

export const getServerSideProps = getServerSidePropsWithUser(async ({ req, res, query, user }) => {
  const jwt = await loginWithToken({ req, token: query.token });

  if (!jwt && !user) {
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

      props: { jwt },
    };
  }

  setUserCookie(jwt, req, res);

  return {
    redirect: {
      statusCode: 302,
      destination: '/login/success',
    },

    props: {
      jwt,
    },
  };
});
