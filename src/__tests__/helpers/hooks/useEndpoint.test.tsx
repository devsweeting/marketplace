import { useEndpoint, LoadingState } from '@/helpers/hooks/useEndpoints';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
describe('useEndpoint', () => {
  test('triggers endpoint', async () => {
    const promise = Promise.resolve('value');

    const { result } = renderHook(() => useEndpoint(() => promise));

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toEqual(LoadingState.pending);

    await act(async () => {
      await promise;
    });

    expect(result.current[1]).toEqual(LoadingState.success);
    expect(result.current[0]).toEqual('value');
  });

  test('handles endpoint error', async () => {
    const promise = Promise.reject();

    const { result } = renderHook(() => useEndpoint(() => promise));

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await promise.catch(() => {});
    });

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toEqual(LoadingState.error);
  });

  test('refetches on dependency change', async () => {
    const promise = Promise.resolve();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { result, rerender } = renderHook((prop) => useEndpoint(() => promise, [prop]), {
      initialProps: 'value',
    });

    await act(async () => {
      await promise;
    });

    expect(result.current[1]).toEqual(LoadingState.success);

    rerender('newValue');

    expect(result.current[1]).toEqual(LoadingState.pending);

    await act(async () => {
      await promise;
    });

    expect(result.current[1]).toEqual(LoadingState.success);
  });

  test('cancels on unmount', async () => {
    const promise = Promise.resolve();

    let signal: AbortSignal | undefined;

    const { result, unmount } = renderHook(() =>
      useEndpoint((s) => {
        signal = s;
        return promise;
      }),
    );

    expect(result.current[1]).toEqual(LoadingState.pending);

    expect(signal?.aborted).toEqual(false);

    unmount();

    expect(signal?.aborted).toEqual(true);
  });
});
