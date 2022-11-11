import { object, string } from 'yup';
import type { InferType } from 'yup';
import { subdivisionEnums } from '../data/subdivision';

export const verificationSchema = object({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string().email('Enter a valid email').required('Email is required'),
  phone_numbers: string()
    .length(12, 'Must be a valid phone number')
    .required('Phone number is required'),
  gender: string().oneOf(['M', 'F', 'O']).required('Gender is required'),
  date_of_birth: object({
    day: string().required('Day is required'),
    month: string().required('Month is required'),
    year: string().required('Year is required'),
  }),
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
