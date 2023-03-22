import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { IAsset } from '@/types/asset.types';
import { CheckoutContainer } from '../CheckoutContainer.component';
import { Box } from '@mui/material';
import { OrderSummary } from '../OrderSummary';
import { ConfirmInfoButton } from '../RetrieveUserInfo/RetrieveUserInfo.styles';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { CartItem } from '@/helpers/auth/CartContext';

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

export const StripePaymentService = ({
  clientSecret,
  setPage,
  orderSummary,
  alertMessage,
  setAlertMessage,
  open,
  setOpen,
}: {
  clientSecret: string;
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
  alertMessage: string;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];
  //   const options = useOptions(); TODO - add custom styles?
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false); // TODO lift state to show "... processing" placeholder on payment button

  const card = elements?.getElement(PaymentElement);
  console.log('x:', message, isProcessing);
  console.log('card', card);
  console.log('elements', elements);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Stop page from reloading
    //disable the payment button to avoid duplicate user clicks
    setIsProcessing(true);
    if (stripe && elements && clientSecret) {
      if (!card) {
        return;
      }
      const user = await getCurrentUser(); //TODO build a better async user hook
      console.log('user', user);

      //used with <CardElement/>
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: card,
      //   },
      // });

      //used with <PaymentElement/>
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/askingprice/${item.id}`,
          receipt_email: user?.email,
          // TODO add billing info from previous page here
          // shipping: {
          //   address: { city: 'NY' },
          //   name: 'Shipping user',
          // },
          payment_method_data: {
            billing_details: {
              name: 'Billing user',
            },
          },
        },
      });

      if (error) {
        setMessage(`Payment status:, ${error.message}`);
        throw new Error(error.message);
      }
      //returned with <CardElement>
      // if (paymentIntent?.status === 'succeeded') {
      //   destroyPaymentIntentCookie();
      //   setMessage(`Payment status:, ${paymentIntent.status}`);
      // }
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  return (
    <CheckoutContainer
      setPage={setPage}
      orderSummary={orderSummary}
      alertMessage={alertMessage}
      setAlertMessage={setAlertMessage}
      open={open}
      setOpen={setOpen}
    >
      {message}
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%', margin: '0', padding: '16px 24px' }}>
          <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
        </Box>
        <OrderSummary
          setPage={setPage}
          isValid={true} //TODO what does this do
          orderSummary={orderSummary}
          setAlertMessage={setAlertMessage}
          setOpen={setOpen}
        />
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          <ConfirmInfoButton disabled={false} onSubmit={handleSubmit} type="submit">
            {isProcessing ? 'Order Processing' : 'Confirm Order'}
          </ConfirmInfoButton>
        </Box>
      </form>
    </CheckoutContainer>
  );
};
