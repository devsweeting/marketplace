import { Attributes } from '@/components/Attributes';
import { formatNumber } from '@/helpers/formatNumber';
import { Typography, IconButton, Card, lighten, Button, Box, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { useCart } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';

export const Cart = ({
  page,
  setPage,
  orderSummary,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
}) => {
  const { removeFromCart, closeCart } = useCart();
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            <IconButton
              aria-label="remove from cart"
              onClick={() => {
                closeCart();
              }}
            >
              <ArrowBackIosIcon />
              Back
            </IconButton>
            <IconButton
              aria-label="remove from cart"
              onClick={() => {
                closeCart();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        display="grid"
        sx={{
          gridAutoFlow: 'column',
          gridAutoColumns: '1fr',
          maxWidth: '1024px',
          margin: '0 auto',
        }}
      >
        <Box position="relative">
          <Card
            sx={{
              height: '345px',
              borderRadius: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              width="100%"
              height="200.5px"
              minWidth="152px"
              justifyContent="space-between"
              display="flex"
              flexDirection="column"
              position="relative"
            >
              <Box display="flex">
                <Box
                  sx={{
                    maxWidth: '152px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: lighten(theme.palette.primary.main, 0.95),
                    padding: '40px',
                  }}
                >
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
                </Box>
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
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: '10px',
                right: '10px',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                  },
                }}
              >
                <IconButton
                  aria-label="remove from watchlist"
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.grey[50],
            padding: '0 0 24px',
            gap: '24px',
            height: '560px',
          }}
        >
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
            <Box display="flex" justifyContent="space-between" margin="20px 24px 10px 24px">
              <Typography
                id="modal-modal-title"
                variant="xl"
                component="p"
                sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
              >
                {Object.keys(item).length > 0 && item.quantity}
                {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="xl"
                component="p"
                sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
              >
                {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
              </Typography>
            </Box>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '40px',
                margin: '20px 24px',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.grey[400]}`,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="xl"
                component="h2"
                sx={{ fontSize: '18px', lineHeight: '28px', fontWeight: '500' }}
              >
                Added to cart
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="xl"
                component="h2"
                sx={{ fontSize: '18px', lineHeight: '28px', fontWeight: '500' }}
              >
                These units are still available to other buyers.
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="xl"
                component="h2"
                sx={{ fontSize: '18px', lineHeight: '28px', fontWeight: '500' }}
              >
                Buy soon to make sure they’re not sold while you shop
              </Typography>
            </Card>
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
        </Box>
      </Box>
    </div>
  );
};
