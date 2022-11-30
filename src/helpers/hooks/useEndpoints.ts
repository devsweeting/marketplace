import { useEffect, useReducer } from 'react';

export interface IUseFetchWithAbortResponse {
  data: unknown;
  status: string;
  error: Error | null;
}

type FetchAction =
  | { type: 'idle'; payload: Record<string, unknown> }
  | { type: 'fetching'; payload: Record<string, unknown> }
  | { type: 'success'; payload: any }
  | { type: 'error'; error: Error };

const FetchReducer = (state: any, action: FetchAction) => {
  switch (action.type) {
    case 'idle': {
      return { ...state, status: 'idle', error: null, payload: {} };
    }
    case 'fetching': {
      return { ...state, status: 'pending', error: null, payload: {} };
    }
    case 'success': {
      return { ...state, status: 'resolved', data: action.payload };
    }
    case 'error': {
      return { ...state, status: 'error', error: action.error.message };
    }
    default: {
      return state;
    }
  }
};
export const useFetchWithAbort = (
  endpoint: string,
  options?: ResponseInit,
): IUseFetchWithAbortResponse => {
  const [{ status, error, data }, dispatch] = useReducer(FetchReducer, initialFetchState);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      // idle dispatch stuff
      try {
        const response = await fetch(endpoint, {
          ...options,
          signal: abortController.signal,
        });
        const newData = await response.json();
        // dispatch stuff
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            // dispatch error stuff
          }
        }
      }
    };
    void fetchData();
    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { data, status, error };
};
