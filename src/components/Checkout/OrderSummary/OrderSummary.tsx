import React, { Dispatch, SetStateAction } from 'react';
import {
  Container,
  OrderSummaryContainer,
  OrderSummaryHeader,
  Text,
  Title,
} from './../PaymentMethods/PaymentMethods.styles';
import { Box, Typography, useTheme } from '@mui/material';
import { formatNumber } from '@/helpers/formatNumber';
import type { CartItem } from '@/helpers/auth/CartContext';
import LockIcon from '@mui/icons-material/Lock';
import { calcStripeAmount, UpdateIntentFunc } from '@/pages/api/stripe/paymentIntent';

export const OrderSummary = ({
  cartItem,
  updatePaymentIntent,
}: {
  cartItem: CartItem;
  updatePaymentIntent: UpdateIntentFunc;
}) => {
  const theme = useTheme();

  const totalAmount = Number((cartItem.totalPrice * 1.15 + 0.25).toFixed(2));

  updatePaymentIntent(calcStripeAmount(totalAmount));

  return (
    <Container role="presentation" style={{ width: '576px' }}>
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
              {cartItem.quantity}
              {cartItem.quantity > 1 ? ' Units' : ' Unit'}
            </Text>
            <Text variant="lg">{'$' + formatNumber(cartItem.totalPrice)}</Text>
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
              {'$' + formatNumber(totalAmount.toFixed(2) as unknown as number)}
            </Text>
          </Box>
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
