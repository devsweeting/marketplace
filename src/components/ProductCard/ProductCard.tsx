import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@/components/Button';
import { useProductStyles } from './ProductCard.styles';
import { ShareButton } from '@/components/ShareButton';
import type { IUser } from 'src/types/user';
import { useModal } from '@/helpers/hooks/useModal';
import { useWishList } from '@/helpers/WishListContext/WishListContext';

export interface ProductDataProps {
  name: string;
  id: string;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> be68219 (making requests to /watchlist)
export const ProductCard: React.FC<{
  name: ProductDataProps;
  id: ProductDataProps;
  user: IUser;
}> = ({ name, id, user }) => {
<<<<<<< HEAD
=======
export const ProductCard: React.FC<{ name: ProductDataProps; user: IUser }> = ({ name, user }) => {
<<<<<<< HEAD
  const { wishList, setWishList } = useWishList();
>>>>>>> f6dc59b (added Item to local storage if not logged in on add to wishlist)
=======
=======
>>>>>>> be68219 (making requests to /watchlist)
  const { setWishListState } = useWishList();
>>>>>>> 06cff9e (fixed typescript errors)
  const { isOpen, setIsOpen } = useModal();
  const handleClick = () => {
    if (!user) {
      setWishListState({ type: 'ADD_TO_WISHLIST', payload: id.toString() });
      setIsOpen(!isOpen);
    }

    setWishListState({ type: 'ADD_TO_WISHLIST', payload: id.toString() });
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
