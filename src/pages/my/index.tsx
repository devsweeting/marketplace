import { OpenGraph } from '@/components/OpenGraph';
import { Box, Card, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next/types';
import * as React from 'react';

const PortfolioPage: NextPage = () => {
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <Grid
        sx={{
          marginTop: 10,
          backgroundColor: '#fff',
          width: '100%',

          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        container
      >
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h2"
              style={{
                margin: 0,
                padding: '24px',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              Portfolio
            </Typography>
          </Box>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginRight: '20px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Overview
                </Typography>
              </Box>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Watchlist
                </Typography>
              </Box>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Transactions
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default PortfolioPage;
