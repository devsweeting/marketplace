import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import type { IAsset, IMeta, IFilter, DisabledRanges, DisabledRangesKey } from 'src/types';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { loadListAssetByPage, latestDropAssets } from '@/api/endpoints/assets';
import { SortBy } from '@/domain/Category';
import { useRouter } from 'next/router';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { TradePanel } from '@/components/TradePanel';
import { AssetListView } from '@/containers/AssetListView';
import { SortMenu } from '@/components/NewFilters/components/SortMenu';
import { useExplorePageStyles } from '@/styles/explorePage.styles';
import { market } from '@/__mocks__/mockBrands';
import { useFilters } from '@/helpers/hooks/useFilters';
import { NewFilters } from '@/components/NewFilters';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { ClearAllFilter } from '@/components/NewFilters/components/ClearAllFilter';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import { queryBuilder } from '@/helpers/queryBuilder';

const ExplorePage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IAsset | undefined>();
  const searchQuery = query.q;
  const search = searchQuery ? searchQuery.toString().replace(/ /g, '+') : '';
  const {
    checkedFilters,
    rangeFilters,
    updateCheckedFilters,
    updateRangeFilters,
    clearQueryFilters,
    clearRangeFilters,
  } = useFilters();
  const [disabledRanges, setDisabledRanges] = useState<DisabledRanges>({
    Grade: true,
    Year: true,
  });
  const [sortType, setSortType] = useState<string>(SortBy.DESC);
  const classes = useExplorePageStyles();
  const [dropAssets, setDropAssets] = useState<IAsset[]>([]);
  const loadLatestDropAssets = useCallback(async (page = 1) => {
    const { items }: { items: IAsset[] } = await latestDropAssets({
      page,
    });
    setDropAssets((prev) => (page === 1 ? items : [...prev, ...items]));
  }, []);

  useEffect(() => {
    isReady ? setReady(true) : setReady(false);
    if (isReady) {
      loadLatestDropAssets(1).catch(() => {
        setAssets([]);
      });
    }
  }, [isReady, loadLatestDropAssets]);

  const loadAssets = useCallback(
    async (page = 1) => {
      const queryString = await queryBuilder({
        page,
        sortType,
        checkedFilters,
        rangeFilters,
        search,
      });

      const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
        queryString,
      });
      setAssets((prev) => (page === 1 ? items : [...prev, ...items]));
      setCurrentMeta(meta);
    },
    [checkedFilters, rangeFilters, search, sortType],
  );

  useEffect(() => {
    isReady ? setReady(true) : setReady(false);
    if (isReady) {
      loadAssets(1).catch(() => {
        setAssets([]);
      });
    }
  }, [isReady, loadAssets]);

  useEffect(() => {
    setDisabledRanges({
      Grade: !Object.keys(rangeFilters).includes('Grade'),
      Year: !Object.keys(rangeFilters).includes('Year'),
    });
  }, [rangeFilters]);

  const handleSortType = (sortBy: string) => {
    setSortType(sortBy);
  };

  const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const { name: filterId } = event.target;

    if (
      checkedFilters.find(
        (filter: IFilter) => filter.categoryId === categoryId && filter.filterId === filterId,
      )
    ) {
      const newcheckedFilters = checkedFilters.filter(
        (filter: IFilter) => !(filter.categoryId === categoryId && filter.filterId === filterId),
      );
      updateCheckedFilters(newcheckedFilters)
        .catch(() => {
          return;
        })
        .finally(() => {
          loadAssets(1).catch(() => {
            setAssets([]);
          });
        });
      return;
    }
    updateCheckedFilters([...checkedFilters, { filterId, categoryId }])
      .catch(() => {
        return;
      })
      .finally(() => {
        loadAssets(1).catch(() => {
          setAssets([]);
        });
      });
  };

  const clearAllSelectedFilters = () => {
    clearQueryFilters();
    setDisabledRanges({ Grade: true, Year: true });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDisabled = (key: DisabledRangesKey) => {
    setDisabledRanges({ ...disabledRanges, [key]: !disabledRanges[key] });
  };

  const handleRange = (id: string, val: any) => {
    void updateRangeFilters({
      ...rangeFilters,
      [id]: { min: val[0], max: val[1] },
    });
  };

  const removeFilterRange = (id: string) => {
    Object.keys(rangeFilters).length && clearRangeFilters(id);
    Object.keys(rangeFilters).length && delete rangeFilters[id];
  };

  const handleDrawer = (asset: IAsset) => {
    if (!isOpen) {
      setIsOpen(!isOpen);
    } else if (isOpen && data && asset.id === data.id) {
      setIsOpen(!isOpen);
    }
    setData(asset);
  };

  const filterProps = {
    handleFiltersChange,
    clearAllSelectedFilters,
    handleRange,
    removeFilterRange,
    checkedFilters,
    filterRanges: rangeFilters,
    disabledRanges,
    handleDisabled,
  };

  const sortListProps = {
    handleSortType,
    sortType,
  };

  if (!ready) {
    return null;
  }

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
          <FeaturedMarketCarousel assets={market} title={'Trending Markets'} />
          <Box className={isOpen ? classes.assetListOpen : classes.assetListClosed}>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  marginTop: '10px',
                  backgroundColor: 'white',
                  maxWidth: '1200px',
                  margin: 'auto',
                  borderRadius: '0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px 10px',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: 'auto',
                  }}
                >
                  <Typography
                    variant="h3"
                    component={'h3'}
                    sx={{ marginRight: 5, fontSize: '1.5rem', whiteSpace: 'nowrap' }}
                  >
                    Explore Drops
                  </Typography>
                  {mockCategoryFilters.map((filter, index) => (
                    <NewFilters
                      filterType={filter.filterType}
                      filter={filter}
                      {...filterProps}
                      key={index}
                    />
                  ))}
                  <ClearAllFilter
                    clearSelectedFilters={clearAllSelectedFilters}
                    isFilterButtonVisible={
                      checkedFilters.length || Object.keys(rangeFilters).length > 0
                    }
                  />
                  <SortMenu {...sortListProps} />
                </Box>
                <Divider />
              </Card>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="stretch">
              {assets && (
                <AssetListView
                  handleDrawer={handleDrawer}
                  assets={assets}
                  activeCardId={isOpen ? data?.id : ''}
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
        {data && (
          <TradePanel
            open={isOpen}
            asset={data}
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
