import React from 'react';
import { ConfirmPaymentButton } from './CardForm.styles';

export const StripePaymentButton = () => {
  return (
    <ConfirmPaymentButton type="submit" disabled={true}>
      Confirm Order
    </ConfirmPaymentButton>
  );
};
