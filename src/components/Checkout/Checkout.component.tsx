import Box from '@mui/material/Box';
import { alpha, Modal } from '@mui/material';
import { Conditional } from './Conditional';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/helpers/auth/CartContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import getPaymentIntentStripe from '@/pages/api/stripe/paymentIntent';
import { loadStripe } from '@stripe/stripe-js';

console.log('Stripe public key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const Checkout = ({ isOpen, cartItem }: { isOpen: boolean; cartItem: CartItem | null }) => {
  const { closeModal } = useCart();
  const ref = useRef(null as null | HTMLDivElement);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    height: 'max-content',
    maxHeight: 'calc(100% - 80px)',
    maxWidth: '1024px',

    bgcolor: 'background.paper',
    outline: 'none !important',
    overflowY: scrollHeight < height ? 'scroll' : 'auto',
  };

  useEffect(() => {
    if (ref.current != null && ref.current.clientHeight && ref.current.scrollHeight) {
      setHeight(ref.current?.clientHeight);
      setScrollHeight(ref.current.scrollHeight);
    }
  }, []);

  // --------- STRIPE INTEGRATION ---------
  const [clientSecret, setClientSecret] = useState<string | null>();

  useEffect(() => {
    //a useEffect ensures this function only runs after the component mounts, or an item changes.
    if (isOpen && cartItem) {
      const fetchIntent = async () => {
        //declaring fetchIntent() then calling it allows async functions to be called at the top level of a non-async components.
        const intent = await getPaymentIntentStripe(cartItem);
        setClientSecret(intent.client_secret);
      };
      void fetchIntent();
    }

    return () => {
      setClientSecret(undefined); //TODO - reasses cleanup functon: maybe clear cookie here?
    };
  }, [isOpen, cartItem]);
  // ------------------------------------

  if (!(Object.keys(ref).length > 0) || cartItem == null || !clientSecret) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
    >
      <Box ref={ref} sx={style}>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
          key={clientSecret}
        >
          <Conditional cartItem={cartItem} />
        </Elements>
      </Box>
    </Modal>
  );
};
