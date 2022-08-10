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

interface IRangeFilter {
  categoryName: string;
  filterType: string;
  categoryId: keyof DisabledRanges;
  range: string[];
}
interface ICheckboxFilter {
  categoryName: string;
  filterType: string;
  categoryId: string;
  filters: string[];
  range?: undefined;
}
type IFilters = ICheckboxFilter | IRangeFilter;

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
  filter: IFilters;
  filterType: string;
  handleDisabled: (key: DisabledRangesKey) => void;
  checkedFilters: IFilter[];
  filterRanges: RangeFilters;
  disabledRanges: DisabledRanges;
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
