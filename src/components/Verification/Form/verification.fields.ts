import type { FieldSchema } from '../types';
import { genderOptions } from '../data/gender';
import { subdivisionOptions } from '../data/subdivision';

export const verificationFields: FieldSchema = [
  {
    type: 'section',
    title: 'Basic Information',
    children: [
      {
        type: 'text',
        label: 'First name',
        name: 'first_name',
      },
      {
        type: 'text',
        label: 'Last name',
        name: 'last_name',
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
      },
    ],
  },
  {
    type: 'section',
    title: 'Personal Information',
    children: [
      {
        type: 'text',
        label: 'Phone',
        name: 'phone_numbers',
        helperText: '000.000.0000',
      },
      {
        type: 'group',
        title: 'Date of Birth',
        fields: [
          {
            type: 'text',
            label: 'Day',
            name: 'date_of_birth.day',
            helperText: 'DD',
            sx: { flex: 1 },
          },
          {
            type: 'text',
            label: 'Month',
            name: 'date_of_birth.month',
            helperText: 'MM',
            sx: { flex: 1 },
          },
          {
            type: 'text',
            label: 'Year',
            name: 'date_of_birth.year',
            helperText: 'YYYY',
            sx: { flex: 2 },
          },
        ],
      },
      {
        type: 'select',
        select: true,
        label: 'Gender',
        name: 'gender',
        options: genderOptions,
      },
    ],
  },
  {
    type: 'section',
    title: 'Address',
    children: [
      {
        type: 'text',
        label: 'Street',
        name: 'mailing_address.address_street',
      },
      {
        type: 'text',
        label: 'City',
        name: 'mailing_address.address_city',
      },
      {
        type: 'group',
        fields: [
          {
            type: 'select',
            select: true,
            label: 'Subdivision',
            name: 'mailing_address.address_subdivision',
            options: subdivisionOptions,
            sx: { flex: 1 },
          },
          {
            type: 'text',
            sx: { flex: 1 },
            label: 'Postal Code',
            name: 'mailing_address.address_postal_code',
          },
        ],
      },
    ],
  },
];
