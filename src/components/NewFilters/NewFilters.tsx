import type { DisabledRanges, DisabledRangesKey, IFilter, RangeFilters } from '@/types/assetTypes';
import React from 'react';
import { CheckboxFilter } from './components/CheckboxFilter';
import { RangeFilter } from './components/RangeFilter';

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
      return <RangeFilter filter={filter} {...rangeFilterProps} />;
    case 'checkbox':
      return <CheckboxFilter filter={filter} {...checkboxFilterProps} />;
    default:
      return <></>;
  }
};
