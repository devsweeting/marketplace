import { Box, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: '100%',
  height: '420px',
  backgroundColor: theme.palette.grey['900'],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    height: '125vw',
  },
}));

export const GradientBorder = styled('div')({
  marginTop: '50px',
  width: '70%',
  height: '420px',
  position: 'relative',
  '&:before': {
    content: '""',
    height: '1px',
    background:
      'linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(147,147,147,1) 50%,rgba(0,0,0,0) 100%)',
    display: 'block',
  },
});

export const FooterBanner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 6,
  gap: '1rem',
  marginBottom: '80px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '0',
    textAlign: 'center',
  },
}));

export const ImgWrapper = styled('div')({
  width: '15rem',
  height: '25rem',
  margin: 'auto',
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 45%, transparent 91%)',
  borderRadius: '10px',
});

//deprecated
export const Square = styled(Box)({
  backgroundColor: 'white',
  height: '265px',
  width: '175px',
  border: '4px solid grey',
  borderRadius: '8px',
  opacity: '0.35',
  position: 'absolute' as const,
});
