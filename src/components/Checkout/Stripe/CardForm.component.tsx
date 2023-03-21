import React, { useState } from 'react';
import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { ConfirmPaymentButton } from './CardForm.styles';
import { useCart } from '@/helpers/auth/CartContext';
import { destroyPaymentIntentCookie } from '@/helpers/auth/paymentCookie';

// const useOptions = () => {
//   const options = useMemo(
//     () => ({
//       style: {
//         base: {
//           color: '#424770',
//           letterSpacing: '0.025em',
//           '::placeholder': {
//             color: '#aab7c4',
//           },
//         },
//         invalid: {
//           color: '#9e2146',
//         },
//       },
//     }),
//     [],
//   );

//   return options;
// };

export const SplitForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  //   const options = useOptions(); TODO - mecustom styles?
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false); // TODO lift state to show "... processing" placeholder on payment button

  console.log('silencing logs', message, isProcessing);

  const card = elements?.getElement(CardElement);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Stop page from reloading

    //disable the payment button to avoid duplicate user clicks
    setIsProcessing(true);

    if (stripe && elements && clientSecret) {
      if (!card) {
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (error) {
        setMessage(`Payment status:, ${error.message}`);
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        destroyPaymentIntentCookie();
        setMessage(`Payment status:, ${paymentIntent.status}`);
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      ** STRIPE DEVELOPMENT ***
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <ConfirmPaymentButton type="submit" disabled={isProcessing}>
        Confirm Order
      </ConfirmPaymentButton>
    </form>
  );
};

//Attempted custom card styling
/* <label>
        Card Number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        Expiration Date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label> */
