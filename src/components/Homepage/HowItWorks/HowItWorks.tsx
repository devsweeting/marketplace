import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Button } from '@/components/Button';
import { HeroBox } from './HowItWorks.styles';
import { TradingCard } from '../3DCard/3DCard';

export const HowItWorks = () => {
  const theme = useTheme();
  const classes = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    },
    howItWorksHeader: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '160px',
      marginBottom: '80px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '80px',
        marginBottom: '20px',
      },
    },
    text: {
      fontSize: '2rem',
      margin: '20px',
      width: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#6B7280',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '90%',
      },
    },
    heroWrapper: {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '100%',
      },
    },
    rightHeroWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '100%',
      },
    },
    heroBoxContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    heroTitle: {
      fontWeight: 700,
      marginBottom: '1.25rem',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        align: 'center',
        margin: 0,
        justifyContent: 'center',
        padding: '30px 0',
      },
    },
    heroBody: {
      maxWidth: '80ch',
      marginBottom: '1.5rem',
      color: '#6B7280',
      fontSize: '16px',
    },
    imageWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15%',
      width: '50vw',
      height: '50vw',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        height: '100vw',
      },
    },
    nextImageHolder: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    button: {
      borderRadius: '50px',
      width: '200px',
      height: '55px',
      marginTop: '25px',
      fontSize: '1.3rem',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        margin: '25px auto 5px auto',
      },
    },
    subheader: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    textTiny: {
      fontSize: '.8rem',
      alignItems: 'center',
      textAlign: 'center',
      color: '#6B7280',
      lineHeight: '150%',
      [theme.breakpoints.down('sm')]: {
        fontSize: '.6rem',
      },
    },
  };
  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.howItWorksHeader}>
        <Typography variant="xl5" component="h2" sx={classes.subheader}>
          How it works
        </Typography>
        <Typography variant="body1" component="p" sx={classes.text}>
          All assets are stored safely in a vault. All collectibles are vaulted and insured. We
          procure, store, and insure iconic collectibles in third-party custodial vaults at no added
          costs.
        </Typography>
      </Box>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 60,
          marginBottom: 160,
        }}
      >
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25px',
          }}
        >
          <Typography variant="lg" component="h3" sx={classes.subheader}>
            Digitize
          </Typography>
          <Typography variant="body1" component="p" sx={classes.textTiny}>
            From the physical world to the blockchain
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25px',
          }}
        >
          <Typography variant="lg" component="h3" sx={classes.subheader}>
            Collect
          </Typography>
          <Typography variant="body1" component="p" sx={classes.textTiny}>
            Grow your collection and own fractions...
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25px',
          }}
        >
          <Typography variant="lg" component="h3" sx={classes.subheader}>
            Sell
          </Typography>
          <Typography variant="body1" component="p" sx={classes.textTiny}>
            Your cards will shine in our marketplace
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Grid item sx={classes.heroWrapper}>
          <Box
            sx={classes.heroBoxContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <HeroBox>
              <Typography variant="xl5" sx={classes.heroTitle}>
                1. Digitize
              </Typography>
              <Typography variant="xl" sx={classes.heroBody}>
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <Button variant="contained" rounded>
                Learn More
              </Button>
            </HeroBox>
          </Box>
        </Grid>
        <Grid item sx={classes.rightHeroWrapper}>
          <Box
            style={{
              backgroundColor: 'black',
            }}
            sx={classes.imageWrapper}
          >
            <Box sx={classes.nextImageHolder}>
              <TradingCard src={'/tradingCards/jordan_hardcat_heroics_card.png'} />
            </Box>
          </Box>
        </Grid>
        <Grid item sx={classes.rightHeroWrapper}>
          <Box style={{}} sx={classes.imageWrapper}>
            <Box sx={classes.nextImageHolder}>
              <TradingCard src={'/tradingCards/charizard.png'} />
            </Box>
          </Box>
        </Grid>
        <Grid item sx={classes.heroWrapper}>
          <Box
            sx={classes.heroBoxContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',

              backgroundColor: 'whitesmoke',
            }}
          >
            <HeroBox>
              <Typography variant="xl5" sx={classes.heroTitle}>
                2. Collect
              </Typography>
              <Typography variant="xl" sx={classes.heroBody}>
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <Box
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Button variant="contained" rounded>
                  Learn More
                </Button>
              </Box>
            </HeroBox>
          </Box>
        </Grid>
        <Grid item sx={classes.rightHeroWrapper}>
          <Box
            style={{
              backgroundColor: 'black',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <HeroBox>
              <Typography variant="xl5" sx={classes.heroTitle} style={{ color: 'white' }}>
                3. Sell
              </Typography>
              <Typography variant="xl" sx={classes.heroBody} style={{ color: 'white' }}>
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <Box
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Button variant="contained" color="secondary" rounded>
                  Learn More
                </Button>
              </Box>
            </HeroBox>
          </Box>
        </Grid>
        <Grid item sx={classes.rightHeroWrapper}>
          <Box style={{}} sx={classes.imageWrapper}>
            <Box sx={classes.nextImageHolder}>
              <TradingCard src={'/tradingCards/national_treasure_giannis.png'} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
