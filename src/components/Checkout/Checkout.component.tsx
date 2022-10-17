import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, Button, Card, Modal, useTheme } from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '640px;',
  maxWidth: '1024px',
  bgcolor: 'background.paper',
  outline: 'none !important',
};

export const Checkout = ({ isOpen }: { isOpen: boolean }) => {
  const { cartItems } = useCart();

  useEffect(() => {
    //
  }, [cartItems]);

  const { totalPrice, quantity } = cartItems[0];
  const theme = useTheme();
  return (
    <Modal
      open={isOpen}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
    >
      <Box sx={style}>
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
          <Box>1</Box>
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
                  {quantity > 1 ? 'Units: ' : 'Unit: '}
                  {quantity}
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="xl"
                  component="p"
                  sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
                >
                  ${totalPrice}
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
                sx={{
                  '&.MuiButtonBase-root': {
                    color: 'white',
                    backgroundColor: theme.palette.primary.main,
                    height: '40px',
                    margin: '10px 24px',
                    fontSize: '1.3rem',
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
      </Box>
    </Modal>
  );
};
