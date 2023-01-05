import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { registerAccount } from '@/api/endpoints/payments';
import { accountSchema } from '@/components/Payments/Account/account.schema';
import type { AccountValues } from '@/components/Payments/Account/account.schema';
import { formatNestedErrorResponse } from '@/helpers/formatErrorResponse';
import type { FormikHelpers } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Form } from '@/components/Form/Form';
import { accountFields } from '@/components/Payments/Account/account.fields';
import { styled, Typography } from '@mui/material';

const TosContainer = styled('div')({
  maxWidth: '80ch',
  padding: '1rem',
  textAlign: 'center',
});

const TosLinks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const initialValues: AccountValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_numbers: '',
  date_of_birth: {
    day: '',
    month: '',
    year: '',
  },
  gender: '',
  agreement: false,
};

const Container = styled('div')({
  paddingTop: '80px',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const formatted = (values: AccountValues) => {
  delete values.agreement;

  return {
    ...values,
    date_of_birth: {
      day: parseInt(values.date_of_birth.day, 10),
      month: parseInt(values.date_of_birth.month, 10),
      year: parseInt(values.date_of_birth.year, 10),
    },
  };
};

export default function PaymentsAccount() {
  const router = useRouter();

  const submit = async (
    values: AccountValues,
    { setErrors, setStatus }: FormikHelpers<AccountValues>,
  ) => {
    const account = await registerAccount(formatted(values));

    if (!account)
      return setStatus({ formError: 'There was a problem submitting your information.' });

    if ('error' in account) {
      setErrors(formatNestedErrorResponse(account.error));
    } else {
      if (account.status === 201) {
        await router.push('/payments/verify');
      }
    }
  };

  return (
    <Container>
      <Form
        initialValues={initialValues}
        schema={accountSchema}
        fields={accountFields}
        submit={submit}
        title="Account"
      />
      <TosContainer> 
        <Typography>
          Synapse is our backend software provider, and partners with financial institutions to
          provide FDIC insurance. Synapse’s API, and their relationship with financial institutions,
          enables us to offer banking services and products. by agreeing to Jump’s TOS and Privacy
          Policy, you also agree to Syanpse’s terms and polices below:
        </Typography>
        <TosLinks>
          <a href="https://synapsefi.com/privacy" target="_blank" rel="noopener noreferrer">
            Terms of Service{' '}
          </a>
          <a href="https://synapsefi.com/tos" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </TosLinks>
      </TosContainer>
    </Container>
  );
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

  return { props: {} };
};
