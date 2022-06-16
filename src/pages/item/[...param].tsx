import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { ProductCard } from '@/components/ProductCard';
import { Properties } from '@/components/Properties';
import { DescriptionText } from '@/components/DescriptionText';
import { Gallery } from '@/components/Gallery';
import { Button } from '@/components/Button';
import { Carousel } from '@/components/Carousel';
import type { TraitType } from '@/components/Properties/components/PropertyBox';
import { useDetailPageStyles } from '@/styles/DetailPage.styles';
import { OpenGraph } from '@/components/OpenGraph';
import { Routes } from '@/domain/Routes';
import { getServerSidePropsWithUser } from '@/helpers/auth/withUser';
import type { IUser } from '../../types/user';

const DetailPage = ({ nftData, user }: { nftData: any; user: IUser }) => {
  const theme = useTheme();
  const classes = useDetailPageStyles();
  const [traits, setTraits] = useState<TraitType[] | null>(null);

  useEffect(() => {
    setTraits(nftData?.attributes);
  }, [nftData]);
  return (
    <>
      <OpenGraph
        title={nftData.name}
        description={nftData.description}
        image={
          nftData.media
            ? nftData.media[0].file
            : 'https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg'
        }
        image_alt={nftData.media ? nftData.media[0].description : 'No image available'}
      />
      {nftData ? (
        <Box
          sx={{
            maxWidth: 1440,
            margin: '0 auto',
            backgroundColor: theme.palette.custom.accent,
          }}
        >
          <Grid
            sx={{ marginTop: { xs: 10, md: 15 } }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
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
                  {nftData.media ? (
                    <Gallery images={nftData.media} />
                  ) : (
                    <Gallery
                      images={[
                        {
                          title: 'No image',
                          file: '/images/No_image_available_500_x_500.svg',
                          description: 'No image available',
                          url: '/images/No_image_available_500_x_500.svg',
                          sortOrder: 0,
                          assetId: '',
                          fileId: '',
                        },
                      ]}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                  <ProductCard name={nftData.name} user={user} />
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
                    {nftData.media ? (
                      <Image
                        src={nftData.media[0].file}
                        alt={nftData.media[0].description}
                        layout="fill"
                        objectFit="contain"
                        style={{ borderRadius: '8px' }}
                      />
                    ) : (
                      <Image
                        src="/images/No_image_available_500_x_500.svg"
                        layout="fill"
                        alt="No image available"
                        objectFit="contain"
                        style={{
                          borderRadius: '8px',
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    )}
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
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            >
              {nftData && <ProductCard name={nftData.name} user={user} />}
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
              <Carousel />
              <Grid item xs={12}>
                <Link href={Routes[0].path}>
                  <a className={classes.exploreMoreLink}>
                    <Button
                      endIcon={<ArrowForwardIcon className={classes.exploreMoreIcon} />}
                      variant="contained"
                      size="large"
                      className={classes.exploreMoreButton}
                    >
                      EXPLORE MORE
                    </Button>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
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

export const getServerSideProps = getServerSidePropsWithUser(async ({ query }) => {
  const { param } = query;
  if (!param) {
    return { props: { nftData: null } };
  }
  const asset_slug = param[0];

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${asset_slug}`);
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { nftData: data },
  };
});
