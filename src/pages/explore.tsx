import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import type { IAsset, IMeta, IMarket } from 'src/types';
import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useEffect, useState, useCallback } from 'react';
import {
  loadListAssetByPage,
  latestDropAssets,
  getAssetById,
  trendingMarkets,
} from '@/api/endpoints/assets';
import { useRouter } from 'next/router';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { TradePanel } from '@/components/TradePanel';
import { AssetListView } from '@/containers/AssetListView';
import { useFilters } from '@/helpers/hooks/useFilters';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { queryBuilder } from '@/helpers/queryBuilder';
import { FilterWrapper } from '@/components/FilterWrapper';
import { AssetListFooter } from '@/styles/explorePage.styles';
import { useUser } from '@/helpers/hooks/useUser';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useCart } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
const ExplorePage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { openCart } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const [activeBrandCard, setActiveBrandCard] = useState<string>('');
  const {
    checkedFilters,
    rangeFilters,
    brandFilters,
    clearTrendingFilter,
    updateBrandFilters,
    sortByOrder,
  } = useFilters();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user && cartItems.length > 0) {
        if (cartItems[0].id) {
          openCart();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, cartItems.length, user]);

  useEffect(() => {
    if (Object.keys(query).length > 0 && !Object.keys(query).includes('attr_eq[brand]')) {
      setActiveBrandCard('');
    }
  }, [query]);

  const loadAssets = useCallback(
    async (page = 1, signal?: AbortSignal | undefined) => {
      if (isReady) {
        const queryString = await queryBuilder({
          page,
          sortType: sortByOrder,
          checkedFilters,
          rangeFilters,
        });

        if (queryString) {
          const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
            queryString,
            signal,
          });
          return { currentMeta: meta, assets: items };
        }
      }
    },
    [checkedFilters, isReady, rangeFilters, sortByOrder],
  );

  const loadLatestDropAssets = useCallback(
    async (page = 1, signal?: AbortSignal | undefined) => {
      if (isReady) {
        const { items }: { items: IAsset[] } = await latestDropAssets({
          page,
          signal,
        });
        return items;
      }
    },
    [isReady],
  );

  const loadTrendingMarkets = useCallback(
    async (signal?: AbortSignal | undefined) => {
      if (isReady) {
        const { markets }: { markets: IMarket[] } = await trendingMarkets(signal);
        return markets;
      }
    },
    [isReady],
  );

  const [
    assetData = {
      currentMeta: { currentPage: 0, itemCount: 0, itemsPerPage: 0, totalItems: 0, totalPages: 0 },
      assets: [],
    },
    assetLoadingState,
    setAssetData,
  ] = useEndpoint((signal) => loadAssets(1, signal), [loadAssets]);

  const [dropAssets = [], dropAssetsLoadingState] = useEndpoint(
    (signal) => loadLatestDropAssets(1, signal),
    [loadLatestDropAssets],
  );

  const [trendingMarket = []] = useEndpoint(
    (signal) => loadTrendingMarkets(signal),
    [loadTrendingMarkets],
  );

  if (!assetData || !dropAssets || !trendingMarket) {
    return null;
  }

  const handleDrawer = (asset: IAsset) => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (isOpen && tradePanelData && asset.id === tradePanelData.id) {
      setIsOpen(false);
    }
    setTradePanelData(asset);
  };

  const handleApplyBrandFilter = (filter: string, brand: IMarket) => {
    if (Object.keys(filter).length) {
      const filterValue = filter.split('=')?.[1];
      if (
        !brandFilters.some((filter) => filter.filterId === filterValue) &&
        !brandFilters.some((filter) => filter.categoryId === 'brand')
      ) {
        void updateBrandFilters([{ filterId: filterValue, categoryId: 'brand' }]);
        setActiveBrandCard(brand.brand);
      }
      clearTrendingFilter(filterValue)
        ?.then(() => setActiveBrandCard(''))
        .catch(() => {
          return;
        });
    }
    return;
  };

  const updateAsset = (assetId: string): void => {
    const fetchAsset = async (id: string) => {
      const asset = await getAssetById(id);

      if (!asset) return;

      const tempAssets: IAsset[] = assetData?.assets;
      tempAssets[tempAssets.findIndex((asset) => asset.id === assetId)] = asset;
      setAssetData({ currentMeta: assetData?.currentMeta, assets: tempAssets });

      setTradePanelData(asset);
    };

    // eslint-disable-next-line no-console
    fetchAsset(assetId).catch(console.error);
  };
  const handleLoadMore = () => {
    void (async () => {
      const data = await loadAssets(assetData.currentMeta.currentPage + 1);
      if (!data) return null;
      setAssetData({
        currentMeta: data?.currentMeta,
        assets: [...assetData.assets, ...data.assets],
      });
    })();
  };
  return (
    <ClientOnly>
      <OpenGraph title="Explore" description={'List view page description'} />

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
        <Grid container item>
          {dropAssetsLoadingState === 'success' && (
            <FeaturedMarketCarousel
              assets={dropAssets}
              title={'Latest Drop'}
              handleDrawer={handleDrawer}
            />
          )}

          {trendingMarket.length > 0 && (
            <FeaturedMarketCarousel
              handleApplyBrandFilter={handleApplyBrandFilter}
              activeBrandCard={activeBrandCard}
              assets={trendingMarket}
              title={'Trending Markets'}
            />
          )}

          <Box>
            <FilterWrapper />
            <Grid container direction="row" justifyContent="center" alignItems="stretch">
              {assetData.assets && assetLoadingState === 'success' && (
                <AssetListView
                  handleDrawer={handleDrawer}
                  assets={assetData.assets}
                  activeCardId={isOpen ? tradePanelData?.id : ''}
                />
              )}
            </Grid>
            <AssetListFooter>
              {assetData.assets.length < (assetData.currentMeta?.totalItems || 0) && (
                <Button size="large" variant="contained" onClick={handleLoadMore}>
                  LOAD MORE
                </Button>
              )}

              <Typography
                variant="body2"
                component="p"
                sx={{
                  textDecoration: 'none',
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                Number of assets viewed:{' '}
                <Box component="span" sx={{ color: '#000', display: 'inline' }}>
                  {assetData.assets.length} of {assetData.currentMeta?.totalItems}
                </Box>
              </Typography>
            </AssetListFooter>
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
      </Grid>
    </ClientOnly>
  );
};

export default ExplorePage;
