import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { ConfirmPaymentButton } from './CardForm.styles';
import { useCart } from '@/helpers/auth/CartContext';

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

export const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { stripeClientSecret } = useCart();
  console.log('from cart', stripeClientSecret);
  console.log('stripe', stripe);

  console.log('elements', elements);
  //   const options = useOptions();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false); // TODO lift state to show "... processing" placeholder on payment button

  console.log(errorMessage, isProcessing);
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    //disable the payment button to avoid duplicate user clicks
    setIsProcessing(true);

    if (stripe && elements && stripeClientSecret) {
      // NOTE - used with <PaymentElement />
      // const { error, paymentIntent } = await stripe.confirmPayment({
      //   elements,
      //   confirmParams: {
      //     return_url: `${window.location.origin}`, //where to return to
      //   },
      //   redirect: 'if_required',
      // });
      const card = elements.getElement(CardElement);
      console.log('CARD', card);

      const { error, paymentIntent } = await stripe.confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setErrorMessage(`Payment status:, ${paymentIntent.status}`);
      } else {
        setErrorMessage('expected message');
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={void handleSubmit}>
      ** STRIPE DEVELOPMENT ***
      {/* <PaymentElement id="payment-element" options={{ layout: 'tabs' }} /> */}
      <CardElement />
      <ConfirmPaymentButton type="submit" disabled={false}>
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
