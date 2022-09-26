import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SearchBox } from '@/components/SearchBox';

export const Hero = () => {
  const theme = useTheme();
  const classes = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      [theme.breakpoints.down('sm')]: {
        minHeight: '50vh',
      },
    },
    title: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
      },
    },
    searchBox: {
      border: '1px solid black',
      width: '50%',
      m: '10px',
      [theme.breakpoints.down('sm')]: {
        width: '70%',
        margin: '40px',
      },
    },
  };
  return (
    <Box sx={classes.wrapper}>
      <Typography variant="h2" component="h2" sx={classes.title}>
        Physical trading cards
      </Typography>
      <Typography variant="h2" component="h2" sx={classes.title}>
        NFT marketplace
      </Typography>
      <Box sx={classes.searchBox}>
        <SearchBox placeholder="Rookie..." />
      </Box>
    </Box>
  );
};
