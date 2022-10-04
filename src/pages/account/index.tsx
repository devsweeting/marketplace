import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssets, getPortfolioWatchlistAssets } from '@/api/endpoints/portfolio';
import React, { useEffect, useReducer, useState } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { PortFolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';
import { Box, Card, Grid, Typography } from '@mui/material';
import { NoDismissLogin } from '@/components/LoginModal';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { getAssetById } from '@/api/endpoints/assets';
import { useUser } from '@/helpers/hooks/useUser';
import Link from 'next/link';
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
      case 'overview': {
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
      if (isReady && Object.keys(query).length > 0) {
        const queryString = tab as string;
        setActivePortfolioCategory(queryString);
        void handlePortfolioDataFetch(queryString);
      }
    }
  }, [activePortfolioCategory, isReady, query, tab, user]);

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
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <Grid
          sx={{
            marginTop: 10,
            backgroundColor: '#fff',
            width: '100%',

            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          container
        >
          <Card
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Box>
              <Typography
                component="h2"
                variant="h2"
                style={{
                  margin: 0,
                  padding: '24px',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '32px',
                }}
              >
                Portfolio
              </Typography>
            </Box>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginRight: '20px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                {tabs.map((header, index) => (
                  <Link
                    key={index}
                    href={{ pathname: '/account', query: { tab: header.toLocaleLowerCase() } }}
                  >
                    <Box
                      sx={{
                        padding: '24px 16px',
                        borderBottom:
                          activePortfolioCategory === header.toLocaleLowerCase()
                            ? '2px solid black'
                            : '2px solid transparent',
                        '&: hover': { cursor: 'pointer' },
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h2"
                        style={{
                          margin: 0,
                          padding: '0',
                          fontWeight: '600',
                          fontSize: '16px',
                          lineHeight: '32px',
                          color:
                            activePortfolioCategory === header.toLocaleLowerCase()
                              ? 'black'
                              : '#6B7280',
                        }}
                      >
                        {header}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Card>
        </Grid>
        <Box height="35vw">
          <Loader />;
        </Box>
      </Grid>
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
  if (!user) {
    return (
      <>
        <NoDismissLogin />
      </>
    );
  }
  return (
    <>
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <Grid
          sx={{
            marginTop: 10,
            backgroundColor: '#fff',
            width: '100%',

            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          container
        >
          <Card
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Box>
              <Typography
                component="h2"
                variant="h2"
                style={{
                  margin: 0,
                  padding: '24px',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '32px',
                }}
              >
                Portfolio
              </Typography>
            </Box>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginRight: '20px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                {tabs.map((header, index) => (
                  <Link
                    key={index}
                    href={{ pathname: '/account', query: { tab: header.toLocaleLowerCase() } }}
                  >
                    <Box
                      sx={{
                        padding: '24px 16px',
                        borderBottom:
                          activePortfolioCategory === header.toLocaleLowerCase()
                            ? '2px solid black'
                            : '2px solid transparent',
                        '&: hover': { cursor: 'pointer' },
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h2"
                        style={{
                          margin: 0,
                          padding: '0',
                          fontWeight: '600',
                          fontSize: '16px',
                          lineHeight: '32px',
                          color:
                            activePortfolioCategory === header.toLocaleLowerCase()
                              ? 'black'
                              : '#6B7280',
                        }}
                      >
                        {header}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Card>
        </Grid>
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
