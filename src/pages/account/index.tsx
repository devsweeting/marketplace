import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssets } from '@/api/endpoints/portfolio';
import React, { useEffect, useState } from 'react';
import type { IAsset, IPortfolioData } from '@/types';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { getAssetById } from '@/api/endpoints/assets';
import { useUser } from '@/helpers/hooks/useUser';
import { PortfolioHeaderTabs } from '@/components/PortfolioPage/PortfolioHeaderTabs/PortfolioHeaderTabs';
import { PortfolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
import { getWatchlist } from '@/api/endpoints/watchlist';

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
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('');
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const { dispatch: modalDispatch } = useModalContext();

  const handlePortfolioDataFetch = async (
    tab: string | string[] | undefined,
    isReady: boolean,
    signal?: AbortSignal,
  ) => {
    if (isReady) {
      switch (tab) {
        case 'overview' || null: {
          return await getPortfolioAssets(signal);
        }
        case 'watchlist': {
          return await getWatchlist(signal);
        }
        case 'transactions': {
          //TODO Add transactions when we generate sellOrders
          return [] as unknown as IPortfolioData;
        }
        default: {
          return await getPortfolioAssets(signal);
        }
      }
    }
  };

  const handleStatsDataFetch = async (signal: AbortSignal | undefined) => {
    if (user) {
      const assets = await getPortfolioAssets(signal);

      if (!assets) return;

      return assets;
    }
  };

  const [stats] = useEndpoint(
    (signal) => handleStatsDataFetch(signal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  useEffect(() => {
    if (isReady) {
      const queryString = tab as string;
      setActivePortfolioCategory(queryString ? queryString : 'overview');
    }
  }, [activePortfolioCategory, isReady, query, tab, user]);

  const [portfolio, loadingState, setPortfolio] = useEndpoint(
    (signal) => handlePortfolioDataFetch(tab, isReady, signal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePortfolioCategory, isReady, query, tab, user],
  );

  const portfolioAssetsList = [];

  if (!portfolio) {
    return null;
  }

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
    modalDispatch({ type: 'login', visible: true });
  }
  if (!stats) {
    return null;
  }
  if (loadingState === 'pending') {
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

  if (loadingState === 'error') {
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
            <Box display="flex" justifyContent="center" margin="30px">
              <Button
                variant="contained"
                onClick={() => {
                  void (async () => {
                    const data = await handlePortfolioDataFetch(activePortfolioCategory, isReady);
                    setPortfolio(data);
                  })();
                }}
              >
                Try again
              </Button>
            </Box>
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
      {Object.keys(portfolio).includes('statusCode') &&
        modalDispatch({ type: 'login', visible: true })}
    </>
  );
};

export default PortfolioPage;
