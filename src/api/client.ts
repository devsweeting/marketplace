import { ServerApiClient } from './client/apiClient.server';
import { BrowserApiClient } from './client/apiClient.browser';
export const apiClient =
  typeof window === 'undefined' ? new ServerApiClient() : new BrowserApiClient();
