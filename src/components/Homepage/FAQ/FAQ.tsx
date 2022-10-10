import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CustomizedAccordions } from './accordion';
import React from 'react';

export const FAQ = () => {
  const theme = useTheme();
  const classes = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '30px 0',
      minHeight: '60vh',
      [theme.breakpoints.down('sm')]: {
        minHeight: '50vh',
      },
    },
    container: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      margin: '40px auto',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    header: {
      marginBottom: '40px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '22px',
        marginBottom: '20px',
      },
    },
  };
  return (
    <Grid sx={classes.wrapper}>
      <Box sx={classes.container}>
        <Typography variant="xl5" component="h2" sx={classes.header}>
          {'Frequently Asked Questions'}
        </Typography>
        <Box>
          <CustomizedAccordions />
        </Box>
      </Box>
    </Grid>
  );
};
