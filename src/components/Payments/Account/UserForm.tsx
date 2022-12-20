import { Form } from '@/components/Form/Form';
import { userFields } from './account.fields';
import { accountSchema } from './account.schema';
import type { AccountValues } from './account.schema';
import type { FormikHelpers } from 'formik';
import { styled, Typography } from '@mui/material';

const TosContainer = styled('div')({
  maxWidth: '80ch',
  padding: '1rem',
  textAlign: 'center',
});

const Tos = styled(Typography)({});

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

type Props = {
  submit: (values: AccountValues, helpers: FormikHelpers<AcountValues>) => Promise<void>;
};

export function UserForm({ submit }: Props) {
  return (
    <>
      <Form
        initialValues={initialValues}
        schema={userSchema}
        fields={userFields}
        submit={submit}
        title="Account"
      />
      <TosContainer>
        <Tos>
          Synapse is our backend software provider, and partners with financial institutions to
          provide FDIC insurance. Synapse’s API, and their relationship with financial institutions,
          enables us to offer banking services and products. by agreeing to Jump’s TOS and Privacy
          Policy, you also agree to Syanpse’s terms and polices below:
        </Tos>
        <TosLinks>
          <a href="https://synapsefi.com/privacy" target="_blank" rel="noopener noreferrer">
            Terms of Service{' '}
          </a>
          <a href="https://synapsefi.com/tos" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </TosLinks>
      </TosContainer>
    </>
  );
}
