import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssets, getPortfolioWatchlistAssets } from '@/api/endpoints/portfolio';
import React, { useEffect, useReducer, useState } from 'react';
import type { IAsset, IAttribute, IMedia, ISellOrder } from '@/types/assetTypes';
import { PortfolioStats } from '@/components/PortfolioPage/PortfolioStats/PortfolioStats';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { LoginModal } from '@/components/LoginModal';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { getAssetById } from '@/api/endpoints/assets';
import { useUser } from '@/helpers/hooks/useUser';
import { PageContainer } from '@/styles/AccountPage.styles';
import { PortfolioHeaderTabs } from '@/components/PortfolioPage/PortfolioHeaderTabs/PortfolioHeaderTabs';
export type IPorfolioAsset = {
  isOnUserPortfolio?: boolean | undefined;
  userAsset?: {
    assetId: string;
    id: string;
    quantityOwned: number;
  };
  data?: any;
  isOnWatchlist?: boolean;
  id: string;
  refId: string;
  name: string;
  media: IMedia[];
  sellOrders?: ISellOrder[];
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  attributes: IAttribute[];
  partner: string;
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
  length?: number;
  items?: any;
  totalValueInCents: number;
  totalUnits: number;
  purchaseHistory?: IPurchaseHistoryItem[] | [];
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
  const theme = useTheme();
  const user = useUser();
  const router = useRouter();
  const {
    query: { tab },
    isReady,
    query,
  } = router;
  const tabs = ['Overview', 'Watchlist', 'Transactions'];
  const [{ isLoading, error, portfolio }, dispatch] = useReducer(
    portfolioReducer,
    initialPortfolioListState,
  );
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('');
  const [stats, setStats] = useState<IPortfolioData | undefined>();
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);

  const handlePortfolioDataFetch = (tab: string | string[] | undefined) => {
    dispatch({ type: 'fetching' });

    switch (tab) {
      case 'overview' || null: {
        return getPortfolioAssets()
          .then((data) => {
            dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
          })
          .catch((error) => {
            dispatch({ type: 'error', error });
          });
        break;
      }
      case 'watchlist': {
        return getPortfolioWatchlistAssets()
          .then((data) => {
            dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
          })
          .catch((error) => {
            dispatch({ type: 'error', error });
          });
        break;
      }
      case 'transactions': {
        return dispatch({ type: 'success', payload: [] as unknown as IPortfolioData });
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

  useEffect(() => {
    if (user) {
      void handleStatsDataFetch();
      if (isReady) {
        const queryString = tab as string;
        setActivePortfolioCategory(queryString ? queryString : 'overview');
        void handlePortfolioDataFetch(queryString);
      }
    }
  }, [activePortfolioCategory, isReady, query, tab, user]);

  const portfolioAssetsList = [];

  if (Object.keys(portfolio).includes('meta')) {
    portfolio.items.flatMap((item: { category: string }) => {
      item.category = activePortfolioCategory;
    });
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

  const handleClosingDrawer = () => {
    setIsOpen(false);
  };

  const handleDrawer = (asset?: IAsset) => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (isOpen && tradePanelData && asset?.id === tradePanelData.id) {
      setIsOpen(false);
    }
    if (Object.keys(portfolio).includes('statusCode')) {
      setIsOpen(false);
    }
    setTradePanelData(asset);
  };

  if (!user) {
    return (
      <PageContainer>
        <Box height="35vw">
          <Loader />;
        </Box>
        <LoginModal open={true} noDismiss={true} />
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <PortfolioHeaderTabs
          tabs={tabs}
          activePortfolioCategory={activePortfolioCategory}
          OnClick={handleClosingDrawer}
        />
        <PortfolioStats portfolio={stats} />
        <Box
          display="flex"
          height="15vh"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          sx={{
            padding: '150px',
            [theme.breakpoints.down('md')]: {
              padding: '100px 0 138px 0',
            },
          }}
        >
          <Loader />;
        </Box>
      </Grid>
    );
  }

  if (error !== '') {
    return (
      <div>
        <Grid>
          <OpenGraph title={'List view'} description={'List view page description'} />
          <PortfolioHeaderTabs
            tabs={tabs}
            activePortfolioCategory={activePortfolioCategory}
            OnClick={handleDrawer}
          />
          <Box>
            <PortfolioStats portfolio={stats} />
            <button
              onClick={() => {
                void handlePortfolioDataFetch(activePortfolioCategory);
              }}
            >
              Try again
            </button>
          </Box>
        </Grid>
      </div>
    );
  }
  if (!(portfolioAssetsList.length > 0)) {
    return (
      <>
        <PortfolioHeaderTabs
          tabs={tabs}
          activePortfolioCategory={activePortfolioCategory}
          OnClick={handleClosingDrawer}
        />
        <PortfolioStats portfolio={stats} />
        <Box
          display="flex"
          height="15vh"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          sx={{
            padding: '150px',
            [theme.breakpoints.down('md')]: {
              padding: '100px 0 138px 0',
            },
          }}
        >
          <Typography variant="xl3"> Nothing on {activePortfolioCategory}</Typography>
        </Box>
      </>
    );
  }
  return (
    <>
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <PortfolioHeaderTabs
          tabs={tabs}
          activePortfolioCategory={activePortfolioCategory}
          OnClick={handleClosingDrawer}
        />
        <Box>
          <PortfolioStats portfolio={stats} />
          <PortfolioAssetList
            portfolioAssetsList={portfolioAssetsList}
            handleDrawer={handleDrawer}
            closeDrawer={handleClosingDrawer}
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
      {Object.keys(portfolio).includes('statusCode') && <LoginModal open={true} noDismiss={true} />}
    </>
  );
};

export default PortfolioPage;
