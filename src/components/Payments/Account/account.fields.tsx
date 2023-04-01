import { genderOptions } from '@/helpers/constants';
import type { FormSchema } from '@/types';

export const fields = [
  {
    type: 'section',
  },
];

export const accountFields: FormSchema = [
  {
    type: 'organism',
    title: 'Basic Information',
    children: [
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'First name',
          name: 'first_name',
        },
      },
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'Last name',
          name: 'last_name',
        },
      },
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'Email',
          name: 'email',
        },
      },
    ],
  },
  {
    type: 'organism',
    title: 'Personal Information',
    children: [
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'Phone',
          name: 'phone_numbers',
          helperText: '000.000.0000',
        },
      },
      {
        type: 'molecule',
        title: 'Date of Birth',
        children: [
          {
            type: 'atom',
            component: 'text',
            props: {
              label: 'Day',
              name: 'date_of_birth.day',
              helperText: 'DD',
              sx: { flex: 1 },
            },
          },
          {
            type: 'atom',
            component: 'text',
            props: {
              label: 'Month',
              name: 'date_of_birth.month',
              helperText: 'MM',
              sx: { flex: 1 },
            },
          },
          {
            type: 'atom',
            component: 'text',
            props: {
              label: 'Year',
              name: 'date_of_birth.year',
              helperText: 'YYYY',
              sx: { flex: 2 },
            },
          },
        ],
      },
      {
        type: 'atom',
        component: 'select',
        props: {
          select: true,
          label: 'Gender',
          name: 'gender',
          options: genderOptions,
        },
      },
    ],
  },
  {
    type: 'atom',
    component: 'checkbox',
    props: {
      name: 'agreement',
      label: "I agree to Jump's Terms of Service and Privacy Policy",
    },
  },
];
