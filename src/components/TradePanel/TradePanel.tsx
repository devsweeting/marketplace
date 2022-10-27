import { Box, DialogContent, Divider, LinearProgress, Slider, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import type { ISellOrder } from '@/types/assetTypes';
import type { ITradePanel } from './ITradePanel';
import { useEffect, useState } from 'react';
import { BuyModal } from '../BuyModal/BuyModal';
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
import { Close } from '@mui/icons-material';
import ArrowRightAltRounded from '@mui/icons-material/ArrowRightAltRounded';
import {
  Drawer,
  Header,
  CloseIcon,
  AssetContainer,
  AssetHeaderContainer,
  FlexTextWrapper,
  TradePanelButton,
} from './TradePanel.styles';
import Link from 'next/link';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useCart } from '@/helpers/auth/CartContext';

export const TradePanel = ({ asset, open, handleClose, updateAsset }: ITradePanel) => {
  const user = useUser();
  const { setIsModalOpen } = useModal();
  const { openCart } = useCart();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
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
      setCartItems((currItems: CartItem[]) => {
        if (currItems.find((item) => item.id === asset.id) == null) {
          return [
            ...currItems,
            {
              id: asset.id,
              quantity: sliderValue,
              fractionPriceCents: sellOrderData?.fractionPriceCents as number,
              totalPrice: totalPrice,
            },
          ];
        } else {
          return currItems.map((item) => {
            if (item.id === asset.id) {
              return {
                ...item,
                quantity: sliderValue,
                fractionPriceCents: sellOrderData?.fractionPriceCents as number,
                totalPrice: totalPrice,
              };
            } else {
              return item;
            }
          });
        }
      });
      setIsModalOpen(true);
      return;
    }
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === asset.id) == null) {
        return [
          ...currItems,
          {
            id: asset.id,
            quantity: sliderValue,
            fractionPriceCents: sellOrderData?.fractionPriceCents as number,
            totalPrice: totalPrice,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.id === asset.id) {
            return {
              ...item,
              quantity: sliderValue,
              fractionPriceCents: sellOrderData?.fractionPriceCents as number,
              totalPrice: totalPrice,
            };
          } else {
            return item;
          }
        });
      }
    });

    openCart();

    // setBuyModalOpen(true);
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
          hideBackdrop={true}
        >
          <Box>
            <Header>
              <Typography variant="lg" fontWeight={500}>
                Research Drawer
              </Typography>
              <CloseIcon onClick={handleClose} aria-label="Close">
                <Close />
              </CloseIcon>
            </Header>
            <Divider />
            <AssetContainer>
              {asset.media && asset.media[0] && <AssetGallery images={asset.media} />}
              <AssetHeaderContainer>
                <Box>
                  <Typography variant="xl3" fontWeight={700}>
                    {asset.name}
                  </Typography>
                  <Attributes attributes={asset.attributes} />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" fontWeight={500}>
                    Card Valuation
                  </Typography>
                  <Typography variant="xl2" fontWeight={600}>
                    {'$' +
                      formatNumber(
                        calcValuation(
                          sellOrderData?.fractionQty ?? 0,
                          sellOrderData?.fractionPriceCents ?? 0,
                        ),
                      )}
                  </Typography>
                </Box>
              </AssetHeaderContainer>
              {(asset.isOnUserPortfolio === false || asset.isOnUserPortfolio === undefined) && (
                <div>
                  <LinearProgress
                    variant="determinate"
                    value={100 - getPercentClaimed(sellOrderData)}
                    sx={{
                      height: 8,
                      width: '100%',
                      borderRadius: 2,
                      backgroundColor: '#E5E7EB',
                    }}
                  />
                  <FlexTextWrapper>
                    <Typography variant="body2">
                      {(100 - getPercentClaimed(sellOrderData)).toFixed(2)}% Claimed
                    </Typography>
                    <Typography variant="body2">
                      {sellOrderData?.fractionQtyAvailable &&
                        formatNumber(sellOrderData.fractionQtyAvailable)}
                      units left
                    </Typography>
                  </FlexTextWrapper>
                </div>
              )}
              {sellOrderData?.type === 'drop' && sellOrderData?.userFractionLimitEndTime !== null && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '10px', paddingRight: '0.2rem' }}>
                    Buy more units in
                  </Typography>
                  <CountdownTimer
                    sx={{ fontSize: '10px' }}
                    startTime={Math.ceil(
                      calcTimeDifference(new Date(), sellOrderData.userFractionLimitEndTime) ?? 0,
                    )}
                  />
                </Box>
              )}
              {sellOrderData && !!buyLimit && (
                <Slider
                  defaultValue={0}
                  value={sliderValue}
                  max={buyLimit}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  marks={marks}
                />
              )}
              <div>
                {(asset.isOnUserPortfolio === false || asset.isOnUserPortfolio === undefined) &&
                  sellOrderData &&
                  !!buyLimit && (
                    <div>
                      <Typography>Order Summary</Typography>
                      <FlexTextWrapper>
                        <Typography>{formatNumber(sliderValue)} units</Typography>
                        <Typography>{'$' + formatNumber(totalPrice)}</Typography>
                      </FlexTextWrapper>

                      <Button
                        onClick={handleOpenBuyModal}
                        disabled={disableBuyBTN}
                        variant="contained"
                        fullWidth
                      >
                        Buy Now
                      </Button>
                    </div>
                  )}
                {asset.isOnUserPortfolio === true && sellOrderData && (
                  <div>
                    {buyLimit ? (
                      <>
                        <Typography>Order Summary</Typography>
                        <FlexTextWrapper>
                          <Typography>{formatNumber(sliderValue)} units</Typography>
                          <Typography>{'$' + formatNumber(totalPrice)}</Typography>
                        </FlexTextWrapper>
                      </>
                    ) : (
                      ''
                    )}

                    <TradePanelButton
                      onClick={handleOpenBuyModal}
                      disabled={buyLimit ? disableBuyBTN : true}
                      variant="contained"
                      fullWidth
                    >
                      {buyLimit
                        ? `+ ${formatNumber(sliderValue)} units`
                        : `No units available to buy`}
                    </TradePanelButton>
                    <TradePanelButton variant="contained" fullWidth>
                      Sell now
                    </TradePanelButton>
                  </div>
                )}
              </div>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href={`/asset/${asset.id}`}>
                  <Button variant="text" endIcon={<ArrowRightAltRounded />}>
                    Card Details
                  </Button>
                </Link>
              </Box>
            </AssetContainer>
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
