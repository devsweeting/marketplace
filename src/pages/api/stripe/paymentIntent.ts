import {
  destroyPaymentIntentCookie,
  getPaymentIntentCookie,
  setPaymentIntentCookie,
} from '@/helpers/auth/paymentCookie';
import Stripe from 'stripe';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import type { IUser } from '@/types/auth.types';

if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  console.log(
    'Stripe secret key is empty?:',
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY.length == 0,
  );
  console.log('Stripe secret last char?:', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY.at(-1));
} else {
  console.log("Stripe secret key doesn't exist");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export type IPaymentIntent = {
  client_secret: string | null;
  error: string | null;
};

export type StripeMetaData = {
  name: string;
  description: string;
  userId: string;
  assetId: string;
  sellOrderId: string;
};

const getPaymentIntentStripe = async (item: CartItem): Promise<IPaymentIntent> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('No user found');
  }
  const amount = calcStripeAmount(item.totalPrice);
  const metaData = createStripeMetaData(item, user);

  const paymentIntentId = getPaymentIntentCookie();

  if (paymentIntentId) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      destroyPaymentIntentCookie();
      return await createPaymentIntent(item, metaData, stripe);
    }

    if (paymentIntent.amount !== amount) {
      const updated_intent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: amount,
        metadata: metaData,
      });
      return { client_secret: updated_intent.client_secret, error: null };
    }
    return { client_secret: paymentIntent.client_secret, error: null };
  }
  //If no intent is found, create a new one
  const intent = await createPaymentIntent(item, metaData, stripe);
  return intent;
};

export default getPaymentIntentStripe;

const createPaymentIntent = async (
  item: CartItem,
  metaData: StripeMetaData,
  stripe: Stripe,
): Promise<IPaymentIntent> => {
  try {
    // Find our user to tie them to the payment through passing a idempotency_key and meta_data
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'USD',
      amount: item.totalPrice,
      automatic_payment_methods: { enabled: true },
      metadata: metaData,
    });

    setPaymentIntentCookie(paymentIntent.id);

    return { client_secret: paymentIntent.client_secret, error: null };
  } catch (error: any) {
    throw new Error(error);
  }
};

const calcStripeAmount = (totalPriceInCents: number) => {
  return totalPriceInCents * 100;
};

const createStripeMetaData = (item: CartItem, user: IUser): StripeMetaData => {
  return {
    name: item.name,
    description: item.description,
    userId: user.id,
    assetId: item.assetId,
    sellOrderId: item.sellOrderId,
  };
};
