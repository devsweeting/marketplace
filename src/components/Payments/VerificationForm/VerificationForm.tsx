import { verificationFields } from './verification.fields';
import type { FormikHelpers } from 'formik';
import { verificationSchema } from './verification.schema';
import type { VerificationValues } from './verification.schema';
import { Form } from '@/components/Form/Form';

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
  submit: (values: VerificationValues, helpers: FormikHelpers<VerificationValues>) => Promise<void>;
};

export function VerificationForm({ submit }: Props) {
  return (
    <Form
      initialValues={initialValues}
      schema={verificationSchema}
      fields={verificationFields}
      submit={submit}
      title="Verification"
    />
  );
}
