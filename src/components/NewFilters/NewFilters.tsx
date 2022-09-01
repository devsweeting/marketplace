import type { DisabledRanges, DisabledRangesKey, IFilter, RangeFilters } from '@/types/assetTypes';
import { Box } from '@mui/material';
import React from 'react';
import { CheckboxFilter } from './components/CheckboxFilter';
import { RangeFilter } from './components/RangeFilter';
import { useNewFiltersStyles } from './NewFilters.styles';

export const NewFilters = ({
  handleFiltersChange,
  handleRange,
  removeFilterRange,
  checkedFilters,
  filterRanges,
  disabledRanges,
  handleDisabled,
  filterType,
  filter,
}: {
  filter:
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        filters: string[];
        range?: undefined;
      }
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        range: string[];
        filters?: undefined;
      };
  filterType: string;
  handleDisabled: (key: DisabledRangesKey) => void;
  checkedFilters: IFilter[];
  filterRanges: RangeFilters;
  disabledRanges: DisabledRanges;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  removeFilterRange: (id: string) => void;
  handleRange: (id: string, val: number[]) => void;
}) => {
  const classes = useNewFiltersStyles();
  const checkboxFilterProps = {
    handleFiltersChange,
    checkedFilters,
  };

  const rangeFilterProps = {
    handleFiltersChange,
    handleRange,
    removeFilterRange,
    filterRanges,
    disabledRanges,
    handleDisabled,
  };

  switch (filterType) {
    case 'slider':
      return (
        <Box className={classes.filterBoxes}>
          <RangeFilter filter={filter} {...rangeFilterProps} />
        </Box>
      );
    case 'checkbox':
      return (
        <Box className={classes.filterBoxes}>
          <CheckboxFilter filter={filter} {...checkboxFilterProps} />
        </Box>
      );
    default:
      return <></>;
  }
};
