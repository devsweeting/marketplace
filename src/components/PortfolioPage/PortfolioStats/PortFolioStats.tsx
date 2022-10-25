import { formatNumber } from '@/helpers/formatNumber';
import { Box, useTheme, Skeleton } from '@mui/material';
import React from 'react';
import type { IPortfolioData } from '@/pages/account';
import { GridContainer, StatTitle, StatValue } from './PortfolioStats.styles';

export const PortfolioStats = ({ portfolio }: { portfolio?: IPortfolioData }) => {
  const theme = useTheme();
  return (
    <GridContainer>
      <Box
        sx={{
          marginRight: '40px',
        }}
      >
        <StatTitle variant="lg">Portfolio Value</StatTitle>
        <StatValue variant="xl">
          {portfolio &&
          Object.keys(portfolio).length &&
          Object.keys(portfolio).includes('totalValueInCents') ? (
            <>{`$${
              portfolio.totalValueInCents ? formatNumber(portfolio.totalValueInCents / 100) : 0
            }`}</>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: '3.75rem', width: '100%' }} />
          )}
        </StatValue>
      </Box>

      <Box
        sx={{
          marginRight: '40px',
          marginLeft: '40px',
          [theme.breakpoints.down('md')]: {
            margin: '0 ',
          },
        }}
      >
        <StatTitle variant="lg">Cash Balance</StatTitle>
        <StatValue variant="xl">$XXXX</StatValue>
      </Box>

      <Box
        sx={{
          marginRight: '40px',
          marginLeft: '40px',
          [theme.breakpoints.down('md')]: {
            margin: '0 ',
          },
        }}
      >
        <StatTitle variant="lg">Total Units</StatTitle>
        <StatValue variant="xl">
          {portfolio && Object.keys(portfolio).includes('totalUnits') ? (
            <>{`${portfolio.totalUnits}`}</>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: '4.75rem', width: '100%' }} />
          )}
        </StatValue>
      </Box>
    </GridContainer>
  );
};
