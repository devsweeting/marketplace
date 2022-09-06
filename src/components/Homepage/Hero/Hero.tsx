import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHeroStyles } from './Hero.styles';
import { SearchBox } from '@/components/SearchBox';

export const Hero = () => {
  const classes = useHeroStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h2" component="h2">
        Physical trading cards
      </Typography>
      <Typography variant="h2" component="h2">
        NFT marketplace
      </Typography>
      <Box sx={{ border: '1px solid black', width: '50%', m: 10 }}>
        <SearchBox placeholder="Rookie..." />
      </Box>
    </Box>
  );
};
