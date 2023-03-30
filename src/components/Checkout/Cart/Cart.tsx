import { Attributes } from '@/components/Attributes';
import { formatNumber } from '@/helpers/formatNumber';
import { IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import type { IAsset } from '@/types';
import { useCart } from '@/helpers/auth/CartContext';
import type { CartItem } from '@/helpers/auth/CartContext';
import {
  HeaderContainer,
  AssetCard,
  CardContent,
  CartAsset,
  CartContent,
  CTACard,
  ImageWrapper,
  RemoveFromCartButton,
  Text,
  ValuationContainer,
  HeaderSizedText,
  HeaderButtons,
  OrderSummaryContainer,
  OrderSummaryText,
  OrderButton,
} from './Cart.styles';

export const Cart = ({
  setPage,
  orderSummary,
  cartItem,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
  cartItem: CartItem;
}) => {
  const { removeFromCart, closeModal } = useCart();
  return (
    <div role="presentation">
      <HeaderContainer>
        <HeaderSizedText variant="lg">Cart</HeaderSizedText>
        <HeaderButtons>
          <IconButton
            sx={{ fontSize: '14px' }}
            aria-label="Close Cart Modal"
            onClick={() => {
              closeModal();
            }}
          >
            <ArrowBackIosIcon />
            Back
          </IconButton>
          <IconButton
            aria-label="remove from cart"
            onClick={() => {
              removeFromCart(cartItem.assetId);
              closeModal();
            }}
          >
            <CloseIcon />
          </IconButton>
        </HeaderButtons>
      </HeaderContainer>
      <CartContent>
        <CartAsset>
          <AssetCard>
            <Box
              width="100%"
              minWidth="152px"
              justifyContent="space-between"
              display="flex"
              flexDirection="column"
            >
              <Box display="flex">
                <ImageWrapper>
                  {orderSummary.media &&
                    orderSummary.media[0] &&
                    orderSummary.media[0].absoluteUrl && (
                      <Image
                        placeholder="blur"
                        blurDataURL={`/_next/image?url=${orderSummary.media[0].absoluteUrl}&w=16&q=1`}
                        src={orderSummary.media[0].absoluteUrl}
                        alt={orderSummary.media[0].title}
                        width={72}
                        height={120.5}
                        style={{ textAlign: 'center', lineHeight: '60px', maxWidth: '100px' }}
                      ></Image>
                    )}
                </ImageWrapper>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ width: '100%', marginLeft: '20px' }}
                >
                  <HeaderSizedText variant="lg">
                    {orderSummary && orderSummary.name}
                  </HeaderSizedText>
                  <Attributes attributes={orderSummary.attributes} />
                </Box>
              </Box>
            </Box>
            <RemoveFromCartButton>
              <IconButton
                aria-label="remove item from cart"
                onClick={() => {
                  removeFromCart(cartItem.assetId);
                }}
              >
                <CloseIcon />
              </IconButton>
            </RemoveFromCartButton>
          </AssetCard>
        </CartAsset>
        <CardContent>
          <OrderSummaryContainer>
            <OrderSummaryText variant="xl">Order Summary</OrderSummaryText>
          </OrderSummaryContainer>

          <Box display="flex" flexDirection="column">
            <ValuationContainer>
              <Text variant="lg">
                {cartItem.quantity && cartItem.quantity}
                {cartItem.quantity && cartItem.quantity > 1 ? ' Units' : ' Unit'}
              </Text>
              <Text variant="lg">
                {cartItem.totalPrice && '$' + formatNumber(cartItem.totalPrice)}
              </Text>
            </ValuationContainer>
            <CTACard>
              <Text variant="lg">Added to cart</Text>
              <Text variant="lg">These units are still available to other buyers.</Text>
              <Text variant="lg">Buy soon to make sure they’re not sold while you shop</Text>
            </CTACard>
            <OrderButton
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Buy Now
            </OrderButton>
          </Box>
        </CardContent>
      </CartContent>
    </div>
  );
};
