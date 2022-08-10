import type { DisabledRanges, DisabledRangesKey, IFilter, RangeFilters } from '@/types/assetTypes';
import React from 'react';
import { CheckboxFilter } from './components/CheckboxFilter';
import { RangeFilter } from './components/RangeFilter';

export interface FilterProps {
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  handleRange: (id: string, val: number[]) => void;
  disabledRanges: DisabledRanges;
  handleDisabled: (key: DisabledRangesKey) => void;
  removeFilterRange: (id: string) => void;
  checkedFilters: IFilter[];
  filterRanges: RangeFilters;
  filterType: string;
}

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
