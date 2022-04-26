import React, { useState, useEffect, useContext } from 'react';
import Sticky from 'react-stickynode';
import { Grid, Box, Typography } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { useDetailPageStyles } from '../../../styles/DetailPage.styles';
import { Accordion } from '../../components/Accordion';
// import image from '../../../public/images/detail_page.png';
import { mockProductData, mockProducImages, mockChartData } from '../../__mocks__/mockApiData';
import { AccordionTableItem } from '../../components/Accordion/components/AccordionTableItem';
import { AccordionTextItem } from '../../components/Accordion/components/AccordionTextItem';
import { SimpleTable } from '../../components/SimpleTable';
import { Properties } from '../../components/Properties';
import { DescriptionText } from '../../components/DescriptionText/DescriptionText';
import { PriceChart } from '../../components/PriceChart';
import { Gallery } from '../../components/Gallery';
import { useTheme } from '@mui/styles';
import { SkinContext } from '../../../styles/skin-context';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import { Button } from '../../components/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card } from '../../components/ListItem/components/Card';
import { mockCard } from '../../__mocks__/mockCategoryViewApiData';

// import { useRouter } from 'next/router';

// link to example NFT detail page:
// http://localhost:3000/token-detail/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/920d16d7-208f-4955-98c2-f41bee527f08

type Trait = Record<string, string>;

const DetailPage = ({ nftData }: { nftData: any }) => {
  // const router = useRouter();
  // const { param } = router.query;
  console.log('card', mockCard);

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
            // marginTop: '0',
            // padding: '0 8px',
            backgroundColor: theme.palette.accentSecondary.main,
          }}
        >
          <Grid
            mt={15}
            container
            columnSpacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid
              container
              item
              md={6}
              xs={12}
              rowSpacing={2}
              className={classes.leftColumn}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                // backgroundImage: `url(${skin.listItem.backgroundDecoration})`,
              }}
            >
              <Grid item xs={12}>
                <Gallery images={mockProducImages} />
              </Grid>
              <Grid item xs={12}>
                <DescriptionText text={nftData.description} />

                <Properties />
                {/* <Accordion>
                  <>
                    <AccordionTextItem title={'Description'} isExpanded={true}>
                      {nftData.description}
                    </AccordionTextItem>
                    {traits && (
                      <AccordionTableItem
                        title={'Blockchain Info'}
                        tableData={traits}
                        isExpanded={false}
                      />
                    )}
                  </>
                </Accordion> */}
                {mockChartData && (
                  <Grid item xs={12}>
                    <PriceChart data={mockChartData} />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <EnhancedTable />
              </Grid>
              <Grid item xs={12}>
                <SimpleTable />
              </Grid>
            </Grid>

            <Grid container item md={6} xs={12} rowSpacing={2}>
              <Grid item xs={12}>
                <Sticky enabled={true} top={192} bottomBoundary={2000}>
                  <ProductCard cardData={mockProductData} />
                </Sticky>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{ backgroundColor: theme.palette.secondary.main, width: '100%' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: 'no-wrap',
                  overflowX: 'scroll',
                }}
              >
                <Box sx={{ minWidth: 300 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 300 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 300 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Card item={mockCard} />
                </Box>
              </Box>
              <Button
                endIcon={
                  <ArrowForwardIcon
                    sx={{
                      fontSize: '96px !important',
                    }}
                  />
                }
                variant="contained"
                size="large"
                sx={{
                  width: '100%',
                  height: '184px',
                  borderRadius: '146px',
                  fontWeight: '800',
                  fontSize: '96px',
                }}
              >
                EXPLORE MORE
              </Button>
            </Grid>
          </Grid>
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/${contract_address}/${token_id}`,
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
