import { useForm } from '@/helpers/hooks/useForm';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const onSubmit = jest.fn();

const e = { target: { name: 'cardNumber', value: 374245455400126 } };

describe('useForm', () => {
  it('can access initial value', () => {
    const { result } = renderHook(() =>
      useForm(
        { cardNumber: '' },
        [
          ({ cardNumber }: { cardNumber: string }) =>
            typeof cardNumber === 'string' || { cardNumber: 'Card number is invalid' },
        ],
        onSubmit,
      ),
    );

    expect(result.current.values).toEqual({
      cardNumber: '',
    });
  });

  it('can return if an entry was touched, has value, and is valid', () => {
    const { result } = renderHook(() =>
      useForm(
        { cardNumber: '' },
        [
          ({ cardNumber }: { cardNumber: string }) =>
            typeof cardNumber === 'string' || { cardNumber: 'Card number is invalid' },
        ],
        onSubmit,
      ),
    );

    act(() => {
      result.current.changeHandler(e);
    });

    expect(result.current.values).toEqual({ cardNumber: 374245455400126 });
    expect(result.current.isValid).toEqual(false);
    expect(result.current.errors).toEqual({ cardNumber: 'Card number is invalid' });
    expect(result.current.touched).toEqual({ cardNumber: true });
  });
});
