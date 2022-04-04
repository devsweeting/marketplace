import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { Hero } from '../../components/Hero';
import { Accordion } from '../../components/Accordion';
import image from '../../../public/images/detail_page.png';
import { mockProductData, mockProducImages, mockChartData } from '../../__mocks__/mockApiData';
import { AccordionTableItem } from '../../components/Accordion/components/AccordionTableItem';
import { AccordionTextItem } from '../../components/Accordion/components/AccordionTextItem';
import { PriceChart } from '../../components/PriceChart';
import { Gallery } from '../../components/Gallery';

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // id = token_id = 920d16d7-208f-4955-98c2-f41bee527f08
  // http://localhost:3001/token/meta/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/920d16d7-208f-4955-98c2-f41bee527f08.json

  const [nftData, setData] = useState<any>(null);
  const [traits, setTraits] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/token/meta/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/${id}.json`)
      .then((res) => res.json())
      .then((data) => setData(data));
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (nftData == null) {
      console.log('there is no data yet');
    } else {
      const apiTraits: Record<string, string> = {};
      nftData?.traits?.map((item: Record<string, string>) => {
        apiTraits[item.trait_type] = item.value;
      });

      setTraits(apiTraits);
      console.log('traaaits-->', apiTraits);
    }
  }, [nftData]);

  return (
    <>
      <Grid container mt={18.5}>
        <Hero imgSrc={image} imgFit={'cover'} imgHeight={163} imgAlt="alt text" />
      </Grid>

      {isLoading && <p>Loading...</p>}

      {nftData && (
        <Box sx={{ maxWidth: 1440, margin: '0 auto', marginTop: '0' }}>
          <Grid
            mt={-13}
            container
            columnSpacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid container item md={6} xs={12} rowSpacing={2}>
              <Grid item md={12}>
                <Gallery images={mockProducImages} />
              </Grid>
              <Grid item md={12}>
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
              <Grid item md={12}>
                <ProductCard cardData={mockProductData} />
              </Grid>
              {mockChartData && (
                <Grid item md={12}>
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
