import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { IFilter, RangeFilters } from 'src/types';

const getAttrFromKey = (key: string): string | undefined => {
  return key.split('[')?.[1]?.replace(']', '');
};

const getStringFromQuery = (query: string | string[] | undefined): string | undefined => {
  if (Array.isArray(query)) {
    return query[0];
  }

  return query;
};

const getArrayFromQuery = (query: string | string[] | undefined): string[] => {
  if (Array.isArray(query)) {
    return query;
  }

  return query ? [query] : [];
};

export const useFilters = () => {
  const router = useRouter();
  const { query } = router;

  const checkedFilters: IFilter[] = [];
  const rangeFiltersObj: RangeFilters = {};

  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith('attr_eq')) {
      const strippedKey = getAttrFromKey(key);
      const parsedValue = getArrayFromQuery(value);

      if (strippedKey) {
        checkedFilters.push(
          ...parsedValue.map((item: string) => ({ categoryId: strippedKey, filterId: item })),
        );
      }
    }

    if (key.startsWith('attr_gte')) {
      const strippedKey = getAttrFromKey(key);
      const minValue = getStringFromQuery(value);
      const maxValue = getStringFromQuery(query[`attr_lte[${strippedKey}]`]);

      if (strippedKey && minValue && maxValue) {
        rangeFiltersObj[strippedKey] = { min: minValue, max: maxValue };
      }
    }
  }

  const checkedFiltersMemo = useMemo(
    () => checkedFilters,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedFilters.map((item) => `${item.categoryId}-${item.filterId}`).join('')],
  );
  const rangeFiltersMemo = useMemo(
    () => rangeFiltersObj,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.entries(rangeFiltersObj)
        .map(([key, value]) => `${key}-${value.min}-${value.max}`)
        .join(''),
    ],
  );

  const rangeFilters = Object.keys(rangeFiltersMemo ?? {}).length > 0 ? rangeFiltersMemo : null;

  const updateCheckedFilters = (newCheckedFilters: IFilter[]) => {
    const updatedQuery = { ...query };
    for (const key of Object.keys(updatedQuery)) {
      if (key.startsWith('attr_eq')) {
        delete updatedQuery[key];
      }
    }
    for (const filter of newCheckedFilters) {
      const key = `attr_eq[${filter.categoryId}]`;

      const currentFilters = updatedQuery[key];
      const filters = [filter.filterId];

      if (Array.isArray(currentFilters)) {
        filters.push(...currentFilters);
      }

      updatedQuery[key] = filters;
    }
    router.replace({
      pathname: router.pathname,
      query: updatedQuery,
    });
  };

  const updateRangeFilters = (newRangeFilters: RangeFilters) => {
    const updatedQuery = { ...query };

    for (const key of Object.keys(updatedQuery)) {
      if (key.startsWith('attr_gte')) {
        delete updatedQuery[key];
      }

      if (key.startsWith('attr_lte')) {
        delete updatedQuery[key];
      }
    }

    if (newRangeFilters === null) {
      return;
    }

    for (const [key, range] of Object.entries(newRangeFilters)) {
      updatedQuery[`attr_gte[${key}]`] = range.min;
      updatedQuery[`attr_lte[${key}]`] = range.max;
    }

    router.replace({
      pathname: router.pathname,
      query: updatedQuery,
    });
  };

  return {
    checkedFilters: checkedFiltersMemo,
    rangeFilters,
    updateCheckedFilters,
    updateRangeFilters,
  };
};
