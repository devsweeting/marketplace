import React, { useState, useEffect, useContext } from 'react';
import Sticky from 'react-stickynode';
import { Grid, Box, Typography } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { useDetailPageStyles } from '../../../styles/DetailPage.styles';
// import { Accordion } from '../../components/Accordion';
// import image from '../../../public/images/detail_page.png';
import { mockProductData, mockProducImages, mockChartData } from '../../__mocks__/mockApiData';
// import { AccordionTableItem } from '../../components/Accordion/components/AccordionTableItem';
// import { AccordionTextItem } from '../../components/Accordion/components/AccordionTextItem';
import { SimpleTable } from '../../components/SimpleTable';
import { Properties } from '../../components/Properties';
import { DescriptionText } from '../../components/DescriptionText';
import { PriceChart } from '../../components/PriceChart';
import { Gallery } from '../../components/Gallery';
import { useTheme } from '@mui/styles';
import { SkinContext } from '../../../styles/skin-context';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import { Button } from '../../components/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card } from '../../components/ListItem/components/Card';
import { mockCards } from '../../__mocks__/mockCategoryViewApiData';
import { Carousel } from '../../components/Carousel';
import Image from 'next/image';
import { ScrollUpWidget } from '../../components/ScrollUPWidget';

// import { useRouter } from 'next/router';

// link to example NFT detail page:
// http://localhost:3000/token-detail/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/920d16d7-208f-4955-98c2-f41bee527f08

type Trait = Record<string, string>;

const DetailPage = ({ nftData }: { nftData: any }) => {
  // const router = useRouter();
  // const { param } = router.query;

  const theme = useTheme();
  const { skin } = useContext(SkinContext);

  const classes = useDetailPageStyles();

  const [traits, setTraits] = useState<Trait | null>(null);

  useEffect(() => {
    const apiTraits: Record<string, string> = {};
    nftData?.traits?.map((item: Record<string, string>) => {
      apiTraits[item.trait_type] = item.value;
    });
    setTraits(apiTraits);
  }, [nftData]);

  return (
    <>
      {nftData && (
        <Box
          sx={{
            maxWidth: 1440,
            margin: '0 auto',
            backgroundColor: theme.palette.accentSecondary.main,
          }}
        >
          <Grid
            mt={15}
            container
            // columnSpacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
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
                  xs: theme.palette.accentSecondary.main,
                  md: theme.palette.secondary.main,
                },
              }}
            >
              <Box className={classes.paddingOnMobile}>
                <Grid item xs={12}>
                  <Gallery images={mockProducImages} />
                </Grid>
                <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                  <ProductCard cardData={mockProductData} />
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
                <Properties />
                {mockChartData && (
                  <Grid item xs={12}>
                    <PriceChart data={mockChartData} />
                  </Grid>
                )}

                <Box sx={{ position: 'relative' }}>
                  <Box className={classes.fixedImage} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Image
                      src="/images/nftDetail/gallery/product1a.svg"
                      alt="asset"
                      width={117}
                      height={195}
                    />
                  </Box>
                  <EnhancedTable />
                </Box>
                <SimpleTable />
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
                <Sticky enabled={true} top={192} bottomBoundary={2500}>
                  <ProductCard cardData={mockProductData} />
                </Sticky>
              </Grid>
            </Grid>

            <Grid
              container
              item
              // px={12.5}
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
      )}
    </>
  );
};

export default DetailPage;

export async function getServerSideProps(context: any) {
  // contract_address = '0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185';
  // token_id = 920d16d7-208f-4955-98c2-f41bee527f08
  const { param } = context.query;

  const contract_address = param[0];
  const token_id = param[1];

  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/meta/${contract_address}/${token_id}.json`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/token/${contract_address}/${token_id}`,
  );
  const data = await response.json();

  if (!data.traits) {
    return {
      notFound: true,
    };
  }

  return {
    props: { nftData: data },
  };
}
