import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LockIcon from '@mui/icons-material/Lock';
import { useCart } from '@/helpers/auth/CartContext';
import {
  Alert,
  Box,
  Collapse,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
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
import { useForm } from '@/helpers/hooks/useForm';
import {
  ButtonContainer,
  Container,
  HeaderContainer,
  HeaderTitle,
  OrderSummaryContainer,
  OrderSummaryHeader,
  OutlinedLabel,
  PaymentContainer,
  StyledInput,
  Text,
  Title,
} from '../PaymentMethods/PaymentMethods.styles';
import { ConfirmInfoButton } from '../RetrieveUserInfo/RetrieveUserInfo.styles';

const AcceptedCardProviders: { [x: string]: RegExp } = {
  amex: new RegExp('^3[47][0-9]{13}$'),
  visa: new RegExp('^4[0-9]{12}(?:[0-9]{3})?$'),
  mastercard: new RegExp('^5[1-5][0-9]{14}$'),
  mastercard2: new RegExp('^2[2-7][0-9]{14}$'),
  disco1: new RegExp('^6011[0-9]{12}[0-9]*$'),
  disco2: new RegExp('^62[24568][0-9]{13}[0-9]*$'),
  disco3: new RegExp('^6[45][0-9]{14}[0-9]*$'),
};
const luhnCheck = (val: string) => {
  let checksum = 0;
  let j = 1;
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    calc = Number(val.charAt(i)) * j;
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }
    checksum = checksum + calc;
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }
  return checksum % 10 == 0;
};
const isCardAccepted = (number: string) => {
  const cardNumber = number.replace(/\s/g, '');
  let accepted = false;
  Object.keys(AcceptedCardProviders).forEach(function (key) {
    const regex = AcceptedCardProviders[key];
    if (regex.test(cardNumber)) {
      accepted = true;
    }
  });

  return accepted;
};

const isRequired = (value: string) => {
  return value != null && value.trim().length > 0;
};

