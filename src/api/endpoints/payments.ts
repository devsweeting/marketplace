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
  statusCode: StatusCodes;
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

type PaymentsUserResponse = any;

type PaymentsUserErrorResponse = {
  statusCode: StatusCodes;
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

export const registerPaymentsUser = async (
  data: any,
): Promise<PaymentsUserResponse | undefined> => {
  try {
    const res = await apiClient.post('/payments/kyc', {
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
