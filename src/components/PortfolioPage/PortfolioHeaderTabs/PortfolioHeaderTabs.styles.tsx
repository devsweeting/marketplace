import type { CardProps } from '@mui/material';
import { Card, styled, Typography } from '@mui/material';
import type { CSSProperties } from 'react';

export const PortfolioContainer = styled('div')({
  marginTop: '80px',
  backgroundColor: '#fff',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const PageTitle = styled('h2')({
  margin: 0,
  padding: '24px',
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '32px',
});

export const PortfolioCard = styled((props: CardProps) => <Card {...props} />)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export const TabContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginRight: '20px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '0px',
    justifyContent: 'space-evenly',
  },
}));

export const TabHeader = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: CSSProperties;
}) => (
  <Typography
    variant={'xl'}
    component={'h3'}
    style={style}
    sx={{ margin: '0', padding: '0', fontWeight: '600', fontSize: '16px', lineHeight: '32px' }}
  >
    {children}
  </Typography>
);
