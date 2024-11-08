import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCart } from '@/helpers/auth/CartContext';
import { Alert, Box, Collapse, IconButton } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import {
  ButtonContainer,
  Container,
  HeaderContainer,
  HeaderTitle,
} from './PaymentMethods/PaymentMethods.styles';

export const CheckoutContainer = ({
  setPage,
  alertMessage,
  open,
  setOpen,
  children,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  alertMessage: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: any;
}) => {
  const { closeModal } = useCart();

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
        {children}
      </Box>
    </Container>
  );
};
