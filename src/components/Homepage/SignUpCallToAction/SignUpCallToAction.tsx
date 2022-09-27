import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useModal } from '@/helpers/hooks/useModal';

export const SignUpCallToAction = () => {
  const theme = useTheme();
  const classes = {
    CTAWrapper: {
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
      marginBottom: '20px',
      [theme.breakpoints.down('sm')]: {
        height: '125vw',
      },
    },
    CTAHeader: {
      marginBottom: '15px',
      fontSize: '4rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
      },
    },
    CTASubHeader: {
      fontSize: '1.4rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '85%',
        lineBreak: 'anywhere',
      },
    },
    square: {
      backgroundColor: 'white',
      height: '265px',
      width: '175px',
      border: '4px solid grey',
      borderRadius: '8px',
      opacity: '0.35',
      position: 'absolute' as const,
    },
    rightSquareOne: {
      right: -70,
      bottom: 130,
    },
    rightSquareTwo: {
      left: '20%',
      bottom: 130,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    leftSquareOne: {
      left: -70,
    },
    leftSquareTwo: {
      right: '20%',
      top: 170,

      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    button: {
      color: 'white',
      backgroundColor: 'black',
      borderRadius: '50px',
      width: '175px',
      height: '55px',
      marginTop: '25px',
      fontSize: '1.3rem',
      border: '3px solid black',
    },
  };
  const { isModalOpen, setIsModalOpen } = useModal();
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Box sx={classes.CTAWrapper}>
      <Box sx={[classes.square, classes.rightSquareOne]}></Box>
      <Box sx={[classes.square, classes.leftSquareOne]}></Box>
      <Box sx={[classes.square, classes.leftSquareTwo]}></Box>
      <Box sx={[classes.square, classes.rightSquareTwo]}></Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 6,
        }}
      >
        <Typography variant="h2" component="h2" sx={classes.CTAHeader}>
          New Drops every week
        </Typography>
        <Typography variant="subtitle1" component="p" sx={classes.CTASubHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button
          onClick={() => {
            handleClick();
          }}
          sx={classes.button}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};
