import React, { useState, useEffect, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import { listViewData, mockCategoryFilters } from '../../__mocks__/mockCategoryViewApiData';
import { Grid, Box, Typography } from '@mui/material';
import { BorderBox } from '../../components/BorderBox/BorderBox';
import { ClearAllFilter } from '../../components/FilterMenu/components/ClearAllFilter';
import { ListItem } from '../../components/ListItem';
import { DropDownList } from '../../components/DropDownList';
import { FilterMenu } from '../../components/FilterMenu';
import { SelectChangeEvent } from '@mui/material/Select';
import { SortBy } from '../../domain/Category';
import { Button } from '../../components/Button';

const CategoryPage = () => {
  const { skin } = useContext(SkinContext);
  const [checkedFilters, setcheckedFilters] = useState<any>([]);
  const [items, setItems] = useState(listViewData.assets);
  const [sortType, setSortType] = useState<string>(SortBy.LatestDate);

  const handleSortType = (e: SelectChangeEvent) => {
    setSortType(e.target.value);
  };

  // useEffect(() => {
  //   console.log(checkedFilters);
  // }, [checkedFilters]);

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
    <Box sx={{ maxWidth: 1440, margin: '0 auto', marginTop: '0', padding: '0 8px' }}>
      <Grid
        mt={15}
        container
        columnSpacing={4}
        // direction="row"
        // justifyContent="center"
        // alignItems="flex-start"
      >
        <Grid
          container
          item
          md={3}
          xs={12}
          rowSpacing={2}
          sx={{ backgroundColor: skin.listItem.filterBackgroundColor }}
        >
          <Grid item xs={12}>
            <BorderBox bottom={4} right={4}>
              <ClearAllFilter
                handleClick={clearAllSelectedFilters}
                isFilterButtonVisible={checkedFilters.length}
              />
            </BorderBox>
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
            <Box mt={6}>
              <Typography variant="h2" component="h2" mb={1}>
                Explore
              </Typography>
              <Typography variant="body1" component="p">
                {listViewData.asset_number === 1
                  ? `${listViewData.asset_number} asset`
                  : `${listViewData.asset_number} assets`}
              </Typography>
            </Box>
            <DropDownList handleSelect={handleSortType} />
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
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
