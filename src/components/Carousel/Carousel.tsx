import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Card } from '../ListItem/components/Card';
import { useCarouselStyles } from './Carousel.styles';
import { SingleListItem } from '../../domain/Items';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const items_endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets`;

export const Carousel = () => {
  const classes = useCarouselStyles();

  const { data, error } = useSWR(items_endpoint, fetcher);

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography variant="h2" component="h4" className={classes.title}>
          More to explore
        </Typography>
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
        {data.items &&
          data.items.map((card: SingleListItem, index: string) => (
            <Box key={index} className={classes.cardWrapper}>
              <Card item={card} />
            </Box>
          ))}
      </Box>
    </Grid>
  );
};

export default Carousel;
