import { object, string } from 'yup';
import type { InferType } from 'yup';
import { subdivisionEnums } from '@/helpers/constants';

export const verificationSchema = object({
  mailing_address: object({
    address_street: string().required('Street is required'),
    address_city: string().required('City is required'),
    address_subdivision: string().oneOf(subdivisionEnums).required('Subdivision is required'),
    address_postal_code: string()
      .length(5, 'Must be a valid postal code')
      .required('Postal code is required'),
    address_country_code: string(),
  }),
});

export type VerificationValues = InferType<typeof verificationSchema>;
