import type { IAsset } from '@/types/assetTypes';
import type { ParsedUrlQuery } from 'querystring';

import { calcTimeDifference } from '@/helpers/time';
import { useEffect, useMemo, useState } from 'react';
import { getAssetById } from '@/api/endpoints/assets';
import { formatNumber } from '@/helpers/formatNumber';
import { getNumSellordersUserCanBuy } from '@/api/endpoints/sellorders';
import {
  addToWatchlist,
  addWatchlistToLocalStorage,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
  isAssetInLocalStorage,
  removeFromWatchlist,
  removeWatchlistFromLocalStorage,
} from '@/api/endpoints/watchlist';

import { AssetErrorPage } from '@/components/DropPage/AssetErrorPage';
import { AssetPage } from '@/components/DropPage/AssetPage';
import type { AssetPageProps } from '@/components/DropPage/AssetPage';

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
        timeToPurchasable: calcTimeDifference(
          new Date(),
          sellOrder.userFractionLimitEndTime ?? new Date(),
        ),
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

  const updateAsset = async (assetId: string) => {
    const data = await getAssetById(assetId);

    if (data) {
      setAsset(data);
    }
  };

  const handleWatch = async (id: string, name: string): Promise<void> => {
    await addWatchlistToLocalStorage(id, name)
      .then(() => setWatched(true))
      .catch(console.error);

    await addToWatchlist({ id, name })
      .then((status) => setWatched(hasBeenAddedWatchlist(status)))
      .catch(console.error);
  };

  const handleRemoveWatch = async (id: string, name: string): Promise<void> => {
    await removeWatchlistFromLocalStorage(id)
      .then(() => setWatched(false))
      .catch(console.error);

    await removeFromWatchlist({ id, name })
      .then(() => setWatched(false))
      .catch(console.error);
  };

  useEffect(() => {
    const fetchBuyLimit = async (id: string) => {
      const { fractionsAvailableToPurchase } = await getNumSellordersUserCanBuy(id);

      setPurchaseLimit(fractionsAvailableToPurchase);
    };

    if (sellOrder) {
      fetchBuyLimit(sellOrder.id).catch(console.error);
    }
  }, [asset, sellOrder]);

  useEffect(() => {
    const fetchIsWatched = async (id: string) => {
      setWatched(isAssetInLocalStorage(id));

      const watchlistCheck = await checkForAssetOnWatchlist(id);

      setWatched(watchlistCheck.inWatchlist ?? false);
    };

    if (asset) {
      fetchIsWatched(asset.id).catch(console.error);
    }
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

    return {
      props: { initialAsset: asset },
    };
  } catch (e) {
    console.error(e);
  }
};
