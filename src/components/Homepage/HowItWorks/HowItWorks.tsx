import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useHowItWorks } from './HowItWorks.styles';

export const HowItWorks = () => {
  const classes = useHowItWorks();
  return (
    <Box className={classes.wrapper}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Typography variant="h2" component="h2">
          How it works
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{
            fontSize: '2rem',
            margin: 20,
            width: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'justify',
          }}
        >
          All assets are stored safely in a vault. All collectibles are vaulted and insured. We
          procure, store, and insure iconic collectibles in third-party custodial vaults at no added
          costs.
        </Typography>
      </Box>
      <Grid container style={{ display: 'flex', justifyContent: 'space-between', margin: 20 }}>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Digitize
          </Typography>
          From the physical world to the blockchain
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Collect
          </Typography>
          Grow your collection and own fractions...
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Sell
          </Typography>
          Your cards will shine in our marketplace
        </Grid>
      </Grid>
    </Box>
  );
};
