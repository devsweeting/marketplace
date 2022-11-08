import { Box, IconButton, InputLabel, Link, OutlinedInput } from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { formatNumber } from '@/helpers/formatNumber';
import {
  AddFundsButton,
  AddPaymentButton,
  ButtonContainer,
  CancelButton,
  Card,
  CardTextContainer,
  Title,
  Container,
  CustomRadio,
  HeaderContainer,
  HeaderTitle,
  ImageWrapper,
  InfoContainer,
  OrderSummaryDetails,
  PaymentContainer,
  StyledInputAdornments,
  Text,
  OrderSummaryContainer,
  OrderSummaryHeader,
  OrderSummaryButtonGrid,
} from './PaymentMethods.styles';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const PaymentMethods = ({
  setPage,
  page,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}) => {
  const { closeModal } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedValue, setSelectedValue] = useState('b');

  const funds = 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const item = cartItems[0];
  if (!(cartItems.length > 0)) {
    return null;
  }
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle variant="xl">Available payment methods</HeaderTitle>
        <ButtonContainer>
          <IconButton
            aria-label="Close Cart Modal"
            sx={{ fontSize: '14px' }}
            onClick={() => {
              closeModal();
            }}
          >
            <ArrowBackIosIcon />
            Back
          </IconButton>
          <IconButton
            aria-label="Close Cart Modal"
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon />
          </IconButton>
        </ButtonContainer>
      </HeaderContainer>
      <PaymentContainer>
        <InfoContainer style={{ display: isDismissed ? 'none' : 'flex' }}>
          <Text marginBottom="20px" variant="body1">
            Jump balance represents the funds you have for use in your account. When you make
            purchases, sales, deposits or withdrawals, those changes will be shown in your balance
            below.
          </Text>
          <Text marginBottom="20px" variant="body1">
            View and increase your limits{' '}
            <Link
              style={{
                width: 'max-content',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              href="/account/balance"
            >
              here.
            </Link>
          </Text>
          <Text
            style={{
              width: 'max-content',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsDismissed(true);
            }}
            variant="body1"
          >
            Dismiss
          </Text>
        </InfoContainer>
        <Card>
          <div>
            <ImageWrapper></ImageWrapper>
          </div>

          <CardTextContainer>
            <Title variant="xl">Jump balance</Title>
            <Text>
              {`$${formatNumber(funds.toFixed(2) as unknown as number)} USD ${
                funds < item.totalPrice ? '(Insufficient funds)' : ''
              }`}
            </Text>
          </CardTextContainer>
          <Box>
            <CustomRadio
              checked={selectedValue === 'a'}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
          </Box>
        </Card>

        <Text
          style={{
            textDecoration: 'underline',
            margin: '8px 0',
            height: '20px',
          }}
        >
          Withdraw balance <InfoIcon sx={{ fontSize: '16px', marginLeft: '5px' }} />
        </Text>

        <Box sx={{ margin: '16px 0 16px 0', height: '120px', width: '100%' }}>
          <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }}>
            Add funds to your balance
          </InputLabel>
          <Box display="flex">
            <OutlinedInput
              sx={{ width: '90%', borderRadius: '8px', height: '40px', margin: '8px 8px 8px 0' }}
              placeholder="Enter amount"
              endAdornment={<StyledInputAdornments position="end">$</StyledInputAdornments>}
            />
            <AddFundsButton disabled={selectedValue === 'b' ? true : false}>
              Add funds
            </AddFundsButton>
          </Box>
          <Text>
            When you purchase Jump balance using fiat payment methods, the sale is made by xyz.
          </Text>
        </Box>
        <Card>
          <div>
            <ImageWrapper></ImageWrapper>
          </div>
          <CardTextContainer>
            <Title variant="xl">Credit/Debit cards</Title>
            <Text>{`-5% + 0.25 service fee`}</Text>
            <Text>{`Recommended`}</Text>
          </CardTextContainer>
          <Box>
            <CustomRadio
              checked={selectedValue === 'b'}
              onChange={handleChange}
              value="b"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
          </Box>
        </Card>
      </PaymentContainer>
      <OrderSummaryContainer>
        <OrderSummaryHeader>
          <Title variant="xl">Order Summary</Title>
        </OrderSummaryHeader>
        <Box>
          <OrderSummaryDetails>
            <Text variant="lg">
              {Object.keys(item).length > 0 && item.quantity}
              {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
            </Text>
            <Text variant="lg">
              {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
            </Text>
          </OrderSummaryDetails>
          <Box display="flex" justifyContent="space-between" margin="10px 24px 10px 24px">
            <Text variant="lg">Royalty fees</Text>
            <Text variant="lg">10%</Text>
          </Box>
        </Box>
        <OrderSummaryButtonGrid>
          <CancelButton
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Cancel
          </CancelButton>
          {selectedValue === 'a' && (
            <AddPaymentButton
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Pay with Jump balance
            </AddPaymentButton>
          )}
          {selectedValue === 'b' && (
            <AddPaymentButton
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Add Credit Card
            </AddPaymentButton>
          )}
        </OrderSummaryButtonGrid>
      </OrderSummaryContainer>
    </Container>
  );
};
