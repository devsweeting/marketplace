import React, { useState, useEffect, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import { listViewData, mockCategoryFilters } from '../../__mocks__/mockCategoryViewApiData';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { ClearAllFilter } from '../../components/FilterMenu/components/ClearAllFilter';
import { ListItem } from '../../components/ListItem';
import { FilterMenu } from '../../components/FilterMenu';
import { SortBy } from '../../domain/Category';
import { Button } from '../../components/Button';
import { MenuList } from '../../components/MenuList/';
import { useCategoryPageStyles } from '../../../styles/CategoryPage.styles';

const CategoryPage = () => {
  const classes = useCategoryPageStyles();
  const { skin } = useContext(SkinContext);
  const [checkedFilters, setcheckedFilters] = useState<any>([]);
  const [items, setItems] = useState(listViewData.assets);
  const [sortType, setSortType] = useState<string>(SortBy.LatestDate);

  const handleSortType = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    setSortType(id);
  };

  useEffect(() => {
    let sorted: any;
    if (sortType === SortBy.LowestPrice) {
      sorted = items.sort((a: any, b: any) => a.price.cryptoValue - b.price.cryptoValue);
    }
    if (sortType === SortBy.HighestPrice) {
      sorted = items.sort((a: any, b: any) => b.price.cryptoValue - a.price.cryptoValue);
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
      <Grid mt={15} container columnSpacing={4}>
        <Grid
          className={classes.hideOnMobile}
          container
          item
          md={3}
          xs={12}
          rowSpacing={2}
          sx={{
            backgroundColor: skin.listItem.filterBackgroundColor,
          }}
        >
          <Grid item xs={12}>
            <ClearAllFilter
              handleClick={clearAllSelectedFilters}
              isFilterButtonVisible={checkedFilters.length}
            />
            <FilterMenu
              categoriesList={mockCategoryFilters}
              handleFiltersChange={handleFiltersChange}
              checkedFilters={checkedFilters}
            />
          </Grid>
        </Grid>
        <Grid container item md={9} xs={12} rowSpacing={2}>
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
              <Typography variant="body1" component="p">
                {listViewData.asset_number === 1
                  ? `${listViewData.asset_number} asset`
                  : `${listViewData.asset_number} assets`}
              </Typography>
            </Box>
            <Box className={classes.hideOnMobile}>
              <MenuList handleSelect={handleSortType} />
            </Box>
          </Grid>
          <Grid>
            <ListItem listItemData={items} />
          </Grid>
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            <Button sx={{ width: '280px' }}>LOAD MORE</Button>
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
