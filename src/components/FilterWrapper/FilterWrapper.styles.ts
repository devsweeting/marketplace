import { styled, Typography } from '@mui/material';

export const MobileFilterContainer = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100vw',
});

export const MobileFilterHead = styled('div')({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FilterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const DesktopFilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '1rem 2rem',
  gap: '1rem',
});

export const Header = styled(Typography)(({ theme }) => ({
  display: 'inline',
  fontWeight: 700,
  [theme.breakpoints.only('sm')]: {
    display: 'none',
  },
}));
