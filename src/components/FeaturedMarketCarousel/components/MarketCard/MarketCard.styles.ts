import { styled, Card as MuiCard } from '@mui/material';

export const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: 0,
  borderColor: theme.palette.grey[200],
  height: '430px',
  width: '310px',
  flexDirection: 'column',
  display: 'flex',
  flexWrap: 'nowrap',
  cursor: 'pointer',
  transition: 'all .2s ease-in-out',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    width: '270px',
  },
  '&:hover': { backgroundColor: theme.palette.grey[50] },
}));

export const ImgContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '60%',
  padding: 0,
  position: 'relative',
});

export const ImgWrapper = styled('div')({
  width: '140px',
  height: '220px',
  margin: 'auto',
  position: 'relative',
});

export const TextContainer = styled('div')({
  flex: 1,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});
