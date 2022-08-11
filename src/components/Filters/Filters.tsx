import type { DisabledRanges, DisabledRangesKey, IFilter, RangeFilters } from '@/types/assetTypes';
import React from 'react';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { ClearAllFilter } from '../FilterMenu/components/ClearAllFilter';
import { IsolatedMenu } from './components/IsolatedMenu/IsolatedMenu';

export interface FilterProps {
  toggleVisibility: (isVisible: boolean) => void;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  clearAllSelectedFilters: () => void;
  handleRange: (id: string, val: number[]) => void;
  disabledRanges: DisabledRanges;
  handleDisabled: (key: DisabledRangesKey) => void;
  removeFilterRange: (id: string) => void;
  checkedFilters: IFilter[];
  filterRanges: RangeFilters;
}

export const Filters = ({
  handleFiltersChange,
  clearAllSelectedFilters,
  handleRange,
  removeFilterRange,
  checkedFilters,
  filterRanges,
  disabledRanges,
  handleDisabled,
}: FilterProps) => {
  const filterProps = {
    handleFiltersChange,
    handleRange,
    removeFilterRange,
    filterRanges,
    handleDisabled,
    checkedFilters,
    disabledRanges,
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {mockCategoryFilters.map((category: any, index: any) => (
          <div key={index}>
            <IsolatedMenu categoriesList={category} {...filterProps} />
          </div>
        ))}
        <ClearAllFilter
          clearSelectedFilters={clearAllSelectedFilters}
          isFilterButtonVisible={
            checkedFilters.length || !disabledRanges.Grade || !disabledRanges.Year
          }
        />
      </div>
    </div>
  );
};
