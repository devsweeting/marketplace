import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHowItWorks } from './HowItWorks.styles';

export const HowItWorks = () => {
  const classes = useHowItWorks();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="body1" component="p">
        HOW IT WORKS SECTION
      </Typography>
    </Box>
  );
};
