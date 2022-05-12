import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '../../components/Button';
import { useProductStyles } from './ProductCard.styles';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import { SkinContext } from '../../../styles/skin-context';
import classNames from 'classnames';

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
          <Typography component="p" variant="body1" className={classes.shareButton}>
            share <ShareIcon sx={{ fontSize: '16px', transform: 'translateY(3px)' }} />
          </Typography>
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
