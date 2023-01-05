import type { StatusCodes } from 'http-status-codes';
import { apiClient } from '../client';

type AddressResponse = {
  status: StatusCodes;
  address: {
    deliverability: string;
    deliverability_analysis: Record<string, unknown>;
    normalized_address: Record<string, unknown>;
  };
};

type AddressErrorResponse = {
  statusCode: StatusCodes.BAD_REQUEST;
  message: string;
  error: {
    address_city?: string[];
    address_street?: string[];
    address_subdivision?: string[];
    address_postal_code?: string[];
  };
};

export const verifyAddress = async (
  data: any,
): Promise<AddressResponse | AddressErrorResponse | undefined> => {
  try {
    const res = await apiClient.post('/payments/address', {
      body: data,
    });

    if (!res || !res.isJson) return;

    if (!res.ok) {
      if (res.data?.message === 'Form errors') return res.data as AddressErrorResponse;
    }

    return res.data as AddressResponse;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(e);
    return;
  }
};

type PaymentsUserResponse = {
  status: StatusCodes;
};

type PaymentsUserErrorResponse = {
  statusCode: StatusCodes.BAD_REQUEST;
  message: string;
  error: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    phone_numbers?: string[];
    gender?: string[];
    date_of_birth?: {
      day?: string[];
      month?: string[];
      year?: string[];
    };
    mailing_address?: {
      address_street?: string[];
      address_city?: string[];
      address_subdivision?: string[];
      address_postal_code?: string[];
      address_country_code?: string[];
    };
  };
};

export const registerAccount = async (
  data: any,
): Promise<PaymentsUserResponse | PaymentsUserErrorResponse | undefined> => {
  try {
    const res = await apiClient.post('/payments/account', {
      requireAuth: true,
      body: data,
    });

    if (!res || !res.isJson) return;

    if (!res.ok) {
      if (res.data?.message === 'Form errors') return res.data as PaymentsUserErrorResponse;
    }

    return res.data as PaymentsUserResponse;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return;
  }
};

export const getTerms = async () => {
  try {
    const res = await apiClient.get('/payments/terms', { requireAuth: false});
    console.log("getTerms", res)

    if (!res) return;

    return res.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }
};
