import { Container as MuiContainer, styled, Typography } from '@mui/material';

export const Container = styled(MuiContainer)(({ theme }) => ({
  minWidth: '100%',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  color: theme.palette.primary.main,
  '&.MuiContainer-root': {
    padding: 0,
  },
}));

export const LogoWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 1.5rem',
  whiteSpace: 'nowrap',
});

export const LogoText = styled(Typography)({
  fontFamily: 'League Gothic',
  fontSize: 40,
});

export const SearchContainer = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const NavContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0 1.5rem',
});

export const CloseContainer = styled('div')({
  height: 80,
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
});
