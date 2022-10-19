import { Button } from '@/components/Button';
import { styled } from '@mui/material';

export const FilterButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

export const FilterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  gap: '1rem',
});
