import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import type { IAsset } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { loadListAssetByPage, getAssetById } from '@/api/endpoints/assets';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { AssetListView } from '@/containers/AssetListView';
import { useFilters } from '@/helpers/hooks/useFilters';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { queryBuilder } from '@/helpers/queryBuilder';
import { FilterWrapper } from '@/components/FilterWrapper';
import { AssetListFooter } from '@/styles/explorePage.styles';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
import { useUser } from '@/helpers/hooks/useUser';
import type { CartItem } from '@/helpers/auth/CartContext';
import { useCart } from '@/helpers/auth/CartContext';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const user = useUser();
  const { openCart } = useCart();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  // const [assets, setAssets] = useState<IAsset[]>([]);
  const searchQuery = query.q;
  const search = searchQuery ? searchQuery.toString().replace(/ /g, '+') : '';
  // const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [isOpen, setIsOpen] = useState(false);
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const { checkedFilters, rangeFilters, sortByOrder } = useFilters();

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

  const loadAssets = useCallback(
    async (page = 1, signal?: AbortSignal | undefined) => {
      if (isReady) {
        const queryString = await queryBuilder({
          page,
          sortType: sortByOrder,
          checkedFilters,
          rangeFilters,
          search,
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
    [checkedFilters, isReady, rangeFilters, search, sortByOrder],
  );

  const [
    assetData = {
      currentMeta: { currentPage: 0, itemCount: 0, itemsPerPage: 0, totalItems: 0, totalPages: 0 },
      assets: [],
    },
    assetLoadingState,
    setAssetData,
  ] = useEndpoint((signal) => loadAssets(1, signal), [loadAssets]);

  if (!assetData) {
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

  const handleButtonClick = () => {
    void (async () => {
      const data = await loadAssets(assetData.currentMeta.currentPage + 1);
      if (!data) return null;
      setAssetData({
        currentMeta: data?.currentMeta,
        assets: [...assetData.assets, ...data.assets],
      });
    })();
  };

  if (!isReady) {
    return null;
  }

  const updateAsset = (assetId: string): void => {
    const fetchAsset = async (id: string) => {
      const asset = await getAssetById(id);

      if (!asset) return;

      const tempAssets = assetData?.assets;
      tempAssets[tempAssets.findIndex((asset) => asset.id === assetId)] = asset;
      setAssetData({ currentMeta: assetData?.currentMeta, assets: tempAssets });
      setTradePanelData(asset);
    };

    // eslint-disable-next-line no-console
    fetchAsset(assetId).catch(console.error);
  };

  return (
    <ClientOnly>
      <OpenGraph title="Search" description={'List view page description'} />

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
          <Box>
            <FilterWrapper />
            <Grid container direction="row" justifyContent="center" alignItems="stretch">
              {assetLoadingState === 'success' && (
                <AssetListView
                  handleDrawer={handleDrawer}
                  assets={assetData.assets}
                  activeCardId={isOpen ? tradePanelData?.id : ''}
                />
              )}
            </Grid>
            <AssetListFooter>
              {assetData.assets.length < (assetData.currentMeta?.totalItems || 0) && (
                <Button size="large" onClick={handleButtonClick} variant="contained">
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

export default SearchPage;
