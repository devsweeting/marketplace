import type { NextPage } from 'next';
import { loginConfirm } from '@/api/endpoints/loginConfirm';
import { useLoginPageStyles } from '@/styles/LoginPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useReducer, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Loader } from '@/components/Loader';
import { StatusCodes } from 'http-status-codes';

interface ILoginDataState {
  isLoading: boolean;
  error: string;
}

type loginAction = { type: 'fetching' } | { type: 'success' } | { type: 'error'; error: Error };

const initialLoginState = {
  isLoading: true,
  error: '',
  data: '',
};

const loginReducer = (state: ILoginDataState, action: loginAction) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, isLoading: true, error: '' };
    }
    case 'success': {
      return { ...state, isLoading: false };
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error.message };
    }
    default: {
      return state;
    }
  }
};

const Login: NextPage = () => {
  const classes = useLoginPageStyles();
  const [{ isLoading, error }, dispatch] = useReducer(loginReducer, initialLoginState);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState<boolean>(false);
  const { isReady, query } = router;

  const handleLogin = (token: string | string[] | undefined) => {
    dispatch({ type: 'fetching' });

    return loginConfirm(token)
      .then((data) => {
        if (data === StatusCodes.OK) {
          dispatch({ type: 'success' });
        }
      })
      .catch((error) => {
        dispatch({ type: 'error', error });
      });
  };

  useEffect(() => {
    isReady ? setReady(true) : setReady(false);
    if (isReady) {
      void handleLogin(query.token);
    }
  }, [isReady, query]);
  if (isLoading) {
    return <Loader />;
  }
  if (error !== '') {
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
  }
  void Router.push('/');
  return <></>;
};

export default Login;

// export const getServerSideProps = getServerSidePropsWithUser(async ({ req, res, query, user }) => {
//   // const jwt = await loginConfirm({ req, token: query.token, res });
//   // if (!jwt && !user) {
//   //   res.statusCode = 400;
//   //   return {
//   //     props: {},
//   //   };
//   // }
//   // if (!jwt) {
//   //   return {
//   //     redirect: {
//   //       statusCode: 302,
//   //       destination: '/login/success',
//   //     },
//   //   };
//   // }
//   // setUserCookie(jwt, req, res);
//   // return {
//   //   redirect: {
//   //     statusCode: 302,
//   //     destination: '/login/success',
//   //   },
//   // };
// });
