import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '../../components/Button';
import { useProductStyles } from './ProductCard.styles';
import Image from 'next/image';

export interface ProductDataProps {
  title: string;
  watchNumber: number;
  price: {
    icon: string;
    cryptoValue: string;
    dolarValue: string;
  };
  brand: {
    logo?: string;
    verified: boolean;
    name: string;
  };
}

export const ProductCard: React.FC<{ cardData: ProductDataProps }> = ({ cardData }) => {
  const {
    title,
    watchNumber,
    price: { icon, cryptoValue, dolarValue },
    brand: { logo, verified, name },
  } = cardData;
  const classes = useProductStyles();
  return (
    <Card className={classes.productContainer}>
      <CardContent sx={{ padding: '16px 0' }}>
        <Typography className={classes.porductTitle} component="h2">
          {title}
        </Typography>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          <Image
            src={`/images/nftDetail/icons/StarBorderRounded.png`}
            alt={'star'}
            width={24}
            height={24}
          />
          <Typography className={classes.productWatchList} component="p" mb={0.5}>
            Add to watchlist{' '}
            <span data-testid="watchNumberId" className={classes.watchNumber}>
              ({watchNumber} watching)
            </span>
          </Typography>
        </Box>
        <Grid
          container
          // md={12}
          // xs={12}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Grid item md={6} xs={6}>
            <Box mt={5.5}>
              <Typography className={classes.price}>Current Price</Typography>
              <Typography variant="body2" className={classes.priceCryptoValue} my={1}>
                <Image
                  src={`/images/nftDetail/cryptoCurencies/${icon}.png`}
                  alt={`${icon} icon`}
                  width={32}
                  height={32}
                />{' '}
                {cryptoValue}{' '}
                <span data-testid="dollarValueId" className={classes.priceDollarValue}>
                  (${dolarValue})
                </span>
              </Typography>
              <CardActions className={classes.cardActions}>
                <Box my={2}>
                  <Button variant="contained">Buy now</Button>
                </Box>
              </CardActions>
            </Box>
          </Grid>
          <Grid item md={6} xs={6} className={classes.brandContainer}>
            {logo && (
              <Image
                src={`/images/nftDetail/brands/${logo}.png`}
                alt={`brand ${logo}`}
                width={120}
                height={120}
              />
            )}
            <Box className={classes.brandVerification}>
              {verified && (
                <Image
                  src="/images/nftDetail/icons/verified.png"
                  alt="verified icon"
                  width={34}
                  height={34}
                />
              )}
              <Typography className={classes.brandName}>{name}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
