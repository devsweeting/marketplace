import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { IAssetCard } from './IAssetCard';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import { Star as MuiStar } from '@mui/icons-material';
import { calcValuation } from '@/helpers/calcValuation';
import { formatNumber } from '@/helpers/formatNumber';
import { Attributes } from '../Attributes';

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
  ImageContainer,
} from './AssetCard.styles';

export const AssetCard = ({
  onClick,
  assetData,
  activeCardId,
  watched,
  watchlistAdd,
  watchlistRemove,
}: IAssetCard) => {
  const sellOrderData = getMainSellOrder(assetData);

  const handleKeyDownOnCard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <CardContainer
      tabIndex={0}
      onKeyDown={handleKeyDownOnCard}
      active={activeCardId === assetData.id}
      onClick={onClick}
    >
      <ImageContainer>
        <ImageWrapper>
          {assetData.media && assetData.media[0] && assetData.media[0].absoluteUrl && (
            <Img
              placeholder="blur"
              blurDataURL={`/_next/image?url=${assetData.media[0].absoluteUrl}&w=16&q=1`}
              src={assetData.media[0].absoluteUrl}
              alt={assetData.media[0].title}
              fill
            />
          )}
        </ImageWrapper>
      </ImageContainer>
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
          {!watched ? (
            <IconButton
              aria-label="add to watchlist"
              onClick={(e) => void watchlistAdd(e, assetData)}
            >
              <StarBorderIcon />
            </IconButton>
          ) : (
            <Watched
              aria-label="remove from watchlist"
              onClick={(e) => void watchlistRemove(e, assetData)}
            >
              <MuiStar />
            </Watched>
          )}
          {watched ? 1 : ''}
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
