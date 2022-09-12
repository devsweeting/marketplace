import { Box, Button, Typography } from '@mui/material';
import { useSignUpCallToActionStyles } from './SignUpCallToAction.styles';
import React from 'react';

export const SignUpCallToAction = () => {
  const classes = useSignUpCallToActionStyles();
  return (
    <Box className={classes.CTAWrapper}>
      <div
        // rightSquareOne
        style={{
          backgroundColor: 'white',
          height: '265px',
          width: '175px',
          border: '4px solid grey',
          borderRadius: '8px',
          opacity: '0.35',
          position: 'absolute',
          right: -70,
          bottom: 130,
        }}
      ></div>
      <div
        // leftSquareOne
        style={{
          backgroundColor: 'white',
          height: '265px',
          width: '175px',
          border: '4px solid grey',
          borderRadius: '8px',
          opacity: '0.35',
          position: 'absolute',
          left: -70,
        }}
      ></div>
      <div
        // leftSquareTwo
        style={{
          backgroundColor: 'white',
          height: '265px',
          width: '175px',
          border: '4px solid grey',
          borderRadius: '8px',
          opacity: '0.35',
          position: 'absolute',
          right: 390,
          top: 170,
        }}
      ></div>
      <div
        // rightSquareTwo
        style={{
          backgroundColor: 'white',
          height: '265px',
          width: '175px',
          border: '4px solid grey',
          borderRadius: '8px',
          opacity: '0.35',
          position: 'absolute',
          left: 390,
          bottom: 130,
        }}
      ></div>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 6,
        }}
      >
        <Typography variant="h2" component="h2" className={classes.CTAHeader}>
          New Drops every week
        </Typography>
        <Typography variant="subtitle1" component="p" className={classes.CTASubHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button className={classes.button}>Sign up</Button>
      </Box>
    </Box>
  );
};
