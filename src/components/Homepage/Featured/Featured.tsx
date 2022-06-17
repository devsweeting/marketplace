import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFeaturedStyles } from './Featured.styles';

export const Featured = () => {
  const classes = useFeaturedStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="body1" component="p">
        FEATURED SECTION
      </Typography>
    </Box>
  );
};
