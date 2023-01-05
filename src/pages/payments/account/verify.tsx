import { getTerms, verifyAddress } from '@/api/endpoints/payments';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form/Form';
import { verificationFields } from '@/components/Payments/VerificationForm/verification.fields';
import { verificationSchema } from '@/components/Payments/VerificationForm/verification.schema';
import type { VerificationValues } from '@/components/Payments/VerificationForm/verification.schema';
import { formatErrorResponse } from '@/helpers/formatErrorResponse';
import { Box, styled } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { useState } from 'react';
import PaymentsAccount from '@/pages/payments/account/index';

const Container = styled('div')({
  paddingTop: '80px',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const initialValues: VerificationValues = {
  mailing_address: {
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_postal_code: '',
    address_country_code: 'US',
  },
};

type Props = {
  terms: any;
};

const submit = async (
  values: VerificationValues,
  { setErrors, setStatus }: FormikHelpers<VerificationValues>,
) => {
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
};

export default function PaymentsVerify({ terms }: Props) {
  console.log("terms", terms)
  const [step, setStep] = useState<'terms' | 'form'>('terms');

  const next = () => {
    setStep('form');
  };

  const steps = {
    terms: (
      <Box sx={{ maxWidth: 900 }}>
        {/* <PaymentsAccount />  */}
        {terms}
        <Button onClick={next} variant="contained">
          Accept
        </Button>
      </Box>
    ),
    form: (
      <Form
        initialValues={initialValues}
        schema={verificationSchema}
        fields={verificationFields}
        submit={submit}
        title="Verification"
      />
    ),
  };

  return <Container>{steps[step]}</Container>;
}

export async function getServerSideProps() {
  // if no account yet

  // return {
  //   redirect: {
  //     destination: '/payments/account',
  //     permanent: false,
  //   },
  // };

  const terms = await getTerms();
  console.log("serversideprops", terms)

  if (!terms)
    return {
      props: {},
    };

  return {
    props: {
      // terms,
    },
  };
}
