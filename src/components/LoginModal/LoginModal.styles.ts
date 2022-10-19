import { styled, Modal as MuiModal } from '@mui/material';

export const Modal = styled(MuiModal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ModalCard = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: '1.5rem',
  backgroundColor: theme.palette.secondary.main,
  outline: 'none',
  maxWidth: '400px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    padding: '3rem',
  },
}));

export const Container = styled('div')(({ theme }) => ({
  margin: '15px 15px 15px 0',
  height: '43px',
  width: '80%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const Message = styled('span')({
  display: 'block',
  height: 12,
  fontSize: '14px',
  color: '#666',
});

export const Form = styled('form')({
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const Label = styled('label')({
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
});
