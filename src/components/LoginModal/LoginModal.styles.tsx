import { Card, lighten, styled, TextField, Modal as MuiModal, Button } from '@mui/material';

export const Modal = styled(MuiModal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

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
export const title = {
  color: 'black',
};

export const ModalCard = styled(Card)(({ theme }) => ({
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  padding: '8px 32px',
  position: 'absolute' as const,
  top: '45%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  width: '800px',
  height: '570px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: `0px 2px 4px -1px ${lighten(
    theme.palette.primary.main,
    0.2,
  )}, 0px 4px 5px 0px ${lighten(theme.palette.primary.main, 0.2)}, 0px 1px 10px 0px ${lighten(
    theme.palette.primary.main,
    0.2,
  )}`,
  outline: 'none !important',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: '80%',
  },
}));

export const InputTextField = styled(TextField)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  height: '68px',
  fontSize: '1.5rem',
  borderRadius: '8px',
  backgroundColor: '#F3F4F6',
  '& label': {
    margin: '12px 0 0 16px',
    fontSize: '16px',

    color: theme.palette.primary.main,
    '&.Mui-focused': {
      marginLeft: '16px',
    },
  },
  '& div.MuiInputBase-root.MuiInput-root': {
    marginTop: '0',
    width: '100%',
  },
  '& input': {
    color: theme.palette.primary.main,
    fontSize: 20,
    fontWeight: 600,
    margin: '12px 0 0 16px',
    backgroundColor: '#F3F4F6',
    padding: '0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.down('sm')]: {
    margin: '10px 0px',
    width: '95%',
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '56px',
    margin: '40px 0',
    fontSize: '1.3rem',
    border: `3px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    },
  },
}));
