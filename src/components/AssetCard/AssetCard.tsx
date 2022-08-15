import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';

import { Card, CardActionArea, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useAssetCardStyles } from './AssetCard.styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { IAssetCard } from './IAssetCard';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import {
  addToWatchlist,
  addWatchlistToLocalStorage,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
  removeFromWatchlist,
  removeWatchlistFromLocalStorage,
} from '@/api/endpoints/watchlist';
import { useEffect, useState } from 'react';
import { useModal } from '@/helpers/hooks/useModal';
import { useUser } from '@/helpers/hooks/useUser';
import { Star } from '@mui/icons-material';
import type { ProductDataProps } from '../ProductCard';

export const AssetCard = ({ onClick, assetData, activeCardId }: IAssetCard) => {
  const sellOrderData = getMainSellOrder(assetData);
  const classes = useAssetCardStyles();
  const { isModalOpen, setIsModalOpen } = useModal();
  const [hasBeenAdded, setHasBeenAdded] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const user = useUser();
  let originalWatchlist;
  useEffect(() => {
    if (localStorage.getItem('watchList')) {
      const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
      if (originalWatchlist.some((watchItem: ProductDataProps) => watchItem.id === assetData.id)) {
        setHasBeenAdded(true);
        return;
      }
    }

    if (user) {
      checkForAssetOnWatchlist(assetData.id).then((isOnWatchlist: boolean) => {
        setHasBeenAdded(isOnWatchlist ?? false);
      });
    }
  }, [assetData.id, originalWatchlist, user]);

  const handleAdd = (id: string, name: string) => {
    if (!user) {
      addWatchlistToLocalStorage(id, name);
      setIsModalOpen(!isModalOpen);
      setHasBeenAdded(true);
      return;
    }

    addToWatchlist({ id, name }).then((status) => {
      setHasBeenAdded(hasBeenAddedWatchlist(status));
    });
  };

  const handleRemove = (id: string, name: string) => {
    if (!user) {
      removeWatchlistFromLocalStorage(id);
      setHasBeenAdded(false);
      return;
    }

    removeFromWatchlist({ id, name }).then(() => {
      setHasBeenAdded(false);
      return;
    });
  };

  const details = parseAssetAttributes(assetData.attributes);
  return (
    <Card
      className={`${classes.card} ${activeCardId === assetData.id ? classes.active : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <CardActionArea>
        <Box onClick={onClick} className={classes.cardBody}>
          <Box className={classes.ImageWrapper}>
            {assetData.media && assetData.media[0] && assetData.media[0].absoluteUrl && (
              <Image
                placeholder="blur"
                blurDataURL={`/_next/image?url=${assetData.media[0].absoluteUrl}&w=16&q=1`}
                src={assetData.media[0].absoluteUrl}
                alt={assetData.media[0].title}
                width={200}
                height={340}
                className={classes.cardImage}
              ></Image>
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box className={classes.cardDetailsWrapper}>
              <Box className={classes.essanceInfo}>
                <Typography className={classes.essanceTitle}>{assetData.name}</Typography>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Box>
                    <Typography>{details.year}</Typography>
                    <Typography>#xxx</Typography>
                    <Typography>Set Topps</Typography>
                    <Typography>
                      {details.grading} {details.grading_service}
                    </Typography>
                  </Box>
                  <Box className={classes.cardPriceSection}>
                    <Box className={classes.CardPriceItem}>
                      <Typography>Valuation</Typography>
                      <Typography className={classes.price}>$xxxx</Typography>
                    </Box>
                    <Box className={classes.CardPriceItem}>
                      <Typography>Fraction Price</Typography>
                      <Typography className={classes.price}>
                        {sellOrderData
                          ? `$${sellOrderData.fractionPriceCents / 100}`
                          : 'Not Available'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography className={classes.star}>
          {!hasBeenAdded ? (
            <IconButton
              onClick={() => {
                handleAdd(assetData.id, assetData.name);
              }}
            >
              <StarBorderIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleRemove(assetData.id, assetData.name);
              }}
            >
              <Star />
            </IconButton>
          )}
          {hasBeenAdded ? 1 : 0}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
