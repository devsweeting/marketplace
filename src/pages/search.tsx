import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import { IAsset } from 'src/types';
import type { IMeta } from 'src/types';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { loadListAssetByPage, getAssetById } from '@/api/endpoints/assets';
import { useRouter } from 'next/router';
import { TradePanel } from '@/components/TradePanel';
import { AssetListView } from '@/containers/AssetListView';
import { useExplorePageStyles } from '@/styles/explorePage.styles';
import { useFilters } from '@/helpers/hooks/useFilters';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { queryBuilder } from '@/helpers/queryBuilder';
import { FilterWrapper } from '@/components/FilterWrapper';
const SearchPage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const searchQuery = query.q;
  const search = searchQuery ? searchQuery.toString().replace(/ /g, '+') : '';
  const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [isOpen, setIsOpen] = useState(false);
  const [tradePanelData, setTradePanelData] = useState<IAsset | undefined>();
  const { checkedFilters, rangeFilters, sortByOrder } = useFilters();
  const classes = useExplorePageStyles();

  useEffect(() => {
    if (!assets.length) {
      setIsOpen(false);
    }
  }, [assets]);

  const loadAssets = useCallback(
    async (page = 1) => {
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
        });
        setAssets((prev) => (page === 1 ? items : [...prev, ...items]));
        setCurrentMeta(meta);
      }
    },
    [checkedFilters, rangeFilters, sortByOrder, search],
  );

  useEffect(() => {
    setReady(isReady);
    if (isReady) {
      loadAssets(1).catch(() => {
        setAssets([]);
      });
    }
  }, [isReady, loadAssets, sortByOrder]);

  const handleDrawer = (asset: IAsset) => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (isOpen && tradePanelData && asset.id === tradePanelData.id) {
      setIsOpen(false);
    }
    setTradePanelData(asset);
  };

  const handleButtonClick = () => {
    loadAssets((currentMeta?.currentPage ?? 0) + 1).catch(() => {
      setAssets([]);
    });
  };

  if (!ready) {
    return null;
  }

  const updateAsset = (assetId: string): void => {
    Promise <
      { data: IAsset } >
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
                  onClick={handleButtonClick}
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

export default SearchPage;
