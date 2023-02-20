import { Box, Grid } from '@mui/material';
import { OpenGraph } from '@/components/OpenGraph';
import { Hero } from '@/components/Homepage/Hero';
import { HowItWorks } from '@/components/Homepage/HowItWorks';
import { Testimonials } from '@/components/Homepage/Testimonials';
import { SignUpCallToAction } from '@/components/Homepage/SignUpCallToAction';
import { SubscribeCallToAction } from '@/components/Homepage/SubscribeCallToAction';
import { FAQ } from '@/components/Homepage/FAQ';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { useRouter } from 'next/router';

import { useCallback } from 'react';
import type { IAsset } from '../types';
import { latestDropAssets } from '@/api/endpoints/assets';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';

const Homepage = () => {
  const router = useRouter();
  const { isReady } = router;

  const loadLatestDropAssets = useCallback(
    async (page = 1, signal?: AbortSignal | undefined) => {
      if (isReady) {
        const { items }: { items: IAsset[] } = await latestDropAssets({
          page,
          signal,
        });
        return items;
      }
    },
    [isReady],
  );

  const [dropAssets = [], dropAssetsLoadingState] = useEndpoint(
    (signal) => loadLatestDropAssets(1, signal),
    [loadLatestDropAssets],
  );

  const handleDrawer = () => {
    return null;
  };

  return (
    <>
      <ClientOnly>
        <OpenGraph
          title={'Jump Marketplace'}
          description={'Exclusive Marketplace for Collectibles'}
        />

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
            sx={{ marginTop: { xs: 10, md: 15 } }} //TODO - Creating the weird gap at the top of the Hero
          >
            <Grid item xs={12}>
              <Hero />
            </Grid>
            <Grid item xs={12}>
              {dropAssetsLoadingState === 'success' && (
                <FeaturedMarketCarousel
                  assets={dropAssets}
                  title={'New Drops'}
                  handleDrawer={handleDrawer}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <HowItWorks />
            </Grid>
            <Grid item xs={12}>
              <Testimonials />
            </Grid>
            <Grid item xs={12}>
              <SignUpCallToAction />
            </Grid>
            <Grid item xs={12}>
              <FAQ />
            </Grid>
            <Grid item xs={12}>
              <SubscribeCallToAction />
            </Grid>
          </Grid>
        </Box>
      </ClientOnly>
    </>
  );
};

export default Homepage;
