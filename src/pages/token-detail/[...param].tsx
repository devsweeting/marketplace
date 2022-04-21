import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { Hero } from '../../components/Hero';
import { Accordion } from '../../components/Accordion';
// import image from '../../../public/images/detail_page.png';
import { mockProductData, mockProducImages, mockChartData } from '../../__mocks__/mockApiData';
import { AccordionTableItem } from '../../components/Accordion/components/AccordionTableItem';
import { AccordionTextItem } from '../../components/Accordion/components/AccordionTextItem';
import { PriceChart } from '../../components/PriceChart';
import { Gallery } from '../../components/Gallery';
import { useRouter } from 'next/router';

// link to example NFT detail page:
// http://localhost:3000/token-detail/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/920d16d7-208f-4955-98c2-f41bee527f08

type Trait = Record<string, string>;

const DetailPage = ({ nftData }: { nftData: any }) => {
  const router = useRouter();
  const { param } = router.query;
  console.log(param);

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
      <Grid container mt={18.5}>
        <Hero
          imgSrc={'/images/detail_page.png'}
          imgFit={'cover'}
          imgHeight={163}
          imgAlt="alt text"
        />
      </Grid>

      {nftData && (
        <Box sx={{ maxWidth: 1440, margin: '0 auto', marginTop: '0', padding: '0 8px' }}>
          <Grid
            mt={-13}
            container
            columnSpacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid container item md={6} xs={12} rowSpacing={2}>
              <Grid item xs={12}>
                <Gallery images={mockProducImages} />
              </Grid>
              <Grid item xs={12}>
                <Accordion>
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
                </Accordion>
              </Grid>
            </Grid>

            <Grid container item md={6} xs={12} rowSpacing={2}>
              <Grid item xs={12}>
                <ProductCard cardData={mockProductData} />
              </Grid>
              {mockChartData && (
                <Grid item xs={12}>
                  <PriceChart data={mockChartData} />
                </Grid>
              )}
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
