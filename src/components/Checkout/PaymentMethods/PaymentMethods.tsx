import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  Typography,
  useTheme,
} from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { formatNumber } from '@/helpers/formatNumber';

export const PaymentMethods = ({
  setPage,
  page,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}) => {
  const { closeCart, cartItems } = useCart();
  const [isDismissed, setIsDismissed] = useState(false);
  const item = cartItems[0];
  const theme = useTheme();
  if (!(cartItems.length > 0)) {
    return null;
  }
  return (
    <Box height="max-content" width="576px">
      <Box
        sx={{
          height: '80px',
          padding: '24px',
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="xl"
          component="h2"
          sx={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600' }}
        >
          Available payment methods
        </Typography>
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
                closeCart();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </Box>
      </Box>
      <Box
        height="max-content"
        width="576px"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        sx={{ padding: '24px' }}
      >
        <Card
          sx={{
            height: '188px',
            width: '528px',
            backgroundColor: theme.palette.grey[100],
            marginBottom: '16px',
            padding: '24px',
            display: isDismissed ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            style={{
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            variant="body1"
            component="p"
          >
            Jump balance represents the funds you have for use in your account. When you make
            purchases, sales, desposits or withdrawals, those changes will be shown in your balance
            below.
          </Typography>
          <Typography
            style={{
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            component="p"
            variant="body1"
          >
            View and increase your limits here.
          </Typography>
          <Typography
            style={{
              width: 'max-content',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsDismissed(true);
            }}
            component="span"
            variant="body1"
          >
            Dismiss
          </Typography>
        </Card>
        <Card
          sx={{
            height: '100px',
            width: '528px',
            backgroundColor: theme.palette.grey[100],
            margin: '16px 0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#D9D9D9',
              height: '48px',
              width: '48px',
              margin: 'auto 0',
              borderRadius: '24px',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 16px',
              width: '376px',
            }}
          >
            <Typography
              style={{
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '28px',
                display: 'flex',
              }}
            >
              Jump balance
            </Typography>
            <Typography
              style={{
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                display: 'flex',
              }}
            >
              0.00 USD (Insufficient funds)
            </Typography>
          </Box>
          <Box>
            <Radio
              sx={{
                color: theme.palette.grey[400],
                backgroundColor: theme.palette.grey[100],
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
                },
              }}
            />
          </Box>
        </Card>
        <Box
          sx={{
            margin: '8px 0',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              textDecoration: 'underline',
            }}
          >
            Withdraw balance
          </Typography>
          <InfoIcon sx={{ fontSize: '16px', marginLeft: '10px' }} />
        </Box>
        <Box sx={{ margin: '16px 0 16px 0', height: '120px', width: '528px' }}>
          <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }}>
            Add funds to your balance
          </InputLabel>
          <Box display="flex">
            <OutlinedInput
              sx={{ width: '90%', borderRadius: '8px', height: '40px', margin: '8px 8px 8px 0' }}
              placeholder="Enter amount"
              endAdornment={
                <InputAdornment
                  sx={{
                    border: `1px solid ${theme.palette.grey[200]}`,
                    width: '11px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    fontWeight: 'bold',
                    color: 'black',
                    '& p': {
                      fontSize: '16px',
                      fontWeight: '500',
                      color: 'black',
                    },
                  }}
                  position="end"
                >
                  $
                </InputAdornment>
              }
            />
            <Button
              sx={{
                '&.MuiButtonBase-root': {
                  color: 'white',
                  backgroundColor: theme.palette.primary.main,
                  height: '40px',
                  width: '111px',
                  margin: '8px 0',
                  fontSize: '16px',
                  lineHeight: '24px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.secondary.main,
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px auto',
                  },
                },
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              Add funds
            </Button>
          </Box>
          <Typography
            style={{
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            When you purchase Jump balance using fiat payment methods, the sale is made by xyz.
          </Typography>
        </Box>
        <Card
          sx={{
            height: '124px',
            width: '528px',
            backgroundColor: theme.palette.grey[100],
            margin: '24px 0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        ></Card>
      </Box>
      <Box height="max-content" width="576px" bgcolor={theme.palette.grey[50]}>
        <Box
          width="100%"
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
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            margin="20px 24px 10px 24px"
            sx={{ borderBottom: `1px solid ${theme.palette.grey[200]}` }}
          >
            <Typography
              id="modal-modal-title"
              variant="xl"
              component="p"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
            >
              {Object.keys(item).length > 0 && item.quantity}
              {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="xl"
              component="p"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
            >
              {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" margin="10px 24px 10px 24px">
            <Typography
              id="modal-modal-title"
              variant="xl"
              component="p"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
            >
              Royalty fees
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="xl"
              component="p"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}
            >
              10%
            </Typography>
          </Box>
        </Box>
        <Box
          display="grid"
          sx={{
            gridAutoFlow: 'column',
            gridAutoColumns: '1fr',
            gap: '20px',
            maxWidth: '576px',
            margin: '8px 24px',
          }}
        >
          <Button
            sx={{
              '&.MuiButtonBase-root': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.grey[100],
                height: '40px',
                margin: '8px 0',
                fontSize: '16px',
                lineHeight: '24px',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.grey[100]}`,
                '&:hover': {
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.primary.main,
                  border: `1px solid white`,
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px auto',
                },
              },
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Cancel Payment
          </Button>
          <Button
            sx={{
              '&.MuiButtonBase-root': {
                color: 'white',
                backgroundColor: theme.palette.primary.main,
                height: '40px',

                margin: '8px 0',
                fontSize: '16px',
                lineHeight: '24px',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.secondary.main,
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px auto',
                },
              },
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Add Credit Card
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
