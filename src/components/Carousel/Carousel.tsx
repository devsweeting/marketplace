import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Card, SingleListItem } from '../ListItem/components/Card';
import { Button } from '../Button';
import { useCarouselStyles } from './Carousel.styles';

export const Carousel: React.FC<{ data: SingleListItem[] }> = ({ data }) => {
  const classes = useCarouselStyles();
  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography variant="h2" component="h4" className={classes.title}>
          More from collection
        </Typography>
        <Button variant="outlined" size="large" className={classes.button}>
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
            <Box key={index} className={classes.cardWrapper}>
              <Card item={card} />
            </Box>
          ))}
      </Box>
    </Grid>
  );
};

export default Carousel;
