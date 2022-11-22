import type { IAsset } from '@/types/assetTypes';
import type { ParsedUrlQuery } from 'querystring';

import { calcTimeDifference } from '@/helpers/time';
import { useEffect, useMemo, useState } from 'react';
import { getAssetById } from '@/api/endpoints/assets';
import { formatNumber } from '@/helpers/formatNumber';
import { getNumSellordersUserCanBuy } from '@/api/endpoints/sellorders';
import { addToWatchlist, removeFromWatchlist, inWatchlist } from '@/api/endpoints/watchlist';

import { AssetErrorPage } from '@/components/DropPage/AssetErrorPage';
import { AssetPage } from '@/components/DropPage/AssetPage';
import type { AssetPageProps } from '@/components/DropPage/AssetPage';
import { useLocalWatchlist } from '@/helpers/hooks/useLocalWatchlist';

const mockInfo = [
  {
    key: 'Date minted',
    value: 'Oct 1 2022',
  },
  {
    key: 'Number of cards in same grade',
    value: '2',
  },
  {
    key: 'Number of people who co-own this card',
    value: '8',
  },
];

const AssetPageContainer = ({ initialAsset }: { initialAsset: IAsset }) => {
  const { addToLocalWatchlist, removeFromLocalWatchlist, inLocalWatchlist } = useLocalWatchlist();
  const [asset, setAsset] = useState<IAsset>(initialAsset);
  const sellOrder = useMemo(() => {
    if (asset?.sellOrders && asset?.sellOrders.length > 0) return asset.sellOrders[0];

    return undefined;
  }, [asset?.sellOrders]);

  const sellOrderCalculations = useMemo(() => {
    if (sellOrder) {
      const unitDollarPrice = Math.floor(sellOrder.fractionPriceCents * 0.01);

      return {
        unitQty: Math.floor(sellOrder.fractionQty * 0.01),
        unitQtyAvailable: sellOrder.fractionQtyAvailable,
        unitDollarPrice,
        marketValuation: formatNumber(Math.floor(unitDollarPrice * sellOrder.fractionQty)),
        percentClaimed:
          100 - Math.floor((sellOrder.fractionQtyAvailable / sellOrder.fractionQty) * 100),
        timeToPurchasable:
          calcTimeDifference(new Date(), sellOrder.userFractionLimitEndTime ?? new Date()) ?? 0,
      };
    }

    return {
      unitQty: 0,
      unitQtyAvailable: 0,
      unitDollarPrice: 0,
      marketValuation: '0',
      percentClaimed: 100,
      timeToPurchasable: 0,
    };
  }, [sellOrder]);
  const [watched, setWatched] = useState<boolean>(false);

  const [purchaseLimit, setPurchaseLimit] = useState<number>(0);

  const updateAsset = (assetId: string): void => {
    const fetchAsset = async (id: string): Promise<void> => {
      const data = await getAssetById(id);

      if (data) {
        setAsset(data);
      }
    };

    // eslint-disable-next-line no-console
    fetchAsset(assetId).catch(console.error);
  };

  const handleWatch = async (asset: IAsset): Promise<void> => {
    addToLocalWatchlist(asset.id);

    const { isSuccessful } = await addToWatchlist(asset.id);

    if (isSuccessful) setWatched(true);
  };

  const handleRemoveWatch = async (asset: IAsset): Promise<void> => {
    removeFromLocalWatchlist(asset.id);

    const { isSuccessful } = await removeFromWatchlist(asset.id);

    if (isSuccessful) setWatched(false);
  };

  useEffect(() => {
    const fetchBuyLimit = async (id: string) => {
      const { fractionsAvailableToPurchase } = await getNumSellordersUserCanBuy(id);

      setPurchaseLimit(fractionsAvailableToPurchase);
    };

    if (sellOrder) {
      // eslint-disable-next-line no-console
      fetchBuyLimit(sellOrder.id).catch((e) => console.error(e));
    }
  }, [asset, sellOrder]);

  useEffect(() => {
    const fetchIsWatched = async (asset: IAsset) => {
      setWatched(inLocalWatchlist(asset.id));

      const onWatchlistCheck = await inWatchlist(asset.id);

      setWatched(onWatchlistCheck ?? false);
    };

    if (asset) {
      // eslint-disable-next-line no-console
      fetchIsWatched(asset).catch((e) => console.error(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  if (asset && sellOrder) {
    const assetProps: AssetPageProps = {
      asset,
      sellOrder,
      info: mockInfo,
      watched,
      ...sellOrderCalculations,
      purchaseLimit,
      updateAsset,
      handleWatch,
      handleRemoveWatch,
    };

    return <AssetPage {...assetProps} />;
  }

  return <AssetErrorPage />;
};

export default AssetPageContainer;

export const getServerSideProps = async ({ query }: { query: ParsedUrlQuery }) => {
  try {
    const { id } = query;

    if (!id) {
      return { props: { initialAsset: null } };
    }

    const asset = await getAssetById(id as string);

    if (!asset)
      return {
        props: { initialAsset: null },
      };

    return {
      props: { initialAsset: asset },
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
