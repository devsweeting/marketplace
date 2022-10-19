import { OutlinedInput as MuiOutlinedInput, styled } from '@mui/material';

export const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
