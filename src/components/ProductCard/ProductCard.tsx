import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@/components/Button';
import { useProductStyles } from './ProductCard.styles';
import { ShareButton } from '@/components/ShareButton';
import { useModal } from '@/helpers/hooks/useModal';
import { useUser } from '@/helpers/hooks/useUser';
import {
  addToWatchlist,
  addWatchlistToLocalStorage,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
  isAssetInLocalStorage,
  removeFromWatchlist,
  removeWatchlistFromLocalStorage,
} from '@/api/endpoints/watchlist';

export interface IProductDataProps {
  name: string;
  id: string;
}

export const ProductCard = ({ name, id }: IProductDataProps) => {
  const { setIsModalOpen } = useModal();
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const user = useUser();

  useEffect(() => {
    setHasBeenAdded(isAssetInLocalStorage(id));

    if (user) {
      checkForAssetOnWatchlist(id)
        .then((isOnWatchlist: boolean) => {
          setHasBeenAdded(isOnWatchlist ?? false);
        })
        .catch(() => {
          return;
        });
    }
  }, [id, user]);

  const handleClick = () => {
    if (!user) {
      addWatchlistToLocalStorage(id, name)
        .then(() => {
          setIsModalOpen(true);
          setHasBeenAdded(true);
          return;
        })
        .catch(() => {
          return;
        });
    }

    void addToWatchlist({ id, name }).then((status) => {
      setHasBeenAdded(hasBeenAddedWatchlist(status));
    });
  };

  const handleRemoveClick = () => {
    if (!user) {
      removeWatchlistFromLocalStorage(id)
        .then(() => {
          setHasBeenAdded(false);
          return;
        })
        .catch(() => {
          return;
        });
    }

    removeFromWatchlist({ id, name })
      .then(() => {
        setHasBeenAdded(false);
        return;
      })
      .catch(() => {
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
        <Typography className={classes.productTitle} variant="xl5" component="h2">
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
