import React from 'react';
import { Box, Typography } from '@mui/material';

export const Featured = () => {
  const classes = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      border: '1px solid #fff',
    },
  };
  return (
    <Box sx={classes.wrapper}>
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
