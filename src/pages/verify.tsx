import { VerificationFailure } from '@/components/Verification/Failure';
import { VerificationForm } from '@/components/Verification/Form';
import { VerificationSuccess } from '@/components/Verification/Success';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { styled } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Container = styled('div')({
  paddingTop: '80px',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export type Steps = {
  form: JSX.Element;
  success: JSX.Element;
  failure: JSX.Element;
};

type VerificationSteps = {
  [key in keyof Steps]: JSX.Element;
};

function Verify() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const success = (message?: string) => {
    setActiveStep(steps['success']);

    message && setMessage(message);
  };

  const failure = (message: string) => {
    setActiveStep(steps['failure']);

    setMessage(message);
  };

  const redirect = () => {
    router.back();
  };

  const steps: VerificationSteps = {
    form: <VerificationForm success={success} failure={failure} />,
    success: <VerificationSuccess redirect={redirect} message={message} />,
    failure: <VerificationFailure redirect={redirect} message={message} />,
  };

  const [activeStep, setActiveStep] = useState(steps.form);

  return <Container>{activeStep}</Container>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = getUserFromRequest(req);

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // const verificationState = getVerificationState(user);

  // if (verificationState === 'Verified') {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return { props: {} };
};

export default Verify;
