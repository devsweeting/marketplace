import { subdivisionOptions } from '@/helpers/constants';
import type { FormSchema } from '@/types';

export const verificationFields: FormSchema = [
  {
    type: 'organism',
    title: 'Address',
    children: [
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'Street',
          name: 'mailing_address.address_street',
        },
      },
      {
        type: 'atom',
        component: 'text',
        props: {
          label: 'City',
          name: 'mailing_address.address_city',
        },
      },
      {
        type: 'molecule',
        children: [
          {
            type: 'atom',
            component: 'select',
            props: {
              select: true,
              label: 'Subdivision',
              name: 'mailing_address.address_subdivision',
              options: subdivisionOptions,
              sx: { flex: 1 },
            },
          },
          {
            type: 'atom',
            component: 'text',
            props: {
              sx: { flex: 1 },
              label: 'Postal Code',
              name: 'mailing_address.address_postal_code',
            },
          },
        ],
      },
    ],
  },
];
