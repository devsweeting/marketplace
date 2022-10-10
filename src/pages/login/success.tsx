import type { NextApiRequest, NextPage } from 'next';
import { useEffect } from 'react';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { addToWatchlist } from '@/api/endpoints/watchlist';
import type { IProductDataProps } from '@/components/ProductCard';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';

const Login: NextPage = (user) => {
  const classes = useLoginPageStyles();

  const getWatchList = () => {
    return JSON.parse(localStorage.getItem('watchList') as string) ?? [];
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const addWatchListItems = async () => {
      const watchList = getWatchList();

      await Promise.all(watchList.map((item: IProductDataProps) => addToWatchlist(item)));
    };

    addWatchListItems()
      .then(() => {
        localStorage.removeItem('watchList');
      })
      .catch(() => {
        return;
      });
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
            <Typography variant="xl5" className={classNames(classes.loginSuccessText)}>
              Logged in successfully
            </Typography>
            <Button href="/explore" className={classNames(classes.loginSuccessButton)}>
              <Typography variant="lg">Go Explore</Typography>
              <StorefrontIcon />
            </Button>
          </>
        </Box>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const user = await getUserFromRequest(req);
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
};
