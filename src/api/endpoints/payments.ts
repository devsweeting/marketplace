import type { StatusCodes } from 'http-status-codes';
import { apiClient } from '../client';

type FormErrors = {
  [key: string]: string[];
};

type AddressResponse = {
  status: StatusCodes;
  address?: Record<string, unknown>;
  message?: any[];
  error?: string | FormErrors;
};

export const verifyAddress = async (data: any): Promise<AddressResponse | undefined> => {
  try {
    const res = await apiClient.post('/payments/address', {
      body: data,
    });

    if (res.status !== 200) return;

    return res.data as AddressResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

type SynapseUserResponse = any;

export const sendSynapseUser = async (data: any): Promise<SynapseUserResponse | undefined> => {
  try {
    const res = await apiClient.post('/payments/user', {
      body: data,
    });

    if (res.status !== 201) return;

    return res.data as SynapseUserResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
