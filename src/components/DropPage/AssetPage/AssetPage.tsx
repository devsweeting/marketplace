import dynamic from 'next/dynamic';
import { useState } from 'react';
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
import { ShareOutlined, StarBorderRounded, StarRounded } from '@mui/icons-material';
import { ImgGallery } from '@/components/ImgGallery';
import { DropDetails } from '@/components/DropPage/DropDetails';
const CountdownTimer = dynamic(
  () => import('@/components/coundownTimer').then((module) => module.CountdownTimer),
  { ssr: false },
);
import { BuyModal } from '@/components/BuyModal';

import type { IAsset, ISellOrder } from '@/types/assetTypes';
import { OpenGraph } from '@/components/OpenGraph';
import { Box, LinearProgress, Slider, Typography } from '@mui/material';
import Link from 'next/link';
import { Button } from '@/components/Button';
import type { InfoRow } from '../DropDetails/DropDetails';
import { Attributes } from '@/components/Attributes';

export interface AssetPageProps {
  asset: IAsset;
  sellOrder: ISellOrder;
  info: InfoRow[];
  watched: boolean;
  unitQty: number;
  unitQtyAvailable: number;
  unitDollarPrice: number;
  marketValuation: string;
  timeToPurchasable: number;
  percentClaimed: number;
  purchaseLimit: number;
  updateAsset: (assetId: string) => Promise<void>;
  handleWatch: (id: string, name: string) => Promise<void>;
  handleRemoveWatch: (id: string, name: string) => Promise<void>;
}

export function AssetPage(props: AssetPageProps) {
  const {
    asset,
    sellOrder,
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

  const [modalState, setModalState] = useState<boolean>(false);
  const [unitsToPurchase, setUnitsToPurchase] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const purchasable = timeToPurchasable === 0;

  const copyLink = async () => await navigator.clipboard.writeText(window.location.href);

  const toggleBuyModal = () => setModalState((prev) => !prev);

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setUnitsToPurchase(newValue as number);

      setTotalPrice(Math.ceil((newValue as number) * unitDollarPrice));
    }
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: purchaseLimit,
      label: formatNumber(purchaseLimit),
    },
  ];

  return (
    <>
      <OpenGraph
        title={asset.name}
        description={asset.description}
        image={
          asset?.media
            ? asset?.media[0].absoluteUrl
            : 'https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg'
        }
        image_alt={asset?.media && (asset?.media[0].description ?? 'No image available')}
      />
      <PageContainer>
        <ImgContainer>
          <IconContainer>
            <ShareOutlined onClick={copyLink} fontSize="large" />
            {watched ? (
              <StarRounded
                onClick={() => handleRemoveWatch(asset.id, asset.name)}
                fontSize="large"
              />
            ) : (
              <StarBorderRounded
                onClick={() => handleWatch(asset.id, asset.name)}
                fontSize="large"
              />
            )}
          </IconContainer>
          {asset?.media && <ImgGallery images={asset.media} />}
        </ImgContainer>
        <InfoContainer>
          <TitleContainer>
            <Typography variant="lg" sx={{ fontWeight: 600 }}>
              Drop details
            </Typography>
          </TitleContainer>
          <Box sx={{ padding: '1rem' }}>
            <DetailsContainer>
              <div>
                <Typography variant="xl3" sx={{ fontWeight: 600 }}>
                  {asset.name}
                </Typography>
                <Attributes attributes={asset.attributes} />
              </div>
              <div>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>
                  Pwcc market valuation
                </Typography>
                <Typography variant="xl2" sx={{ fontWeight: 600 }}>
                  ${marketValuation}
                </Typography>
              </div>
            </DetailsContainer>
            <UnitContainer
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
            <Button variant="contained" disabled={!purchasable} fullWidth onClick={toggleBuyModal}>
              {purchasable ? (
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
        <BuyModal
          isOpen={modalState}
          onClose={toggleBuyModal}
          sellOrder={sellOrder}
          totalFractions={unitsToPurchase}
          totalPrice={totalPrice}
          updateAsset={updateAsset}
        />
      </PageContainer>
    </>
  );
}
