import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useHowItWorks } from './HowItWorks.styles';
import Image from 'next/image';

export const HowItWorks = () => {
  const classes = useHowItWorks();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.howItWorksHeader}>
        <Typography variant="h2" component="h2">
          How it works
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
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
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Digitize
          </Typography>
          <Typography variant="body1" component="p">
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
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Collect
          </Typography>
          <Typography variant="body1" component="p">
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
          <Typography variant="h3" component="h3" style={{ fontSize: '2rem' }}>
            Sell
          </Typography>
          <Typography variant="body1" component="p">
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
        <Grid item className={classes.heroWrapper}>
          <Box
            className={classes.heroBoxContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div className={classes.heroBox}>
              <Typography variant="h3" component="h3" className={classes.heroTitle} style={{}}>
                1. Digitize
              </Typography>
              <Typography variant="body1" component="p" style={{ fontSize: '1.25rem' }}>
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <div
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Button
                  className={classes.button}
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    border: '3px solid black',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item className={`${classes.heroWrapper} ${classes.right}`}>
          <Box
            style={{
              backgroundColor: 'black',
            }}
            className={classes.imageWrapper}
          >
            <Box className={classes.nextImageHolder}>
              <Image
                src={
                  'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07'
                }
                layout={'fill'}
                alt={'in quia occaecati nihil'}
                objectFit={'contain'}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item className={`${classes.heroWrapper} ${classes.right}`}>
          <Box style={{}} className={classes.imageWrapper}>
            <Box className={classes.nextImageHolder}>
              <Image
                src={
                  'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07'
                }
                layout={'fill'}
                alt={'in quia occaecati nihil'}
                objectFit={'contain'}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.heroWrapper}>
          <Box
            className={classes.heroBoxContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',

              backgroundColor: 'whitesmoke',
            }}
          >
            <div className={classes.heroBox}>
              <Typography variant="h3" component="h3" className={classes.heroTitle} style={{}}>
                2. Collect
              </Typography>
              <Typography variant="body1" component="p" style={{ fontSize: '1.25rem' }}>
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <div
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Button
                  className={classes.button}
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    border: '3px solid black',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item className={`${classes.heroWrapper} ${classes.right}`}>
          <Box
            style={{
              backgroundColor: 'black',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div className={classes.heroBox}>
              <Typography
                variant="h3"
                component="h3"
                className={classes.heroTitle}
                style={{ color: 'white' }}
              >
                3. Sell
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ fontSize: '1.25rem', color: 'white' }}
              >
                All assets are stored safely in a vault. All collectibles are vaulted and insured.
                We procure, store, and insure iconic collectibles in third-party custodial vaults at
                no added costs.
              </Typography>
              <div
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Button
                  className={classes.button}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    border: '3px solid white',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item className={`${classes.heroWrapper} ${classes.right}`}>
          <Box style={{}} className={classes.imageWrapper}>
            <Box className={classes.nextImageHolder}>
              <Image
                src={
                  'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07'
                }
                layout={'fill'}
                alt={'in quia occaecati nihil'}
                objectFit={'contain'}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
