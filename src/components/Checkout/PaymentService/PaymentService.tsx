import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCart } from '@/helpers/auth/CartContext';
import {
  Alert,
  Box,
  Collapse,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import type { IAsset } from '@/types';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import Image from 'next/image';
import { useForm } from '@/helpers/hooks/useForm';
import {
  ButtonContainer,
  Container,
  HeaderContainer,
  HeaderTitle,
  OutlinedLabel,
  PaymentContainer,
  StyledInput,
} from '../PaymentMethods/PaymentMethods.styles';
import { OrderSummary } from '../OrderSummary';

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
  alertMessage,
  setAlertMessage,
  open,
  setOpen,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  orderSummary: IAsset;
  alertMessage: string;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { closeModal } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
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

  const { values, isValid, errors, changeHandler, touched } = useForm(initialState, validations);

  const cardNumberHandler = (e: { target: { name: string; value: string } }) => {
    e.target.value = formatCard(e.target.value);
    changeHandler(e);
  };

  const cvvHandler = (e: { target: { name: string; value: string } }) => {
    e.target.value = e.target.value.slice(0, 5);
    changeHandler(e);
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
              value={values?.cardNumber ?? ''}
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
                      fill
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
              value={values?.cardName ?? ''}
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
                value={expireformat(values.cardExpireDate) || ''}
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
                value={values?.cardCVV ?? ''}
                onChange={cvvHandler}
              />
              {touched.cardCVV && errors.cardCVV && (
                <FormHelperText error>{errors.cardCVV}</FormHelperText>
              )}
            </Box>
          </Box>
        </PaymentContainer>
      </Box>
      <OrderSummary
        setPage={setPage}
        isValid={isValid}
        orderSummary={orderSummary}
        setAlertMessage={setAlertMessage}
        setOpen={setOpen}
      />
    </Container>
  );
};
