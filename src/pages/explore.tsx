import * as React from 'react';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';
import type { IAsset, IMeta, IFilter, DisabledRanges, DisabledRangesKey } from 'src/types';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { loadListAssetByPage, latestDropAssets } from '@/api/endpoints/list';
import { SortBy } from '@/domain/Category';
import { useRouter } from 'next/router';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { TradePanel } from '@/components/TradePanel';
import { AssetListView } from '@/containers/AssetListView';
import { Filters } from '@/components/Filters';
import type { FilterSidebarProps } from '@/containers/CategoryListViewPage/FilterSidebar';
import type { SortListProps } from '@/containers/CategoryListViewPage/SortList';
import { SortMenu } from '@/components/Filters/components/SortMenu';
import { useExplorePageStyles } from '@/styles/explorePage.styles';
import { market } from '@/__mocks__/mockBrands';
import { useFilters } from '@/helpers/hooks/useFilters';
const ExplorePage: NextPage = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IAsset | undefined>();
  const searchQuery = useRouter().query.q;
  const search = searchQuery ? searchQuery.toString().replace(/ /g, '+') : '';
  const {
    checkedFilters,
    rangeFilters,
    updateCheckedFilters,
    updateRangeFilters,
    clearQueryFilters,
  } = useFilters();
  const [disabledRanges, setDisabledRanges] = useState<DisabledRanges>({
    Grade: true,
    Year: true,
  });
  const [sortType, setSortType] = useState<string>(SortBy.DESC);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const classes = useExplorePageStyles();
  const [dropAssets, setDropAssets] = useState<IAsset[]>([]);

  const loadLatestDropAssets = async (page = 1) => {
    const { items }: { items: IAsset[] } = await latestDropAssets({
      page,
    });
    setDropAssets((prev) => (page === 1 ? items : [...prev, ...items]));
  };

  useEffect(() => {
    loadLatestDropAssets(1);
  }, []);

  const loadAssets = async (page = 1) => {
    const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
      page,
      sort: sortType,
      filter: checkedFilters,
      filterRanges: rangeFilters,
      search,
    });
    setAssets((prev) => (page === 1 ? items : [...prev, ...items]));
    setCurrentMeta(meta);
  };

  useEffect(() => {
    loadAssets(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, checkedFilters, rangeFilters, disabledRanges, search]);

  const handleSortType = (sortBy: string) => {
    setSortType(sortBy);
  };

  const toggleVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
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
      updateCheckedFilters(newcheckedFilters);
      return;
    }
    updateCheckedFilters([...checkedFilters, { filterId, categoryId }]);
  };

  const clearAllSelectedFilters = () => {
    clearQueryFilters();
  };

  const handleDisabled = (key: DisabledRangesKey) => {
    setDisabledRanges({ ...disabledRanges, [key]: !disabledRanges[key] });
  };

  const handleRange = (id: string, val: any) => {
    updateRangeFilters({
      ...rangeFilters,
      [id]: { min: val[0], max: val[1] },
    });
  };

  const removeFilterRange = (id: string) => {
    rangeFilters && delete rangeFilters[id];
    updateRangeFilters({});
  };

  const handleDrawer = (asset: IAsset) => {
    if (!isOpen) {
      setIsOpen(!isOpen);
    } else if (isOpen && data && asset.id === data.id) {
      setIsOpen(!isOpen);
    }
    setData(asset);
  };

  const filterSidebarProps: FilterSidebarProps = {
    toggleVisibility,
    handleFiltersChange,
    clearAllSelectedFilters,
    handleRange,
    removeFilterRange,
    checkedFilters,
    filterRanges: rangeFilters,
    disabledRanges,
    handleDisabled,
  };

  const sortListProps: SortListProps = {
    toggleVisibility,
    handleSortType,
    sortType,
  };

  return (
    <>
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
                  {isSidebarVisible && <Filters {...filterSidebarProps} />}
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
                    loadAssets((currentMeta?.currentPage ?? 0) + 1);
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
    </>
  );
};

export default ExplorePage;
