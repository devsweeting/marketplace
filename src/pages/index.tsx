import { Box, Grid } from '@mui/material';
import { OpenGraph } from '@/components/OpenGraph';
import { Hero } from '@/components/Homepage/Hero';
import { Featured } from '@/components/Homepage/Featured';
import { HowItWorks } from '@/components/Homepage/HowItWorks';

const Homepage = () => {
  return (
    <>
      <OpenGraph title={'Home page'} description={'Home page description'} />

      <Box
        sx={{
          maxWidth: 1440,
          margin: '0 auto',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ marginTop: { xs: 10, md: 15 } }}
        >
          <Grid item xs={12}>
            <Hero />
          </Grid>
          <Grid container item xs={12}>
            <Grid item md={6} xs={12}>
              <Featured />
            </Grid>
            <Grid item md={6} xs={12}>
              <Featured />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <HowItWorks />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
