import type { SelectProps } from '@mui/material';
import { styled, Button, Select, Box } from '@mui/material';

export const ConfirmInfoButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: '52px',
    padding: '12px 32px',
    width: '100%',
    margin: '8px 24px',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 12px',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
}));

export const CustomSelect = ({ children }: any, props: SelectProps) => {
  return (
    <StyledSelectMenu
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      margin="dense"
      size="small"
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 200,
            '&::-webkit-scrollbar': {
              backgroundColor: '#e5e5e5',
              borderRadius: 8,
              width: '10px',
              height: '10px',
            },

            '&::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#8f9094',
              minHeight: 8,
            },
          },
        },
        anchorOrigin: {
          vertical: 'center',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'center',
          horizontal: 'center',
        },
      }}
      value={props.value ? props.value : 'US'}
      {...props}
    >
      {children}
    </StyledSelectMenu>
  );
};

export const StyledSelectMenu = styled(Select)({
  width: '100%',
  borderRadius: '8px',
  height: '40px',
  margin: '8px 8px 8px 0',
  '&:hover': {
    bgcolor: 'transparent',
  },
});

export const CustomBox = styled(Box)(({ theme }) => ({
  marginRight: '20px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '12px',
  },
}));
