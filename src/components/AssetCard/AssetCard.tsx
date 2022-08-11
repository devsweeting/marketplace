import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';

import { Card, CardActionArea, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useAssetCardStyles } from './AssetCard.styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { IAssetCard } from './IAssetCard';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import { addToWatchlist, removeFromWatchlist } from '@/api/endpoints/watchlist';
import type { IAsset } from '@/types/assetTypes';
import { useEffect, useState } from 'react';
import { useModal } from '@/helpers/hooks/useModal';
import { useUser } from '@/helpers/hooks/useUser';
import { StatusCodes } from 'http-status-codes';
import { Star } from '@mui/icons-material';

export const AssetCard = ({ onClick, assetData, activeCardId }: IAssetCard) => {
  const sellOrderData = getMainSellOrder(assetData);
  const classes = useAssetCardStyles();
  const { isOpen, setIsOpen } = useModal();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  //add to watchlist
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const user = useUser();
  let originalWatchlist;
  useEffect(() => {
    if (localStorage.getItem('watchList')) {
      const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
      if (originalWatchlist.some((watchItem: IAsset) => watchItem.id === assetData.id)) {
        setHasBeenAdded(true);
        return;
      }
    }
  }, [assetData.id, originalWatchlist]);

  const handleClick = (id: string, name: string) => {
    if (!user) {
      if (localStorage.getItem('watchList')) {
        originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
        originalWatchlist.push({ id: id, name: name });
      } else {
        originalWatchlist = [{ id: id, name: name }];
      }
      localStorage.setItem('watchList', JSON.stringify(originalWatchlist));
      setIsOpen(!isOpen);
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
    const id = assetData.id;
    const name = assetData.name;
    if (!user) {
      const originalWatchlist = JSON.parse(localStorage.getItem('watchList') as string);
      const watchlist = originalWatchlist.filter(
        (watchlist: IAsset) => watchlist.id !== assetData.id,
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
                handleClick(assetData.id, assetData.name);
              }}
            >
              <StarBorderIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleRemoveClick}>
              <Star />
            </IconButton>
          )}
          {hasBeenAdded ? 1 : 0}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
