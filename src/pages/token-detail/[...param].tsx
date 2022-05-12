import React, { useState, useEffect } from 'react';
import Sticky from 'react-stickynode';
import { Grid, Box } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { useDetailPageStyles } from '../../../styles/DetailPage.styles';
import { Properties } from '../../components/Properties';
import { DescriptionText } from '../../components/DescriptionText';
import { Gallery } from '../../components/Gallery';
import { useTheme } from '@mui/styles';
import { Button } from '../../components/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mockCards } from '../../__mocks__/mockCategoryViewApiData';
import { Carousel } from '../../components/Carousel';
import Image from 'next/image';
import { ScrollUpWidget } from '../../components/ScrollUPWidget';
import Typography from '@mui/material/Typography';
import { TraitType } from '../../components/Properties/components/PropertyBox';

const DetailPage = ({ nftData }: { nftData: any }) => {
  // const { name, description, media } = nftData;

  const theme = useTheme();
  const classes = useDetailPageStyles();
  const [traits, setTraits] = useState<TraitType[] | null>(null);

  useEffect(() => {
    setTraits(nftData.attributes);
  }, [nftData]);

  return (
    <>
      {nftData ? (
        <Box
          sx={{
            maxWidth: 1440,
            margin: '0 auto',
            backgroundColor: theme.palette.custom.accent,
          }}
        >
          <Grid mt={15} container direction="row" justifyContent="center" alignItems="flex-start">
            <Grid
              container
              item
              mt={0}
              md={6}
              xs={12}
              rowSpacing={2}
              className={classes.leftColumn}
              sx={{
                backgroundColor: {
                  xs: theme.palette.custom.accent,
                  md: theme.palette.secondary.main,
                },
              }}
            >
              <Box className={classes.paddingOnMobile}>
                <Grid item xs={12}>
                  {nftData && <Gallery images={nftData.media} />}
                </Grid>
                <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                  <ProductCard name={nftData.name} />
                </Grid>
              </Box>

              <Grid
                item
                xs={12}
                className={classes.paddingOnMobile}
                sx={{
                  background: { xs: theme.palette.secondary.main, md: 'none' },
                  paddingTop: '0 !important',
                }}
              >
                <DescriptionText text={nftData.description} />
                <Box sx={{ position: 'relative' }}>
                  <Box className={classes.fixedImage} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Image
                      src={nftData.media[0].url}
                      alt={nftData.media[0].title}
                      layout="fill"
                      objectFit="contain"
                      style={{ borderRadius: '8px' }}
                    />
                  </Box>
                  {traits && <Properties attributes={traits} />}
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={6}
              xs={12}
              rowSpacing={2}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Grid item xs={12}>
                <Sticky enabled={true} top={192} bottomBoundary={1400}>
                  {nftData && <ProductCard name={nftData.name} />}
                </Sticky>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                width: '100%',
                padding: { xs: '0 40px', md: '0 100px' },
              }}
            >
              <Carousel data={mockCards} />
              <Grid item xs={12}>
                <Button
                  endIcon={<ArrowForwardIcon className={classes.exploreMoreIcon} />}
                  variant="contained"
                  size="large"
                  className={classes.exploreMoreButton}
                >
                  EXPLORE MORE
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <ScrollUpWidget item={mockCards[0]} />
        </Box>
      ) : (
        <Typography variant="h5" component="p" sx={{ paddingTop: '150px' }}>
          Error, please refresh the page
        </Typography>
      )}
    </>
  );
};

export default DetailPage;

export async function getServerSideProps(context: any) {
  try {
    const { param } = context.query;
    const asset_id = param[0];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${asset_id}`,
      // 'https://api.staging.jump.co/v1/assets/82191303-fa4d-4168-9cc8-96d82a291975',
    );
    const data = await response.json();

    if (!data.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: { nftData: data },
    };
  } catch {
    return { props: {} };
  }
}
