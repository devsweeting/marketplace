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
import type { ISellOrder } from '@/types/assetTypes';
import type { ITradePanel } from './ITradePanel';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { BuyModal } from '../BuyModal/BuyModal';
import { useTradePanelStyles } from './TradePanel.styles';
import { AssetGallery } from './Components/CardGallery';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import { useUser } from '@/helpers/hooks/useUser';
import { useModal } from '@/helpers/hooks/useModal';
import { calcValuation } from '@/helpers/calcValuation';
import { formatNumber } from '@/helpers/formatNumber';
import { getNumSellordersUserCanBuy } from '@/api/endpoints/sellorders';
import { calcTimeDifference } from '@/helpers/time';
import { CountdownTimer } from '../coundownTimer';
import { Attributes } from '../Attributes';

export const TradePanel = ({ asset, open, handleClose, updateAsset }: ITradePanel) => {
  const classes = useTradePanelStyles();
  const user = useUser();
  const { setIsModalOpen } = useModal();

  const [sliderValue, setSliderValue] = useState<number>(0);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [disableBuyBTN, setDisableBuyBTN] = useState(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [assetId, setAssetId] = useState(asset.id);
  const sellOrderData = getMainSellOrder(asset);
  const [buyLimit, setBuyLimit] = useState<number>(1);
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: buyLimit,
      label: formatNumber(buyLimit),
    },
  ];

  const getPercentClaimed = (sellOrderData: ISellOrder | undefined): number => {
    const percentClaimed = sellOrderData
      ? Math.floor((sellOrderData?.fractionQtyAvailable / sellOrderData?.fractionQty) * 10000) / 100
      : 0;

    return isNaN(percentClaimed) ? 100 : percentClaimed;
  };
  const resetData = () => {
    setDisableBuyBTN(true);
    setTotalPrice(0);
    setSliderValue(0);
    setAssetId(asset.id);
  };

  const handleOpenBuyModal = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    setBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setBuyModalOpen(false);
  };

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setSliderValue(newValue as number);

      setTotalPrice(
        Math.ceil((newValue as number) * (sellOrderData?.fractionPriceCents ?? 0)) / 100,
      );
    }
  };

  const getUserBuyLimit = async (sellOrderData: ISellOrder | undefined) => {
    if (!sellOrderData) {
      return 0;
    }
    let userBuyLimit = sellOrderData.fractionQtyAvailable ?? 0;

    if (
      sellOrderData?.type !== 'drop' ||
      new Date(sellOrderData.userFractionLimitEndTime ?? 0) < new Date()
    ) {
      return userBuyLimit;
    }

    userBuyLimit = sellOrderData.userFractionLimit ?? 0;
    if (!user) {
      return userBuyLimit;
    }

    const { fractionsAvailableToPurchase } = await getNumSellordersUserCanBuy(sellOrderData.id);

    if (fractionsAvailableToPurchase) {
      userBuyLimit = fractionsAvailableToPurchase || 0;
    }

    return userBuyLimit;
  };

  useEffect(() => {
    const handleUpdateBuyLimit = async () => {
      const userBuyLimit = await getUserBuyLimit(sellOrderData);
      setBuyLimit(userBuyLimit);
    };
    void handleUpdateBuyLimit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellOrderData, user]);

  useEffect(() => {
    if ((sliderValue as number) < 1) {
      setDisableBuyBTN(true);
    } else {
      setDisableBuyBTN(false);
    }
    if (assetId !== asset.id) {
      resetData();
    }
    if (sellOrderData?.fractionQtyAvailable && sliderValue > sellOrderData?.fractionQtyAvailable) {
      setSliderValue(sellOrderData.fractionQtyAvailable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, disableBuyBTN, totalPrice, assetId, asset]);

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
                <Attributes attributes={asset.attributes} />
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'right' }}>
                <Typography className={classes.card_valuation}>Card Valuation</Typography>
                <Typography variant="lg">
                  {'$' +
                    formatNumber(
                      calcValuation(
                        sellOrderData?.fractionQty ?? 0,
                        sellOrderData?.fractionPriceCents ?? 0,
                      ),
                    )}
                </Typography>
              </Grid>
            </Grid>

            <Box className={classes.assetClaimedWrapper}>
              <LinearProgress
                variant="determinate"
                value={100 - getPercentClaimed(sellOrderData)}
                className={classes.progressBar}
              />
              <Box className={classes.detailsInfo}>
                <Typography sx={{ fontSize: '10px', marginRight: '50px' }}>
                  {(100 - getPercentClaimed(sellOrderData)).toFixed(2)}% Claimed
                </Typography>
                {sellOrderData?.type === 'drop' &&
                  sellOrderData?.userFractionLimitEndTime !== null && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '10px', paddingRight: '0.2rem' }}>
                        Buy more units in
                      </Typography>
                      <CountdownTimer
                        sx={{ fontSize: '10px' }}
                        startTime={Math.ceil(
                          calcTimeDifference(new Date(), sellOrderData.userFractionLimitEndTime) ??
                            0,
                        )}
                      />
                    </Box>
                  )}
              </Box>
            </Box>
            <Typography className={classes.available_instances}>
              {sellOrderData?.fractionQtyAvailable
                ? `${formatNumber(sellOrderData.fractionQtyAvailable)} Units Available ( ${
                    getPercentClaimed(sellOrderData) + '%'
                  }
              )`
                : 'No Units Available'}
            </Typography>
            {sellOrderData && !!buyLimit && (
              <Box>
                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                  <Typography>Order Book</Typography>
                </Box>
                <Slider
                  defaultValue={0}
                  value={sliderValue}
                  max={buyLimit}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  className={classes.slider_styles}
                  marks={marks}
                />
              </Box>
            )}
            <Box sx={{ margin: '40px 0' }}>
              {sellOrderData && !!buyLimit && (
                <Box>
                  <Typography>Order Summary</Typography>
                  <Box sx={{ display: 'flex', marginTop: '10px' }}>
                    <Typography>{formatNumber(sliderValue)} units</Typography>
                    <Typography sx={{ marginLeft: 'auto' }}>
                      {'$' + formatNumber(totalPrice)}
                    </Typography>
                  </Box>

                  <Button
                    onClick={handleOpenBuyModal}
                    disabled={disableBuyBTN}
                    variant="contained"
                    className={classes.fullWidthButton}
                  >
                    Buy Now
                  </Button>
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
      {sellOrderData && (
        <BuyModal
          isOpen={buyModalOpen}
          onClose={handleCloseBuyModal}
          sellOrder={sellOrderData}
          totalFractions={sliderValue}
          totalPrice={totalPrice}
          updateAsset={updateAsset}
        />
      )}
    </Box>
  );
};
