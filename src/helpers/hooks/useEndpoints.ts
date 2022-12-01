import type { DependencyList } from 'react';
import { useState, useEffect } from 'react';

export const LoadingState = {
  pending: 'pending',
  success: 'success',
  error: 'error',
} as const;

type LoadingStates = typeof LoadingState[keyof typeof LoadingState];

export const useEndpoint = <TData>(
  endpoint: (signal: AbortSignal) => Promise<TData>,
  deps: DependencyList = [],
  options = {},
): [TData | undefined, LoadingStates] => {
  const [data, setData] = useState<TData>();
  const [loadingState, setLoadingState] = useState<LoadingStates>(LoadingState.pending);

  useEffect(() => {
    setLoadingState(LoadingState.pending);

    const abortController = new AbortController();

    endpoint(abortController.signal)
      .then((newData) => {
        setLoadingState(LoadingState.success);
        setData(newData);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        setLoadingState(LoadingState.error);
      });

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [data, loadingState];
};
