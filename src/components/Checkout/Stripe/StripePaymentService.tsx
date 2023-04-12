import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import type { IAsset } from '@/types/asset.types';
import { CheckoutContainer } from '../CheckoutContainer.component';
import { Box } from '@mui/material';
import { OrderSummary } from '../OrderSummary';
import { ConfirmInfoButton } from '../RetrieveUserInfo/RetrieveUserInfo.styles';
import { getCurrentUser } from '@/helpers/auth/UserContext';
import { useCart } from '@/helpers/auth/CartContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import type { StripePaymentElement } from '@stripe/stripe-js';
import {
  validateAssetPurchase,
  confirmStripePayment,
  handleAssetTransaction,
} from './PaymentHelpers';
import type { StripePurchaseTracking } from './PaymentHelpers';
import { destroyPaymentIntentCookie } from '@/helpers/auth/paymentCookie';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';
import { UpdateIntentFunc } from '@/pages/api/stripe/paymentIntent';

export const StripePaymentService = ({
  setPage,
  orderSummary,
  alertMessage,
  setAlertMessage,
  open,
  setOpen,
  cartItem,
  updatePaymentIntent,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
  alertMessage: string;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cartItem: CartItem;
  updatePaymentIntent: UpdateIntentFunc;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement(PaymentElement) as StripePaymentElement;
  const { closeModal } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentElementMounted, setIsPaymentElementMounted] = useState<boolean>(false);
  const [isPaymentElementComplete, setIsPaymentElementComplete] = useState<boolean>(false);

  const isStripePaymentReady = (): boolean => {
    let isReady = true;
    // Confirm the Stripe PaymentElement has loaded and the card is accessible to the Stripe API.
    if (isPaymentElementMounted == false && card == null) {
      isReady = false;
    }
    // Confirm the forms are completed without input errors.
    if (isPaymentElementComplete == false) {
      isReady = false;
    }

    return isReady;
  };

  const handlePayment = (e: any) => {
    void (async () => {
      e.preventDefault();
      setIsProcessing(true); //Disable button during processing to avoid duplicate clicks

      const user = await getCurrentUser(); //TODO build a better non-async user hook

      if (elements && stripe && user && isStripePaymentReady()) {
        //TODO - run an initial check on the SellOrder table validating a user is able to purchase units
        const canPurchaseAsset = await validateAssetPurchase(
          orderSummary,
          setAlertMessage,
          cartItem,
        );

        if (canPurchaseAsset.statusCode === StatusCodes.OK) {
          const paymentIntent = await confirmStripePayment({ stripe, elements, user, cartItem });

          const trackingDetails: StripePurchaseTracking = {
            intentId: paymentIntent.id,
            purchaseStatus: paymentIntent.status,
            amount: paymentIntent.amount,
          };

          switch (paymentIntent?.status) {
            case 'succeeded':
              destroyPaymentIntentCookie();
              await handleAssetTransaction(
                orderSummary,
                setAlertMessage,
                cartItem,
                closeModal,
                router,
                trackingDetails,
              );
              setAlertMessage('Payment succeeded!');
              break;
            case 'processing':
              setAlertMessage('Your payment is processing.');
              break;
            case 'requires_payment_method':
              setAlertMessage('Your payment was not successful, please try again.');
              break;
            default:
              setAlertMessage('Something went wrong.');
              break;
          }
        } else {
          throw new Error(
            `ERROR: CANNOT PURCHASE ASSET ${canPurchaseAsset.error} ${canPurchaseAsset.message}`,
          );
        }
      }
      setIsProcessing(false);
    })();
  };

  return (
    <CheckoutContainer setPage={setPage} alertMessage={alertMessage} open={open} setOpen={setOpen}>
      <form onSubmit={handlePayment}>
        <Box sx={{ width: '100%', margin: '0', padding: '16px 24px' }}>
          <AddressElement options={{ mode: 'billing' }} />
          <PaymentElement
            onLoaderStart={() => setIsPaymentElementMounted(true)}
            onChange={(props) => {
              setIsPaymentElementComplete(props.complete);
            }}
            id="payment-element"
            options={{ layout: 'tabs' }}
          />
        </Box>
        <OrderSummary updatePaymentIntent={updatePaymentIntent} cartItem={cartItem} />
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          <ConfirmInfoButton disabled={!isStripePaymentReady() || isProcessing} type="submit">
            {isProcessing ? 'Order Processing' : 'Confirm Order'}
          </ConfirmInfoButton>
          {alertMessage}
        </Box>
      </form>
    </CheckoutContainer>
  );
};
