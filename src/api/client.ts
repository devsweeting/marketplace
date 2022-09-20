import { ApiClient } from './client/baseApiClient';
export const apiClient = typeof window === 'undefined' ? new ApiClient() : new ApiClient();
