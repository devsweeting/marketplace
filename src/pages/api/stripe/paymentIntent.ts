import { useCallback, useEffect, useState } from 'react';
import {
  destroyPaymentIntentCookie,
  getPaymentIntentCookie,
  setPaymentIntentCookie,
} from '@/helpers/auth/paymentCookie';
import Stripe from 'stripe';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import type { IUser } from '@/types/auth.types';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export type UpdateIntentFunc = (amount: number) => Promise<Stripe.PaymentIntent>;

export type IStripeHook = {
  clientSecret: string | null;
  updatePaymentIntent?: UpdateIntentFunc;
};

export type StripeMetaData = {
  name: string;
  description: string;
  userId: string;
  assetId: string;
  sellOrderId: string;
};

const usePaymentIntentStripe = (isOpen: boolean, item: CartItem | null): IStripeHook => {
  const paymentIntentIdCookie = getPaymentIntentCookie();
  const [paymentIntent, setPaymentIntent] = useState<Stripe.PaymentIntent | null>(null);
  console.log('paymentIntentIdCookie', paymentIntentIdCookie);

  useEffect(() => {
    if (isOpen === true && item !== null) {
      const fetchIntent = async () => {
        const user = await getCurrentUser();
        if (!user) {
          throw new Error('No user found');
        }
        const amount = calcStripeAmount(item.totalPrice);
        const metaData = createStripeMetaData(item, user);

        if (paymentIntentIdCookie == null) {
          const createdIntent = await createPaymentIntent(amount, metaData, stripe);
          setPaymentIntent(createdIntent);
        } else {
          const retrievedIntent = await stripe.paymentIntents.retrieve(paymentIntentIdCookie);
          setPaymentIntent(retrievedIntent);

          console.log('retrieved status:', retrievedIntent.status);

          //Catch a bug that the original cookie from a previously successful purchase wasn't detroyed.
          if (retrievedIntent.status === 'succeeded') {
            console.log('intent status outdated');

            destroyPaymentIntentCookie();
            const createdIntent = await createPaymentIntent(amount, metaData, stripe);
            setPaymentIntent(createdIntent);
          }
        }

        if (paymentIntent != null && paymentIntent.amount != amount) {
          const updatedIntent = await updatePaymentIntent({
            stripe,
            paymentIntentId: paymentIntent.id,
            amount,
            metaData,
          });
          setPaymentIntent(updatedIntent);
        }
      };
      fetchIntent();
    }
    return () => {
      setPaymentIntent(null);
    };
  }, [isOpen, item]);

  console.log('paymentIntent', paymentIntent);

  //Declare a callback fn to pass down to child components update the intent
  const useUpdateIntent: UpdateIntentFunc = useCallback(
    async (amount: number) => {
      const updated_intent = await updatePaymentIntent({
        stripe,
        paymentIntentId: paymentIntent!.id,
        amount,
      });
      console.log('Intent Updated', updated_intent);

      return updated_intent;
    },
    [paymentIntent],
  );

  if (paymentIntentIdCookie != null && paymentIntent != null) {
    return {
      clientSecret: paymentIntent.client_secret,
      updatePaymentIntent: useUpdateIntent,
    };
  } else {
    return {
      clientSecret: null,
      updatePaymentIntent: undefined,
    };
  }
};

export default usePaymentIntentStripe;

const createPaymentIntent = async (
  amount: number,
  metaData: StripeMetaData,
  stripe: Stripe,
): Promise<Stripe.PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'USD',
      amount: amount,
      automatic_payment_methods: { enabled: true },
      metadata: metaData,
    });

    setPaymentIntentCookie(paymentIntent.id);

    return paymentIntent;
  } catch (error: any) {
    throw new Error(error);
  }
};

type UpdatePaymentIntent = {
  stripe: Stripe;
  paymentIntentId: string;
  amount?: number;
  metaData?: StripeMetaData;
};

const updatePaymentIntent = async ({
  stripe,
  paymentIntentId,
  amount,
  metaData,
}: UpdatePaymentIntent): Promise<Stripe.PaymentIntent> => {
  let updated_details = {};

  if (amount) {
    updated_details = { ...updated_details, amount: amount };
  }

  if (metaData) {
    updated_details = { ...updated_details, metadata: metaData };
  }

  const updated_intent = await stripe.paymentIntents.update(paymentIntentId, updated_details);

  return updated_intent;
};

/*
Conversion of cents(API) to dollars(stripe)
*/
export const calcStripeAmount = (totalPriceInCents: number) => {
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
