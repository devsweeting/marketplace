import { styled, Typography } from '@mui/material';
import { Form as FormikForm } from 'formik';

export const Form = styled(FormikForm)(({ theme }) => ({
  padding: '2rem',
  maxWidth: 900,
  width: '100%',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '4rem',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    marginBottom: '2rem',
  },
}));

export const SectionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
});
