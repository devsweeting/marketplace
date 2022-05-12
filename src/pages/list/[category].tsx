import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { listViewData, mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { ClearAllFilter } from '@/components/FilterMenu/components/ClearAllFilter';
import { ListItem } from '@/components/ListItem';
import { FilterMenu } from '@/components/FilterMenu';
import { SortBy } from '@/domain/Category';
import { Button } from '@/components/Button';
import { MenuList } from '@/components/MenuList/';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';

const CategoryPage = () => {
  const classes = useCategoryPageStyles();
  const { skin } = useContext(SkinContext);
  const [checkedFilters, setcheckedFilters] = useState<any>([]);
  const [items, setItems] = useState(listViewData.assets);
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

  useEffect(() => {
    let sorted: any;
    if (sortType === SortBy.LowestPrice) {
      sorted = items.sort((a: any, b: any) => b.price.cryptoValue - a.price.cryptoValue);
    }
    if (sortType === SortBy.HighestPrice) {
      sorted = items.sort((a: any, b: any) => a.price.cryptoValue - b.price.cryptoValue);
    }
    if (sortType === SortBy.LatestDate) {
      sorted = items.sort((a, b) => Date.parse(a.create_date) - Date.parse(b.create_date));
    }
    setItems(sorted);
  }, [sortType, items]);

  const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: filterName } = event.target;

    if (checkedFilters.includes(filterName)) {
      const newcheckedFilters = checkedFilters.filter((el: string) => el !== filterName);
      setcheckedFilters(newcheckedFilters);
      return;
    }
    setcheckedFilters([...checkedFilters, filterName]);
  };

  const clearAllSelectedFilters = () => {
    const clearedFilters: string[] = [];
    setcheckedFilters(clearedFilters);
  };

  return (
    <Box className={classes.wrapper}>
      <Grid
        mt={15}
        container
        // columnSpacing={4}
      >
        {isSidebarVisible && (
          <Grid
            className={classes.leftColumn}
            container
            item
            md={3}
            xs={12}
            rowSpacing={2}
            // pl={12}
            sx={{
              backgroundColor: skin.listItem.filterBackgroundColor,
            }}
          >
            <Grid item xs={12}>
              <ClearAllFilter
                clearSelectedFilters={clearAllSelectedFilters}
                toggleVisibility={toggleVisibility}
                isFilterButtonVisible={checkedFilters.length}
              />
              <FilterMenu
                categoriesList={mockCategoryFilters}
                handleFiltersChange={handleFiltersChange}
                checkedFilters={checkedFilters}
              />
            </Grid>
          </Grid>
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
                <Box
                  className={classes.hideOnDesktop}
                  my={2}
                  sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                >
                  <Button
                    onClick={() => toggleVisibility(true)}
                    endIcon={<SettingsIcon />}
                    variant="contained"
                    size="small"
                  >
                    Filter
                  </Button>

                  <MenuList
                    handleSelect={handleSortType}
                    buttonType="outlined"
                    buttonSize="medium"
                  />
                </Box>
              )}
              <Typography variant="body1" component="p">
                {listViewData.asset_number === 1
                  ? `${listViewData.asset_number} asset`
                  : `${listViewData.asset_number} assets`}
              </Typography>
            </Box>
            {matchesDesktop && (
              <Box
                mt={3}
                // className={classes.hideOnMobile}
              >
                <MenuList
                  handleSelect={handleSortType}
                  buttonType="contained"
                  buttonSize="medium"
                />
              </Box>
            )}
          </Grid>
          <Grid>
            <ListItem listItemData={items} />
          </Grid>
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            <Button sx={{ marginTop: { xs: '36px', md: '95px' } }} size="large">
              LOAD MORE
            </Button>
            <Typography
              variant="body2"
              component="p"
              sx={{ margin: '24px 0 54px', textDecoration: 'none', color: 'rgba(0,0,0,0.6)' }}
            >
              Number of assets viewed:{' '}
              <Box component="span" sx={{ color: '#000', display: 'inline' }}>
                24 of 140
              </Box>
            </Typography>
            <Divider sx={{ borderBottomWidth: 'medium', borderColor: '#000' }} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
