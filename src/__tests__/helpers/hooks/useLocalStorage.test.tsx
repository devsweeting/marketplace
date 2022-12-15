import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useLocalStorage', () => {
  test('can access initial value', () => {
    const { result } = renderHook(() => useLocalStorage('@local-test1', ['item1', 'item2']));

    expect(result.current[0]).toEqual(['item1', 'item2']);
  });

  test('can set value then access it', () => {
    const { result } = renderHook(() => useLocalStorage('@local-test2', ['item3', 'item4']));

    expect(result.current[0]).toEqual(['item3', 'item4']);

    void act(() => {
      result.current[1]([...result.current[0], 'item5']);
    });

    expect(result.current[0]).toEqual(['item3', 'item4', 'item5']);
  });

  test('can access locally stored value after rerender', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('@local-test2'));

    expect(result.current[0]).toEqual(['item3', 'item4', 'item5']);

    rerender();

    expect(result.current[0]).toEqual(['item3', 'item4', 'item5']);
  });
});
