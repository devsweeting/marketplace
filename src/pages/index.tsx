import { Box, Grid } from '@mui/material';
import { OpenGraph } from '@/components/OpenGraph';
import { Hero } from '@/components/Homepage/Hero';
import { HowItWorks } from '@/components/Homepage/HowItWorks';
import { Testimonials } from '@/components/Homepage/Testimonials';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';
import type { IAsset } from '../types';
import { latestDropAssets } from '@/api/endpoints/assets';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';

const Homepage = () => {
  const router = useRouter();
  const { isReady } = router;
  const [dropAssets, setDropAssets] = useState<IAsset[]>([]);

  const loadLatestDropAssets = useCallback(async (page = 1) => {
    const { items }: { items: IAsset[] } = await latestDropAssets({
      page,
    });
    setDropAssets((prev) => (page === 1 ? items : [...prev, ...items]));
  }, []);
  useEffect(() => {
    if (isReady) {
      loadLatestDropAssets().catch(() => {
        setDropAssets([]);
      });
    }
  }, [isReady, loadLatestDropAssets]);
  const handleDrawer = () => {
    return null;
  };

  return (
    <>
      <ClientOnly>
        <OpenGraph title={'Home page'} description={'Home page description'} />

        <Box
          sx={{
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
            <Grid item xs={12}>
              <FeaturedMarketCarousel
                assets={dropAssets}
                title={'New Drops'}
                handleDrawer={handleDrawer}
              />
            </Grid>

            <Grid item xs={12}>
              <HowItWorks />
            </Grid>
            <Grid item xs={12}>
              <Testimonials />
            </Grid>
          </Grid>
        </Box>
      </ClientOnly>
    </>
  );
};

export default Homepage;
