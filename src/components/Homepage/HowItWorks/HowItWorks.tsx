import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useHowItWorks } from './HowItWorks.styles';
import Image from 'next/image';

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
            textAlign: 'center',
          }}
        >
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
        <Grid item style={{ width: '50%' }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div style={{ margin: '0 100px' }}>
              <Typography
                variant="h3"
                component="h3"
                style={{ fontSize: '3rem', margin: '0 0 25px 0' }}
              >
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
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '50px',
                    width: '200px',
                    height: '55px',
                    marginTop: '25px',
                    fontSize: '1.3rem',
                    border: '3px solid black',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid
          item
          style={{
            width: '50%',

            justifyContent: 'center',
            alignItems: 'center',
            height: '45vw',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              padding: '15%',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
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
        <Grid
          item
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '45vw',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15%',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
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
        <Grid
          item
          style={{
            width: '50%',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',

              backgroundColor: 'whitesmoke',
            }}
          >
            <div style={{ margin: '0 100px' }}>
              <Typography
                variant="h3"
                component="h3"
                style={{ fontSize: '3rem', margin: '0 0 25px 0' }}
              >
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
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '50px',
                    width: '200px',
                    height: '55px',
                    marginTop: '25px',
                    fontSize: '1.3rem',
                    border: '3px solid black',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid
          item
          style={{
            width: '50%',
            height: '45vw',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'black',
              height: '100%',
            }}
          >
            <div style={{ margin: '0 100px' }}>
              <Typography
                variant="h3"
                component="h3"
                style={{ fontSize: '3rem', margin: '0 0 25px 0', color: 'white' }}
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
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    width: '200px',
                    height: '55px',
                    marginTop: '25px',
                    fontSize: '1.3rem',
                    border: '3px solid white',
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid
          item
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '45vw',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              padding: '15%',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
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
