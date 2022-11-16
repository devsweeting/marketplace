import { Section } from './components/Section';
import { Form, Title, SectionContainer } from './VerificationForm.styles';
import { SubmitButton } from './components/SubmitButton';
import { verificationFields } from './verification.fields';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import { verificationSchema } from './verification.schema';
import type { VerificationValues } from './verification.schema';
import { FormError } from './components/FormError';

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
  submit: (values: VerificationValues, helpers: FormikHelpers<VerificationValues>) => Promise<void>;
};

export function VerificationForm({ submit }: Props) {
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
