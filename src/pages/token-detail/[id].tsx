import React from 'react';
// import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { Button } from '../../components/Button';
import { Hero } from '../../components/Hero';
import image from '../../../public/images/detail_page.png';

const DetailPage = () => {
  // const router = useRouter();
  // const { id } = router.query;
  console.log(image);

  return (
    <>
      <Grid container mt={18.5}>
        <Hero imgSrc={image} imgFit={'cover'} imgHeight={163} imgAlt="alt text" />
      </Grid>
      <Grid container spacing={5}>
        <Grid item sm={6} md={6}>
          <Typography variant="h2">carousel/slider</Typography>
          <Typography variant="h2">accordion</Typography>
        </Grid>
        <Grid item sm={6} md={6}>
          <Typography variant="h2">product cart</Typography>
          <Button variant="contained">Buy now</Button>
          <Typography variant="h2">chart</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailPage;
