import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { ClearAllFilter } from '@/components/FilterMenu/components/ClearAllFilter';
import { FilterMenu } from '@/components/FilterMenu';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';

export interface FilterSidebarProps {
  toggleVisibility: (isVisible: boolean) => void;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  clearAllSelectedFilters: () => void;
  handleRange: () => void;
  checkedFilters: any;
  ranges: any;
}

const FilterSidebar = ({
  toggleVisibility,
  handleFiltersChange,
  clearAllSelectedFilters,
  handleRange,
  checkedFilters,
  ranges,
}: FilterSidebarProps) => {
  const classes = useCategoryPageStyles();
  const { skin } = useContext(SkinContext);

  console.log('range', ranges, 'checedfiltes', checkedFilters);
  return (
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
          isFilterButtonVisible={checkedFilters.length || ranges}
        />
        <FilterMenu
          categoriesList={mockCategoryFilters}
          handleFiltersChange={handleFiltersChange}
          handleRange={handleRange}
          checkedFilters={checkedFilters}
          ranges={ranges}
        />
      </Grid>
    </Grid>
  );
};

export default FilterSidebar;
