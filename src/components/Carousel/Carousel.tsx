import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Card } from '../ListItem/components/Card';
import { useCarouselStyles } from './Carousel.styles';
import useSWR from 'swr';
import { Loader } from '../Loader';
import type { IAsset } from 'src/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const items_endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets`;

export const Carousel = () => {
  const classes = useCarouselStyles();

  const { data, error } = useSWR(items_endpoint, fetcher);

  if (error)
    return (
      <Box sx={{ padding: '20px 0' }}>
        <Typography variant="h2" component="h2">
          Something went wrong...
        </Typography>
        <Typography variant="body1" component="p">
          {error.message}
        </Typography>
      </Box>
    );
  if (!data) return <Loader />;
  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography variant="h2" component="h4" className={classes.title}>
          More to explore
        </Typography>
      </Box>

      <Box className={classes.cardWrapper}>
        {data.items &&
          data.items.map((card: IAsset, index: string) => (
            <Box key={index} className={classes.cardContainer}>
              <Card item={card} />
            </Box>
          ))}
      </Box>
    </Grid>
  );
};
