import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Box, FormHelperText, IconButton, Alert, Stack } from '@mui/material';
import { ConfirmInfoButton, CustomBox, CustomSelect } from './RetrieveUserInfo.styles';
import { states } from './StatesAndTerritories';
import { useCart } from '@/helpers/auth/CartContext';
import { verifyAddress } from '@/api/endpoints/payments';
import { useForm } from '@/helpers/hooks/useForm';
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

const isRequired = (value: string) => {
  return value != null && value.trim().length > 0;
};

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberPattern = /^(?:\([2-9]\d{2}\) ?|[2-9]\d{2}(?:-?| ?))[2-9]\d{2}[- ]?\d{4}$/;
  return phoneNumberPattern.test(phoneNumber);
};

const validateState = (state: string) => {
  const statePattern =
    /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/gm;
  return statePattern.test(state);
};
const validateCountry = (country: string) => {
  const countryPattern = /^US$/;
  return countryPattern.test(country);
};
const validateZip = (zip: string) => {
  const countryPattern = /^\d{5}(-\d{4})?$/;
  return countryPattern.test(zip);
};

const antiSymbolPattern = /[!@$%^&*(),?":{}|<>]/g;

const validatePattern = (value: string) => {
  return !antiSymbolPattern.test(value);
};

export const RetrieveUserInfo = ({ setPage }: { setPage: Dispatch<SetStateAction<number>> }) => {
  const { closeModal } = useCart();
  const initialState = {
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  const validations = [
    ({ address_street }: { address_street: string }) =>
      isRequired(address_street) || { address_street: 'Street address is required' },
    ({ address_street }: { address_street: string }) =>
      validatePattern(address_street) || { address_street: 'Street contains invalid characters' },
    ({ address_city }: { address_city: string }) =>
      isRequired(address_city) || { address_city: 'City is required' },
    ({ address_city }: { address_city: string }) =>
      validatePattern(address_city) || { address_city: 'City contains invalid characters' },
    ({ address_subdivision }: { address_subdivision: string }) =>
      isRequired(address_subdivision) || { address_subdivision: 'State is required' },
    ({ address_subdivision }: { address_subdivision: string }) =>
      validateState(address_subdivision) || { address_subdivision: 'State is not valid' },
    ({ address_country_code }: { address_country_code: string }) =>
      isRequired(address_country_code) || { address_country_code: 'Country is required' },
    ({ address_country_code }: { address_country_code: string }) =>
      validateCountry(address_country_code) || { address_country_code: 'State is not valid' },
    ({ address_postal_code }: { address_postal_code: string }) =>
      validateZip(address_postal_code) || { address_postal_code: 'ZIP code is not valid' },
    ({ address_postal_code }: { address_postal_code: string }) =>
      isRequired(address_postal_code) || { address_postal_code: 'ZIP code is required' },
    ({ firstName }: { firstName: string }) =>
      validatePattern(firstName) || { firstName: `First name contains invalid characters` },
    ({ firstName }: { firstName: string }) =>
      isRequired(firstName) || { firstName: 'First name is required' },
    ({ lastName }: { lastName: string }) =>
      validatePattern(lastName) || { lastName: `Last name contains invalid characters` },
    ({ lastName }: { lastName: string }) =>
      isRequired(lastName) || { lastName: 'Last name is required' },
    ({ phoneNumber }: { phoneNumber: string }) =>
      isRequired(phoneNumber) || { phoneNumber: 'Phone number is required' },
    ({ phoneNumber }: { phoneNumber: string }) =>
      validatePhoneNumber(phoneNumber) || { phoneNumber: 'Not a valid phone number' },
  ];

  async function onSignup(): Promise<void> {
    if (isValid) {
      const res = await verifyAddress({
        address_street: values.address_street,
        address_city: values.address_city,
        address_subdivision: values.address_subdivision,
        address_country_code: values.address_country_code,
        address_postal_code: values.address_postal_,
      });

      res && 'error' in res
        ? setAlertText(`Address counldn't be verified`)
        : setPage((prev) => prev + 1);
    }
  }

  const { values, isValid, errors, changeHandler, touched, submitHandler } = useForm(
    initialState,
    validations,
    onSignup,
  );

  const [alertText, setAlertText] = useState('');

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle variant="xl">Billing Info</HeaderTitle>
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
        alignItems="center"
        justifyContent="center"
      >
        {alertText && (
          <Stack sx={{ width: '90%', margin: 1 }} spacing={2}>
            <Alert severity="error" icon={false}>
              {alertText}
            </Alert>
          </Stack>
        )}
        <PaymentContainer>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="first-name">First Name</OutlinedLabel>
              <StyledInput
                id="first-name"
                name={'firstName'}
                value={values?.firstName ?? ''}
                onChange={changeHandler}
              />
              {touched.firstName && errors.firstName && (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              )}
            </CustomBox>
            <Box display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="last-name">Last Name</OutlinedLabel>
              <StyledInput
                id="last-name"
                name={'lastName'}
                value={values?.lastName ?? ''}
                onChange={changeHandler}
              />
              {touched.lastName && errors.lastName && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
            </Box>
          </Box>
          <Box marginBottom="8px" display="flex" flexDirection="column" width="100%">
            <OutlinedLabel htmlFor="phone">Phone Number</OutlinedLabel>
            <StyledInput
              id="phone"
              name={'phoneNumber'}
              value={values?.phoneNumber ?? ''}
              onChange={changeHandler}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <FormHelperText error>{errors.phoneNumber}</FormHelperText>
            )}
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="70%">
              <OutlinedLabel htmlFor="street-address">Street Address</OutlinedLabel>
              <StyledInput
                id="street-address"
                name={'address_street'}
                value={values?.address_street ?? ''}
                onChange={changeHandler}
              />
              {touched.address_street && errors.address_street && (
                <FormHelperText error>{errors.address_street}</FormHelperText>
              )}
            </CustomBox>
            <Box display="flex" width="40%" flexDirection="column">
              <OutlinedLabel htmlFor="country">Country</OutlinedLabel>
              <CustomSelect
                name={'address_country_code'}
                info={values.address_country_code}
                setInfo={changeHandler}
                options={[{ value: 'US', name: 'United States' }]}
              />
              {touched.address_country_code && errors.address_country_code && (
                <FormHelperText error>{errors.address_country_code}</FormHelperText>
              )}
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="city">City</OutlinedLabel>
              <StyledInput
                id="city"
                name={'address_city'}
                value={values?.address_city ?? ''}
                onChange={changeHandler}
              />
              {touched.address_city && errors.address_city && (
                <FormHelperText error>{errors.address_city}</FormHelperText>
              )}
            </CustomBox>
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="state">State/Territory</OutlinedLabel>
              <CustomSelect
                name={'address_subdivision'}
                info={values.address_subdivision}
                setInfo={changeHandler}
                options={states}
              />
              {touched.address_subdivision && errors.address_subdivision && (
                <FormHelperText error>{errors.address_subdivision}</FormHelperText>
              )}
            </CustomBox>
            <Box display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="postal">Zip/Postal Code</OutlinedLabel>
              <StyledInput
                id="postal"
                name={'address_postal_code'}
                value={values?.address_postal_code ?? ''}
                onChange={changeHandler}
              />
              {touched.address_postal_code && errors.address_postal_code && (
                <FormHelperText error>{errors.address_postal_code}</FormHelperText>
              )}
            </Box>
          </Box>
        </PaymentContainer>
        <Box display="flex" width="100%" maxWidth="576px" padding="10px 0 20px 0">
          <ConfirmInfoButton disabled={!isValid} onClick={submitHandler}>
            Confirm Info
          </ConfirmInfoButton>
        </Box>
      </Box>
    </Container>
  );
};
