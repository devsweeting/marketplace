import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHeroStyles } from './Hero.styles';

export const Hero = () => {
  const classes = useHeroStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="body1" component="p">
        HOME HERO SECTION
      </Typography>
    </Box>
  );
};
