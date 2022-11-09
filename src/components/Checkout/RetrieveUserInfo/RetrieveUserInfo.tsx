import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StatusCodes } from 'http-status-codes';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { Box, IconButton, FormHelperText } from '@mui/material';
import { ConfirmInfoButton, CustomBox, CustomSelect } from './RetrieveUserInfo.styles';
import { states } from './StatesAndTerritories';
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
import type { SelectChangeEvent } from '@mui/material';

export interface IUserBillingInfo {
  address_street: string;
  address_city: string;
  address_subdivision: string;
  address_country_code: string;
  address_postal_code: string;
}

export const RetrieveUserInfo = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const { closeModal } = useCart();
  const [paymentProviderInfo, setPaymentProviderInfo] = useState({
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [helperText, setHelperText] = useState({
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  function validatePhoneNumber(elementValue: string) {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(elementValue);
  }

  async function validateAddress(address: {
    address_street: string;
    address_city: string;
    address_subdivision: string;
    address_country_code: string;
    address_postal_code: string;
  }) {
    const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const countryPattern = /^US$/;
    const antiSymbolPattern = /[!@$%^&*(),?":{}|<>]/g;
    const statePattern =
      /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/gm;

    const addressSchema = {
      address_street: (values: string) => !values.match(antiSymbolPattern) && values != '',
      address_city: (values: string) => !values.match(antiSymbolPattern) && values != '',
      address_subdivision: (values: string) => values.match(statePattern),
      address_country_code: (values: string) => values.match(countryPattern),
      address_postal_code: (values: string) => values.match(zipCodePattern),
    };

    const validate = (
      object: { [x: string]: any },
      schema: { [x: string]: (arg0: any) => any },
    ) => {
      return Object.keys(schema)
        .filter((key) => !schema[key](object[key]))
        .map((key) => {
          return new Error(key);
        });
    };

    const errors = validate(address, addressSchema);

    if (errors.length > 0) {
      for (const { message } of errors) {
        for (const key of Object.keys(helperText)) {
          if (message === key) {
            let updatedValue = {};
            updatedValue = { [key]: 'input is invalid' };
            setHelperText((errorMessages) => ({
              ...errorMessages,
              ...updatedValue,
            }));
          }
        }
      }
      return false;
    }
    const res = await verifyAddress(address);
    return res?.status === StatusCodes.OK ? true : false;
  }
  useEffect(() => {
    const {
      address_street,
      address_city,
      address_subdivision,
      address_country_code,
      address_postal_code,
    } = paymentProviderInfo;
    const address = {
      address_street,
      address_city,
      address_subdivision,
      address_country_code,
      address_postal_code,
    };
    void validateAddress(address);
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
              <FormHelperText>{helperText.firstName}</FormHelperText>
            </CustomBox>
            <Box display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="last-name">Last Name</OutlinedLabel>
              <StyledInput
                id="last-name"
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
              <FormHelperText>{helperText.lastName}</FormHelperText>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <OutlinedLabel htmlFor="phone">Phone Number</OutlinedLabel>
            <StyledInput
              id="phone"
              value={paymentProviderInfo.phoneNumber ? paymentProviderInfo.phoneNumber : ''}
              onChange={(e) => {
                let updatedValue = {};
                updatedValue = { phoneNumber: e.target.value };

                setPaymentProviderInfo((userBillingInfo) => ({
                  ...userBillingInfo,
                  ...updatedValue,
                }));
              }}
            />
            <FormHelperText>{helperText.phoneNumber}</FormHelperText>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="70%">
              <OutlinedLabel htmlFor="street-address">Street Address</OutlinedLabel>
              <StyledInput
                id="street-address"
                value={paymentProviderInfo.address_street ? paymentProviderInfo.address_street : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { address_street: e.target.value };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
              />
              <FormHelperText error>{helperText.address_street}</FormHelperText>
            </CustomBox>
            <Box display="flex" width="40%" flexDirection="column">
              <OutlinedLabel htmlFor="country">Country</OutlinedLabel>
              <CustomSelect
                info={paymentProviderInfo.address_country_code}
                setInfo={(event: SelectChangeEvent<unknown>) => {
                  const updatedValue = {
                    address_country_code: event.target
                      .value as IUserBillingInfo['address_country_code'],
                  };
                  setPaymentProviderInfo((userBillingInfo: any) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
                options={[{ value: 'US', name: 'United States' }]}
              />
              <FormHelperText error>{helperText.address_country_code}</FormHelperText>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="city">City</OutlinedLabel>
              <StyledInput
                id="city"
                value={paymentProviderInfo.address_city ? paymentProviderInfo.address_city : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { address_city: e.target.value };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
              />
              <FormHelperText error>{helperText.address_city}</FormHelperText>
            </CustomBox>
            <CustomBox display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="state">State/Territory</OutlinedLabel>
              <CustomSelect
                info={paymentProviderInfo.address_subdivision}
                setInfo={(event: SelectChangeEvent<unknown>) => {
                  const updatedValue = {
                    address_subdivision: event.target
                      .value as IUserBillingInfo['address_subdivision'],
                  };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
                options={states}
              />
              <FormHelperText error>{helperText.address_subdivision}</FormHelperText>
            </CustomBox>
            <Box display="flex" flexDirection="column" width="100%">
              <OutlinedLabel htmlFor="postal">Zip/Postal Code</OutlinedLabel>
              <StyledInput
                id="postal"
                value={
                  paymentProviderInfo.address_postal_code
                    ? paymentProviderInfo.address_postal_code
                    : ''
                }
                onChange={(e) => {
                  const updatedValue = { address_postal_code: e.target.value };
                  setPaymentProviderInfo((userBillingInfo) => ({
                    ...userBillingInfo,
                    ...updatedValue,
                  }));
                }}
              />
              <FormHelperText error>{helperText.address_postal_code}</FormHelperText>
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
