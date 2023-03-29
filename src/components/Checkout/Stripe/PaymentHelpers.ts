import { purchaseSellOrder } from '@/api/endpoints/sellorders';
import { CartItem, useCart } from '@/helpers/auth/CartContext';
import { IAsset } from '@/types/asset.types';
import { IUser } from '@/types/auth.types';
import { PaymentIntent, Stripe, StripeElements } from '@stripe/stripe-js';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

type makePaymentProps = {
  stripe: Stripe;
  elements: StripeElements;
  user: IUser;
  cartItem: CartItem;
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
    throw new Error(error.message);
  }

  return paymentIntent;
};

export async function handleAssetTransaction(
  orderSummary: IAsset,
  setMessage: Dispatch<SetStateAction<string>>,
  item: CartItem,
  isValid = true,
): Promise<void> {
  const { closeModal } = useCart();
  const router = useRouter();
  if (isValid) {
    void buyFractions(orderSummary, setMessage, item);

    closeModal();
    void router.push({
      pathname: `/askingprice/${orderSummary.id}`,
    });
  }
}

const buyFractions = async (
  orderSummary: IAsset,
  setMessage: Dispatch<SetStateAction<string>>,
  item: CartItem,
): Promise<void> => {
  const response: any = await purchaseSellOrder(
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
};
