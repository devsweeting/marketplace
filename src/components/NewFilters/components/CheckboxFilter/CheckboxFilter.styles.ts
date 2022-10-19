import { Button } from '@/components/Button';
import { styled } from '@mui/material';

export const FilterButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));
