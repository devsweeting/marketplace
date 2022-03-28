import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '../../components/Button';
import { useProductStyles } from './ProductCard.styles';
import Image from 'next/image';

type Price = {
  icon: string;
  cryptoValue: string;
  dolarValue: string;
};

type Brand = {
  logo: string;
  verified: boolean;
  name: string;
};

export interface ProductDataProps {
  title: string;
  watchNumber: number;
  price: Price;
  brand: Brand;
}

export const ProductCard: React.FC<ProductDataProps> = ({ cardData }) => {
  const { title, watchNumber } = cardData;
  const classes = useProductStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.porductTitle} component="h2">
          {/* Overstreet Comic Book 50th Anniversary 10 GEM MINT */}
          {title}
        </Typography>
        <Typography className={classes.productWatchList} component="p" mt={1}>
          Add to watchlist <span className={classes.watchNumber}>({watchNumber} watching)</span>
        </Typography>
        <Grid
          container
          md={12}
          xs={12}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Grid item md={6} xs={6}>
            <Box mt={5.5}>
              <Typography className={classes.price}>Current Price</Typography>
              <Typography variant="body2" className={classes.priceCryptoValue} my={1}>
                <Image
                  src="/images/nftDetail/cryptoCurencies/etherum.png"
                  alt="crypto icon"
                  width={32}
                  height={32}
                />{' '}
                2.1 <span className={classes.priceDollarValue}>($6234.33)</span>
              </Typography>
              <CardActions className={classes.cardActions}>
                <Button variant="contained">Buy now</Button>
              </CardActions>
            </Box>
          </Grid>
          <Grid item md={6} xs={6} className={classes.brandContainer}>
            <Image
              src="/images/nftDetail/brands/brand_a.png"
              alt="crypto brand"
              width={120}
              height={120}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src="/images/nftDetail/icons/verified.png"
                alt="verified icon"
                width={34}
                height={34}
              />
              <Typography className={classes.brandName}>Comix</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
