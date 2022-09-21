import { ServerApiClient } from './client/serverApiClient';
import { BrowserApiClient } from './client/browserApiClient';
export const apiClient =
  typeof window === 'undefined' ? new ServerApiClient() : new BrowserApiClient();
