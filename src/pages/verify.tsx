import { registerPaymentsUser, verifyAddress } from '@/api/endpoints/payments';
import { VerificationFailure } from '@/components/Verification/Failure';
import { VerificationForm } from '@/components/Verification/Form';
import type { VerificationValues } from '@/components/Verification/Form/verification.schema';
import { VerificationSuccess } from '@/components/Verification/Success';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { formatErrorResponse, formatNestedErrorResponse } from '@/helpers/formatErrorResponse';
import { styled } from '@mui/material';
import type { FormikHelpers } from 'formik';
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

  const submit = async (
    values: VerificationValues,
    { setErrors, setStatus }: FormikHelpers<VerificationValues>,
  ) => {
    try {
      const address = await verifyAddress(values.mailing_address);

      if (!address) {
        return setStatus({
          formError: 'Failed to submit address information. Please try again or contact support.',
        });
      }

      if ('error' in address) {
        setErrors({ mailing_address: formatErrorResponse(address.error) });
        return;
      }

      if ('address' in address) {
        if (address.address.deliverability === 'error') {
          return setStatus({
            formError: 'Failed to validate address. Please check information is correct.',
          });
        }
      }

      const user = await registerPaymentsUser(values);

      if (!user)
        return setStatus({
          formError: 'Failed to submit your information. Please try again or contact support.',
        });

      if ('error' in user) {
        setErrors(formatNestedErrorResponse(user.error));
      } else {
        if (user.status === 303) {
          failure('Synapse user already exists.');
        }

        if (user.status === 201) {
          success();
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      failure('Failed to submit your verification');
    }
  };

  const steps: VerificationSteps = {
    form: <VerificationForm submit={submit} />,
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
