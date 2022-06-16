import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';
import { addToWatchlist } from '@/api/endpoints/watchlist';

const Login: NextPage = (user) => {
  const classes = useLoginPageStyles();

  const getWatchList = async () => {
    if (localStorage.getItem('watchList') && localStorage.getItem('watchList') !== 'undefined') {
      const watchList = JSON.parse(localStorage.getItem('watchList') as string);
      return watchList;
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (user) {
      const fetchingWatchListToAPI = async () => {
        const watchList = await getWatchList();
        if (!watchList || watchList === undefined || watchList.length <= 0) return;
        for (let i = 0; i < watchList.length; i++) {
          const id = watchList[i];
          addToWatchlist(id);
        }
        return watchList;
      };

      fetchingWatchListToAPI().then(() => {
        localStorage.removeItem('watchList');
      });
    }
  }, [user]);

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
