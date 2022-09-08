import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export const SignUpCallToAction = () => {
  return (
    <Box
      style={{
        width: '100%',
        minWidth: '100%',
        height: '650px',
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
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
          zIndex: 100,
        }}
      >
        <Typography variant="h2" component="h2" style={{ marginBottom: '15px', fontSize: '4rem' }}>
          New Drops every week
        </Typography>
        <Typography variant="subtitle1" component="p" style={{ fontSize: '1.4rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button
          style={{
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '50px',
            width: '175px',
            height: '55px',
            marginTop: '25px',
            fontSize: '1.3rem',
            border: '3px solid black',
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};
