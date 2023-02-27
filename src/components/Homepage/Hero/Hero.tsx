import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SearchBox } from '@/components/SearchBox';
import Image from 'next/image';

export const Hero = () => {
  const theme = useTheme();

  const classes = {
    wrapper: {
      overflow: 'hidden',
      width: '100%',
      height: '550px',
      zIndex: '0',
      position: 'relative',
      backgroundColor: 'rgba(17, 24, 39, 1)',

      display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        minHeight: '50vh',
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        /*sqrt(2)x100% to make sure to cover all the area after the rotation */
        width: '120%',
        height: '150%',
        /**/
        /* to center*/
        left: '50%',
        top: '50%',
        /* */
        background: 'url(/tradingCards/card_banner.png)',
        backgroundSize: 'cover' /* size of the image*/,
        transform: 'translate(-50%,-50%) rotate(-8deg)' /* center the element then rotate */,
        boxShadow: 'inset 0 0 0 2000px rgba(17, 24, 39, 0.8)',
      },
    },
    content: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '80px', //height of navbar
    },
    title: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
      },
      zIndex: '2',
      color: 'white',
    },
    searchBox: {
      color: 'white',
      zIndex: '2',
      outline: '2px solid rgb(255, 255, 255, .5)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      borderRadius: '99px',
      width: '50%',
      m: '50px 0 0 10px',
      transition: 'all 250ms ease-in-out',
      [theme.breakpoints.down('sm')]: {
        width: '70%',
        margin: '40px',
      },
      '&:hover': {
        outline: '2px solid rgb(255, 255, 255)',
      },
      'input, select, textarea': {
        color: 'white',
      },
    },
  };
  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.content}>
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
    </Box>
  );
};
