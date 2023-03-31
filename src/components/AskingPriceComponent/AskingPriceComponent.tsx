import { useCart } from '@/helpers/auth/CartContext';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  PageContainer,
  ThanksContainerColumn,
  SetAskPriceContainerColumn,
  Header,
  Content,
  Wrap,
  DismissibleTextBox,
  DismissibleTextHeader,
  Text,
  ReasonsToSetPriceList,
  ReasonsToSetPriceListItem,
  MonetaryInputAdornment,
  OrderSummary,
  OrderSummaryHeader,
  OrderSummaryDetailsContainer,
  StyledLockIcon,
  OrderButton,
  ThanksHeader,
  ThanksText,
  ConfirmText,
  AssetCard,
  CardContent,
  AssetImageWrapper,
  CardMeta,
  CardName,
  ValuationContainer,
  LargeDetailText,
  Img,
  InputLabelText,
  PriceOutlinedInput,
} from './AskingPriceComponent.styles';
import { getPurchaseById } from '@/api/endpoints/sellorders';
import type { IAsset } from '@/types';
import { formatNumber } from '@/helpers/formatNumber';
import { Attributes } from '../Attributes';
import { safeParseFloat } from '@/helpers/safeParseInt';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';

const calculatePercentFromInput = (input: number, originalValue: number) => {
  input = input * 100;
  const decimal = input / originalValue;
  const percent = decimal * 100;
  return (percent - 100).toFixed(3) as unknown as number;
};

const calculateValueFromPercent = (
  percent: number | undefined,
  originalValue: number,
): number | undefined => {
  if (!percent) {
    return undefined;
  }
  const truePercent = percent + 100;
  const decimal = truePercent / 100;
  return Number(((originalValue * decimal) / 100).toFixed(2));
};

const calculateTotalFromPercentAndPrice = (price: number, numOfUnits: number) => {
  if (price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price * numOfUnits);
  }
  return '~';
};

