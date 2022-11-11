import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { useCart } from '@/helpers/auth/CartContext';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { formatNumber } from '@/helpers/formatNumber';
import { purchaseSellOrder } from '@/api/endpoints/sellorders';
import { StatusCodes } from 'http-status-codes';
import type { IAsset } from '@/types/assetTypes';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import Image from 'next/image';

function creditCardType(cc: string) {
  const amex = new RegExp('^3[47][0-9]{13}$');
  const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  const cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  const cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  const mastercard = new RegExp('^5[1-5][0-9]{14}$');
  const mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  const disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  const disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  const disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

  const diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
  const jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  if (visa.test(cc)) {
    return 'visa-color.svg';
  }
  if (amex.test(cc)) {
    return 'amex-color.svg';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'mastercard-color.svg';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'discover-color.svg';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup1.test(cc) || cup2.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  return 'card-default-color.svg';
}

export const PaymentService = ({
  page,
  setPage,
  orderSummary,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
}) => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { closeModal, closeCart } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];
  const theme = useTheme();

  const handleBuyFractions = async (): Promise<void> => {
    const response: any = await purchaseSellOrder(
      orderSummary.sellOrders[0].id,
      item.quantity,
      item.fractionPriceCents,
    );

    switch (response.status) {
      case StatusCodes.CREATED: {
        setPage(page + 1);
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
  };
  if (orderSummary === undefined || !(cartItems.length > 0)) {
    return null;
  }
  return (
    <Box width="576px" height="max-content">
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
          Payment
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
        width="100%"
        height="max-content"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Collapse in={open} sx={{ margin: '4px auto 0 auto', width: '90%' }}>
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="error"
          >
            {alertMessage}
          </Alert>
        </Collapse>
        <Box
          width="576px"
          height="max-content"
          display="flex"
          flexDirection="column"
          padding="24px"
        >
          <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
            Card Number
          </InputLabel>
          <Box display="flex">
            <OutlinedInput
              placeholder="xxxx xxxx xxxx xxxx"
              id="card-number"
              sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              endAdornment={
                <InputAdornment position="start">
                  <Box
                    component="div"
                    sx={{ height: '45px', width: '45px', objectFit: 'cover', position: 'relative' }}
                  >
                    <Image
                      layout="fill"
                      src={`/images/PaymentProvidersIcons/${creditCardType('4111111111111111')}`}
                      alt=""
                    />
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
          <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-name">
            Name on Card
          </InputLabel>
          <Box display="flex">
            <OutlinedInput
              id="card-name"
              sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" maxWidth="520px">
            <Box display="flex" flexDirection="column" width="75%" marginRight="20px">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                Expiration date (MM/YY)
              </InputLabel>
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="25%">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                CVC
              </InputLabel>
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              />
            </Box>
          </Box>
        </Box>
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
            margin: '0px 24px',
          }}
        >
          <Button
            sx={{
              '&.MuiButtonBase-root': {
                color: 'white',
                backgroundColor: theme.palette.primary.main,
                height: '52px',
                padding: '12px 32px',
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
              void handleBuyFractions();

              closeModal();
              void router.push({
                pathname: `/askingprice/${orderSummary.id}`,
              });
            }}
          >
            Confirm Order
          </Button>
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
      </Box>
    </Box>
  );
};
