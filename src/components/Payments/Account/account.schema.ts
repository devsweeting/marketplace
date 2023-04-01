import { object, string, bool } from 'yup';
import type { InferType } from 'yup';

export const accountSchema = object({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string().email('Enter a valid email').required('Email is required'),
  phone_numbers: string()
    .length(12, 'Must be a valid phone number')
    .required('Phone number is required'),
  gender: string().oneOf(['M', 'F', 'O', '']),
  date_of_birth: object({
    day: string().required('Day is required'),
    month: string().required('Month is required'),
    year: string().required('Year is required'),
  }),
  agreement: bool().oneOf([true]).required('You must accept the agreement to create an account.'),
});

export type Account = InferType<typeof accountSchema>;

export type AccountValues = Omit<Account, 'agreement'> & Partial<Pick<Account, 'agreement'>>;
