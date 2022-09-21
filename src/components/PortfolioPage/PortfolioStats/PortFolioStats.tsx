import { formatNumber } from '@/helpers/formatNumber';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import type { IPortfolioData } from '@/pages/account';

export const PortFolioStats = ({ portfolio }: { portfolio: IPortfolioData }) => {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        display: 'flex',
        width: '100%',
        padding: '24px',
        margin: '56px auto',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          margin: '23px auto',
        },
      }}
    >
      <Box
        sx={{
          marginRight: '40px',
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          style={{
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Porfolio Value
        </Typography>
        <Typography
          variant="h2"
          component="p"
          style={{
            fontSize: '3.75rem',
            fontWeight: '600',
            lineHeight: '60px',
            fontStyle: 'normal',
          }}
        >
          {portfolio && Object.keys(portfolio).length && (
            <>{`$${
              portfolio.totalValueInCents ? formatNumber(portfolio.totalValueInCents / 100) : 0
            }`}</>
          )}
        </Typography>
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
        <Typography
          variant="h3"
          component="h3"
          style={{
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Cash Balance
        </Typography>
        <Typography
          variant="h2"
          component="p"
          style={{
            fontSize: '3.75rem',
            fontWeight: '600',
            lineHeight: '60px',
            fontStyle: 'normal',
          }}
        >
          $XXXX
        </Typography>
      </Box>
      {portfolio && Object.keys(portfolio).includes('totalUnits') && (
        <Box
          sx={{
            marginRight: '40px',
            marginLeft: '40px',
            [theme.breakpoints.down('md')]: {
              margin: '0 ',
            },
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            style={{
              fontSize: '16px',
              lineHeight: '16px',
              fontWeight: '600',
              textTransform: 'uppercase',
            }}
          >
            Total Units
          </Typography>
          <Typography
            variant="h2"
            component="p"
            style={{
              fontSize: '3.75rem',
              fontWeight: '600',
              lineHeight: '60px',
              fontStyle: 'normal',
            }}
          >
            {`${portfolio.totalUnits}`}
          </Typography>
        </Box>
      )}
    </Grid>
  );
};
