/* eslint-disable no-console */

import { apiClient } from '@/api/client';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import { paymentIntentSchema } from '@/schemas/paymentIntent.schemas';
import type { IPaymentIntentData } from '@/types/paymentIntent.types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

/*
 * TODO -- eventually create an API route that returns the payment intent. keeps the Stripe security key securely in the backend API
 */
export const getPaymentIntentAPI = async (): Promise<IPaymentIntentData | undefined> => {
  try {
    const res = await apiClient.post(`/stripe/intent`, {
      body: {
        secret: 'womp womp',
      },
    });

    return paymentIntentSchema.parse(res.data);
  } catch (e) {
    console.error(e);
    return;
  }
};

/*
 * TEST -- Get the payment intent directly from Stripe, bypassing API security
 */
export const getPaymentIntentStripe = async (amount: number = 100): Promise<string> => {
  const user = await getCurrentUser();
  console.log('userId', user?.id);

  //TODO add return types here
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'USD',
        amount: amount,
        automatic_payment_methods: { enabled: true },
      },
      { idempotencyKey: user?.id },
    );
    return paymentIntent.client_secret ?? 'no secret found';
  } catch (error: any) {
    console.error('ERROR in STRIPE', error);
    return error.message;
  }
};
