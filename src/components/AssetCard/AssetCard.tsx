import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { IAssetCard } from './IAssetCard';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import {
  addToWatchlist,
  addWatchlistToLocalStorage,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
  isAssetInLocalStorage,
  removeFromWatchlist,
  removeWatchlistFromLocalStorage,
} from '@/api/endpoints/watchlist';
import { useEffect, useState } from 'react';
import { useModal } from '@/helpers/hooks/useModal';
import { useUser } from '@/helpers/hooks/useUser';
import { Star as MuiStar } from '@mui/icons-material';
import { calcValuation } from '@/helpers/calcValuation';
import { formatNumber } from '@/helpers/formatNumber';
import { Attributes } from '../Attributes';
import type { IAsset } from '@/types/assetTypes';

import {
  CardContainer,
  ImageWrapper,
  Img,
  CardDetails,
  Title,
  PriceSection,
  PriceItem,
  StarWrapper,
  Star,
  SoldOutContainer,
  SoldOutText,
  Watched,
} from './AssetCard.styles';

export const AssetCard = ({ onClick, assetData, activeCardId }: IAssetCard) => {
  const sellOrderData = getMainSellOrder(assetData);
  const { setIsModalOpen } = useModal();
  const [hasBeenAdded, setHasBeenAdded] = useState(false);

  const handleKeyDownOnCard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const user = useUser();
  useEffect(() => {
    setHasBeenAdded(isAssetInLocalStorage(assetData));

    if (user) {
      checkForAssetOnWatchlist(assetData)
        .then((isOnWatchlist: boolean) => {
          setHasBeenAdded(isOnWatchlist ?? false);
        })
        .catch(() => {
          return;
        });
    }
  }, [assetData, user]);

  const handleAddToWatchlist = (asset: IAsset) => {
    if (!user) {
      addWatchlistToLocalStorage(asset)
        .then(() => {
          setIsModalOpen(true);
          setHasBeenAdded(true);
          return;
        })
        .catch(() => {
          return;
        });
      return;
    }

    addToWatchlist(asset)
      .then((status) => {
        setHasBeenAdded(hasBeenAddedWatchlist(status));
      })
      .catch(() => {
        return;
      });
  };

  const handleRemoveFromWatchlist = (asset: IAsset) => {
    if (!user?.id) {
      removeWatchlistFromLocalStorage(asset)
        .then(() => {
          setHasBeenAdded(false);
          return;
        })
        .catch(() => {
          return;
        });
      return;
    }

    removeFromWatchlist(asset)
      .then(() => {
        setHasBeenAdded(false);
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <CardContainer
      tabIndex={0}
      onKeyDown={handleKeyDownOnCard}
      active={activeCardId === assetData.id}
      onClick={onClick}
    >
      <ImageWrapper>
        {assetData.media && assetData.media[0] && assetData.media[0].absoluteUrl && (
          <Img
            placeholder="blur"
            blurDataURL={`/_next/image?url=${assetData.media[0].absoluteUrl}&w=16&q=1`}
            src={assetData.media[0].absoluteUrl}
            alt={assetData.media[0].title}
            width={200}
            height={340}
          />
        )}
      </ImageWrapper>
      <CardDetails>
        <Box>
          <Title fontWeight={700}>{assetData.name}</Title>
          <Attributes attributes={assetData.attributes} />
        </Box>
        <PriceSection>
          <PriceItem>
            <Typography>Valuation</Typography>
            <Typography variant="xl2" fontWeight={700}>
              {'$' +
                formatNumber(
                  calcValuation(
                    sellOrderData?.fractionQty ?? 0,
                    sellOrderData?.fractionPriceCents ?? 0,
                  ),
                )}
            </Typography>
          </PriceItem>
          <PriceItem>
            <Typography>Unit Price</Typography>
            <Typography variant="xl2" fontWeight={700}>
              {sellOrderData ? `$${sellOrderData.fractionPriceCents / 100}` : 'Not Available'}
            </Typography>
          </PriceItem>
        </PriceSection>
      </CardDetails>
      <StarWrapper>
        <Star>
          {!hasBeenAdded ? (
            <IconButton
              aria-label="add to watchlist"
              onClick={() => {
                handleAddToWatchlist(assetData);
              }}
            >
              <StarBorderIcon />
            </IconButton>
          ) : (
            <Watched
              aria-label="remove from watchlist"
              onClick={() => {
                handleRemoveFromWatchlist(assetData);
              }}
            >
              <MuiStar />
            </Watched>
          )}
          {hasBeenAdded ? 1 : ''}
        </Star>
      </StarWrapper>
      {sellOrderData?.fractionQtyAvailable === 0 && (
        <SoldOutContainer>
          <SoldOutText>SOLD OUT</SoldOutText>
        </SoldOutContainer>
      )}
    </CardContainer>
  );
};
