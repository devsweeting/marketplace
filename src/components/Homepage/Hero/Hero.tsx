import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHeroStyles } from './Hero.styles';
import { SearchBox } from '@/components/SearchBox';

export const Hero = () => {
  const classes = useHeroStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h2" component="h2" className={classes.title}>
        Physical trading cards
      </Typography>
      <Typography variant="h2" component="h2" className={classes.title}>
        NFT marketplace
      </Typography>
      <Box className={classes.searchBox}>
        <SearchBox placeholder="Rookie..." />
      </Box>
    </Box>
  );
};
