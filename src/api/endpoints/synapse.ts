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
    const res = await apiClient.post('/synapse/address', {
      body: data,
    });

    if (res.status !== 200) return;

    return res.data as AddressResponse;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

type SynapseUserResponse = any;

export const sendSynapseUser = async (data: any): Promise<SynapseUserResponse | undefined> => {
  try {
    const res = await apiClient.post('/synapse/user', {
      body: data,
    });

    if (res.status !== 201) return;

    return res.data as SynapseUserResponse;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
