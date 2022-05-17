import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { listViewData } from '@/__mocks__/mockCategoryViewApiData';
import { ListItem } from '@/components/ListItem';
import { SortBy } from '@/domain/Category';
import { Button } from '@/components/Button';
import { MenuList } from '@/components/MenuList/';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';
import { loadListAssetByPage } from 'src/api/endpoints/list';
import { IFilter, IAsset, IMeta } from 'src/types';
import FilterSidebar, { FilterSidebarProps } from './FilterSidebar';
import SortList, { SortListProps } from './SortList';

const CategoryListView = () => {
  const classes = useCategoryPageStyles();
  const [checkedFilters, setcheckedFilters] = useState<IFilter[]>([]);
  const [currentMeta, setCurrentMeta] = useState<IMeta>();
  const [listAssets, setListAssets] = useState<IAsset[]>([]);
  const [sortType, setSortType] = useState<string>(SortBy.LatestDate);
  const [isSidebarVisible, setSidebarVisible] = React.useState<boolean>(false);
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const handleSortType = (id: string) => {
    setSortType(id);
  };

  const toggleVisibility = (isVisible: boolean) => {
    setSidebarVisible(isVisible);
  };

  useEffect(() => {
    matchesDesktop ? setSidebarVisible(true) : setSidebarVisible(false);
  }, [matchesDesktop]);
  const loadListAssets = async (page: number = 1) => {
    const { meta, items } = await loadListAssetByPage({
      page,
      sort: sortType,
      filter: checkedFilters
    });
    setListAssets(prev => (page === 1 ? items : [...prev, ...items]));
    setCurrentMeta(meta);
    console.log(meta, items);
  }
  useEffect(() => {
    loadListAssets(1);
  }, [sortType, checkedFilters]);

  const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const { name: filterId } = event.target;

    if (checkedFilters.find((filter: IFilter) => filter.categoryId === categoryId && filter.filterId === filterId)) {
      const newcheckedFilters = checkedFilters.filter((filter: IFilter) => !(filter.categoryId === categoryId && filter.filterId === filterId));
      setcheckedFilters(newcheckedFilters);
      return;
    }
    setcheckedFilters([
      ...checkedFilters, 
      {filterId, categoryId}
    ]);
  };

  const clearAllSelectedFilters = () => {
    setcheckedFilters([]);
  };

  const filterSidebarProps: FilterSidebarProps = {
    toggleVisibility,
    handleFiltersChange,
    clearAllSelectedFilters,
    checkedFilters
  };

  const sortListProps: SortListProps = {
    toggleVisibility,
    handleSortType
  };

  return (
    <Box className={classes.wrapper}>
      <Grid
        mt={15}
        container
        // columnSpacing={4}
      >
        {isSidebarVisible && (
          <FilterSidebar 
            {...filterSidebarProps}
          />
        )}
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
              {!matchesDesktop && (
                <SortList 
                  {...sortListProps}
                />
              )}
              <Typography variant="body1" component="p">
                {currentMeta?.totalItems && (currentMeta?.totalItems === 1
                  ? `${currentMeta?.totalItems} asset`
                  : `${currentMeta?.totalItems} assets`)}
              </Typography>
            </Box>
            {matchesDesktop && (
              <Box
                mt={3}
                // className={classes.hideOnMobile}
              >
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
            {(listAssets.length < (currentMeta?.totalItems || 0)) &&
              <Button 
                sx={{ marginTop: { xs: '36px', md: '95px' } }} 
                size="large" 
                onClick={
                  () => loadListAssets(currentMeta?.currentPage || 0 + 1)
                }
              >
                LOAD MORE
              </Button>
            }
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
            <Divider sx={{ borderBottomWidth: 'medium', borderColor: '#000' }} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryListView;
