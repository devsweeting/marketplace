import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import type { IAsset, IMeta, IMarket } from 'src/types';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
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
import { useExplorePageStyles } from '@/styles/explorePage.styles';
import { useFilters } from '@/helpers/hooks/useFilters';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { queryBuilder } from '@/helpers/queryBuilder';
import { FilterWrapper } from '@/components/FilterWrapper';
const ExplorePage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [trendingMarket, setTrendingMarket] = useState<IMarket[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  const [currentMeta, setCurrentMeta] = useState<IMeta>();
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
  const classes = useExplorePageStyles();
  const [dropAssets, setDropAssets] = useState<IAsset[]>([]);
  const loadLatestDropAssets = useCallback(async (page = 1) => {
    const { items }: { items: IAsset[] } = await latestDropAssets({
      page,
    });
    setDropAssets((prev) => (page === 1 ? items : [...prev, ...items]));
  }, []);

  useEffect(() => {
    if (!assets.length && !dropAssets.length) {
      setIsOpen(false);
    }
  }, [assets, dropAssets]);

  const loadAssets = useCallback(
    async (page = 1) => {
      const queryString = await queryBuilder({
        page,
        sortType: sortByOrder,
        checkedFilters,
        rangeFilters,
      });

      const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
        queryString,
      });
      setAssets((prev) => (page === 1 ? items : [...prev, ...items]));
      setCurrentMeta(meta);
    },
    [checkedFilters, rangeFilters, sortByOrder],
  );

  const loadTrendingMarkets = useCallback(async () => {
    const { markets }: { markets: IMarket[] } = await trendingMarkets();
    setTrendingMarket(markets);
  }, []);

  useEffect(() => {
    isReady ? setReady(true) : setReady(false);
    if (isReady) {
      loadTrendingMarkets().catch(() => {
        setTrendingMarket([]);
      });
      loadAssets(1).catch(() => {
        setAssets([]);
      });
      loadLatestDropAssets().catch(() => {
        setDropAssets([]);
      });
    }
  }, [isReady, loadAssets, loadLatestDropAssets, loadTrendingMarkets]);

  useEffect(() => {
    if (Object.keys(query).length > 0 && !Object.keys(query).includes('attr_eq[brand]')) {
      setActiveBrandCard('');
    }
  }, [query]);

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

  if (!ready) {
    return null;
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

  return (
    <ClientOnly>
      <OpenGraph title={'List view'} description={'List view page description'} />

      <Grid sx={{ marginTop: 10, backgroundColor: '#f0f0f0' }} container>
        <Grid container item>
          <FeaturedMarketCarousel
            assets={dropAssets}
            title={'Latest Drop'}
            handleDrawer={handleDrawer}
          />
          <FeaturedMarketCarousel
            handleApplyBrandFilter={handleApplyBrandFilter}
            activeBrandCard={activeBrandCard}
            assets={trendingMarket}
            title={'Trending Markets'}
          />
          <Box className={isOpen ? classes.assetListOpen : classes.assetListClosed}>
            <FilterWrapper />
            <Grid container direction="row" justifyContent="center" alignItems="stretch">
              {assets && (
                <AssetListView
                  handleDrawer={handleDrawer}
                  assets={assets}
                  activeCardId={isOpen ? tradePanelData?.id : ''}
                />
              )}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {assets.length < (currentMeta?.totalItems || 0) && (
                <Button
                  sx={{ marginTop: { xs: '36px', md: '95px' } }}
                  size="large"
                  onClick={() => {
                    loadAssets((currentMeta?.currentPage ?? 0) + 1).catch(() => {
                      setAssets([]);
                    });
                  }}
                >
                  LOAD MORE
                </Button>
              )}

              <Typography
                variant="body2"
                component="p"
                sx={{
                  margin: '24px 0 54px',
                  textDecoration: 'none',
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                Number of assets viewed:{' '}
                <Box component="span" sx={{ color: '#000', display: 'inline' }}>
                  {assets.length} of {currentMeta?.totalItems}
                </Box>
              </Typography>
              <Divider
                sx={{ borderBottomWidth: 'medium', borderColor: '#000', paddingTop: '297px' }}
              />
            </Grid>
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