const antiSymbolPattern = /[!@$%^&*(),?":{}|<>]/g;

const validatePattern = (value: string) => {
  return !antiSymbolPattern.test(value);
};

const validateCardNumber = (number: string) => {
  const cardnumber = number.replace(/\s/g, '');
  const regex = new RegExp('^[0-9]{13,19}$');
  if (!regex.test(cardnumber)) {
    return false;
  }
  return luhnCheck(cardnumber) && isCardAccepted(cardnumber);
};

const validateCardName = (name: string): boolean => {
  return validatePattern(name) && isRequired(name);
};

const validateExpireDate = (date: string): boolean => {
  const today = new Date();
  const someday = new Date();

  const regex = new RegExp('^(0[1-9]|1[0-2])(/|-)([0-9]{4})$');
  if (regex.test(date)) {
    const dateArray = date.split('/');
    const month = parseInt(dateArray[0]) - 1;
    const year = parseInt(dateArray[1]);
    someday.setFullYear(year, month, 1);
    if (someday < today) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

const expireformat = (value: any) => {
  const expdate = value;
  const expDateFormatter =
    expdate.replace(/\//g, '').substring(0, 2) +
    (expdate.length > 2 ? '/' : '') +
    expdate.replace(/\//g, '').substring(2, 6);

  return expDateFormatter;
};

const validateCVV = (creditCardNumber: string, cvv: string): boolean => {
  const creditCard = creditCardNumber.replace(/\D/g, '');
  const cardcvv = cvv.replace(/\D/g, '');

  if (AcceptedCardProviders.amex.test(creditCard)) {
    if (/^\d{4}$/.test(cardcvv)) return true;
  } else if (/^\d{3}$/.test(cardcvv)) {
    return true;
  }
  return false;
};

function creditCardType(cardNumber: string) {
  const number = cardNumber.replace(/\s/g, '');
  let media = 'card-default-color.svg';
  Object.keys(AcceptedCardProviders).forEach(function (key) {
    if (validateCardNumber(number) && AcceptedCardProviders[key].test(number)) {
      switch (key) {
        case 'visa': {
          return (media = 'visa-color.svg');
          break;
        }
        case 'amex': {
          return (media = 'amex-color.svg');
          break;
        }
        case 'mastercard' || 'mastercard2': {
          return (media = 'mastercard-color.svg');
          break;
        }
        case 'disco1' || 'disco2' || 'disco3': {
          return (media = 'mastercard-color.svg');
          break;
        }
        default: {
          return 'card-default-color.svg';
        }
      }
    }
  });
  return media;
}

export const PaymentService = ({
  setPage,
  orderSummary,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
}) => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { closeModal } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];
  const theme = useTheme();
  const initialState = {
    cardNumber: '',
    cardName: '',
    cardExpireDate: '',
    cardCVV: '',
  };

  const validations = [
    ({ cardNumber }: { cardNumber: string }) =>
      validateCardNumber(cardNumber) || { cardNumber: 'Card number is invalid' },
    ({ cardName }: { cardName: string }) =>
      validateCardName(cardName) || {
        cardName: `Name on card can't be empty or contain invalid characters`,
      },
    ({ cardCVV, cardNumber }: { cardCVV: string; cardNumber: string }) =>
      validateCVV(cardNumber, cardCVV) || { cardCVV: 'CVV is invalid' },
    ({ cardExpireDate }: { cardExpireDate: string }) =>
      validateExpireDate(cardExpireDate) || {
        cardExpireDate: `Please select a valid expiry date`,
      },
  ];

  async function onSubmit(): Promise<void> {
    if (isValid) {
      void handleBuyFractions();

      closeModal();
      void router.push({
        pathname: `/askingprice/${orderSummary.id}`,
      });
    }
  }

  function formatCard(cardNumber: string) {
    let newval = '';
    cardNumber = cardNumber.replace(/\s/g, '');
    for (let i = 0; i < cardNumber.length; i++) {
      // add space if modulus of 4 is 0
      if (i % 4 == 0 && i > 0) newval = newval.concat(' ');
      // concatenate the new value
      newval = newval.concat(cardNumber[i]);
    }
    return newval;
  }

  const { values, isValid, errors, changeHandler, touched, submitHandler } = useForm(
    initialState,
    validations,
    onSubmit,
  );
  const cardNumberHandler = (e: { target: { name: string; value: string } }) => {
    e.target.value = formatCard(e.target.value);
    changeHandler(e);
  };

  const cvvHandler = (e: { target: { name: string; value: string } }) => {
    e.target.value = e.target.value.slice(0, 5);
    changeHandler(e);
  };

  const handleBuyFractions = async (): Promise<void> => {
    const response: any = await purchaseSellOrder(
      orderSummary.sellOrders[0].id,
      item.quantity,
      item.fractionPriceCents,
    );
    if (response) {
      switch (response.status) {
        case StatusCodes.CREATED: {
          setPage((prev) => prev + 1);
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
    }
  };
  if (orderSummary === undefined || !(cartItems.length > 0)) {
    return null;
  }
  return (
    <Container role="presentation">
      <HeaderContainer>
        <HeaderTitle variant="xl">Payment</HeaderTitle>
        <ButtonContainer>
          <IconButton
            aria-label="Go back"
            sx={{ fontSize: '14px' }}
            onClick={() => {
              setPage((prev) => prev - 1);
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
        <PaymentContainer>
          <Box display="flex" flexDirection="column" marginBottom="12px" width="100%">
            <OutlinedLabel htmlFor="cardNumber">Card Number</OutlinedLabel>
            <StyledInput
              id="cardNumber"
              name="cardNumber"
              value={values.cardNumber ? values.cardNumber : ''}
              onChange={cardNumberHandler}
              endAdornment={
                <InputAdornment position="start">
                  <Box
                    component="div"
                    sx={{
                      height: '45px',
                      width: '45px',
                      objectFit: 'cover',
                      position: 'relative',
                    }}
                  >
                    <Image
                      layout="fill"
                      src={`/images/PaymentProvidersIcons/${creditCardType(values.cardNumber)}`}
                      alt="card provider"
                    />
                  </Box>
                </InputAdornment>
              }
            />
            {touched.cardNumber && errors.cardNumber && (
              <FormHelperText error>{errors.cardNumber}</FormHelperText>
            )}
          </Box>

          <Box display="flex" flexDirection="column" marginBottom="12px" width="100%">
            <OutlinedLabel htmlFor="cardName">Name on Card</OutlinedLabel>
            <StyledInput
              id="cardName"
              name="cardName"
              value={values.cardName ? values.cardName : ''}
              onChange={changeHandler}
            />
            {touched.cardName && errors.cardName && (
              <FormHelperText error>{errors.cardName}</FormHelperText>
            )}
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <Box
              display="flex"
              flexDirection="column"
              width="75%"
              marginRight="20px"
              marginBottom="12px"
            >
              <InputLabel htmlFor="cardExpireDate">Expiration date (MM/YYYY)</InputLabel>
              <StyledInput
                value={values.cardExpireDate ? expireformat(values.cardExpireDate) : ''}
                onChange={(e) => {
                  e.target.value = expireformat(e.target.value);
                  changeHandler(e);
                }}
                id="cardExpireDate"
                name="cardExpireDate"
              />
              {touched.cardExpireDate && errors.cardExpireDate && (
                <FormHelperText error>{errors.cardExpireDate}</FormHelperText>
              )}
            </Box>
            <Box display="flex" flexDirection="column" width="25%">
              <InputLabel htmlFor="cardCVV">CVV</InputLabel>
              <StyledInput
                id="cardCVV"
                name="cardCVV"
                value={values.cardCVV ? values.cardCVV : ''}
                onChange={cvvHandler}
              />
              {touched.cardCVV && errors.cardCVV && (
                <FormHelperText error>{errors.cardCVV}</FormHelperText>
              )}
            </Box>
          </Box>
        </PaymentContainer>
      </Box>
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
              {Object.keys(item).length > 0 && item.quantity}
              {Object.keys(item).length > 0 && item.quantity > 1 ? ' Units' : ' Unit'}
            </Text>
            <Text variant="lg">
              {Object.keys(item).length > 0 && '$' + formatNumber(item.totalPrice)}
            </Text>
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
              {Object.keys(item).length > 0 &&
                '$' + formatNumber((item.totalPrice * 1.15 + 0.25).toFixed(2) as unknown as number)}
            </Text>
          </Box>
        </Box>
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          <ConfirmInfoButton disabled={!isValid} onClick={submitHandler}>
            Confirm Order
          </ConfirmInfoButton>
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
