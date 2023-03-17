import React from 'react';
import type { IAsset } from '@/types/asset.types';
import type { Dispatch, SetStateAction } from 'react';
import {
  Container,
  OrderSummaryContainer,
  OrderSummaryHeader,
  Text,
  Title,
} from './../PaymentMethods/PaymentMethods.styles';
import { Box, Typography, useTheme } from '@mui/material';
import { formatNumber } from '@/helpers/formatNumber';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { useCart } from '@/helpers/auth/CartContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';
import { purchaseSellOrder } from '@/api/endpoints/sellorders';
import { StatusCodes } from 'http-status-codes';
import { ConfirmInfoButton } from '../RetrieveUserInfo/RetrieveUserInfo.styles';

export const OrderSummary = ({
  setPage,
  orderSummary,
  isValid,
  setAlertMessage,
  setOpen,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
  isValid: boolean;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];
  const { closeModal } = useCart();
  const router = useRouter();

  const handleBuyFractions = async (
    setPage: Dispatch<SetStateAction<number>>,
    orderSummary: IAsset,
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
          setPage((prev) => prev + 1);
          break;
        }
        case StatusCodes.BAD_REQUEST: {
          setOpen(true);
          setAlertMessage('You cannot purchase any more of this item at this time.');
          if (response.data.message === 'USER_CANNOT_PURCHASE_OWN_ORDER') {
            setAlertMessage('You cannot purchase your own order.');
          }
          break;
        }
        case StatusCodes.UNAUTHORIZED: {
          setOpen(true);
          setAlertMessage('Please login to buy assets');
          break;
        }
        default: {
          setOpen(true);
          setAlertMessage('Something went wrong.');
          break;
        }
      }
    }
  };

  async function onSubmit(
    setPage: Dispatch<SetStateAction<number>>,
    orderSummary: IAsset,
    item: CartItem,
    isValid = true,
  ): Promise<void> {
    if (isValid) {
      void handleBuyFractions(setPage, orderSummary, item);

      closeModal();
      void router.push({
        pathname: `/askingprice/${orderSummary.id}`,
      });
    }
  }

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    void onSubmit(setPage, orderSummary, item, isValid);
  };

  return (
    <Container role="presentation">
      <OrderSummaryContainer>
        <OrderSummaryHeader>
          <Title variant="xl">Order Summary</Title>
        </OrderSummaryHeader>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            margin="20px 24px 10px 24px"
            sx={{ borderBottom: `1px solid ${theme.palette.grey[200]}` }}
          >
            <Text variant="lg">
              {Object.keys(item).length > 0 && item.quantity}
              {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
            </Text>
            <Text variant="lg">
              {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between" margin="10px 24px 10px 24px">
            <Text variant="lg">Royalty fees</Text>
            <Text variant="lg">10%</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            margin="10px 24px 10px 24px"
            sx={{ borderBottom: `1px solid ${theme.palette.grey[200]}` }}
          >
            <Text variant="lg">Processing fees</Text>
            <Text variant="lg">-5% + 0.25</Text>
          </Box>
          <Box display="flex" justifyContent="space-between" margin="10px 24px 10px 24px">
            <Text variant="lg">Total</Text>
            <Text variant="lg">
              {Object.keys(item).length > 0 &&
                '$' + formatNumber((item.totalPrice * 1.15 + 0.25).toFixed(2) as unknown as number)}
            </Text>
          </Box>
        </Box>
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          {/* DEV NOTE -- HIDE FOR NOW */}
          <ConfirmInfoButton disabled={isValid} onClick={submitHandler}>
            Confirm Order
          </ConfirmInfoButton>
        </Box>
        <Typography
          id="modal-modal-title"
          variant="xl"
          component="p"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <LockIcon
            sx={{
              stroke: theme.palette.grey[900],
              strokeWidth: '2px',
              fill: theme.palette.grey[50],
              width: '16px',
              height: '18px',
              margin: '0 6px',
              padding: '0',
            }}
          />
          {'Secured by'}
          <Box component="span" style={{ fontWeight: '600', margin: '0 4px' }}>
            {'Jump'}
          </Box>
        </Typography>
      </OrderSummaryContainer>
    </Container>
  );
};
