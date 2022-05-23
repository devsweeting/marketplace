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

interface FilterSidebarProps {
  toggleVisibility: (isVisible: boolean) => void;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearAllSelectedFilters: () => void;
  checkedFilters: any;
}
const FilterSidebar = ({
  toggleVisibility,
  handleFiltersChange,
  clearAllSelectedFilters,
  checkedFilters,
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
          isFilterButtonVisible={checkedFilters.length}
        />
        <FilterMenu
          categoriesList={mockCategoryFilters}
          handleFiltersChange={handleFiltersChange}
          checkedFilters={checkedFilters}
        />
      </Grid>
    </Grid>
  );
};

export default FilterSidebar;
