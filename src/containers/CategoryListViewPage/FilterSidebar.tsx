import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { ClearAllFilter } from '@/components/FilterMenu/components/ClearAllFilter';
import { FilterMenu } from '@/components/FilterMenu';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';
import { IFilter, RangeFilters } from 'src/types';

export interface FilterSidebarProps {
  toggleVisibility: (isVisible: boolean) => void;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  clearAllSelectedFilters: () => void;
  handleRange: (id: string, val: number[]) => void;
  removeFilterRange: (id: string) => void;
  checkedFilters: IFilter[];
  filterRanges: RangeFilters;
}

const FilterSidebar = ({
  toggleVisibility,
  handleFiltersChange,
  clearAllSelectedFilters,
  handleRange,
  removeFilterRange,
  checkedFilters,
  filterRanges,
}: FilterSidebarProps) => {
  const classes = useCategoryPageStyles();
  const { skin } = useContext(SkinContext);

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
          isFilterButtonVisible={!!checkedFilters.length || !!filterRanges}
        />
        <FilterMenu
          categoriesList={mockCategoryFilters}
          handleFiltersChange={handleFiltersChange}
          handleRange={handleRange}
          removeFilterRange={removeFilterRange}
          checkedFilters={checkedFilters}
          filterRanges={filterRanges}
        />
      </Grid>
    </Grid>
  );
};

export default FilterSidebar;
