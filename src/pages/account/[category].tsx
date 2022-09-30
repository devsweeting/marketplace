import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssets, getPortfolioWatchlistAssets } from '@/api/endpoints/portfolio';
import React, { useEffect, useReducer, useState } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { PortfolioHeader } from '@/components/PortfolioPage/PortfolioHeader';
import { PortFolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';
import { Box, Grid } from '@mui/material';
import { NoDismissLogin } from '@/components/LoginModal';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { getAssetById } from '@/api/endpoints/assets';

export type IPorfolioAsset = IAsset & {
  fractionPriceCents: number | undefined;
  fractionQty: number | undefined;
  isOnUserPortfolio: boolean;
};
interface IPurchaseHistoryItem {
  length: number;
  asset: IPorfolioAsset;
  assetId?: string;
  createdAt?: string;
  deletedAt?: string | null;
  fractionPriceCents?: number;
  fractionQty?: number;
  id?: string;
  isDelete?: boolean;
  purchaseTotal?: number;
  sellOrderId?: string;
  updatedAt?: string;
  userId?: string;
}
export interface IPortfolioData {
  items?: any;
  totalValueInCents: number;
  totalUnits: number;
  purchaseHistory?: IPurchaseHistoryItem[] | [];
  sellOrderHistory: [];
}

interface IPortfolioDataState {
  isLoading: boolean;
  portfolio: IPortfolioData;
  error: string;
}

type PortfolioListAction =
  | { type: 'fetching' }
  | { type: 'success'; payload: IPortfolioData }
  | { type: 'error'; error: Error };

const initialPortfolioListState: IPortfolioDataState = {
  isLoading: true,
  portfolio: [] as unknown as IPortfolioData,
  error: '',
};

const portfolioReducer = (state: IPortfolioDataState, action: PortfolioListAction) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, isLoading: true, error: '' };
    }
    case 'success': {
      return { ...state, isLoading: false, portfolio: action.payload };
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error.message };
    }
    default: {
      return state;
    }
  }
};

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [{ isLoading, error, portfolio }, dispatch] = useReducer(
    portfolioReducer,
    initialPortfolioListState,
  );
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('Overview');
  const [stats, setStats] = useState<IPortfolioData | undefined>();
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);

  const handlePortfolioDataFetch = (activePortfolioCategory: string) => {
    dispatch({ type: 'fetching' });
    switch (activePortfolioCategory) {
      case 'Overview': {
        return getPortfolioAssets()
          .then((data) => {
            dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
          })
          .catch((error) => {
            dispatch({ type: 'error', error });
          });
        break;
      }
      case 'Watchlist': {
        return getPortfolioWatchlistAssets()
          .then((data) => {
            dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
          })
          .catch((error) => {
            dispatch({ type: 'error', error });
          });
        break;
      }
      default: {
        return getPortfolioAssets()
          .then((data) => {
            dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
          })
          .catch((error) => {
            dispatch({ type: 'error', error });
          });
        break;
      }
    }
  };

  const handleStatsDataFetch = () => {
    getPortfolioAssets()
      .then((data) => {
        setStats(data as unknown as IPortfolioData);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (isReady && Object.keys(query).length > 0) {
      const queryString = capitalizeFirstLetter(query.category as string);
      setActivePortfolioCategory(queryString);
      void handlePortfolioDataFetch(activePortfolioCategory);
      void handleStatsDataFetch();
    }
  }, [activePortfolioCategory, isReady, query]);

  const portfolioAssetsList = [];
  if (!Object.keys(portfolio).includes('meta')) {
    if (portfolio?.purchaseHistory && !Object.keys(portfolio).includes('statusCode')) {
      for (let i = 0; i < portfolio.purchaseHistory.length; i++) {
        if (
          Object.keys(portfolio).length > 0 &&
          Object.keys(portfolio.purchaseHistory[i]).length > 0 &&
          Object.keys(portfolio.purchaseHistory[i]).includes('asset')
        ) {
          portfolio.purchaseHistory[i].asset.fractionPriceCents =
            portfolio.purchaseHistory[i].fractionPriceCents;
          portfolio.purchaseHistory[i].asset.fractionQty = portfolio.purchaseHistory[i].fractionQty;
        }
        portfolioAssetsList.push(portfolio.purchaseHistory[i].asset);
      }
    }
  } else {
    portfolioAssetsList.push(...portfolio.items);
  }

  const updateAsset = (assetId: string): void => {
    getAssetById(assetId)
      .then((asset) => {
        if (!asset) {
          return;
        }
        const newAssetData = asset.data;
        const tempAssets = assets;
        tempAssets[tempAssets.findIndex((asset) => asset.id === assetId)] = newAssetData;
        setAssets(tempAssets);
        setTradePanelData(newAssetData);
      })
      .catch(() => {
        return;
      });
  };

  const handleDrawer = (asset: IAsset) => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (isOpen && tradePanelData && asset.id === tradePanelData.id) {
      setIsOpen(false);
    }
    if (Object.keys(portfolio).includes('statusCode')) {
      setIsOpen(false);
    }
    setTradePanelData(asset);
  };

  if (isLoading) {
    return (
      <Box sx={{ height: '100vw' }}>
        <Loader />;
      </Box>
    );
  }

  if (error !== '') {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() => {
            void handlePortfolioDataFetch(activePortfolioCategory);
          }}
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <>
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <PortfolioHeader
          setActivePortfolioCategory={setActivePortfolioCategory}
          activePortfolioCategory={activePortfolioCategory}
        />
        <Box>
          <PortFolioStats portfolio={stats} />
          <PortfolioAssetList
            portfolioAssetsList={portfolioAssetsList}
            handleDrawer={handleDrawer}
          />
        </Box>
      </Grid>
      {tradePanelData && (
        <TradePanel
          updateAsset={updateAsset}
          open={isOpen}
          asset={tradePanelData}
          handleClose={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}
      {Object.keys(portfolio).includes('statusCode') && <NoDismissLogin />}
    </>
  );
};

export default PortfolioPage;
