import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import { SkinContext } from '@/styles/skin-context';
import { useProductStyles } from './ProductCard.styles';
import ShareButton from '@/components/ShareButton';

export interface ProductDataProps {
  name: string;
}

export const ProductCard: React.FC<{ name: ProductDataProps }> = ({ name }) => {
  const classes = useProductStyles();
  const { skin } = useContext(SkinContext);
  return (
    <Card className={classes.productContainer}>
      <CardContent sx={{ padding: '0' }}>
        <Box className={classes.shareWrapper}>
          <Typography component="p" variant="body1" className={classes.shareText}>
            Overstreet comic book collection
          </Typography>
          <ShareButton />
        </Box>
        <Typography className={classes.productTitle} variant="h2" component="h2">
          {name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
          <Grid item md={12} xs={12}>
            <Box className={classes.label}>
              <Typography variant="body2" component="p" className={classes.labelText}>
                Current Price
              </Typography>
            </Box>
            <Box
              className={classes.priceWrapper}
              sx={{ backgroundImage: `url(${skin.listItem.backgroundImage})` }}
            >
              <Box className={classes.priceContainer}>
                <Box sx={{ paddingBottom: '16px', textAlign: 'right' }}></Box>

                <Divider />
                <CardActions className={classes.cardActions}>
                  <Box className={classNames(classes.flexWrapper, classes.centerOnMobile)}>
                    <Button variant="contained" size="small" className={classes.button}>
                      SUBSCRIBE
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
