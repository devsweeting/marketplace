import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
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
  console.log('elements', elements);
  console.log('stripe', stripe);
  //   const options = useOptions();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false); // TODO lift state to show "... processing" placeholder on payment button

  console.log('silencing logs', errorMessage, isProcessing);

  const card = elements?.getElement(CardElement);
  console.log('card', card);
  console.log('clientSecret', clientSecret);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Stops the page from reloading!

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

      if (error) throw new Error(error.message);

      if (paymentIntent?.status === 'succeeded') {
        destroyPaymentIntentCookie();
        setErrorMessage(`Payment status:, ${paymentIntent.status}`);
      }

      // if (error) {
      //   console.error('ERROR', error);
      //   setErrorMessage(`Payment status:, ${error.message}`);
      // }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      ** STRIPE DEVELOPMENT ***
      {/* <PaymentElement id="payment-element" options={{ layout: 'tabs' }} /> */}
      <CardElement />
      <ConfirmPaymentButton type="submit" disabled={isProcessing}>
        Confirm Order
      </ConfirmPaymentButton>
    </form>
  );
};
//PREVIOUS EFORT
{
  /* {stripe && elements ? <PaymentElement /> : null} */
}
{
  /* <CardElement /> */
}
{
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
}
