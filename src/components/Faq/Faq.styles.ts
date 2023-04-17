import { Accordion, styled, Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  maxWidth: '90vw',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    gap: '1rem',
  },
}));

export const TextContainer = styled('div')({});

export const FaqContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    marginTop: '2rem',
  },
}));

export const FaqSection = styled('div')({
  marginBottom: '3rem',
});

export const TypedSection = styled(Typography)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grey[300]}`,
  paddingLeft: '16px',
  marginBottom: '48px',
  // [theme.breakpoints.down('md')]: {
  //   maxWidth: '100%',
  //   margin: '0 auto',
  // },
}));

export const AccordionFaq = styled(Accordion)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));
