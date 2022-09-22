import { Box, Button, Typography } from '@mui/material';
import { useSignUpCallToActionStyles } from './SignUpCallToAction.styles';
import React from 'react';
import { useModal } from '@/helpers/hooks/useModal';

export const SignUpCallToAction = () => {
  const classes = useSignUpCallToActionStyles();
  const { isModalOpen, setIsModalOpen } = useModal();
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Box className={classes.CTAWrapper}>
      <div className={`${classes.square} ${classes.rightSquareOne}`}></div>
      <div className={`${classes.square} ${classes.leftSquareOne}`}></div>
      <div className={`${classes.square} ${classes.leftSquareTwo}`}></div>
      <div className={`${classes.square} ${classes.rightSquareTwo}`}></div>
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
        <Button
          onClick={() => {
            handleClick();
          }}
          className={classes.button}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};
