import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';

import { Card, CardActionArea, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useAssetCardStyles } from './AssetCard.styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { IAssetCard } from './IAssetCard';

export const AssetCard = ({ onClick, assetData, activeCardId }: IAssetCard) => {
  const classes = useAssetCardStyles();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
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
            <Image
              src={assetData.media[0].absoluteUrl}
              alt={assetData.media[0].title}
              width={200}
              height={340}
              className={classes.cardImage}
            ></Image>
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
                      <Typography>Share Price</Typography>
                      <Typography className={classes.price}>
                        ${assetData.sellOrders[0].fractionPriceCents / 100}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography className={classes.star}>
            <StarBorderIcon />
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
