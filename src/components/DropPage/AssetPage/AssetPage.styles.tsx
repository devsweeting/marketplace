import { styled, Typography } from '@mui/material';

export const PageContainer = styled('div')(({ theme }) => ({
  paddingTop: '80px',
  minHeight: '100vh',
  height: '1px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

//---- Image content styles ----//
export const ImgContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[100],
  position: 'relative',
}));

export const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  top: '2rem',
  right: '1.5rem',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },
}));

//---- Info content styles ----//
export const InfoContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[50],
  overflow: 'auto',
}));

export const TitleContainer = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const DetailsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const UnitContainer = styled('div')({
  width: '100%',
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
});

export const ActionContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
  },
  bottom: 0,
  marginTop: 'auto',
  padding: '1.5rem 1rem',
}));
