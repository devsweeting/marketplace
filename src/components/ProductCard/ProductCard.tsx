import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '../../components/Button';
import { useProductStyles } from './ProductCard.styles';
import Image from 'next/image';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { SkinContext } from '../../../styles/skin-context';
import classNames from 'classnames';

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
    brand: { name },
  } = cardData;
  const classes = useProductStyles();
  const { skin } = useContext(SkinContext);
  return (
    <Card className={classes.productContainer}>
      <CardContent sx={{ padding: '0' }}>
        <Box className={classes.shareWrapper}>
          <Typography component="p" variant="body1" className={classes.shareText}>
            Overstreet comic book collection
          </Typography>
          <Typography component="p" variant="body1" className={classes.shareButton}>
            share <ShareIcon sx={{ fontSize: '16px', transform: 'translateY(3px)' }} />
          </Typography>
        </Box>
        <Typography className={classes.porductTitle} variant="h2" component="h2">
          {title}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
          <Grid item md={12} xs={12}>
            <Box className={classes.flexWrapper}>
              <Box className={classes.label}>
                <Typography variant="body2" component="p" className={classes.labelText}>
                  Current Price
                </Typography>
              </Box>
              {name && (
                <Typography variant="body2" component="p" className={classes.brandName}>
                  OWNED BY <a style={{ textDecoration: 'underline' }}>{name}</a>
                </Typography>
              )}
            </Box>
            <Box
              className={classes.priceWrapper}
              sx={{ backgroundImage: `url(${skin.listItem.backgroundImage})` }}
            >
              <Box className={classes.priceContainer}>
                <Box className={classes.flexWrapper}>
                  <Box className={classes.cryptoValueWrapper}>
                    <Image
                      src={`/images/nftDetail/cryptoCurencies/${icon}.png`}
                      alt={`${icon} icon`}
                      width={32}
                      height={32}
                    />
                    <Typography variant="h2" component="p" className={classes.priceCryptoValue}>
                      {cryptoValue}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.priceDollarValue}
                    data-testid="dollarValueId"
                  >
                    (${dolarValue})
                  </Typography>
                </Box>

                <Divider sx={{ padding: '16px 0' }} />
                <CardActions
                //  className={classes.cardActions}
                >
                  <Box className={classNames(classes.flexWrapper, classes.centerOnMobile)}>
                    <Button variant="contained" size="small" className={classes.button}>
                      BUY NOW
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button}>
                      MAKE OFFER
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Box>
          </Grid>

          <Grid item md={12} xs={12}>
            <Box className={classes.watchListWrapper}>
              <FavoriteIcon color="secondary" />
              <Typography className={classes.productWatchList} variant="body2" component="span">
                ADD TO WATCHLIST
              </Typography>

              <Typography
                data-testid="watchNumberId"
                className={classes.watchNumber}
                variant="body1"
                component="p"
              >
                ({watchNumber} watching)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
