import { getPaymentIntentCookie, setPaymentIntentCookie } from '@/helpers/auth/paymentCookie';
import Stripe from 'stripe';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import { CartItem } from '@/helpers/auth/CartContext';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

const usePaymentIntentStripe = async (item: CartItem): Promise<any> => {
  const user = await getCurrentUser();
  console.log('user intent', user);
  console.log('ITEM', item);

  const paymentIntentId = getPaymentIntentCookie();
  console.log('cookie id returned', paymentIntentId);

  if (paymentIntentId != null) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log('retrieved intent', paymentIntent);

    // TODO If a paymentIntent is retrieved update its amount
    if (paymentIntent) {
      const updated_intent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: item.totalPrice,
      });
      return paymentIntent.client_secret;
    }
  }

  //If no payment intent id is found, create a paymentIntent.
  try {
    // Find our user to tie them to the payment through passing a idempotency_key and meta_data
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'USD',
        amount: item.totalPrice,
        automatic_payment_methods: { enabled: true },
        metadata: {
          userId: user?.id ?? null,
        },
      },
      { idempotencyKey: item.id + item.totalPrice },
    );
    console.log('created intent', paymentIntent);

    setPaymentIntentCookie(paymentIntent.id);

    return paymentIntent.client_secret;
  } catch (error: any) {
    console.error('ERROR in STRIPE', error);
    return error.message;
  }
};

export default usePaymentIntentStripe;
