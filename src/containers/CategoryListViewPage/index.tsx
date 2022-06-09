import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/styles';
import { useMediaQuery, Grid, Box, Typography, Divider } from '@mui/material';
import { ListItem } from '@/components/ListItem';
import { SortBy } from '@/domain/Category';
import { Button } from '@/components/Button';
import { MenuList } from '@/components/MenuList/';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';
import { loadListAssetByPage } from 'src/api/endpoints/list';
import type {
  IFilter,
  IAsset,
  IMeta,
  DisabledRanges,
  DisabledRangesKey,
} from 'src/types';
import type { FilterSidebarProps } from './FilterSidebar';
import { FilterSidebar } from './FilterSidebar';
import type { SortListProps } from './SortList';
import { SortList } from './SortList';
import { useFilters } from '@/helpers/hooks/useFilters';

export const CategoryListViewPage = () => {
  const classes = useCategoryPageStyles();
  const { checkedFilters, rangeFilters, updateCheckedFilters, updateRangeFilters } = useFilters();
  // const [checkedFilters, setCheckedFilters] = useState<any[]>([]);
  // const [filterRanges, setFilterRanges] = useState<RangeFilters>(null);
  const [disabledRanges, setDisabledRanges] = useState<DisabledRanges>({
    Grade: true,
    Year: true,
  });
  const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [listAssets, setListAssets] = useState<IAsset[]>([]);
  const [sortType, setSortType] = useState<string>(SortBy.DESC);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const searchQuery = useRouter().query.q;
  const search = searchQuery ? searchQuery.toString().replace(/ /g, '+') : '';

  const handleSortType = (sortBy: string) => {
    setSortType(sortBy);
  };

  const toggleVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
  };

  useEffect(() => {
    matchesDesktop ? setIsSidebarVisible(true) : setIsSidebarVisible(false);
  }, [matchesDesktop]);

  const loadListAssets = async (page = 1) => {
    const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
      page,
      sort: sortType,
      filter: checkedFilters,
      filterRanges: rangeFilters,
      search: search as string | undefined,
    });
    setListAssets((prev) => (page === 1 ? items : [...prev, ...items]));
    setCurrentMeta(meta);
  };

  useEffect(() => {
    loadListAssets(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, checkedFilters, rangeFilters, disabledRanges, search]);

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
    updateCheckedFilters([]);
    updateRangeFilters({});
    setDisabledRanges({ Grade: true, Year: true });
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
    <Box className={classes.wrapper}>
      <Grid
        sx={{ marginTop: { xs: 10, md: 15 } }}
        container
        // columnSpacing={4}
      >
        {isSidebarVisible && <FilterSidebar {...filterSidebarProps} />}
        <Grid container item md={9} xs={12} rowSpacing={2} className={classes.rightColumn}>
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box mt={6} className={classes.centerOnMobile}>
              <Typography variant="h2" component="h2" mb={1}>
                Explore
              </Typography>
              {!matchesDesktop && <SortList {...sortListProps} />}
              <Typography variant="body1" component="p">
                {currentMeta?.totalItems === 1 ? `1 asset` : `${currentMeta?.totalItems} assets`}
              </Typography>
            </Box>
            {matchesDesktop && (
              <Box mt={3}>
                <MenuList
                  handleSelect={handleSortType}
                  sortType={sortType}
                  buttonType="contained"
                  buttonSize="medium"
                />
              </Box>
            )}
          </Grid>
          <Grid>
            <ListItem listItemData={listAssets} />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            {listAssets.length < (currentMeta?.totalItems || 0) && (
              <Button
                sx={{ marginTop: { xs: '36px', md: '95px' } }}
                size="large"
                onClick={() => {
                  loadListAssets((currentMeta?.currentPage ?? 0) + 1);
                }}
              >
                LOAD MORE
              </Button>
            )}

            <Typography
              variant="body2"
              component="p"
              sx={{ margin: '24px 0 54px', textDecoration: 'none', color: 'rgba(0,0,0,0.6)' }}
            >
              Number of assets viewed:{' '}
              <Box component="span" sx={{ color: '#000', display: 'inline' }}>
                {listAssets.length} of {currentMeta?.totalItems}
              </Box>
            </Typography>
            <Divider
              sx={{ borderBottomWidth: 'medium', borderColor: '#000', paddingTop: '297px' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
