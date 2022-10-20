import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { formatNumber } from '@/helpers/formatNumber';
import { CustomRadio } from './PaymentMethods.styles';

export const PaymentMethods = ({
  setPage,
  page,
  ref,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const { closeCart, cartItems } = useCart();
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedValue, setSelectedValue] = useState('b');

  const funds = 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const item = cartItems[0];
  const theme = useTheme();
  if (!(cartItems.length > 0)) {
    return null;
  }
  return (
    <Box height="max-content" maxWidth="576px" width="100%" ref={ref}>
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
            top: '20px',
            right: '20px',
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
        maxWidth="576px"
        width="100%"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        sx={{ padding: '24px' }}
      >
        <Card
          sx={{
            height: '188px',
            width: '100%',
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
            View and increase your limits <Link href="/account/balance">here.</Link>
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
              {`$${formatNumber(funds.toFixed(2) as unknown as number)} USD ${
                funds < item.totalPrice ? '(Insufficient funds)' : ''
              }`}
            </Typography>
          </Box>
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
                  padding: 0,
                  border: `1px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.secondary.main,
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
            maxidth: '528px',
            backgroundColor: theme.palette.grey[100],
            margin: '24px 0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
              Credit/Debit cards
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
              {`-5% + 0.25 service fee`}
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
              {`Recommended`}
            </Typography>
          </Box>
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
          {selectedValue === 'a' && (
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
              Pay with Jump balance
            </Button>
          )}
          {selectedValue === 'b' && (
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
          )}
        </Box>
      </Box>
    </Box>
  );
};
