import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, IconButton } from '@mui/material';
import { ConfirmInfoButton, CustomBox, CustomSelect } from './RetrieveUserInfo.styles';
import { states } from './StatesAndTerritories';
import { StatusCodes } from 'http-status-codes';
import { useCart } from '@/helpers/auth/CartContext';
import { verifyAddress } from '@/api/endpoints/synapse';
import type { Dispatch, SetStateAction } from 'react';
import {
  Container,
  ButtonContainer,
  HeaderContainer,
  HeaderTitle,
  OutlinedLabel,
  PaymentContainer,
  StyledInput,
} from '../PaymentMethods/PaymentMethods.styles';

export interface IUserBillingInfo {
  address_street?: string;
  address_city?: string;
  address_subdivision?: string;
  address_country_code?: string;
  address_postal_code?: string;
}

export const RetrieveUserInfo = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const { closeModal } = useCart();
  const [isValid, setIsValid] = useState(false);
  const [paymentProviderInfo, setPaymentProviderInfo] = useState<{ [x: string]: string }>({
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [validation, setValidation] = useState({
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  function validatePhoneNumber(phoneNumber: string) {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(phoneNumber);
  }

  function checkValidity() {
    const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const countryPattern = /^US$/;
    const antiSymbolPattern = /[!@$%^&*(),?":{}|<>]/g;
    const statePattern =
      /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/gm;

    let address: { [x: string]: string };

    [
      'address_street',
      'address_city',
      'address_subdivision',
      'address_country_code',
      'address_postal_code',
    ].forEach((prop) => (address[prop] = paymentProviderInfo[prop]));

    console.log(address);

    const errors = validation;
    if (!paymentProviderInfo.firstName.trim()) {
      setIsValid(false);
      errors.firstName = 'First name is required';
    } else {
      setIsValid(true);
      errors.firstName = '';
    }

    if (!paymentProviderInfo.lastName.trim()) {
      setIsValid(false);
      errors.lastName = 'Last name is required';
    } else {
      setIsValid(true);
      errors.lastName = '';
    }

    if (!paymentProviderInfo.phoneNumber.trim()) {
      setIsValid(false);
      errors.phoneNumber = 'Phone Number is required';
    } else if (!validatePhoneNumber(paymentProviderInfo.phoneNumber)) {
      setIsValid(false);
      errors.phoneNumber = 'Phone Number is invalid';
    } else {
      setIsValid(true);
      errors.lastName = '';
    }

    if (!paymentProviderInfo.address_street.trim()) {
      setIsValid(false);
      errors.address_street = 'Street address is required';
    } else if (paymentProviderInfo.address_street.match(antiSymbolPattern)) {
      setIsValid(false);
      errors.address_street = 'Street address contains invalid symbols';
    } else {
      setIsValid(true);
      errors.address_street = '';
    }

    if (!paymentProviderInfo.address_city.trim()) {
      setIsValid(false);
      errors.address_city = 'City is required';
    } else if (paymentProviderInfo.address_city.match(antiSymbolPattern)) {
      setIsValid(false);
      errors.address_city = 'City contains invalid symbols';
    } else {
      setIsValid(true);
      errors.address_city = '';
    }

    if (!paymentProviderInfo.address_subdivision.trim()) {
      setIsValid(false);
      errors.address_subdivision = 'State or territory is required';
    } else if (!paymentProviderInfo.address_subdivision.match(statePattern)) {
      setIsValid(false);
      errors.address_subdivision = `Entered value doesn't match any state or territory`;
    } else {
      setIsValid(true);
      errors.address_subdivision = '';
    }

    if (!paymentProviderInfo.address_country_code.trim()) {
      setIsValid(false);
      errors.address_country_code = 'Country is required';
    } else if (!paymentProviderInfo.address_country_code.match(countryPattern)) {
      setIsValid(false);
      errors.address_country_code = `Entered value doesn't match supported countries`;
    } else {
      setIsValid(true);
      errors.address_country_code = '';
    }

    if (!paymentProviderInfo.address_postal_code.trim()) {
      setIsValid(false);
      errors.address_postal_code = 'ZIP/Postal code is required';
    } else if (!paymentProviderInfo.address_postal_code.match(zipCodePattern)) {
      setIsValid(false);
      errors.address_postal_code = `Entered value doesn't match supported ZIP code`;
    } else {
      setIsValid(true);
      errors.address_postal_code = '';
    }
    setValidation(errors);
    if (isValid) {
      return true;
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setPaymentProviderInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    checkValidity();
  }, [paymentProviderInfo]);

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle variant="xl">Billing Info</HeaderTitle>
        <ButtonContainer>
          <IconButton
            aria-label="Go back"
            sx={{ fontSize: '14px' }}
            onClick={() => {
              setPage(page - 1);
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
        alignItems="center"
        justifyContent="center"
      >
        <PaymentContainer>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="first-name">First Name</OutlinedLabel>
              <StyledInput
                id="first-name"
                name={'firstName'}
                value={paymentProviderInfo.firstName ? paymentProviderInfo.firstName : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { firstName: e.target.value };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
              />
            </CustomBox>
            <Box display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="last-name">Last Name</OutlinedLabel>
              <StyledInput
                id="last-name"
                name={'lastName'}
                value={paymentProviderInfo.lastName ? paymentProviderInfo.lastName : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { lastName: e.target.value };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <OutlinedLabel htmlFor="phone">Phone Number</OutlinedLabel>
            <StyledInput
              id="phone"
              name={'phoneNumber'}
              value={paymentProviderInfo.phoneNumber ? paymentProviderInfo.phoneNumber : ''}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="70%">
              <OutlinedLabel htmlFor="street-address">Street Address</OutlinedLabel>
              <StyledInput
                id="street-address"
                name={'address_street'}
                value={paymentProviderInfo.address_street ? paymentProviderInfo.address_street : ''}
                onChange={handleChange}
              />
              <FormHelperText error>{validation.address_street}</FormHelperText>
            </CustomBox>
            <Box display="flex" width="40%" flexDirection="column">
              <OutlinedLabel htmlFor="country">Country</OutlinedLabel>
              <CustomSelect
                name={'address_country_code'}
                info={paymentProviderInfo.address_country_code}
                setInfo={handleChange}
                options={[{ value: 'US', name: 'United States' }]}
              />
              <FormHelperText error>{validation.address_country_code}</FormHelperText>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="city">City</OutlinedLabel>
              <StyledInput
                id="city"
                name={'address_city'}
                value={paymentProviderInfo.address_city ? paymentProviderInfo.address_city : ''}
                onChange={handleChange}
              />
              <FormHelperText error>{validation.address_city}</FormHelperText>
            </CustomBox>
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="state">State/Territory</OutlinedLabel>
              <CustomSelect
                name={'address_subdivision'}
                info={paymentProviderInfo.address_subdivision}
                setInfo={handleChange}
                options={states}
              />
              <FormHelperText error>{validation.address_subdivision}</FormHelperText>
            </CustomBox>
            <Box display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="postal">Zip/Postal Code</OutlinedLabel>
              <StyledInput
                id="postal"
                name={'address_postal_code'}
                value={
                  paymentProviderInfo.address_postal_code
                    ? paymentProviderInfo.address_postal_code
                    : ''
                }
                onChange={handleChange}
              />
              <FormHelperText error>{validation.address_postal_code}</FormHelperText>
            </Box>
          </Box>
        </PaymentContainer>
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          <ConfirmInfoButton
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Confirm Info
          </ConfirmInfoButton>
        </Box>
      </Box>
    </Container>
  );
};
