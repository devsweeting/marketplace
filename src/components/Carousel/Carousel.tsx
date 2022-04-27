import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Card, SingleListItem } from '../ListItem/components/Card';
import { Button } from '../Button';

export const Carousel: React.FC<{ data: SingleListItem[] }> = ({ data }) => {
  return (
    <Grid item xs={12} pt={12.5} pb={14}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h2" component="h4" sx={{ fontWeight: 700, fontSize: '42px' }}>
          More from collection
        </Typography>
        <Button variant="outlined" size="large" sx={{ width: 232, height: 55, fontSize: '16px' }}>
          whole collection
        </Button>
      </Box>

      <Box
        pb={3}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'no-wrap',
          overflowX: 'scroll',
        }}
      >
        {data &&
          data.map((card, index) => (
            <Box sx={{ minWidth: 280, marginRight: '46px' }} key={index}>
              <Card item={card} />
            </Box>
          ))}
      </Box>
    </Grid>
  );
};

export default Carousel;
