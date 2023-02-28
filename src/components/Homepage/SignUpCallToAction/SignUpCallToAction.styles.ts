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

export const ImgWrapper = styled('div')({
  width: '15rem',
  height: '25rem',
  margin: 'auto',
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)',
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
