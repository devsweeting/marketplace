import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SearchBox } from '@/components/SearchBox';

const TOTAL_IN_GRID = 24;
export const Hero = () => {
  const theme = useTheme();

  const classes = {
    wrapper: {
      overflow: 'hidden',
      width: '100%',
      height: '450px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      [theme.breakpoints.down('sm')]: {
        minHeight: '50vh',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid red',
      marginTop: '100px',
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
      m: '60px 0 0 10px',
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
      <Box>
        <BackgroundBanner />
      </Box>
    </Box>
  );
};

const BackgroundBanner = () => {
  const classes = {
    imageContainer: {
      position: 'relative',
      bottom: '600px',
      right: '50px',
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      transform: 'rotate(-10deg)',
    },
    background: {
      boxShadow: 'inset 0 0 0 2000px rgb(17, 24, 39, 0.7)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '200px 320px', //size of image
      width: '200px', //size of container
      height: '320px',
      zIndex: '1',
    },
  };
  const rows = [];
  for (let i = 0; i < TOTAL_IN_GRID; i++) {
    rows.push(
      <Box
        sx={{
          ...classes.background,
          backgroundImage: `url(/tradingCards/hero_cards/card_${i + 1}.png)`,
        }}
      ></Box>,
    );
  }
  return <Box sx={classes.imageContainer}>{rows}</Box>;
};
