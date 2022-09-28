import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';

export const PortfolioHeader = ({
  setActivePortfolioCategory,
  activePortfolioCategory,
}: {
  setActivePortfolioCategory: React.Dispatch<React.SetStateAction<string>>;
  activePortfolioCategory: string;
}) => {
  const tabs = ['Overview', 'Watchlist', 'Transactions'];
  return (
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
            {tabs.map((tab, index) => (
              <Box
                key={index}
                sx={{
                  padding: '24px 16px',
                  borderBottom:
                    activePortfolioCategory === tab ? '2px solid black' : '2px solid transparent',
                  '&: hover': { cursor: 'pointer' },
                }}
                onClick={() => {
                  setActivePortfolioCategory(tab);
                }}
              >
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: activePortfolioCategory === tab ? 'black' : '#6B7280',
                  }}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
};
