import { styled, Modal as MuiModal, Typography } from '@mui/material';

export const Modal = styled(MuiModal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ModalContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: '3rem',
  backgroundColor: theme.palette.secondary.main,
  outline: 'none',
}));

export const Title = styled(Typography)({
  fontWeight: 700,
  textAlign: 'center',
});

export const ButtonContainer = styled('div')({
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
});
