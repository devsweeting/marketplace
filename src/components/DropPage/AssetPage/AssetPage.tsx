import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { formatNumber } from '@/helpers/formatNumber';
import {
  PageContainer,
  ImgContainer,
  InfoContainer,
  TitleContainer,
  DetailsContainer,
  ActionContainer,
  UnitContainer,
  IconContainer,
} from './AssetPage.styles';
import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import { ImgGallery } from '@/components/ImgGallery';
import { DropDetails } from '@/components/DropPage/DropDetails';
import type { CountdownProps } from '@/components/coundownTimer';
const CountdownTimer = dynamic<CountdownProps>(
  () => import('../../../components/coundownTimer/CountdownTimer'),
  {
    ssr: false,
  },
);
import { BuyModal } from '@/components/BuyModal';

import type { IAsset, ISellOrder, IUser } from '@/types';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, LinearProgress, Slider, Typography } from '@mui/material';
import Link from 'next/link';
import { Button } from '@/components/Button';
import type { InfoRow } from '../DropDetails/DropDetails';
import { Attributes } from '@/components/Attributes';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { NO_IMAGE_AVAILABLE } from '@/helpers/noImageFound';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';
import { useCart } from '@/helpers/auth/CartContext';
import { useModalContext } from '@/helpers/auth/ModalContext';

export interface AssetPageProps {
  asset: IAsset;
  sellOrder: ISellOrder | undefined;
  user: IUser | undefined;
  info: InfoRow[];
  watched: boolean;
  unitQty: number;
  unitQtyAvailable: number;
  unitDollarPrice: number;
  marketValuation: string;
  timeToPurchasable: number;
  percentClaimed: number;
  purchaseLimit: number;
  updateAsset: (assetId: string) => void;
  handleWatch: (asset: IAsset) => Promise<void>;
  handleRemoveWatch: (asset: IAsset) => Promise<void>;
}

export function AssetPage(props: AssetPageProps) {
  const {
    asset,
    sellOrder,
    user,
    info,
    watched,
    unitQty,
    unitQtyAvailable,
    unitDollarPrice,
    marketValuation,
    timeToPurchasable,
    percentClaimed,
    purchaseLimit,
    updateAsset,
    handleWatch,
    handleRemoveWatch,
  } = props;

  const [url, setUrl] = useState('');
  const [modalState, setModalState] = useState<boolean>(false);
  const [unitsToPurchase, setUnitsToPurchase] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const sellOrderData = getMainSellOrder(asset);
  const { reOpenCart, addSingleItemToCart } = useCart();
  const { dispatch } = useModalContext();

  const purchasable = timeToPurchasable <= 0;

  const hasActiveSellOrder = sellOrder !== undefined && sellOrder.expireTime > Date.now();

  const toggleBuyModal = () => setModalState((prev) => !prev);

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setUnitsToPurchase(newValue as number);

      setTotalPrice(Math.ceil((newValue as number) * unitDollarPrice));
    }
  };

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: purchaseLimit,
      label: formatNumber(purchaseLimit),
    },
  ];

  useEffect(() => setUrl(window.location.href), []);

  const handleOpenBuyModal = () => {
    if (!sellOrderData) {
      throw new Error('No associated sell order for asset');
    }
    addSingleItemToCart(
      asset.name,
      asset.description,
      asset.id,
      sellOrderData?.id,
      unitsToPurchase,
      sellOrderData?.fractionPriceCents as number,
      totalPrice,
    );
    // if no user is logged in, prompt the login modal
    if (!user) {
      dispatch({ type: 'login', visible: true });
      return;
    }

    reOpenCart();
  };

  return (
    <>
      <OpenGraph
        title={asset.name}
        description={asset.description}
        image={
          asset?.media && asset?.media[0].absoluteUrl
            ? asset?.media[0].absoluteUrl
            : NO_IMAGE_AVAILABLE
        }
        image_alt={asset?.media && (asset?.media[0].description ?? 'No image available')}
      />
      <PageContainer>
        <ImgContainer>
          <IconContainer>
            {watched ? (
              <StarRounded onClick={() => void handleRemoveWatch(asset)} fontSize="large" />
            ) : (
              <StarBorderRounded onClick={() => void handleWatch(asset)} fontSize="large" />
            )}
            <FacebookShareButton url={url}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <EmailShareButton url={url}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </IconContainer>
          {asset?.media && <ImgGallery images={asset.media} />}
        </ImgContainer>
        <InfoContainer>
          <TitleContainer>
            <Typography variant="lg" fontWeight={600}>
              Drop details
            </Typography>
          </TitleContainer>
          <Box sx={{ padding: '1rem' }}>
            <DetailsContainer>
              <div>
                <Typography variant="xl3" fontWeight={600}>
                  {asset.name}
                </Typography>
                <Attributes attributes={asset.attributes} />
              </div>
              <div>
                <Typography variant="body2" color="#4B5563" fontWeight={500}>
                  Market valuation
                </Typography>
                <Typography variant="xl2" fontWeight={600}>
                  ${marketValuation}
                </Typography>
              </div>
            </DetailsContainer>
            <UnitContainer>
              <LinearProgress
                variant="determinate"
                value={percentClaimed}
                sx={{
                  height: 8,
                  width: '100%',
                  borderRadius: 2,
                  backgroundColor: '#E5E7EB',
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2">{percentClaimed}% Claimed</Typography>
                <Typography variant="body2">{unitQtyAvailable} units left</Typography>
              </Box>
            </UnitContainer>
            <Slider
              value={unitsToPurchase}
              min={1}
              max={purchaseLimit}
              step={1}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
              marks={marks}
            />
            <DropDetails info={info} description={asset.description} />
          </Box>
          <ActionContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Typography variant="body1">1% = {unitQty} units</Typography>
              <Typography variant="body1">${unitDollarPrice}</Typography>
            </Box>
            <Button
              variant="contained"
              disabled={!purchasable || !hasActiveSellOrder}
              fullWidth
              onClick={handleOpenBuyModal}
            >
              {!hasActiveSellOrder ? (
                'Unavailable for purchase'
              ) : purchasable ? (
                'Buy units'
              ) : (
                <>
                  Buy more units in&nbsp;
                  <CountdownTimer
                    startTime={timeToPurchasable}
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                  />
                </>
              )}
            </Button>
            <Link href="/explore">
              <Button
                variant="text"
                sx={{
                  display: 'block',
                  margin: '1rem auto 0 auto',
                }}
              >
                Continue exploring
              </Button>
            </Link>
          </ActionContainer>
        </InfoContainer>
        {hasActiveSellOrder ? (
          <BuyModal
            isOpen={modalState}
            onClose={toggleBuyModal}
            sellOrder={sellOrder}
            totalFractions={unitsToPurchase}
            totalPrice={totalPrice}
            updateAsset={updateAsset}
          />
        ) : null}
      </PageContainer>
    </>
  );
}
