import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@/components/Button';
import { useProductStyles } from './ProductCard.styles';
import { ShareButton } from '@/components/ShareButton';
import { useModal } from '@/helpers/hooks/useModal';
import { addToWatchlist, removeFromWatchlist } from '@/api/endpoints/watchlist';
import { StatusCodes } from 'http-status-codes';
import { useUser } from '@/helpers/hooks/useUser';

export interface ProductDataProps {
  name: string;
  id: string;
}

export const ProductCard: React.FC<ProductDataProps> = ({ name, id }) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const user = useUser();
  let originalWatchlist;

  useEffect(() => {
    if (localStorage.getItem('watchList')) {
      const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
      if (originalWatchlist.some((watchItem: ProductDataProps) => watchItem.id === id)) {
        setHasBeenAdded(true);
        return;
      }
    }
  }, [id, originalWatchlist]);

  const handleClick = () => {
    if (!user) {
      if (localStorage.getItem('watchList')) {
        originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
        originalWatchlist.push({ id: id, name: name });
      } else {
        originalWatchlist = [{ id: id, name: name }];
      }
      localStorage.setItem('watchList', JSON.stringify(originalWatchlist));
      setIsModalOpen(!isModalOpen);
      setHasBeenAdded(true);
      return;
    }

    addToWatchlist({ id, name }).then((status) => {
      switch (status) {
        case StatusCodes.CREATED:
          setHasBeenAdded(true);
          return;
        case StatusCodes.CONFLICT:
          setHasBeenAdded(true);
          return;
      }
    });
  };

  const handleRemoveClick = () => {
    if (!user) {
      const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
      const watchlist = originalWatchlist.filter(
        (watchlist: ProductDataProps) => watchlist.id !== id,
      );
      localStorage.setItem('watchList', JSON.stringify(watchlist));
      setHasBeenAdded(false);
      return;
    }

    removeFromWatchlist({ id, name }).then(() => {
      setHasBeenAdded(false);
      return;
    });
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
              {!hasBeenAdded ? (
                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={handleClick}
                >
                  Add to Watchlist
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={handleRemoveClick}
                >
                  Remove to Watchlist
                </Button>
              )}
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
