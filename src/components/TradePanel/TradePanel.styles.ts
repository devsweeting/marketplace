import { Button, Drawer as MuiDrawer, IconButton, styled } from '@mui/material';

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    maxWidth: '600px',
    marginTop: '80px',
    paddingBottom: '80px',
    backgroundColor: theme.palette.grey[50],
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },
}));

export const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  color: theme.palette.primary.main,
}));

export const CloseIcon = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.primary.main,
}));

export const AssetContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const AssetHeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '1rem 2rem',
  [theme.breakpoints.down('xl')]: {
    flexWrap: 'wrap',
  },
}));

export const FlexTextWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
});

export const TradePanelButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 32px',
  height: '52px',
  border: `1px solid ${theme.palette.grey[300]}`,
  margin: '8px 0',
}));
