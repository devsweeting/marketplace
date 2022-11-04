import { Attributes } from '@/components/Attributes';
import { formatNumber } from '@/helpers/formatNumber';
import { Typography, IconButton, Button, Box, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { useCart } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';
import {
  AssetCard,
  CardContent,
  CartAsset,
  CartContent,
  CTACard,
  ImageWrapper,
  RemoveFromCartButton,
  Text,
  ValuationContainer,
} from './Cart.styles';

export const Cart = ({
  page,
  setPage,
  orderSummary,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
}) => {
  const { removeFromCart, closeModal } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];

  const theme = useTheme();

  return (
    <div>
      <Box
        sx={{
          height: '80px',
          padding: '24px 40px',
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="xl"
          component="h2"
          sx={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600' }}
        >
          Cart
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: '10px',
            right: '10px',
          }}
        >
          <Box sx={{ margin: '0 15px' }}>
            <IconButton
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
                closeModal();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
                  <Typography
                    id="modal-modal-title"
                    variant="xl"
                    component="h2"
                    sx={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600' }}
                  >
                    {orderSummary && orderSummary.name}
                  </Typography>
                  <Attributes attributes={orderSummary.attributes} />
                </Box>
              </Box>
            </Box>
            <RemoveFromCartButton>
              <IconButton
                aria-label="remove from cart"
                onClick={() => {
                  removeFromCart(item.id);
                }}
              >
                <CloseIcon />
              </IconButton>
            </RemoveFromCartButton>
          </AssetCard>
        </CartAsset>
        <CardContent>
          <Box
            sx={{
              height: '60px',
              borderBottom: `1px solid ${theme.palette.grey[200]}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px 0px 16px 24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="xl"
              component="h2"
              sx={{ fontSize: '18px', lineHeight: '28px', fontWeight: '500' }}
            >
              Order Summary
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column">
            <ValuationContainer>
              <Text variant="lg">
                {Object.keys(item).length > 0 && item.quantity}
                {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
              </Text>
              <Text variant="lg">
                {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
              </Text>
            </ValuationContainer>
            <CTACard>
              <Text variant="lg">Added to cart</Text>
              <Text variant="lg">These units are still available to other buyers.</Text>
              <Text variant="lg">Buy soon to make sure they’re not sold while you shop</Text>
            </CTACard>
            <Button
              onClick={() => {
                setPage(page + 1);
              }}
              sx={{
                '&.MuiButtonBase-root': {
                  color: 'white',
                  backgroundColor: theme.palette.primary.main,
                  height: '40px',
                  margin: '10px 24px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  border: `1px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.secondary.main,
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px auto',
                  },
                },
              }}
            >
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </CartContent>
    </div>
  );
};
