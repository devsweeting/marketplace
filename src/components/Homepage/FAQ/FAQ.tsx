import { Box, Grid, Typography } from '@mui/material';
import { useFAQStyles } from './FAQ.styles';
import { CustomizedAccordions } from './accordion';
import React from 'react';

export const FAQ = () => {
  const classes = useFAQStyles();
  return (
    <Grid className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography variant="h2" component="h2" className={classes.header}>
          {'Frequently Asked Questions'}
        </Typography>
        <Box>
          <CustomizedAccordions />
        </Box>
      </Box>
    </Grid>
  );
};
