import { styled } from '@mui/material';
import { Search as MuiSearch } from '@mui/icons-material';

export const SearchIcon = styled(MuiSearch)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.only('sm')]: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
  },
}));
