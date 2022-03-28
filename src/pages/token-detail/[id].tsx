import React from 'react';
// import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { Button } from '../../components/Button';
import { Hero } from '../../components/Hero';
import { Accordion } from '../../components/Accordion';
import image from '../../../public/images/detail_page.png';
import { blockchaninDataInfo } from '../../__mocks__/mockBlockChainInfo';
import { AccordionTableItem } from '../../components/Accordion/components/AccordionTableItem';
import { AccordionTextItem } from '../../components/Accordion/components/AccordionTextItem';

const DetailPage = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <Grid container mt={18.5}>
        <Hero imgSrc={image} imgFit={'cover'} imgHeight={163} imgAlt="alt text" />
      </Grid>

      <Grid container px={2}>
        <Grid container item md={6} xs={12}>
          <Grid item>
            <Typography variant="h2">carousel/slider</Typography>
          </Grid>
          <Grid item>
            <Accordion>
              <>
                <AccordionTextItem title={'Description'} isExpanded={true}>
                  The Overstreet Comic Book Price Guide: 2020-2021 Special 50th Anniversary Edition
                  by Robert M. Overstreet is the Bible of serious comic book collectors, dealers and
                  historians, and marks its Golden Anniversary with this edition, #50, and is
                  complete with new prices, new feature articles, new additions to the Overstreet
                  Hall of Fame, new market reports and more. Find out why the Guide has been trusted
                  for five decades! Spawn/Spider-Man crossover cover by acclaimed artist Todd
                  McFarlane, recently recognized by the Guinness Book of World Records!
                </AccordionTextItem>
                <AccordionTableItem
                  title={'Blockchain Info'}
                  tableData={blockchaninDataInfo}
                  isExpanded={false}
                />
              </>
            </Accordion>
          </Grid>
        </Grid>

        <Grid container item md={6} xs={12}>
          <Grid item>
            <Typography variant="h2">product cart</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Buy now</Button>
          </Grid>
          <Grid item>
            <Typography variant="h2">chart</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailPage;
