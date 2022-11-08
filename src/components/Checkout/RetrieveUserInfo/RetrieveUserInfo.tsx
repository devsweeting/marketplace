import React, { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Box, IconButton, MenuItem } from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  ButtonContainer,
  HeaderContainer,
  HeaderTitle,
  OutlinedLabel,
  PaymentContainer,
  StyledInput,
} from '../PaymentMethods/PaymentMethods.styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ConfirmInfoButton, CustomBox, CustomSelect } from './RetrieveUserInfo.styles';

interface ISynapseInfo {
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
  const [synapseInfo, setSynapseInfo] = useState({
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
    console.log('called');
    return phoneNumberPattern.test(elementValue);
  }

  const debounce = <T extends (...args: any[]) => ReturnType<T>>(
    callback: T,
    timeout: number,
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, timeout);
    };
  };

  const myDebouncedFunction = debounce((e) => {
    validatePhoneNumber(e.phoneNumber);
  }, 2000);

  useEffect(() => {
    myDebouncedFunction(synapseInfo);
  });

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
                value={synapseInfo.firstName ? synapseInfo.firstName : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { firstName: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </CustomBox>
            <Box display="flex" flexDirection="column" width="50%">
              <OutlinedLabel htmlFor="last-name">Last Name</OutlinedLabel>
              <StyledInput
                id="last-name"
                value={synapseInfo.lastName ? synapseInfo.lastName : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { lastName: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <OutlinedLabel htmlFor="phone">Phone Number</OutlinedLabel>
            <StyledInput
              id="phone"
              value={synapseInfo.phoneNumber ? synapseInfo.phoneNumber : ''}
              onChange={(e) => {
                let updatedValue = {};
                updatedValue = { phoneNumber: e.target.value };

                setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                myDebouncedFunction(e);
              }}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
            <CustomBox display="flex" flexDirection="column" width="70%">
              <OutlinedLabel htmlFor="street-address">Street Address</OutlinedLabel>
              <StyledInput
                id="street-address"
                value={synapseInfo.address_street ? synapseInfo.address_street : ''}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { address_street: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </CustomBox>
            <Box display="flex" width="40%" flexDirection="column">
              <OutlinedLabel htmlFor="card-number">Country</OutlinedLabel>
              <CustomSelect
                value={synapseInfo.address_country_code}
                onChange={(e: { target: { value: string } }) => {
                  const updatedValue = {
                    address_country_code: e.target.value as ISynapseInfo['address_country_code'],
                  };
                  setSynapseInfo((synapseInfo) => ({
                    ...synapseInfo,
                    ...updatedValue,
                  }));
                }}
              >
                <MenuItem value="US">{'United States'}</MenuItem>
              </CustomSelect>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <CustomBox display="flex" flexDirection="column" width="40%">
              <OutlinedLabel htmlFor="city">City</OutlinedLabel>
              <StyledInput id="city" />
            </CustomBox>
            <CustomBox display="flex" flexDirection="column" width="25%">
              <OutlinedLabel htmlFor="state">State/Territory</OutlinedLabel>
              <StyledInput
                id="state"
                value={synapseInfo.address_subdivision ? synapseInfo.address_subdivision : ''}
                onChange={(e) => {
                  const updatedValue = { address_subdivision: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </CustomBox>
            <Box display="flex" flexDirection="column" width="25%">
              <OutlinedLabel htmlFor="postal">Zip/Postal Code</OutlinedLabel>
              <StyledInput
                id="postal"
                value={synapseInfo.address_postal_code ? synapseInfo.address_postal_code : ''}
                onChange={(e) => {
                  const updatedValue = { address_postal_code: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
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
