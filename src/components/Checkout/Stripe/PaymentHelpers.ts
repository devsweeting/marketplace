import { purchaseSellOrder, validateSellOrder } from '@/api/endpoints/sellorders';
import type { CartItem } from '@/helpers/auth/CartContext';
import type { IAsset } from '@/types/asset.types';
import type { IUser } from '@/types/auth.types';
import type { PaymentIntent, Stripe, StripeElements } from '@stripe/stripe-js';
import { StatusCodes } from 'http-status-codes';
import type { NextRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';

type makePaymentProps = {
  stripe: Stripe;
  elements: StripeElements;
  user: IUser;
  cartItem: CartItem;
};

export type StripePurchaseTracking = {
  intentId: string;
  purchaseStatus: string;
  amount: number;
};

export const confirmStripePayment = async ({
  stripe,
  elements,
  user,
  cartItem,
}: makePaymentProps): Promise<PaymentIntent> => {
  const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    redirect: 'if_required', //prevents stripe from redirect on CC, but will still redirect if user chooses an option that opens up a third party window. code for both.
    confirmParams: {
      return_url: `http://localhost:3000/askingprice/${cartItem.assetId}`,
      receipt_email: user.email,
      // TODO add billing info from previous page here
      // shipping: {
      //   address: { city: 'NY' },
      //   name: 'Shipping user',
      // },
      payment_method_data: {
        billing_details: {
          email: user.email,
        },
      },
    },
  });

  if (error) {
    console.log('In Error', error);
    throw new Error(error.message);
  }

  return paymentIntent;
};

export async function handleAssetTransaction(
  orderSummary: IAsset,
  setMessage: Dispatch<SetStateAction<string>>,
  item: CartItem,
  closeModal: Dispatch<SetStateAction<void>>,
  router: NextRouter,
  stripeTrackingDetails: StripePurchaseTracking,
): Promise<void> {
  const response: any = await purchaseSellOrder(
    orderSummary.sellOrders[0].id,
    item.quantity,
    item.fractionPriceCents,
    stripeTrackingDetails,
  );

  try {
    if (response.status === StatusCodes.CREATED) {
      closeModal();
      void router.push({
        pathname: `/askingprice/${orderSummary.id}`,
      });
    }
  } catch (e) {
    throw new Error('Error occured while transfering units', e);
  }
}

type validatePurchaseResponse = {
  statusCode: StatusCodes;
  message?: string;
  error?: string;
};

export const validateAssetPurchase = async (
  orderSummary: IAsset,
  setMessage: Dispatch<SetStateAction<string>>,
  item: CartItem,
): Promise<validatePurchaseResponse> => {
  const response: any = await validateSellOrder(
    orderSummary.sellOrders[0].id,
    item.quantity,
    item.fractionPriceCents,
  );
  if (response) {
    switch (response.status) {
      case StatusCodes.CREATED: {
        break;
      }
      case StatusCodes.BAD_REQUEST: {
        setMessage('You cannot purchase any more of this item at this time.');
        if (response.data.message === 'USER_CANNOT_PURCHASE_OWN_ORDER') {
          setMessage('You cannot purchase your own order.');
        }
        break;
      }
      case StatusCodes.UNAUTHORIZED: {
        setMessage('Please login to buy assets');
        break;
      }
      default: {
        setMessage('Something went wrong.');
        break;
      }
    }
  }
  return response.data;
};
