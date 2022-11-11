import { Section } from './components/Section';
import { Form, Title, SectionContainer } from './VerificationForm.styles';
import { SubmitButton } from './components/SubmitButton';
import { verificationFields } from './verification.fields';
import { Formik } from 'formik';
import { verificationSchema } from './verification.schema';
import type { VerificationValues } from './verification.schema';
import { FormError } from './components/FormError';
import { registerPaymentsUser, verifyAddress } from '@/api/endpoints/payments';

const initialValues: VerificationValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_numbers: '',
  gender: '',
  date_of_birth: {
    day: '',
    month: '',
    year: '',
  },
  mailing_address: {
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_postal_code: '',
    address_country_code: 'US',
  },
};

type Props = {
  success: (message?: string) => void;
  failure: (message: string) => void;
};

export function VerificationForm({ success, failure }: Props) {
  const submit = async (
    values: VerificationValues,
    { setErrors, setStatus }: { setErrors: any; setStatus: any },
  ) => {
    try {
      const address = await verifyAddress(initialValues.mailing_address);

      if (!address) return;

      if ('error' in address) {
        setErrors({ mailing_address: address.error });
        return;
      }

      if ('address' in address) {
        if (address.address.deliverability === 'error') {
          //setForm error
          setStatus({
            formError: 'Failed to validate address. Please check information is correct.',
          });
          return;
        }
      }

      const user = await registerPaymentsUser(values);

      if (!user) return; //display formError;

      if ('error' in user) {
        setErrors(user.error);
      }

      if (user.status === 303) {
        failure('Synapse user already exists.');
      }

      if (user.status === 201) {
        success();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      failure('Failed to submit your verification');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={verificationSchema} onSubmit={submit}>
      <Form>
        <Title variant="xl6">Verification</Title>
        <SectionContainer>
          {verificationFields.map(({ title, children }) => (
            <Section key={title} title={title}>
              {children}
            </Section>
          ))}
        </SectionContainer>
        <FormError />
        <SubmitButton />
      </Form>
    </Formik>
  );
}
