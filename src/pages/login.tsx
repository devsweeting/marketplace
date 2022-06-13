import * as React from 'react';
import type { GetServerSideProps } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Container } from '@mui/material';
import { parseLocale } from '@/helpers/parseLocale';
import { getIpAddress } from '@/helpers/getIpAddress';
import { getStringFromQuery } from '@/helpers/getStringFromQuery';
import { setCookies } from 'cookies-next';
import { TOKEN_COOKIE } from '@/helpers/constants';

const Login = () => {
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
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            borderRadius: '4px',
            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)',
            height: '25%',
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </Container>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const token = getStringFromQuery(query.token);

  if (!token) {
    res.statusCode = 400;
    return { props: {} };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      metadata: {
        ipAddress: getIpAddress(req),
        browserUserAgent: parseLocale(req),
        localeInformation: req.headers['user-agent'],
      },
    }),
  });

  if (!response.ok) {
    res.statusCode = 400;
    return { props: {} };
  }

  const jwt = await response.text();

  setCookies(TOKEN_COOKIE, jwt, { req, res, httpOnly: true, maxAge: 60 * 60 * 24 * 365 });

  return {
    props: {},
  };
};
