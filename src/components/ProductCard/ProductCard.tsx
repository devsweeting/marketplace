import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@/components/Button';
import { useProductStyles } from './ProductCard.styles';
import { ShareButton } from '@/components/ShareButton';
import type { IUser } from 'src/types/user';

export interface ProductDataProps {
  name: string;
}
export const ProductCard: React.FC<{ name: ProductDataProps; user: IUser }> = ({ name, user }) => {
  const [shouldLoginDisplay, setShouldLoginDisplay] = useState(false);
  const handleClick = () => {
    if (user) {
      setShouldLoginDisplay(false);
    }
    if (!user) {
      setShouldLoginDisplay(true);
    }
  };
  const classes = useProductStyles();
  return (
    <Card className={classes.productContainer}>
      <CardContent sx={{ padding: '0' }}>
        <Box className={classes.shareWrapper}>
          <ShareButton />
        </Box>
        <Typography className={classes.productTitle} variant="h2" component="h2">
          {name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
          <Grid item md={12} xs={12}>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={handleClick}
              >
                Add to Watchlist
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
