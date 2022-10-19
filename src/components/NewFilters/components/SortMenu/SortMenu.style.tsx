import { Button } from '@/components/Button';
import { styled } from '@mui/material';

export const SortButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));
