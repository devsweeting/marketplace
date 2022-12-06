import type { NextApiRequest, NextPage } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Container, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { addToWatchlist } from '@/api/endpoints/watchlist';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import Link from 'next/link';
import { LoginTextContainer } from '@/styles/LoginPage.styles';
import { useLocalWatchlist } from '@/helpers/hooks/useLocalWatchlist';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';

const Login: NextPage = (user) => {
  const { getLocalWatchlist } = useLocalWatchlist();
  const addWatchListItems = async (signal: AbortSignal | undefined) => {
    const watchList = getLocalWatchlist();

    if (!user) {
      return;
    }

    await Promise.all(watchList.map((id) => addToWatchlist(id, signal))).then(() => {
      localStorage.removeItem('watchList');
    });
  };

  useEndpoint(
    (signal) => addWatchListItems(signal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

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
            Logged in successfully
          </Typography>
          <Link href="/explore">
            <Button>
              <Typography variant="lg">Go Explore</Typography>
            </Button>
          </Link>
        </LoginTextContainer>
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
