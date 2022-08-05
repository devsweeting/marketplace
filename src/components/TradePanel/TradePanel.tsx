import {
  Box,
  Button,
  DialogContent,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Slider,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { BuyModal } from '../BuyModal/BuyModal';
import { useTradePanelStyles } from './TradePanel.styles';
import { AssetGallery } from './Components/CardGallery';
import type { ITradePanel } from './ITradePanel';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
export const TradePanel = ({ asset, open, handleClose }: ITradePanel) => {
  const classes = useTradePanelStyles();

  const [sliderValue, setSliderValue] = useState<number>(0);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [disableBuyBTN, setDisableBuyBTN] = useState(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [assetId, setAssetId] = useState(asset.id);
  const sellOrderData = getMainSellOrder(asset);

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: sellOrderData?.fractionQty ?? 0,
      label: sellOrderData?.fractionQty ?? 0,
    },
  ];

  const resetData = () => {
    setDisableBuyBTN(true);
    setTotalPrice(0);
    setSliderValue(0);
    setAssetId(asset.id);
  };

  const handleOpenBuyModal = () => {
    setBuyModalOpen(!buyModalOpen);
  };

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setSliderValue(newValue as number);

      setTotalPrice(
        Math.ceil((newValue as number) * (sellOrderData?.fractionPriceCents ?? 0)) / 100,
      );
    }
  };

  useEffect(() => {
    if ((sliderValue as number) < 1) {
      setDisableBuyBTN(true);
    } else {
      setDisableBuyBTN(false);
    }
    if (assetId !== asset.id) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, disableBuyBTN, totalPrice, assetId, asset]);
  const details = parseAssetAttributes(asset.attributes);

  return (
    <Box>
      <DialogContent>
        <Drawer
          tabIndex={-1}
          variant="persistent"
          anchor="right"
          open={open}
          transitionDuration={300}
          className={classes.Drawer}
        >
          <Box>
            <Box className={classes.card_header}>
              <Typography className={classes.card_header_text}>Research Drawer</Typography>

              <IconButton onClick={handleClose} aria-label="Close" sx={{ marginLeft: 'auto' }}>
                {<CloseIcon />}
              </IconButton>
            </Box>
            <Divider className={classes.fullWidthDivider} />

            <Box className={classes.galleryWrapper}>
              {asset.media && asset.media[0] && <AssetGallery images={asset.media} />}
            </Box>

            <Grid container sx={{ marginTop: '20px' }}>
              <Grid item xs={7}>
                <Typography className={classes.title}>{asset.name}</Typography>
                <Typography variant="subtitle2">
                  {details.year} #xxx {details.set} {details.grading_service} {details.grading}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'right' }}>
                <Typography className={classes.card_valuation}>Card Valuation</Typography>
                <Typography variant="h3">$XX,XXX</Typography>
              </Grid>
            </Grid>

            <Box className={classes.assetClaimedWrapper}>
              <LinearProgress variant="determinate" value={25} className={classes.progressBar} />
              <Box className={classes.detailsInfo}>
                <Typography sx={{ fontSize: '10px', marginRight: '50px' }}>XX% Claimed</Typography>
                <Typography sx={{ fontSize: '10px' }}>Buy more fractions in HH:MM:SS</Typography>
              </Box>
            </Box>
            <Typography className={classes.available_instances}>
              {sellOrderData?.fractionQty ?? 'No '} Fractions Available (XX%)
            </Typography>
            {sellOrderData && (
              <Box>
                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                  <Typography>Order Book</Typography>
                </Box>
                <Slider
                  defaultValue={0}
                  value={sliderValue}
                  max={sellOrderData.fractionQty}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  className={classes.slider_styles}
                  marks={marks}
                />
              </Box>
            )}
            <Box sx={{ margin: '40px 0' }}>
              {sellOrderData && (
                <Box>
                  <Typography>Order Summary</Typography>
                  <Box sx={{ display: 'flex', marginTop: '10px' }}>
                    <Typography>{sliderValue} fractions</Typography>
                    <Typography sx={{ marginLeft: 'auto' }}>${totalPrice}</Typography>
                  </Box>

                  <Button
                    onClick={handleOpenBuyModal}
                    disabled={disableBuyBTN}
                    variant="contained"
                    className={classes.fullWidthButton}
                  >
                    Buy Now
                  </Button>

                  <BuyModal
                    isOpen={buyModalOpen}
                    onClose={handleOpenBuyModal}
                    fractions={sliderValue}
                    totalPrice={totalPrice}
                  />
                </Box>
              )}
              <Typography sx={{ padding: '10px 0', marginTop: '20px' }}>Card details</Typography>
              <Box className={classes.detailsInfo}>
                <Typography>Date minted</Typography>
                <Typography>Oct 1 2022</Typography>
              </Box>

              <Divider className={classes.fullWidthDivider} />
              <Box className={classes.detailsInfo}>
                <Typography>Number of Cards of same grade in PWCCNFT</Typography>
                <Typography>#</Typography>
              </Box>

              <Divider className={classes.fullWidthDivider} />
              <Box className={classes.detailsInfo}>
                <Typography>Number of people who co-own this card</Typography>
                <Typography>#</Typography>
              </Box>

              <Divider className={classes.fullWidthDivider} />
            </Box>
          </Box>
        </Drawer>
      </DialogContent>
    </Box>
  );
};
