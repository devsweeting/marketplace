import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFeaturedStyles } from './Featured.styles';

export const Featured = () => {
  const classes = useFeaturedStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h2" component="h2">
        Featured in
      </Typography>
      <Box>
        <Typography variant="h2" component="h2" style={{ display: 'flex' }}>
          {/* Companies */}
        </Typography>
      </Box>
    </Box>
  );
};