export const AskingPriceComponent = ({ asset, id }: { asset: IAsset; id: string }) => {
  const { closeCart, closeModal } = useCart();
  const [assetPurchase] = useEndpoint((signal) => getPurchaseById(id, signal), [id]);
  const [inputValues, setInputValues] = useState<{
    percent: number | undefined;
    price: number | undefined;
  }>({
    percent: 0,
    price: 0,
  });

  useEffect(() => {
    closeCart();
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (assetPurchase !== undefined) {
      setInputValues({ percent: 0, price: assetPurchase[0].fractionPriceCents / 100 });
    }
  }, [assetPurchase]);

  if (!assetPurchase) {
    return null;
  }

  const totalPrice =
    ((assetPurchase[0]?.fractionPriceCents as number) * (assetPurchase[0]?.fractionQty as number)) /
    100;

  const formatLargeValues = (value: number) => {
    if (isNaN(value)) return value;

    if (value < 9999) {
      if (value % 1 === 0) {
        return value;
      }
      return formatNumber(value.toFixed(2) as unknown as number);
    } else if (value < 1000000) {
      return (value / 1000).toFixed(1) + 'k';
    } else if (value < 10000000) {
      return (value / 1000000).toFixed(2) + 'm';
    } else if (value < 1000000000) {
      return Math.round(value / 1000000) + 'm';
    } else if (value < 1000000000000) {
      return Math.round(value / 1000000000) + 'b';
    }

    return '1T+';
  };

  const changePercentValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      percent: safeParseFloat(event.target.value),
      price: calculateValueFromPercent(
        safeParseFloat(event.target.value),
        assetPurchase[0]?.fractionPriceCents,
      ),
    });
  };

  const changePriceInCents = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      price: parseFloat(event.target.value),
      percent: calculatePercentFromInput(
        parseFloat(event.target.value),
        assetPurchase[0]?.fractionPriceCents,
      ),
    });
  };

  const totalValuation =
    inputValues.price !== undefined && inputValues.percent !== undefined
      ? calculateTotalFromPercentAndPrice(inputValues.price, assetPurchase[0]?.fractionQty)
      : '~';

  return (
    <PageContainer>
      <SetAskPriceContainerColumn>
        <Header variant="lg">Set Asking Price</Header>
        <Content>
          <Wrap>
            <DismissibleTextBox>
              <DismissibleTextHeader variant="lg">Why set an asking price?</DismissibleTextHeader>
              <Box marginBottom="20px">
                <Text variant="lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero volutpat volutpat
                  ut bibendum posuere bibendum.
                </Text>
                <Text variant="lg">If you need any help, please contact us</Text>
              </Box>
              <Text variant="lg">In case you don’t set an ask price, a default read more</Text>
              <ReasonsToSetPriceList>
                <ReasonsToSetPriceListItem>
                  In rare cases, if you are not active for x years…
                </ReasonsToSetPriceListItem>
                <ReasonsToSetPriceListItem>Reason 2</ReasonsToSetPriceListItem>
                <ReasonsToSetPriceListItem>Reason 3</ReasonsToSetPriceListItem>
              </ReasonsToSetPriceList>
              <Text variant="lg">Dismiss</Text>
            </DismissibleTextBox>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              maxWidth="756px"
              width="100%"
            >
              <Box display="flex" flexDirection="column" width="50%" marginRight="20px">
                <InputLabelText htmlFor="percent-paid-price">
                  Set over the paid price
                </InputLabelText>
                <PriceOutlinedInput
                  startAdornment={
                    <MonetaryInputAdornment position="start">%</MonetaryInputAdornment>
                  }
                  id="percent-paid-price"
                  type="number"
                  value={inputValues.percent}
                  onChange={changePercentValue}
                />
              </Box>
              <Box display="flex" flexDirection="column" width="50%">
                <InputLabelText htmlFor="ask-price">Ask price per unit</InputLabelText>
                <PriceOutlinedInput
                  startAdornment={
                    <MonetaryInputAdornment position="start">$</MonetaryInputAdornment>
                  }
                  id="ask-price"
                  inputProps={{ step: '0.01' }}
                  type="number"
                  value={inputValues.price}
                  onChange={changePriceInCents}
                />
              </Box>
            </Box>
          </Wrap>
          <OrderSummary>
            <OrderSummaryHeader variant="xl">Listing Value Summary</OrderSummaryHeader>
            <Box marginBottom="24px">
              <OrderSummaryDetailsContainer>
                <Text variant="lg">
                  {assetPurchase[0].fractionQty && assetPurchase[0].fractionQty}
                  {assetPurchase[0].fractionQty > 1 ? ' Units' : ' Unit'}
                </Text>
                <Text variant="lg">{totalValuation}</Text>
              </OrderSummaryDetailsContainer>
              <Box display="flex" justifyContent="space-between" margin="10px 24px 10px 24px">
                <Text variant="lg">Royalty fees</Text>
                <Text variant="lg">10%</Text>
              </Box>
              <Box margin="0 24px">
                <OrderButton onClick={closeCart}>Confirm Order</OrderButton>
              </Box>
            </Box>
            <Text
              variant="xl"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <StyledLockIcon />
              {'Secured by'}
              <Box component="span" style={{ fontWeight: '600', margin: '0 4px' }}>
                {'Jump'}
              </Box>
            </Text>
          </OrderSummary>
        </Content>
      </SetAskPriceContainerColumn>
      <ThanksContainerColumn>
        <ThanksHeader>
          <Text variant="lg">Payment Successful</Text>
          <ThanksText variant="xl">Thanks for purchasing units</ThanksText>
          <ConfirmText>
            We appreciate your order, we’re currently processing it. So hang tight and we’ll send
            you confirmation very soon!
          </ConfirmText>
        </ThanksHeader>
        <Box marginBottom="20px">
          <Text>Order Number</Text>
          <Text>{id}</Text>
        </Box>
        <Box maxWidth="756px" width="100%">
          <AssetCard>
            <CardContent>
              <AssetImageWrapper>
                {asset.media && asset.media[0] && asset.media[0].absoluteUrl && (
                  <Img
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=${asset.media[0].absoluteUrl}&w=16&q=1`}
                    src={asset.media[0].absoluteUrl}
                    alt={asset.media[0].title}
                    width={200}
                    height={80}
                  />
                )}
              </AssetImageWrapper>
              <CardMeta>
                <div>
                  <CardName variant="xl">{asset.name}</CardName>
                  <Attributes attributes={asset.attributes} />
                </div>
                <ValuationContainer>
                  <Typography>Valuation</Typography>
                  <LargeDetailText variant="lg">
                    {assetPurchase[0]
                      ? totalPrice < 1000
                        ? Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            currencyDisplay: 'symbol',
                          }).format(totalPrice)
                        : formatLargeValues(totalPrice)
                      : ''}
                  </LargeDetailText>
                </ValuationContainer>
                <ValuationContainer>
                  <Typography>Unit Price</Typography>
                  <LargeDetailText variant="lg">
                    ${assetPurchase[0] ? assetPurchase[0].fractionPriceCents / 100 : ''}
                  </LargeDetailText>
                </ValuationContainer>
              </CardMeta>
            </CardContent>
          </AssetCard>
        </Box>
      </ThanksContainerColumn>
    </PageContainer>
  );
};

// Some payment forms will open a third party window and redirect back to Jump after payment.
// Below is example code of how to catch and verify that payment.

// useEffect(() => {
//   if (!stripe) {
//     return;
//   }

//   //Grab the client secret from url params
//   const clientSecret = new URLSearchParams(window.location.search).get(
//     'payment_intent_client_secret',
//   );

//   if (!clientSecret) {
//     return;
//   }

//   // After the payment executes the payment intent will return with one of these statuses
//   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//     console.log('payment status: ', paymentIntent?.status);
// switch (paymentIntent?.status) {
//   case 'succeeded':
//     setMessage('Payment succeeded!');
//     break;
//   case 'processing':
//     setMessage('Your payment is processing.');
//     break;
//   case 'requires_payment_method':
//     setMessage('Your payment was not successful, please try again.');
//     break;
//   default:
//     setMessage('Something went wrong.');
//     break;
// }
//   });
// }, [stripe]);
