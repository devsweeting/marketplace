import { Box, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useTestimonialStyles } from './Testimomials.styles';

export const Testimonials = () => {
  const mockTestimonies = [
    {
      name: 'Jane Cooper',
      image:
        'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07',
      company: 'The Walt Disney Company',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      name: 'Cameron Williamson',
      image:
        'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07',
      company: 'Nintendo',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      name: 'Jenny Wilson',
      image:
        'http://localhost:4566/test-bucket/assets/2886b7da-58f4-4576-b782-245f549b198b/c8bd95f1-8d6d-4086-a74e-a2908cd56b07',
      company: 'Sony',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ',
    },
  ];
  const classes = useTestimonialStyles();

  return (
    <Box className={classes.testimonialsWrapper}>
      <div className={classes.testimonialHeaderWrapper}>
        <Typography variant="h2" component="h2" className={classes.testimonialsHeader}>
          What our collectors say
        </Typography>
        <Typography variant="subtitle1" component="p" className={classes.testimonialsSubHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid
        </Typography>
      </div>
      <Grid className={classes.slider} container>
        <Box className={classes.cardWrapper}>
          {mockTestimonies.map((testimony, index) => (
            <Card key={index} className={classes.card}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginBottom: '20px',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '60px',
                    position: 'relative',
                    borderRadius: '30px',
                    backgroundColor: 'black',
                    overflow: 'hidden',
                    marginRight: '20px',
                  }}
                >
                  <Image
                    src={testimony.image}
                    layout={'fill'}
                    alt={'in quia occaecati nihil'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box>
                  <Typography variant="h3" component="h2">
                    {testimony.name}
                  </Typography>
                  <Typography variant="subtitle1" component="h2" style={{ color: 'black' }}>
                    {testimony.company}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" component="p">
                {testimony.testimonial}
              </Typography>
            </Card>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};
