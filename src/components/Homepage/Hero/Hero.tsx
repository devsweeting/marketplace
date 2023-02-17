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
      outline: '2px solid rgb(0, 0, 0, .25)',
      borderRadius: '99px',
      width: '50%',
      m: '10px',
      transition: 'all 250ms ease-in-out',
      [theme.breakpoints.down('sm')]: {
        width: '70%',
        margin: '40px',
      },
      '&:hover': {
        outline: '2px solid rgb(0, 0, 0)',
      },
    },
  };
  return (
    <Box sx={classes.wrapper}>
      <Typography variant="xl5" component="h2" sx={classes.title}>
        Physical trading cards
      </Typography>
      <Typography variant="xl5" component="h2" sx={classes.title}>
        NFT marketplace
      </Typography>
      <Box sx={classes.searchBox}>
        <SearchBox placeholder="Rookie..." />
      </Box>
    </Box>
  );
};
