import { formatNumber } from '@/helpers/formatNumber';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import { removeFromWatchlist } from '@/api/endpoints/watchlist';
import type { IAsset } from '@/types';
import { CardActionArea, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Star as MuiStar } from '@mui/icons-material';
import { useRouter } from 'next/router';
import {
  AssetCard,
  CardInnerContainer,
  DetailWrapper,
  ImageWrapper,
  Img,
  AttributeWrapper,
  ValueWrapper,
  CardTitle,
  CardDetails,
  LargeText,
  FineText,
  HeaderText,
  TextWrapper,
  StarWrapper,
  Watched,
  ImageContainer,
} from './PortfolioCard.styles';

export const PortfolioAssetCard = ({
  onClick,
  assetData,
  closeDrawer,
}: {
  onClick: any;
  assetData: any;
  closeDrawer: () => void;
}) => {
  const router = useRouter();
  const details = parseAssetAttributes(assetData.attributes);

  // TODO - assetData is expecting sellOrders to be present. This is a backend issue.
  // const fractionPriceCents = assetData?.sellOrders[0]?.fractionPriceCents ?? 0;
  // For temp fix, set fractionPriceCents to zero
  const fractionPriceCents = 0;

  const quantityOwned = assetData?.userAsset?.quantityOwned ?? 0;

  const handleKeyDownOnCard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const handleRemoveFromWatchlist = (asset: IAsset) => {
    removeFromWatchlist(asset.id)
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  };
  const theme = useTheme();
  const classes = {
    labelTypography: {},
    fineTypography: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      marginLeft: '4px',
    },
    multiFontWrapper: {},
  };
  const formatLargeValues = (value: number) => {
    if (isNaN(value)) return value;

    if (value < 9999) {
      if (value % 1 === 0) {
        return value;
      }
      return formatNumber(value.toFixed(2) as unknown as number);
    } else if (value < 1000000) {
      return Math.round(value / 1000) + 'k';
    } else if (value < 10000000) {
      return (value / 1000000).toFixed(2) + 'm';
    } else if (value < 1000000000) {
      return Math.round(value / 1000000) + 'm';
    } else if (value < 1000000000000) {
      return Math.round(value / 1000000000) + 'b';
    }

    return '1T+';
  };
  return (
    <AssetCard tabIndex={0} onKeyDown={handleKeyDownOnCard}>
      <Box sx={{ width: '100%', height: 'max-content', display: 'flex', position: 'relative' }}>
        {assetData.category === 'watchlist' && (
          <>
            <StarWrapper>
              <Watched
                aria-label="remove from watchlist"
                name="remove from watchlist"
                onClick={() => {
                  handleRemoveFromWatchlist(assetData);
                  closeDrawer();
                  if (router.isReady) {
                    void router.push(
                      {
                        pathname: router.pathname,
                        query: router.query,
                      },
                      undefined,
                      { shallow: true },
                    );
                  }
                }}
              >
                <MuiStar />
              </Watched>
            </StarWrapper>
          </>
        )}
        <CardActionArea>
          <CardInnerContainer onClick={onClick}>
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
            <DetailWrapper>
              <AttributeWrapper>
                <CardTitle variant="xl">{assetData.name}</CardTitle>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="80%"
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      margin: '10px 0',
                      padding: '10px',
                    },
                  }}
                >
                  <CardDetails>{details.year}</CardDetails>

                  <CardDetails>{details.cardNumber}</CardDetails>
                  <CardDetails>{details.set}</CardDetails>
                  <CardDetails>
                    {details.grading_service} {details.grading}
                  </CardDetails>
                </Box>
              </AttributeWrapper>
              <ValueWrapper>
                <TextWrapper>
                  <HeaderText>Ask price /unit</HeaderText>
                  <Box display="flex" alignItems="flex-end">
                    <LargeText>
                      {'$' + formatLargeValues((fractionPriceCents / 100) * 1.25)}{' '}
                    </LargeText>
                    <FineText variant="lg" sx={classes.fineTypography}>
                      @
                    </FineText>
                    <LargeText>
                      {'$' + formatLargeValues((fractionPriceCents * 1.25 * quantityOwned) / 100)}{' '}
                    </LargeText>
                    <FineText variant="lg" sx={classes.fineTypography}>
                      valuation
                    </FineText>
                  </Box>
                </TextWrapper>
                <TextWrapper>
                  <HeaderText>Valuation</HeaderText>
                  <LargeText>
                    {'$' + formatLargeValues((fractionPriceCents * quantityOwned) / 100)}
                  </LargeText>
                </TextWrapper>
                <TextWrapper>
                  <HeaderText>Unit price paid</HeaderText>
                  <Box display="flex" alignItems="flex-end">
                    <LargeText>{'$' + fractionPriceCents / 100}</LargeText>
                    <FineText variant="lg">
                      @ {formatLargeValues((fractionPriceCents * quantityOwned) / 100)} Valuation
                    </FineText>
                  </Box>
                </TextWrapper>
                <TextWrapper>
                  <HeaderText>Total units</HeaderText>
                  <LargeText>{quantityOwned}</LargeText>
                </TextWrapper>
              </ValueWrapper>
            </DetailWrapper>
          </CardInnerContainer>
        </CardActionArea>
      </Box>
    </AssetCard>
  );
};
